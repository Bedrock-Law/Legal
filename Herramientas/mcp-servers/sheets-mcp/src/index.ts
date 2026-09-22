#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, sheets_v4 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");

let sheets: sheets_v4.Sheets;

async function initSheetsClient(): Promise<sheets_v4.Sheets> {
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

  return google.sheets({ version: "v4", auth: oAuth2Client });
}

async function readSheet(spreadsheetId: string, range: string) {
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  return { range: res.data.range, values: res.data.values ?? [] };
}

async function writeSheet(spreadsheetId: string, range: string, values: unknown[][]) {
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });
  return { updatedRange: res.data.updatedRange, updatedCells: res.data.updatedCells };
}

async function appendSheet(spreadsheetId: string, range: string, values: unknown[][]) {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
  return { updatedRange: res.data.updates?.updatedRange, updatedCells: res.data.updates?.updatedCells };
}

async function createSpreadsheet(title: string) {
  const res = await sheets.spreadsheets.create({ requestBody: { properties: { title } } });
  return {
    spreadsheetId: res.data.spreadsheetId,
    url: res.data.spreadsheetUrl,
  };
}

async function createSheet(spreadsheetId: string, title: string) {
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: title,
              sheetType: "GRID",
              gridProperties: {
                rowCount: 100,
                columnCount: 8,
              },
            },
          },
        },
      ],
    },
  });
  const sheetId = res.data.replies?.[0]?.addSheet?.properties?.sheetId;
  return { sheetId, title };
}

async function formatSheet(spreadsheetId: string, sheetId: number, requests: any[]) {
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests },
  });
  return { replies: res.data.replies };
}

const tools: Tool[] = [
  {
    name: "read_sheet",
    description: "Lee valores de un rango de una hoja de cálculo",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheet_id: { type: "string", description: "ID de la hoja de cálculo" },
        range: { type: "string", description: "Rango en notación A1 (ej: 'Hoja1!A1:D20')" },
      },
      required: ["spreadsheet_id", "range"],
    },
  },
  {
    name: "write_sheet",
    description: "Escribe (sobrescribe) valores en un rango específico",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheet_id: { type: "string", description: "ID de la hoja de cálculo" },
        range: { type: "string", description: "Rango en notación A1 (ej: 'Hoja1!A1')" },
        values: {
          type: "array",
          description: "Matriz de filas x columnas con los valores a escribir",
          items: { type: "array", items: {} },
        },
      },
      required: ["spreadsheet_id", "range", "values"],
    },
  },
  {
    name: "append_sheet",
    description: "Agrega filas al final de una tabla existente",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheet_id: { type: "string", description: "ID de la hoja de cálculo" },
        range: { type: "string", description: "Rango/hoja donde buscar la tabla (ej: 'Hoja1!A:D')" },
        values: {
          type: "array",
          description: "Matriz de filas x columnas a agregar",
          items: { type: "array", items: {} },
        },
      },
      required: ["spreadsheet_id", "range", "values"],
    },
  },
  {
    name: "create_spreadsheet",
    description: "Crea una nueva hoja de cálculo de Google Sheets",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Título de la hoja de cálculo" },
      },
      required: ["title"],
    },
  },
  {
    name: "create_sheet",
    description: "Crea una nueva pestaña (sheet) dentro de un spreadsheet existente",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheet_id: { type: "string", description: "ID de la hoja de cálculo" },
        title: { type: "string", description: "Nombre de la pestaña a crear" },
      },
      required: ["spreadsheet_id", "title"],
    },
  },
  {
    name: "format_sheet",
    description: "Aplica formato a un rango de celdas",
    inputSchema: {
      type: "object",
      properties: {
        spreadsheet_id: { type: "string", description: "ID de la hoja de cálculo" },
        sheet_id: { type: "number", description: "ID de la pestaña" },
        requests: {
          type: "array",
          description: "Array de solicitudes de formato (batchUpdate)",
          items: { type: "object" },
        },
      },
      required: ["spreadsheet_id", "sheet_id", "requests"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "read_sheet": {
      const result = await readSheet(args.spreadsheet_id as string, args.range as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "write_sheet": {
      const result = await writeSheet(
        args.spreadsheet_id as string,
        args.range as string,
        args.values as unknown[][]
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "append_sheet": {
      const result = await appendSheet(
        args.spreadsheet_id as string,
        args.range as string,
        args.values as unknown[][]
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_spreadsheet": {
      const result = await createSpreadsheet(args.title as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_sheet": {
      const result = await createSheet(
        args.spreadsheet_id as string,
        args.title as string
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "format_sheet": {
      const result = await formatSheet(
        args.spreadsheet_id as string,
        args.sheet_id as number,
        args.requests as any[]
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  sheets = await initSheetsClient();

  const server = new Server(
    { name: "bedrock-sheets-mcp", version: "1.0.0" },
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
  console.error("Bedrock Sheets MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-sheets-mcp:", err);
  process.exit(1);
});
