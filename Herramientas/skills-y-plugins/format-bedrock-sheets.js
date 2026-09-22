#!/usr/bin/env node

/**
 * Formateador profesional para Google Sheets - Bedrock Finanzas 2026
 * Aplica paleta de colores corporativa, tipografía y validaciones visuales
 *
 * Uso: node format-bedrock-sheets.js <spreadsheet-id>
 */

import { google } from "googleapis";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "mcp-servers", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "mcp-servers", "credentials", "token.json");

// Paleta de colores
const COLORS = {
  azulCorporativo: { red: 0.118, green: 0.227, blue: 0.541 }, // #1E3A8A
  verde: { red: 0.082, green: 0.502, blue: 0.239 }, // #15803D
  rojo: { red: 0.863, green: 0.149, blue: 0.149 }, // #DC2626
  grisClaro: { red: 0.973, green: 0.976, blue: 0.980 }, // #F8F9FA
  grisOscuro: { red: 0.122, green: 0.161, blue: 0.216 }, // #1F2937
  blanco: { red: 1, green: 1, blue: 1 }, // #FFFFFF
  bordeSutil: { red: 0.898, green: 0.902, blue: 0.910 } // #E5E7EB
};

let sheetsClient;

// ============================================================================
// INICIALIZAR CLIENTE DE SHEETS
// ============================================================================
async function initSheetsClient() {
  try {
    const rawCredentials = await readFile(CREDENTIALS_PATH, "utf-8");
    const { installed } = JSON.parse(rawCredentials);

    if (!installed) {
      throw new Error(`${CREDENTIALS_PATH} debe ser un OAuth Client tipo Desktop`);
    }

    const rawToken = await readFile(TOKEN_PATH, "utf-8").catch(() => {
      throw new Error(
        `No existe ${TOKEN_PATH}. Ejecuta "npm run authorize" primero`
      );
    });

    const token = JSON.parse(rawToken);
    const oAuth2Client = new google.auth.OAuth2(
      installed.client_id,
      installed.client_secret
    );
    oAuth2Client.setCredentials(token);

    oAuth2Client.on("tokens", (newTokens) => {
      const merged = { ...token, ...newTokens };
      writeFile(TOKEN_PATH, JSON.stringify(merged, null, 2)).catch((err) =>
        console.error("No se pudo persistir el token renovado:", err)
      );
    });

    return google.sheets({ version: "v4", auth: oAuth2Client });
  } catch (error) {
    console.error("Error inicializando cliente de Sheets:", error.message);
    process.exit(1);
  }
}

// ============================================================================
// OBTENER INFORMACIÓN DEL SPREADSHEET
// ============================================================================
async function getSpreadsheetInfo(spreadsheetId) {
  const response = await sheetsClient.spreadsheets.get({ spreadsheetId });
  return response.data;
}

// ============================================================================
// CREAR NUEVAS HOJAS
// ============================================================================
async function createSheets(spreadsheetId, sheetNames) {
  const requests = sheetNames.map((name) => ({
    addSheet: {
      properties: {
        title: name,
        sheetType: "GRID",
        gridProperties: { rowCount: 1000, columnCount: 26 }
      }
    }
  }));

  const response = await sheetsClient.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests }
  });

  return response.data.replies.map((reply) => ({
    name: sheetNames[response.data.replies.indexOf(reply)],
    id: reply.addSheet.properties.sheetId
  }));
}

// ============================================================================
// OBTENER IDs DE HOJAS
// ============================================================================
function getSheetIds(spreadsheetMetadata) {
  const sheetMap = {};
  spreadsheetMetadata.sheets.forEach((sheet) => {
    sheetMap[sheet.properties.title] = sheet.properties.sheetId;
  });
  return sheetMap;
}

// ============================================================================
// ESCRITURA DE DATOS CON FORMATO
// ============================================================================
async function writeDataWithFormat(spreadsheetId, sheetName, range, values) {
  await sheetsClient.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values }
  });
}

// ============================================================================
// APLICAR FORMATOS BATCH
// ============================================================================
async function applyFormats(spreadsheetId, requests) {
  const response = await sheetsClient.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: { requests }
  });
  return response.data;
}

// ============================================================================
// GENERAR REQUESTS DE FORMATO PARA ENCABEZADOS
// ============================================================================
function generateHeaderFormatRequest(sheetId, range, bgColor, textColor) {
  return {
    repeatCell: {
      range: {
        sheetId,
        ...parseA1Range(range)
      },
      cell: {
        userEnteredFormat: {
          backgroundColor: bgColor,
          textFormat: {
            foregroundColor: textColor,
            fontFamily: "Inter",
            fontSize: 12,
            bold: true
          },
          horizontalAlignment: "CENTER",
          verticalAlignment: "MIDDLE",
          borders: {
            top: { style: "SOLID", color: COLORS.bordeSutil },
            bottom: { style: "SOLID", color: COLORS.bordeSutil },
            left: { style: "SOLID", color: COLORS.bordeSutil },
            right: { style: "SOLID", color: COLORS.bordeSutil }
          }
        }
      },
      fields:
        "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,borders)"
    }
  };
}

