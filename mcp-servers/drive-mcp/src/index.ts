#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Tipos
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
}

interface DriveFolder {
  id: string;
  name: string;
  files: DriveFile[];
}

// Simulación - En producción: conectar con Google Drive API
function listFiles(folderId: string): DriveFile[] {
  return [
    {
      id: "file-001",
      name: "Due Diligence Report - Tech Startup.pdf",
      mimeType: "application/pdf",
      createdTime: "2025-08-25T10:00:00Z",
      modifiedTime: "2025-08-25T15:30:00Z",
    },
    {
      id: "file-002",
      name: "Cap Table Analysis.xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      createdTime: "2025-08-25T09:00:00Z",
      modifiedTime: "2025-08-25T14:00:00Z",
    },
    {
      id: "file-003",
      name: "SAGRILAFT Matrix.docx",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      createdTime: "2025-08-24T11:00:00Z",
      modifiedTime: "2025-08-25T16:00:00Z",
    },
  ];
}

function readFile(fileId: string): { content: string; fileName: string } {
  return {
    fileName: `document-${fileId}.pdf`,
    content: "Este es el contenido simulado del documento. En producción, se obtendría de Google Drive.",
  };
}

function uploadFile(fileName: string, content: string, folderId?: string): { fileId: string; url: string } {
  return {
    fileId: `file-${Date.now()}`,
    url: `https://drive.google.com/file/d/file-${Date.now()}/view`,
  };
}

function createFolder(folderName: string, parentFolderId?: string): { folderId: string; url: string } {
  return {
    folderId: `folder-${Date.now()}`,
    url: `https://drive.google.com/drive/folders/folder-${Date.now()}`,
  };
}

function searchFiles(query: string): DriveFile[] {
  return [
    {
      id: "search-result-1",
      name: `Results for: ${query}`,
      mimeType: "text/plain",
      createdTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
    },
  ];
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
    description: "Sube un archivo a Google Drive",
    inputSchema: {
      type: "object",
      properties: {
        file_name: {
          type: "string",
          description: "Nombre del archivo",
        },
        content: {
          type: "string",
          description: "Contenido del archivo",
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
      const files = listFiles(args.folder_id as string || "root");
      return {
        type: "text" as const,
        text: JSON.stringify(files, null, 2),
      };
    }
    case "read_drive_file": {
      const result = readFile(args.file_id as string);
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "upload_to_drive": {
      const result = uploadFile(
        args.file_name as string,
        args.content as string,
        args.folder_id as string
      );
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "create_drive_folder": {
      const result = createFolder(
        args.folder_name as string,
        args.parent_folder_id as string
      );
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "search_drive": {
      const results = searchFiles(args.query as string);
      return {
        type: "text" as const,
        text: JSON.stringify(results, null, 2),
      };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
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
  console.error("Bedrock Drive MCP server running on stdio");
}

main().catch(console.error);
