#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Tipos
interface DocumentTemplate {
  type?: "proposal" | "report" | "contract" | "letterhead" | "presentation";
  title?: string;
  company?: string;
  content?: string;
  format?: "docx" | "pdf" | "pptx" | string;
}

interface GeneratedDocument {
  fileName: string;
  fileId: string;
  format: string;
  url: string;
  previewText: string;
}

// Simulación de generación de documentos
function generateProposal(data: Partial<DocumentTemplate>): GeneratedDocument {
  return {
    fileName: `${data.company || "Propuesta"}-${Date.now()}.${data.format}`,
    fileId: `doc-${Date.now()}`,
    format: data.format || "docx",
    url: `https://drive.google.com/file/d/${Date.now()}/view`,
    previewText: `PROPUESTA COMERCIAL\n\n${data.company}\n\n${data.title}\n\nFecha: ${new Date().toLocaleDateString("es-ES")}\n\n${data.content}`,
  };
}

function generateReport(data: Partial<DocumentTemplate>): GeneratedDocument {
  return {
    fileName: `Reporte-${data.company || "Bedrock"}-${Date.now()}.${data.format}`,
    fileId: `doc-${Date.now()}`,
    format: data.format || "pdf",
    url: `https://drive.google.com/file/d/${Date.now()}/view`,
    previewText: `REPORTE - ${data.title}\n\nEmpresa: ${data.company}\n\n${data.content}\n\nGenerado: ${new Date().toLocaleDateString("es-ES")}`,
  };
}

function generateContract(data: Partial<DocumentTemplate>): GeneratedDocument {
  return {
    fileName: `Contrato-${data.company || "Bedrock"}-${Date.now()}.${data.format}`,
    fileId: `doc-${Date.now()}`,
    format: data.format || "docx",
    url: `https://drive.google.com/file/d/${Date.now()}/view`,
    previewText: `CONTRATO\n\nEntre: Bedrock Abogados\nY: ${data.company}\n\nAsunto: ${data.title}\n\n${data.content}`,
  };
}

function generatePresentation(data: Partial<DocumentTemplate>): GeneratedDocument {
  return {
    fileName: `Presentacion-${data.company || "Bedrock"}-${Date.now()}.pptx`,
    fileId: `doc-${Date.now()}`,
    format: "pptx",
    url: `https://drive.google.com/file/d/${Date.now()}/view`,
    previewText: `PRESENTACIÓN: ${data.title}\nEmpresa: ${data.company}\nDiapositivas: 12\nEstilo: Bedrock Abogados`,
  };
}

function applyBedrocKStyle(content: string): string {
  return `
BEDROCK ABOGADOS
═══════════════════════════════════════

[HEADER CON LOGO Y LÍNEA DORADA]

${content}

═══════════════════════════════════════
Teléfono: +57 (1) 1234-5678
Email: contacto@bedrockabogados.com
Web: www.bedrockabogados.com

[FOOTER CON REDES SOCIALES]
  `;
}

// Herramientas disponibles
const tools: Tool[] = [
  {
    name: "generate_proposal",
    description: "Genera una propuesta comercial estilo Bedrock (DOCX, PDF)",
    inputSchema: {
      type: "object",
      properties: {
        company_name: {
          type: "string",
          description: "Nombre de la empresa cliente",
        },
        title: {
          type: "string",
          description: "Título de la propuesta",
        },
        content: {
          type: "string",
          description: "Contenido principal",
        },
        format: {
          type: "string",
          enum: ["docx", "pdf"],
          description: "Formato de salida",
        },
      },
      required: ["company_name", "title", "content"],
    },
  },
  {
    name: "generate_report",
    description: "Genera un reporte legal estilo Bedrock",
    inputSchema: {
      type: "object",
      properties: {
        company_name: {
          type: "string",
          description: "Empresa",
        },
        report_type: {
          type: "string",
          enum: ["due_diligence", "compliance", "fintech", "audit"],
          description: "Tipo de reporte",
        },
        content: {
          type: "string",
          description: "Contenido",
        },
        format: {
          type: "string",
          enum: ["docx", "pdf"],
          description: "Formato",
        },
      },
      required: ["company_name", "report_type", "content"],
    },
  },
  {
    name: "generate_contract",
    description: "Genera un contrato con estilo Bedrock",
    inputSchema: {
      type: "object",
      properties: {
        contract_type: {
          type: "string",
          enum: [
            "service_agreement",
            "nda",
            "investment",
            "employment",
            "general",
          ],
          description: "Tipo de contrato",
        },
        parties: {
          type: "string",
          description: "Partes del contrato",
        },
        terms: {
          type: "string",
          description: "Términos principales",
        },
        format: {
          type: "string",
          enum: ["docx", "pdf"],
          description: "Formato",
        },
      },
      required: ["contract_type", "parties", "terms"],
    },
  },
  {
    name: "generate_presentation",
    description: "Genera una presentación estilo Bedrock (PPTX)",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Título de la presentación",
        },
        company_name: {
          type: "string",
          description: "Empresa",
        },
        slides: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string" },
            },
          },
          description: "Diapositivas",
        },
      },
      required: ["title"],
    },
  },
  {
    name: "apply_bedrock_style",
    description: "Aplica el estilo Bedrock a un documento",
    inputSchema: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Contenido a estilizar",
        },
      },
      required: ["content"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "generate_proposal": {
      const result = generateProposal({
        company: args.company_name as string,
        title: args.title as string,
        content: args.content as string,
        format: (args.format as string) || "docx",
      });
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "generate_report": {
      const result = generateReport({
        company: args.company_name as string,
        title: args.report_type as string,
        content: args.content as string,
        format: (args.format as string) || "pdf",
      });
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "generate_contract": {
      const result = generateContract({
        company: args.parties as string,
        title: args.contract_type as string,
        content: args.terms as string,
        format: (args.format as string) || "docx",
      });
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "generate_presentation": {
      const result = generatePresentation({
        title: args.title as string,
        company: args.company_name as string,
      });
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "apply_bedrock_style": {
      const styled = applyBedrocKStyle(args.content as string);
      return {
        type: "text" as const,
        text: styled,
      };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  const server = new Server(
    {
      name: "bedrock-document-generator-mcp",
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
  console.error("Bedrock Document Generator MCP server running on stdio");
}

main().catch(console.error);