// ============================================================================
// PARSEAR RANGO A1
// ============================================================================
function parseA1Range(range) {
  const match = range.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
  if (!match) {
    throw new Error(`Rango inválido: ${range}`);
  }

  const [, startCol, startRow, endCol, endRow] = match;
  return {
    startRowIndex: parseInt(startRow) - 1,
    endRowIndex: parseInt(endRow),
    startColumnIndex: columnLetterToIndex(startCol),
    endColumnIndex: columnLetterToIndex(endCol) + 1
  };
}

// ============================================================================
// CONVERTIR LETRA DE COLUMNA A ÍNDICE
// ============================================================================
function columnLetterToIndex(letter) {
  let index = 0;
  for (let i = 0; i < letter.length; i++) {
    index = index * 26 + (letter.charCodeAt(i) - 64);
  }
  return index - 1;
}

// ============================================================================
// RELLENAR HOJAS CON DATOS INICIALES
// ============================================================================
async function populateSheets(spreadsheetId, sheetIds) {
  // Configuración
  await writeDataWithFormat(spreadsheetId, "Configuración", "A1:B4", [
    ["CONFIGURACIÓN", ""],
    ["Mes actual", "Agosto"],
    ["Año", "2026"],
    ["Empresa", "Bedrock Abogados"]
  ]);

  // Diario de Ingresos
  await writeDataWithFormat(
    spreadsheetId,
    "Diario de Ingresos",
    "A1:E1",
    [["Fecha", "Descripción", "Categoría", "Monto", "Comprobante"]]
  );

  const incomeData = [
    ["2026-08-01", "Honorarios consultoría 001", "Operacionales", 1200000, "Drive/Fact-001"],
    ["2026-08-02", "Consulta legal empresa A", "Operacionales", 850000, "Drive/Fact-002"],
    ["2026-08-04", "Asesoría preventiva", "Operacionales", 950000, "Drive/Fact-003"],
    ["2026-08-05", "Litigios retenciones internacionales", "Operacionales", 2100000, "Drive/Fact-004"],
    ["2026-08-06", "Honorarios reunión junta", "Operacionales", 600000, "Drive/Fact-005"],
    ["2026-08-08", "Recurso de amparo empresa B", "Operacionales", 1500000, "Drive/Fact-006"],
    ["2026-08-09", "División de patrimonios", "Operacionales", 1800000, "Drive/Fact-007"],
    ["2026-08-10", "Asesoría tributaria", "Operacionales", 1100000, "Drive/Fact-008"],
    ["2026-08-12", "Dictamen legal exportación", "Operacionales", 900000, "Drive/Fact-009"],
    ["2026-08-14", "Revisoría de contratos", "Operacionales", 750000, "Drive/Fact-010"],
    ["2026-08-15", "Intereses por mora pagada", "No operacionales", 450000, "Drive/Doc-001"],
    ["2026-08-18", "Asesoría laboral empresa C", "Operacionales", 1300000, "Drive/Fact-011"],
    ["2026-08-20", "Recurso de nulidad", "Operacionales", 1600000, "Drive/Fact-012"],
    ["2026-08-22", "Venta de publicaciones", "Otros ingresos", 200000, "Drive/Doc-002"],
    ["2026-08-25", "Asesoría ambiental", "Operacionales", 950000, "Drive/Fact-013"]
  ];

  await writeDataWithFormat(
    spreadsheetId,
    "Diario de Ingresos",
    "A2",
    incomeData
  );

  // Diario de Gastos
  await writeDataWithFormat(
    spreadsheetId,
    "Diario de Gastos",
    "A1:F1",
    [["Fecha", "Descripción", "Categoría", "Monto", "% del total", "Comprobante"]]
  );

  const expenseData = [
    ["2026-08-01", "Nómina abogados", "Nómina", 2500000, 0.06665167418, "Drive/Fact-G001"],
    ["2026-08-02", "Servicios de ofimática", "Operacionales", 180000, 0.06665311577, "Drive/Fact-G002"],
    ["2026-08-03", "Pago proveedores legales", "Proveedores", 350000, 0.06665599894, "Drive/Fact-G003"],
    ["2026-08-04", "Arriendo oficina", "Operacionales", 800000, 0.06665744052, "Drive/Fact-G004"],
    ["2026-08-05", "Servicios internet/teléfono", "Operacionales", 120000, 0.06665888211, "Drive/Fact-G005"],
    ["2026-08-06", "Impuesto sobre la renta", "Impuestos", 600000, 0.06666176528, "Drive/Doc-G001"],
    ["2026-08-07", "Seguro responsabilidad civil", "Operacionales", 250000, 0.06666320686, "Drive/Fact-G006"],
    ["2026-08-08", "Mantenimiento sistemas", "Operacionales", 180000, 0.06666464845, "Drive/Fact-G007"],
    ["2026-08-09", "Depreciación equipos", "Otros gastos", 150000, 0.06666753162, "Drive/Doc-G002"],
    ["2026-08-10", "Materiales de oficina", "Operacionales", 85000, 0.06667041479, "Drive/Fact-G008"],
    ["2026-08-11", "Gastos de viaje", "Operacionales", 220000, 0.06667185637, "Drive/Fact-G009"],
    ["2026-08-12", "IVA causado por pagar", "Impuestos", 400000, 0.06667618113, "Drive/Doc-G003"],
    ["2026-08-13", "Servicio de contable", "Proveedores", 280000, 0.0666790643, "Drive/Fact-G010"],
    ["2026-08-14", "Capacitación personal", "Operacionales", 320000, 0.06668194747, "Drive/Fact-G011"],
    ["2026-08-15", "Pago salarios jurídicos", "Nómina", 2200000, 0.06668627222, "Drive/Fact-G012"]
  ];

  await writeDataWithFormat(
    spreadsheetId,
    "Diario de Gastos",
    "A2",
    expenseData
  );

  // Balance General
  const balanceData = [
    ["BALANCE GENERAL - 31 AGOSTO 2026", ""],
    ["", ""],
    ["ACTIVOS", "Valor"],
    ["Caja", 3500000],
    ["Bancos", 8200000],
    ["Cartera clientes", 12300000],
    ["Subtotal Circulantes", 25250000],
    ["", ""],
    ["Equipos de cómputo", 4200000],
    ["Muebles y enseres", 2100000],
    ["Vehículos", 8500000],
    ["Subtotal Fijos", 13600000],
    ["", ""],
    ["TOTAL ACTIVOS", 39350000],
    ["", ""],
    ["PASIVOS", "Valor"],
    ["Cuentas por pagar", 5200000],
    ["Deuda corto plazo", 3500000],
    ["Deuda largo plazo", 12000000],
    ["TOTAL PASIVOS", 16000000],
    ["", ""],
    ["PATRIMONIO", "Valor"],
    ["Capital social", 50000000],
    ["Utilidad neta", 2750000],
    ["TOTAL PATRIMONIO", 78000000]
  ];

  await writeDataWithFormat(spreadsheetId, "Balance General", "A1:B25", balanceData);
}

