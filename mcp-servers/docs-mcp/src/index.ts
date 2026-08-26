#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, docs_v1 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");

let docs: docs_v1.Docs;

async function initDocsClient(): Promise<docs_v1.Docs> {
  const rawCredentials = await readFileFs(CREDENTIALS_PATH, "utf-8");
  const { installed } = JSON.parse(rawCredentials);
  if (!installed) {
    throw new Error(
      `${CREDENTIALS_PATH} no tiene la forma esperada (falta 'installed'). Verifica que sea un OAuth Client tipo Desktop.`
    );
  }

  const rawToken = await readFileFs(TOKEN_PATH, "utf-8").catch(() => {
    throw new Error(
      `No existe ${TOKEN_PATH}. Corre "npm run authorize" en mcp-servers/drive-mcp antes de iniciar el servidor.`
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

  return google.docs({ version: "v1", auth: oAuth2Client });
}

function extractText(doc: docs_v1.Schema$Document): string {
  const content = doc.body?.content ?? [];
  let text = "";

  for (const element of content) {
    for (const el of element.paragraph?.elements ?? []) {
      text += el.textRun?.content ?? "";
    }
  }

  return text;
}

async function readDoc(documentId: string) {
  const res = await docs.documents.get({ documentId });
  return {
    documentId: res.data.documentId,
    title: res.data.title,
    content: extractText(res.data),
  };
}

async function createDoc(title: string, content?: string) {
  const created = await docs.documents.create({ requestBody: { title } });
  const documentId = created.data.documentId as string;

  if (content) {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: {
        requests: [{ insertText: { location: { index: 1 }, text: content } }],
      },
    });
  }

  return { documentId, title, url: `https://docs.google.com/document/d/${documentId}/edit` };
}

async function appendToDoc(documentId: string, text: string) {
  const doc = await docs.documents.get({ documentId });
  const contentList = doc.data.body?.content ?? [];
  const lastElement = contentList[contentList.length - 1];
  const endIndex = (lastElement?.endIndex ?? 1) - 1;

  await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [{ insertText: { location: { index: Math.max(endIndex, 1) }, text } }],
    },
  });

  return { documentId, appended: true };
}

async function replaceTextInDoc(documentId: string, findText: string, replaceText: string, matchCase = false) {
  const res = await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          replaceAllText: {
            containsText: { text: findText, matchCase },
            replaceText,
          },
        },
      ],
    },
  });

  const occurrences = res.data.replies?.[0]?.replaceAllText?.occurrencesChanged ?? 0;
  return { documentId, occurrencesChanged: occurrences };
}

const tools: Tool[] = [
  {
    name: "read_doc",
    description: "Lee el contenido de texto plano de un Google Doc",
    inputSchema: {
      type: "object",
      properties: {
        document_id: { type: "string", description: "ID del documento" },
      },
      required: ["document_id"],
    },
  },
  {
    name: "create_doc",
    description: "Crea un nuevo Google Doc, opcionalmente con contenido inicial",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Título del documento" },
        content: { type: "string", description: "Texto inicial (opcional)" },
      },
      required: ["title"],
    },
  },
  {
    name: "append_to_doc",
    description: "Agrega texto al final de un Google Doc existente",
    inputSchema: {
      type: "object",
      properties: {
        document_id: { type: "string", description: "ID del documento" },
        text: { type: "string", description: "Texto a agregar" },
      },
      required: ["document_id", "text"],
    },
  },
  {
    name: "replace_text_in_doc",
    description: "Reemplaza todas las ocurrencias de un texto por otro (útil para plantillas)",
    inputSchema: {
      type: "object",
      properties: {
        document_id: { type: "string", description: "ID del documento" },
        find_text: { type: "string", description: "Texto a buscar (ej: '{{cliente}}')" },
        replace_text: { type: "string", description: "Texto de reemplazo" },
        match_case: { type: "boolean", description: "Coincidencia exacta de mayúsculas (default false)" },
      },
      required: ["document_id", "find_text", "replace_text"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "read_doc": {
      const result = await readDoc(args.document_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_doc": {
      const result = await createDoc(args.title as string, args.content as string | undefined);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "append_to_doc": {
      const result = await appendToDoc(args.document_id as string, args.text as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "replace_text_in_doc": {
      const result = await replaceTextInDoc(
        args.document_id as string,
        args.find_text as string,
        args.replace_text as string,
        args.match_case as boolean | undefined
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  docs = await initDocsClient();

  const server = new Server(
    { name: "bedrock-docs-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await handleToolCall(
        request.params.name,
        request.params.arguments as Record<string, unknown>
      );
      return { type: "tool_result", content: [result] };
    } catch (error) {
      return {
        type: "tool_result",
        content: [{ type: "text", text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
        isError: true,
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bedrock Docs MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-docs-mcp:", err);
  process.exit(1);
});
