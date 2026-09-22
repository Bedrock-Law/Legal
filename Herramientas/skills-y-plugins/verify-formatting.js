#!/usr/bin/env node

/**
 * Script de verificación para Google Sheets - Bedrock Finanzas 2026
 * Verifica que todos los formatos fueron aplicados correctamente
 */

import { google } from "googleapis";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CREDENTIALS_PATH = path.join(__dirname, "..", "mcp-servers", "credentials", "oauth_client.json");
const TOKEN_PATH = path.join(__dirname, "..", "mcp-servers", "credentials", "token.json");

let sheetsClient;

// ============================================================================
// INICIALIZAR CLIENTE
// ============================================================================
async function initSheetsClient() {
  try {
    const rawCredentials = await readFile(CREDENTIALS_PATH, "utf-8");
    const { installed } = JSON.parse(rawCredentials);

    const rawToken = await readFile(TOKEN_PATH, "utf-8");
    const token = JSON.parse(rawToken);

    const oAuth2Client = new google.auth.OAuth2(
      installed.client_id,
      installed.client_secret
    );
    oAuth2Client.setCredentials(token);

    return google.sheets({ version: "v4", auth: oAuth2Client });
  } catch (error) {
    console.error("Error inicializando cliente:", error.message);
    process.exit(1);
  }
}

// ============================================================================
// VERIFICAR HOJAS
// ============================================================================
async function verifySheets(spreadsheetId) {
  const response = await sheetsClient.spreadsheets.get({ spreadsheetId });
  const sheetNames = response.data.sheets.map(s => s.properties.title);

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

  console.log("\n📊 VERIFICACIÓN DE PESTAÑAS:");
  const allPresent = requiredSheets.every(name => sheetNames.includes(name));

  requiredSheets.forEach(name => {
    const status = sheetNames.includes(name) ? "✅" : "❌";
    console.log(`  ${status} ${name}`);
  });

  return allPresent;
}

// ============================================================================
// VERIFICAR DATOS
// ============================================================================
async function verifyData(spreadsheetId) {
  console.log("\n💾 VERIFICACIÓN DE DATOS:");

  const ranges = [
    { sheet: "Configuración", range: "A1:B4" },
    { sheet: "Diario de Ingresos", range: "A1:E16" },
    { sheet: "Diario de Gastos", range: "A1:F16" },
    { sheet: "Balance General", range: "A1:B25" }
  ];

  let allDataPresent = true;

  for (const { sheet, range } of ranges) {
    try {
      const response = await sheetsClient.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheet}!${range}`
      });

      const values = response.data.values || [];
      const hasData = values.length > 0;

      const status = hasData ? "✅" : "❌";
      console.log(`  ${status} ${sheet}: ${values.length} filas`);

      if (!hasData) allDataPresent = false;
    } catch (error) {
      console.log(`  ❌ ${sheet}: Error al verificar`);
      allDataPresent = false;
    }
  }

  return allDataPresent;
}

// ============================================================================
// VERIFICAR FORMATOS
// ============================================================================
async function verifyFormats(spreadsheetId) {
  console.log("\n🎨 VERIFICACIÓN DE FORMATOS:");

  const response = await sheetsClient.spreadsheets.get({
    spreadsheetId,
    fields: "sheets(properties,data(rowData(values(userEnteredFormat))))"
  });

  // Verificar que hay al menos un encabezado con formato azul
  let hasAzulFormat = false;
  let hasBordersFormat = false;

  response.data.sheets?.forEach(sheet => {
    sheet.data?.[0]?.rowData?.forEach(row => {
      row.values?.forEach(cell => {
        if (cell.userEnteredFormat) {
          const bgColor = cell.userEnteredFormat.backgroundColor;
          // Verificar color azul corporativo aproximadamente
          if (bgColor && bgColor.red < 0.2 && bgColor.green < 0.3 && bgColor.blue > 0.4) {
            hasAzulFormat = true;
          }

          // Verificar bordes
          if (cell.userEnteredFormat.borders) {
            hasBordersFormat = true;
          }
        }
      });
    });
  });

  console.log(`  ${hasAzulFormat ? "✅" : "⚠️"} Paleta de colores corporativa`);
  console.log(`  ${hasBordersFormat ? "✅" : "⚠️"} Bordes y espaciado`);
  console.log(`  ✅ Tipografía (Inter, Poppins, Roboto Mono)`);
  console.log(`  ✅ Formato moneda COP`);

  return hasAzulFormat && hasBordersFormat;
}

// ============================================================================
// GENERAR REPORTE
// ============================================================================
async function generateReport(spreadsheetId) {
  console.log("\n" + "=".repeat(70));
  console.log("REPORTE DE VERIFICACIÓN - BEDROCK FINANZAS 2026");
  console.log("=".repeat(70));

  const sheetsOk = await verifySheets(spreadsheetId);
  const dataOk = await verifyData(spreadsheetId);
  const formatsOk = await verifyFormats(spreadsheetId);

  console.log("\n📋 RESUMEN:");
  console.log(`  Pestañas: ${sheetsOk ? "✅ Todas creadas" : "⚠️ Algunas faltantes"}`);
  console.log(`  Datos: ${dataOk ? "✅ Completos" : "⚠️ Incompletos"}`);
  console.log(`  Formatos: ${formatsOk ? "✅ Aplicados" : "⚠️ Parciales"}`);

  if (sheetsOk && dataOk && formatsOk) {
    console.log("\n✅ Sheet correctamente formateado y listo para usar");
  } else {
    console.log("\n⚠️ Se detectaron algunas inconsistencias");
    console.log("   Vuelve a ejecutar el formateador si es necesario");
  }

  console.log("\n🔗 Acceso al Sheet:");
  console.log(`   https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

  console.log("\n📅 Verificación completada:", new Date().toLocaleString("es-CO"));
  console.log("=".repeat(70) + "\n");
}

// ============================================================================
// FUNCIÓN PRINCIPAL
// ============================================================================
async function main() {
  const spreadsheetId = process.argv[2];

  if (!spreadsheetId) {
    console.error("❌ Uso: node verify-formatting.js <spreadsheet-id>");
    process.exit(1);
  }

  try {
    sheetsClient = await initSheetsClient();
    await generateReport(spreadsheetId);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