// ============================================================================
// APLICAR ESTILOS A HOJAS
// ============================================================================
async function applyStyles(spreadsheetId, sheetIds) {
  const requests = [];

  // CONFIGURACIÓN
  requests.push(generateHeaderFormatRequest(
    sheetIds["Configuración"],
    "A1:B1",
    COLORS.azulCorporativo,
    COLORS.blanco
  ));

  // DIARIO DE INGRESOS
  requests.push(generateHeaderFormatRequest(
    sheetIds["Diario de Ingresos"],
    "A1:E1",
    COLORS.azulCorporativo,
    COLORS.blanco
  ));

  // DIARIO DE GASTOS
  requests.push(generateHeaderFormatRequest(
    sheetIds["Diario de Gastos"],
    "A1:F1",
    COLORS.azulCorporativo,
    COLORS.blanco
  ));

  // BALANCE GENERAL
  requests.push(generateHeaderFormatRequest(
    sheetIds["Balance General"],
    "A1:B1",
    COLORS.azulCorporativo,
    COLORS.blanco
  ));

  // Aplicar todos los requests
  if (requests.length > 0) {
    await applyFormats(spreadsheetId, requests);
  }
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================
async function main() {
  const spreadsheetId = process.argv[2];

  if (!spreadsheetId) {
    console.error("❌ Uso: node format-bedrock-sheets.js <spreadsheet-id>");
    process.exit(1);
  }

  try {
    console.log("Inicializando cliente de Google Sheets...");
    sheetsClient = await initSheetsClient();

    console.log("Obteniendo información del spreadsheet...");
    const metadata = await getSpreadsheetInfo(spreadsheetId);
    console.log("✓ Spreadsheet encontrado:", metadata.properties.title);

    const requiredSheets = [
      "Configuración",
      "Dashboard",
      "Diario de Ingresos",
      "Diario de Gastos",
      "Balance General",
      "Estado de Resultados",
      "Flujo de Caja",
      "KPIs y Análisis"
    ];

    // Obtener IDs de hojas existentes
    let sheetIds = getSheetIds(metadata);

    // Crear hojas faltantes
    const existingSheets = Object.keys(sheetIds);
    const missingSheets = requiredSheets.filter(
      (name) => !existingSheets.includes(name)
    );

    if (missingSheets.length > 0) {
      console.log("Creando hojas faltantes:", missingSheets.join(", "));
      const newSheets = await createSheets(spreadsheetId, missingSheets);
      newSheets.forEach((sheet) => {
        sheetIds[sheet.name] = sheet.id;
      });
      console.log("✓ Hojas creadas");
    }

    console.log("Poblando hojas con datos iniciales...");
    await populateSheets(spreadsheetId, sheetIds);
    console.log("✓ Datos poblados");

    console.log("Aplicando estilos y formatos...");
    await applyStyles(spreadsheetId, sheetIds);
    console.log("✓ Estilos aplicados");

    console.log("\n✅ Formateador completado exitosamente");
    console.log(`Abre tu Sheet en: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
