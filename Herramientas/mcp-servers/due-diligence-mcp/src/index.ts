#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Tipos y utilidades
interface CapTableEntry {
  shareholder: string;
  shares: number;
  percentage: number;
  type: "common" | "preferred" | "founder";
}

interface LegalRiskAssessment {
  riskLevel: "low" | "medium" | "high" | "critical";
  findings: string[];
  recommendations: string[];
}

interface ComplianceMatrix {
  entity: string;
  status: "compliant" | "non-compliant" | "in-progress";
  issues: string[];
}

// Herramientas simuladas - Reemplazar con lógica real
function analyzeCapTable(capTableData: unknown): CapTableEntry[] {
  // Simulación: En producción, conectar a base de datos
  return [
    {
      shareholder: "Founder A",
      shares: 500000,
      percentage: 50,
      type: "founder",
    },
    {
      shareholder: "Founder B",
      shares: 300000,
      percentage: 30,
      type: "founder",
    },
    {
      shareholder: "Investor A",
      shares: 200000,
      percentage: 20,
      type: "preferred",
    },
  ];
}

function verifyAntecedents(entityName: string): { clean: boolean; findings: string[] } {
  // Simulación: En producción, conectar a servicios externos (RUES, etc.)
  return {
    clean: true,
    findings: [],
  };
}

function assessLegalRisk(companyData: unknown): LegalRiskAssessment {
  // Simulación: En producción, aplicar lógica de evaluación
  return {
    riskLevel: "medium",
    findings: [
      "Posible exposición a litigios laborales",
      "Cumplimiento SAGRILAFT no verificado",
    ],
    recommendations: [
      "Implementar matriz SAGRILAFT",
      "Auditar contratos laborales",
    ],
  };
}

function generateDDReport(analysisData: unknown): { report: string; summary: string } {
  // Simulación: En producción, generar PDF con análisis detallado
  return {
    report: "Reporte de Due Diligence completo",
    summary: "Análisis de riesgo: MEDIO - Revisar cumplimiento normativo",
  };
}

// Definición de herramientas disponibles
const tools: Tool[] = [
  {
    name: "analyze_cap_table",
    description:
      "Analiza la estructura accionaria (cap table) de una empresa, identificando participaciones, tipo de acciones y dilución potencial.",
    inputSchema: {
      type: "object",
      properties: {
        company_name: {
          type: "string",
          description: "Nombre de la empresa",
        },
        shareholders_data: {
          type: "array",
          description: "Datos de accionistas",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              shares: { type: "number" },
              type: {
                type: "string",
                enum: ["common", "preferred", "founder"],
              },
            },
          },
        },
      },
      required: ["company_name"],
    },
  },
  {
    name: "verify_antecedents",
    description:
      "Verifica los antecedentes legales de una entidad (RUES, demandas, sanciones) en registros públicos.",
    inputSchema: {
      type: "object",
      properties: {
        entity_name: {
          type: "string",
          description: "Nombre de la entidad a verificar",
        },
        entity_type: {
          type: "string",
          enum: ["company", "individual", "fund"],
          description: "Tipo de entidad",
        },
      },
      required: ["entity_name", "entity_type"],
    },
  },
  {
    name: "assess_legal_risk",
    description:
      "Evalúa el riesgo legal de una empresa basado en su estructura, cumplimiento normativo y exposición a litigios.",
    inputSchema: {
      type: "object",
      properties: {
        company_name: {
          type: "string",
          description: "Nombre de la empresa",
        },
        industry: {
          type: "string",
          description: "Industria de la empresa",
        },
        key_issues: {
          type: "array",
          items: { type: "string" },
          description: "Problemas legales conocidos",
        },
      },
      required: ["company_name"],
    },
  },
  {
    name: "generate_dd_report",
    description:
      "Genera un reporte completo de due diligence con análisis integral de riesgos legales, compliance y estructuración.",
    inputSchema: {
      type: "object",
      properties: {
        company_name: {
          type: "string",
          description: "Nombre de la empresa",
        },
        report_type: {
          type: "string",
          enum: ["executive_summary", "full_report", "risk_assessment"],
          description: "Tipo de reporte",
        },
        include_recommendations: {
          type: "boolean",
          description: "Incluir recomendaciones de mitigación",
          default: true,
        },
      },
      required: ["company_name", "report_type"],
    },
  },
];

async function handleToolCall(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "analyze_cap_table": {
      const result = analyzeCapTable(args.shareholders_data);
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "verify_antecedents": {
      const result = verifyAntecedents(args.entity_name as string);
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "assess_legal_risk": {
      const result = assessLegalRisk(args);
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    case "generate_dd_report": {
      const result = generateDDReport(args);
      return {
        type: "text" as const,
        text: JSON.stringify(result, null, 2),
      };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function main() {
  const server = new Server(
    {
      name: "bedrock-due-diligence-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Manejo de listar herramientas
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  // Manejo de llamadas a herramientas
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

  // Iniciar servidor con stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bedrock Due Diligence MCP server running on stdio");
}

main().catch(console.error);
