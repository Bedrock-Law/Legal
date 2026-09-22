#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, gmail_v1 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");

let gmail: gmail_v1.Gmail;

async function initGmailClient(): Promise<gmail_v1.Gmail> {
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

  return google.gmail({ version: "v1", auth: oAuth2Client });
}

function header(headers: gmail_v1.Schema$MessagePartHeader[] | undefined, name: string): string {
  return headers?.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ?? "";
}

function extractBody(payload: gmail_v1.Schema$MessagePart | undefined): string {
  if (!payload) return "";

  if (payload.body?.data) {
    return Buffer.from(payload.body.data, "base64url").toString("utf-8");
  }

  const parts = payload.parts ?? [];
  const plain = parts.find((p) => p.mimeType === "text/plain");
  if (plain?.body?.data) {
    return Buffer.from(plain.body.data, "base64url").toString("utf-8");
  }

  const html = parts.find((p) => p.mimeType === "text/html");
  if (html?.body?.data) {
    return Buffer.from(html.body.data, "base64url").toString("utf-8");
  }

  for (const part of parts) {
    const nested = extractBody(part);
    if (nested) return nested;
  }

  return "";
}

async function listEmails(query?: string, maxResults?: number) {
  const res = await gmail.users.messages.list({
    userId: "me",
    q: query,
    maxResults: maxResults ?? 20,
  });

  const messages = res.data.messages ?? [];
  const detailed = await Promise.all(
    messages.map(async (m) => {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: m.id as string,
        format: "metadata",
        metadataHeaders: ["From", "Subject", "Date"],
      });
      return {
        id: msg.data.id,
        threadId: msg.data.threadId,
        from: header(msg.data.payload?.headers, "From"),
        subject: header(msg.data.payload?.headers, "Subject"),
        date: header(msg.data.payload?.headers, "Date"),
        snippet: msg.data.snippet,
      };
    })
  );

  return detailed;
}

async function readEmail(messageId: string) {
  const res = await gmail.users.messages.get({ userId: "me", id: messageId, format: "full" });
  const headers = res.data.payload?.headers;

  return {
    id: res.data.id,
    threadId: res.data.threadId,
    from: header(headers, "From"),
    to: header(headers, "To"),
    subject: header(headers, "Subject"),
    date: header(headers, "Date"),
    body: extractBody(res.data.payload),
  };
}

async function sendEmail(to: string, subject: string, body: string, cc?: string) {
  const lines = [`To: ${to}`, cc ? `Cc: ${cc}` : null, `Subject: ${subject}`, "Content-Type: text/plain; charset=utf-8", "", body]
    .filter((l): l is string => l !== null)
    .join("\n");

  const raw = Buffer.from(lines).toString("base64url");

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });

  return { messageId: res.data.id, threadId: res.data.threadId };
}

const tools: Tool[] = [
  {
    name: "list_emails",
    description: "Lista correos de Gmail, opcionalmente filtrados por una búsqueda (sintaxis de Gmail)",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Búsqueda estilo Gmail (ej: 'from:x@y.com is:unread')" },
        max_results: { type: "number", description: "Máximo de correos a devolver (default 20)" },
      },
    },
  },
  {
    name: "search_emails",
    description: "Busca correos en Gmail por texto libre o sintaxis de búsqueda de Gmail",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Término o sintaxis de búsqueda" },
        max_results: { type: "number", description: "Máximo de correos a devolver (default 20)" },
      },
      required: ["query"],
    },
  },
  {
    name: "read_email",
    description: "Lee el contenido completo de un correo por su ID",
    inputSchema: {
      type: "object",
      properties: {
        message_id: { type: "string", description: "ID del mensaje de Gmail" },
      },
      required: ["message_id"],
    },
  },
  {
    name: "send_email",
    description: "Envía un correo desde la cuenta autorizada",
    inputSchema: {
      type: "object",
      properties: {
        to: { type: "string", description: "Destinatario" },
        subject: { type: "string", description: "Asunto" },
        body: { type: "string", description: "Cuerpo del correo (texto plano)" },
        cc: { type: "string", description: "Copia (opcional)" },
      },
      required: ["to", "subject", "body"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "list_emails": {
      const result = await listEmails(args.query as string, args.max_results as number);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "search_emails": {
      const result = await listEmails(args.query as string, args.max_results as number);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "read_email": {
      const result = await readEmail(args.message_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "send_email": {
      const result = await sendEmail(
        args.to as string,
        args.subject as string,
        args.body as string,
        args.cc as string | undefined
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  gmail = await initGmailClient();

  const server = new Server(
    { name: "bedrock-gmail-mcp", version: "1.0.0" },
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
  console.error("Bedrock Gmail MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-gmail-mcp:", err);
  process.exit(1);
});
