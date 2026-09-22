#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, calendar_v3 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");
const DEFAULT_TIMEZONE = "America/Bogota";

let calendar: calendar_v3.Calendar;

async function initCalendarClient(): Promise<calendar_v3.Calendar> {
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

  return google.calendar({ version: "v3", auth: oAuth2Client });
}

function toSummary(event: calendar_v3.Schema$Event) {
  return {
    id: event.id,
    summary: event.summary,
    description: event.description,
    location: event.location,
    start: event.start?.dateTime ?? event.start?.date,
    end: event.end?.dateTime ?? event.end?.date,
    attendees: (event.attendees ?? []).map((a) => a.email),
    htmlLink: event.htmlLink,
  };
}

async function listEvents(calendarId: string, timeMin?: string, timeMax?: string, maxResults?: number) {
  const res = await calendar.events.list({
    calendarId,
    timeMin: timeMin ?? new Date().toISOString(),
    timeMax,
    maxResults: maxResults ?? 20,
    singleEvents: true,
    orderBy: "startTime",
  });

  return (res.data.items ?? []).map(toSummary);
}

async function getEvent(calendarId: string, eventId: string) {
  const res = await calendar.events.get({ calendarId, eventId });
  return toSummary(res.data);
}

async function createEvent(
  calendarId: string,
  summary: string,
  startDateTime: string,
  endDateTime: string,
  description?: string,
  location?: string,
  attendees?: string[]
) {
  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description,
      location,
      start: { dateTime: startDateTime, timeZone: DEFAULT_TIMEZONE },
      end: { dateTime: endDateTime, timeZone: DEFAULT_TIMEZONE },
      attendees: attendees?.map((email) => ({ email })),
    },
  });

  return toSummary(res.data);
}

async function deleteEvent(calendarId: string, eventId: string) {
  await calendar.events.delete({ calendarId, eventId });
  return { deleted: true, eventId };
}

const tools: Tool[] = [
  {
    name: "list_events",
    description: "Lista próximos eventos de un calendario",
    inputSchema: {
      type: "object",
      properties: {
        calendar_id: { type: "string", description: "ID del calendario (default 'primary')" },
        time_min: { type: "string", description: "Fecha ISO mínima (default ahora)" },
        time_max: { type: "string", description: "Fecha ISO máxima (opcional)" },
        max_results: { type: "number", description: "Máximo de eventos (default 20)" },
      },
    },
  },
  {
    name: "get_event",
    description: "Obtiene el detalle de un evento por su ID",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "string", description: "ID del evento" },
        calendar_id: { type: "string", description: "ID del calendario (default 'primary')" },
      },
      required: ["event_id"],
    },
  },
  {
    name: "create_event",
    description: "Crea un evento/reunión en el calendario",
    inputSchema: {
      type: "object",
      properties: {
        summary: { type: "string", description: "Título del evento" },
        start_datetime: { type: "string", description: "Inicio en formato ISO 8601 (ej: 2026-08-27T10:00:00)" },
        end_datetime: { type: "string", description: "Fin en formato ISO 8601" },
        description: { type: "string", description: "Descripción (opcional)" },
        location: { type: "string", description: "Ubicación (opcional)" },
        attendees: { type: "array", items: { type: "string" }, description: "Correos de invitados (opcional)" },
        calendar_id: { type: "string", description: "ID del calendario (default 'primary')" },
      },
      required: ["summary", "start_datetime", "end_datetime"],
    },
  },
  {
    name: "delete_event",
    description: "Elimina/cancela un evento",
    inputSchema: {
      type: "object",
      properties: {
        event_id: { type: "string", description: "ID del evento" },
        calendar_id: { type: "string", description: "ID del calendario (default 'primary')" },
      },
      required: ["event_id"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  const calendarId = (args.calendar_id as string) || "primary";

  switch (name) {
    case "list_events": {
      const result = await listEvents(
        calendarId,
        args.time_min as string,
        args.time_max as string,
        args.max_results as number
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "get_event": {
      const result = await getEvent(calendarId, args.event_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_event": {
      const result = await createEvent(
        calendarId,
        args.summary as string,
        args.start_datetime as string,
        args.end_datetime as string,
        args.description as string | undefined,
        args.location as string | undefined,
        args.attendees as string[] | undefined
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "delete_event": {
      const result = await deleteEvent(calendarId, args.event_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  calendar = await initCalendarClient();

  const server = new Server(
    { name: "bedrock-calendar-mcp", version: "1.0.0" },
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
  console.error("Bedrock Calendar MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-calendar-mcp:", err);
  process.exit(1);
});
