#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { google, tasks_v1 } from "googleapis";
import { readFile as readFileFs, writeFile as writeFileFs } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "..", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "..", "credentials", "token.json");

let tasksApi: tasks_v1.Tasks;

async function initTasksClient(): Promise<tasks_v1.Tasks> {
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

  return google.tasks({ version: "v1", auth: oAuth2Client });
}

async function listTaskLists() {
  const res = await tasksApi.tasklists.list();
  return (res.data.items ?? []).map((l) => ({ id: l.id, title: l.title }));
}

async function listTasks(taskListId: string, showCompleted?: boolean) {
  const res = await tasksApi.tasks.list({
    tasklist: taskListId,
    showCompleted: showCompleted ?? false,
  });

  return (res.data.items ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    notes: t.notes,
    due: t.due,
    status: t.status,
  }));
}

async function createTask(taskListId: string, title: string, notes?: string, due?: string) {
  const res = await tasksApi.tasks.insert({
    tasklist: taskListId,
    requestBody: { title, notes, due },
  });

  return { id: res.data.id, title: res.data.title, status: res.data.status };
}

async function completeTask(taskListId: string, taskId: string) {
  const res = await tasksApi.tasks.patch({
    tasklist: taskListId,
    task: taskId,
    requestBody: { status: "completed" },
  });

  return { id: res.data.id, status: res.data.status };
}

const tools: Tool[] = [
  {
    name: "list_task_lists",
    description: "Lista las listas de tareas disponibles",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "list_tasks",
    description: "Lista tareas de una lista de tareas",
    inputSchema: {
      type: "object",
      properties: {
        task_list_id: { type: "string", description: "ID de la lista (default '@default')" },
        show_completed: { type: "boolean", description: "Incluir tareas completadas (default false)" },
      },
    },
  },
  {
    name: "create_task",
    description: "Crea una tarea nueva",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Título de la tarea" },
        notes: { type: "string", description: "Notas (opcional)" },
        due: { type: "string", description: "Fecha límite en formato RFC3339 (opcional)" },
        task_list_id: { type: "string", description: "ID de la lista (default '@default')" },
      },
      required: ["title"],
    },
  },
  {
    name: "complete_task",
    description: "Marca una tarea como completada",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string", description: "ID de la tarea" },
        task_list_id: { type: "string", description: "ID de la lista (default '@default')" },
      },
      required: ["task_id"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  const taskListId = (args.task_list_id as string) || "@default";

  switch (name) {
    case "list_task_lists": {
      const result = await listTaskLists();
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "list_tasks": {
      const result = await listTasks(taskListId, args.show_completed as boolean | undefined);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "create_task": {
      const result = await createTask(
        taskListId,
        args.title as string,
        args.notes as string | undefined,
        args.due as string | undefined
      );
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    case "complete_task": {
      const result = await completeTask(taskListId, args.task_id as string);
      return { type: "text" as const, text: JSON.stringify(result, null, 2) };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  tasksApi = await initTasksClient();

  const server = new Server(
    { name: "bedrock-tasks-mcp", version: "1.0.0" },
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
  console.error("Bedrock Tasks MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fallo al iniciar bedrock-tasks-mcp:", err);
  process.exit(1);
});
