#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, drive_v3 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Readable } from "node:stream";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
}

const GOOGLE_NATIVE_EXPORT_MIME: Record<string, string> = {
  "application/vnd.google-apps.document": "text/plain",
  "application/vnd.google-apps.spreadsheet": "text/csv",
  "application/vnd.google-apps.presentation": "text/plain",
};

const UPLOAD_MIME_BY_TYPE: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  txt: "text/plain",
};

const LIST_MIME_FILTER: Record<string, string> = {
  pdf: "mimeType = 'application/pdf'",
  spreadsheet:
    "(mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')",
  document:
    "(mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')",
};

let drive: drive_v3.Drive;

async function initDriveClient(): Promise<drive_v3.Drive> {
  const rawCredentials = await readFileFs(CREDENTIALS_PATH, "utf-8");
  const { installed } = JSON.parse(rawCredentials);
  if (!installed) {
    throw new Error(
      `${CREDENTIALS_PATH} no tiene la forma esperada (falta 'installed'). Verifica que sea un OAuth Client tipo Desktop.`
    );
  }

  const rawToken = await readFileFs(TOKEN_PATH, "utf-8").catch(() => {
    throw new Error(
      `No existe ${TOKEN_PATH}. Corre "npm run authorize" antes de iniciar el servidor.`
    );
  });
  const token = JSON.parse(rawToken);

  const oAuth2Client = new google.auth.OAuth2(installed.client_id, installed.client_secret);
  oAuth2Client.setCredentials(token);

  oAuth2Client.on("tokens", (newTokens) => {
    const merged = { ...token, ...newTokens };
    writeFileFs(TOKEN_PATH, JSON.stringify(merged, null, 2)).catch((err) =>
      console.error("No se pudo persistir el token renovado:", err)
    );
  });

  return google.drive({ version: "v3", auth: oAuth2Client });
}

function escapeQueryValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function toDriveFile(file: drive_v3.Schema$File): DriveFile {
  return {
    id: file.id ?? "",
    name: file.name ?? "",
    mimeType: file.mimeType ?? "",
    createdTime: file.createdTime ?? "",
    modifiedTime: file.modifiedTime ?? "",
  };
}

async function listFiles(folderId: string, fileType?: string): Promise<DriveFile[]> {
  const clauses = [`'${escapeQueryValue(folderId || "root")}' in parents`, "trashed = false"];
  if (fileType && fileType !== "all" && LIST_MIME_FILTER[fileType]) {
    clauses.push(LIST_MIME_FILTER[fileType]);
  }

  const res = await drive.files.list({
    q: clauses.join(" and "),
    fields: "files(id, name, mimeType, createdTime, modifiedTime)",
    pageSize: 100,
  });

  return (res.data.files ?? []).map(toDriveFile);
}

async function readDriveFile(fileId: string): Promise<{ content: string; fileName: string; encoding: "utf-8" | "base64" }> {
  const meta = await drive.files.get({ fileId, fields: "name, mimeType" });
  const mimeType = meta.data.mimeType ?? "";
  const fileName = meta.data.name ?? fileId;

  if (mimeType in GOOGLE_NATIVE_EXPORT_MIME) {
    const exportRes = await drive.files.export(
      { fileId, mimeType: GOOGLE_NATIVE_EXPORT_MIME[mimeType] },
      { responseType: "text" }
    );
    return { fileName, content: exportRes.data as unknown as string, encoding: "utf-8" };
  }

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" }
  );
  const buffer = Buffer.from(res.data as ArrayBuffer);
  const isText = mimeType.startsWith("text/") || mimeType === "application/json";

  return isText
    ? { fileName, content: buffer.toString("utf-8"), encoding: "utf-8" }
    : { fileName, content: buffer.toString("base64"), encoding: "base64" };
}

async function uploadFile(
  fileName: string,
  content: string,
  folderId?: string,
  fileType?: string
): Promise<{ fileId: string; url: string }> {
  const mimeType = (fileType && UPLOAD_MIME_BY_TYPE[fileType]) || "text/plain";
  const buffer = mimeType === "text/plain" ? Buffer.from(content, "utf-8") : Buffer.from(content, "base64");

  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: "id, webViewLink",
  });

  return {
    fileId: res.data.id ?? "",
    url: res.data.webViewLink ?? `https://drive.google.com/file/d/${res.data.id}/view`,
  };
}

async function createFolder(folderName: string, parentFolderId?: string): Promise<{ folderId: string; url: string }> {
  const res = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentFolderId ? [parentFolderId] : undefined,
    },
    fields: "id, webViewLink",
  });

  return {
    folderId: res.data.id ?? "",
    url: res.data.webViewLink ?? `https://drive.google.com/drive/folders/${res.data.id}`,
  };
}

async function searchFiles(query: string, fileType?: string): Promise<DriveFile[]> {
  const clauses = [`fullText contains '${escapeQueryValue(query)}'`, "trashed = false"];
  if (fileType && fileType !== "all" && LIST_MIME_FILTER[fileType]) {
    clauses.push(LIST_MIME_FILTER[fileType]);
  }

  const res = await drive.files.list({
    q: clauses.join(" and "),
    fields: "files(id, name, mimeType, createdTime, modifiedTime)",
    pageSize: 50,
  });

  return (res.data.files ?? []).map(toDriveFile);
}

// Herramientas disponibles
const tools: Tool[] = [
  {
    name: "list_drive_files",
    description: "Lista archivos en una carpeta de Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        folder_id: {
          type: "string",
          description: "ID de la carpeta (omitir para raíz)",
        },
        file_type: {
          type: "string",
          enum: ["all", "pdf", "spreadsheet", "document"],
          description: "Tipo de archivo a filtrar",
        },
      },
    },
  },
  {
    name: "read_drive_file",
    description: "Lee el contenido de un archivo de Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        file_id: {
          type: "string",
          description: "ID del archivo",
        },
      },
      required: ["file_id"],
    },
  },
  {
    name: "upload_to_drive",
    description:
      "Sube un archivo a Google Drive. Para file_type distinto de 'txt', el contenido debe venir en base64",
    inputSchema: {
      type: "object",
      properties: {
        file_name: {
          type: "string",
          description: "Nombre del archivo",
        },
        content: {
          type: "string",
          description: "Contenido del archivo (texto plano, o base64 si file_type no es txt)",
        },
        folder_id: {
          type: "string",
          description: "ID de carpeta destino (opcional)",
        },
        file_type: {
          type: "string",
          enum: ["pdf", "docx", "xlsx", "txt"],
          description: "Tipo de archivo",
        },
      },
      required: ["file_name", "content"],
    },
  },
  {
    name: "create_drive_folder",
    description: "Crea una carpeta en Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        folder_name: {
          type: "string",
          description: "Nombre de la carpeta",
        },
        parent_folder_id: {
          type: "string",
          description: "ID de carpeta padre (opcional)",
        },
      },
      required: ["folder_name"],
    },
  },
  {
    name: "search_drive",
    description: "Busca archivos en Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Término de búsqueda",
        },
        file_type: {
          type: "string",
          description: "Filtrar por tipo",
        },
      },
      required: ["query"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_drive_files": {
      const files = await listFiles((args.folder_id as string) || "root", args.file_type as string);
      return { type: "text" as const, text: JSON.stringify(files, null, 2) };
    }
    case "read_drive_file": {
      const result = await readDriveFile(args.file_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "upload_to_drive": {
      const result = await uploadFile(
        args.file_name as string,
        args.content as string,
        args.folder_id as string,
        args.file_type as string
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_drive_folder": {
      const result = await createFolder(args.folder_name as string, args.parent_folder_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "search_drive": {
      const results = await searchFiles(args.query as string, args.file_type as string);
      return { type: "text" as const, text: JSON.stringify(results, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  drive = await initDriveClient();

  const server = new Server(
    {
      name: "bedrock-drive-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await handleToolCall(
        request.params.name,
        request.params.arguments as Record<string, unknown>
      );
      return {
        type: "tool_result",
        content: [result],
      };
    } catch (error) {
      return {
        type: "tool_result",
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bedrock Drive MCP server running on stdio (Google Drive real)");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-drive-mcp:", err);
  process.exit(1);
});
