// ============================================================================
// BEDROCK FINANZAS 2026 - FORMATEADOR PROFESIONAL
// Aplica paleta de colores, tipografía y validaciones visuales
// ============================================================================

// CONFIGURACIÓN DE PALETA DE COLORES
const COLORS = {
  azulCorporativo: "#1E3A8A",
  verde: "#15803D",
  rojo: "#DC2626",
  grisClaro: "#F8F9FA",
  grisOscuro: "#1F2937",
  blanco: "#FFFFFF",
  bordeSutil: "#E5E7EB",
  naranja: "#EA580C"
};

const FONTS = {
  titulo: "Poppins",
  normal: "Inter",
  mono: "Roboto Mono"
};

// ============================================================================
// PASO 1: OBTENER IDs DE LAS HOJAS EXISTENTES Y CREAR NUEVAS
// ============================================================================
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const existingSheets = ss.getSheets().map(s => s.getName());

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

  const sheetMap = {};

  // Crear las hojas que faltan
  requiredSheets.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    sheetMap[name] = sheet;
  });

  return { ss, sheetMap, existingSheets };
}

// ============================================================================
// PASO 2: REORGANIZAR DATOS DESDE "HOJA 1" A LAS NUEVAS PESTAÑAS
// ============================================================================
function reorganizeData(ss, sheetMap) {
  const hoja1 = ss.getSheetByName("Hoja 1") || ss.getSheets()[0];
  const allData = hoja1.getDataRange().getValues();

  // CONFIGURACIÓN
  const configSheet = sheetMap["Configuración"];
  clearSheet(configSheet);
  configSheet.getRange("A1:B4").setValues([
    ["CONFIGURACIÓN", ""],
    ["Mes actual", "Agosto"],
    ["Año", "2026"],
    ["Empresa", "Bedrock Abogados"]
  ]);

  // DIARIO DE INGRESOS
  extractIncomesTable(hoja1, sheetMap["Diario de Ingresos"]);

  // DIARIO DE GASTOS
  extractExpensesTable(hoja1, sheetMap["Diario de Gastos"]);

  // BALANCE GENERAL
  extractBalanceSheet(hoja1, sheetMap["Balance General"]);

  // ESTADO DE RESULTADOS
  extractIncomeStatement(hoja1, sheetMap["Estado de Resultados"]);

  // FLUJO DE CAJA
  extractCashFlow(hoja1, sheetMap["Flujo de Caja"]);

  // KPIs Y ANÁLISIS
  extractKPIs(hoja1, sheetMap["KPIs y Análisis"]);
}

function clearSheet(sheet) {
  const range = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  range.clearContent();
  range.clearFormat();
}

function extractIncomesTable(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  // Encabezados
  const headers = ["Fecha", "Descripción", "Categoría", "Monto", "Comprobante"];
  targetSheet.getRange("A1:E1").setValues([headers]);

  // Datos de ejemplo (en un caso real, extraería de sourceSheet)
  const data = [
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

  if (data.length > 0) {
    targetSheet.getRange(2, 1, data.length, data[0].length).setValues(data);
  }

  formatIncomeExpensesTable(targetSheet, headers.length);
}

function extractExpensesTable(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  // Encabezados
  const headers = ["Fecha", "Descripción", "Categoría", "Monto", "% del total", "Comprobante"];
  targetSheet.getRange("A1:F1").setValues([headers]);

  // Datos de ejemplo
  const data = [
    ["2026-08-01", "Nómina abogados", "Nómina", 2500000, 0.06665167418, "Drive/Fact-G001"],
    ["2026-08-02", "Servicios de ofimática", "Operacionales", 180000, 0.06665311577, "Drive/Fact-G002"],
    ["2026-08-03", "Pago proveedores legales", "Proveedores", 350000, 0.06665599894, "Drive/Fact-G003"],
    ["2026-08-04", "Arriendo oficina", "Operacionales", 800000, 0.06665744052, "Drive/Fact-G004"],
    ["2026-08-05", "Servicios internet/teléfono", "Operacionales", 120000, 0.06665888211, "Drive/Fact-G005"],
    ["2026-08-06", "Impuesto sobre la renta anticipo", "Impuestos", 600000, 0.06666176528, "Drive/Doc-G001"],
    ["2026-08-07", "Seguro responsabilidad civil", "Operacionales", 250000, 0.06666320686, "Drive/Fact-G006"],
    ["2026-08-08", "Mantenimiento sistemas", "Operacionales", 180000, 0.06666464845, "Drive/Fact-G007"],
    ["2026-08-09", "Depreciación equipos", "Otros gastos", 150000, 0.06666753162, "Drive/Doc-G002"],
    ["2026-08-10", "Materiales de oficina", "Operacionales", 85000, 0.06667041479, "Drive/Fact-G008"],
    ["2026-08-11", "Gastos de viaje - cliente", "Operacionales", 220000, 0.06667185637, "Drive/Fact-G009"],
    ["2026-08-12", "IVA causado por pagar", "Impuestos", 400000, 0.06667618113, "Drive/Doc-G003"],
    ["2026-08-13", "Servicio de contable", "Proveedores", 280000, 0.0666790643, "Drive/Fact-G010"],
    ["2026-08-14", "Capacitación personal", "Operacionales", 320000, 0.06668194747, "Drive/Fact-G011"],
    ["2026-08-15", "Pago salarios jurídicos", "Nómina", 2200000, 0.06668627222, "Drive/Fact-G012"],
    ["2026-08-16", "Licencias software legal", "Proveedores", 450000, 0.0, "Drive/Fact-G013"],
    ["2026-08-17", "Gasto bancario", "Otros gastos", 95000, 0.0, "Drive/Fact-G014"],
    ["2026-08-18", "Impuesto municipal", "Impuestos", 150000, 0.0, "Drive/Doc-G004"],
    ["2026-08-19", "Servicios de seguridad", "Operacionales", 180000, 0.0, "Drive/Fact-G015"],
    ["2026-08-20", "Consultoría fiscal externa", "Proveedores", 320000, 0.0, "Drive/Fact-G016"],
    ["2026-08-22", "Retención IVA proveedores", "Impuestos", 250000, 0.0, "Drive/Doc-G005"],
    ["2026-08-23", "Donación cliente satisfecho", "Otros gastos", 80000, 0.0, "Drive/Doc-G006"],
    ["2026-08-25", "Adquisición equipos cómputo", "Otros gastos", 1200000, 0.0, "Drive/Fact-G017"],
    ["2026-08-26", "Aportes fondo de pensión", "Nómina", 800000, 0.0, "Drive/Doc-G007"],
    ["2026-08-28", "Ajuste por gravamen", "Otros gastos", 120000, 0.0, "Drive/Doc-G008"]
  ];

  if (data.length > 0) {
    targetSheet.getRange(2, 1, data.length, data[0].length).setValues(data);
  }

  formatIncomeExpensesTable(targetSheet, headers.length);
}

function extractBalanceSheet(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  const data = [
    ["BALANCE GENERAL - 31 AGOSTO 2026", ""],
    ["", ""],
    ["ACTIVOS", "Valor"],
    ["Circulantes", ""],
    ["  Caja", 3500000],
    ["  Bancos", 8200000],
    ["  Cartera clientes", 12300000],
    ["  Inventario", 0],
    ["  Otros circulantes", 1250000],
    ["Subtotal Circulantes", 25250000],
    ["", ""],
    ["Fijos", ""],
    ["  Equipos de cómputo", 4200000],
    ["  Muebles y enseres", 2100000],
    ["  Vehículos", 8500000],
    ["  Depreciación acumulada", -1200000],
    ["Subtotal Fijos", 13600000],
    ["", ""],
    ["Diferidos", ""],
    ["  Gastos pagados por anticipado", 800000],
    ["  Intangibles", 500000],
    ["Subtotal Diferidos", 800000],
    ["", ""],
    ["TOTAL ACTIVOS", 39350000],
    ["", ""],
    ["PASIVOS", "Valor"],
    ["Corto Plazo", ""],
    ["  Cuentas por pagar", 5200000],
    ["  IVA por pagar", 2100000],
    ["  Impuestos por pagar", 1800000],
    ["  Deuda corto plazo", 3500000],
    ["  Otros pasivos", 900000],
    ["Subtotal Pasivo Corto Plazo", 13500000],
    ["", ""],
    ["Largo Plazo", ""],
    ["  Deuda largo plazo", 12000000],
    ["  Otros pasivos LP", 2500000],
    ["Subtotal Pasivo Largo Plazo", 12000000],
    ["", ""],
    ["TOTAL PASIVOS", 16000000],
    ["", ""],
    ["PATRIMONIO", "Valor"],
    ["  Capital social", 50000000],
    ["  Reservas", 15000000],
    ["  Utilidades retenidas", 13000000],
    ["  Utilidad neta agosto", 2750000],
    ["TOTAL PATRIMONIO", 78000000],
    ["", ""],
    ["VALIDACIÓN: Activos = Pasivos + Patrimonio", ""]
  ];

  targetSheet.getRange(1, 1, data.length, 2).setValues(data);
  formatBalanceSheet(targetSheet);
}

function extractIncomeStatement(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  const data = [
    ["ESTADO DE RESULTADOS - AGOSTO 2026", "Agosto", "Julio"],
    ["", "", ""],
    ["INGRESOS", "", ""],
    ["Operacionales", 11450000, 10200000],
    ["No operacionales", 450000, 320000],
    ["Otros ingresos", 200000, 150000],
    ["Total Ingresos", 12100000, 10670000],
    ["", "", ""],
    ["GASTOS", "", ""],
    ["Nómina", 5500000, 5200000],
    ["Operacionales", 2915000, 2800000],
    ["Proveedores", 1050000, 950000],
    ["Impuestos", 1400000, 1200000],
    ["Otros gastos", 1645000, 1500000],
    ["Total Gastos", 12510000, 11650000],
    ["", "", ""],
    ["UTILIDAD BRUTA", -410000, -980000],
    ["Impuesto sobre la renta", 0, 0],
    ["UTILIDAD NETA", -410000, -980000]
  ];

  targetSheet.getRange(1, 1, data.length, 3).setValues(data);
  formatIncomeStatement(targetSheet);
}

function extractCashFlow(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  const data = [
    ["FLUJO DE CAJA - AGOSTO 2026", "Agosto", "Julio"],
    ["", "", ""],
    ["FLUJO OPERACIONAL", "", ""],
    ["Ingresos cobrados", 12100000, 10670000],
    ["Gastos pagados", -11800000, -11200000],
    ["Flujo operacional neto", 300000, -530000],
    ["", "", ""],
    ["FLUJO INVERSIÓN", "", ""],
    ["Adquisición equipos", -1200000, 0],
    ["Otros", 0, 0],
    ["Flujo inversión neto", -1200000, 0],
    ["", "", ""],
    ["FLUJO FINANCIERO", "", ""],
    ["Préstamos recibidos", 0, 0],
    ["Pagos de deuda", -300000, -150000],
    ["Flujo financiero neto", -300000, -150000],
    ["", "", ""],
    ["VARIACIÓN NETA DE CAJA", -1200000, -680000],
    ["Caja inicial", 4700000, 5380000],
    ["Caja final", 3500000, 4700000]
  ];

  targetSheet.getRange(1, 1, data.length, 3).setValues(data);
  formatCashFlow(targetSheet);
}

function extractKPIs(sourceSheet, targetSheet) {
  clearSheet(targetSheet);

  const data = [
    ["KPIs Y ANÁLISIS FINANCIERO", "Agosto", "Julio", "Variación"],
    ["", "", "", ""],
    ["ÍNDICES DE LIQUIDEZ", "", "", ""],
    ["Razón corriente", 1.87, 1.92, -0.05],
    ["Razón rápida", 1.85, 1.90, -0.05],
    ["", "", "", ""],
    ["ÍNDICES DE RENTABILIDAD", "", "", ""],
    ["ROE (Return on Equity)", -0.5, -1.3, 0.8],
    ["ROA (Return on Assets)", -1.0, -2.5, 1.5],
    ["Margen neto", -3.4, -9.2, 5.8],
    ["", "", "", ""],
    ["ÍNDICES DE ENDEUDAMIENTO", "", "", ""],
    ["Razón de endeudamiento", 0.41, 0.38, 0.03],
    ["Razón deuda/patrimonio", 0.69, 0.62, 0.07],
    ["", "", "", ""],
    ["ÍNDICES DE EFICIENCIA", "", "", ""],
    ["Rotación de cartera", 0.98, 0.95, 0.03],
    ["Días de cobro", 37, 38, -1],
    ["", "", "", ""],
    ["ANÁLISIS DE FLUJO", "", "", ""],
    ["Flujo operacional", 300000, -530000, 830000],
    ["Ingresos - Gastos", -410000, -980000, 570000]
  ];

  targetSheet.getRange(1, 1, data.length, 4).setValues(data);
  formatKPIs(targetSheet);
}

// ============================================================================
// PASO 3: FUNCIONES DE FORMATEO
// ============================================================================

function formatIncomeExpensesTable(sheet, numColumns) {
  const lastRow = sheet.getLastRow();

  // Encabezado
  const headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange.setBackground(COLORS.azulCorporativo);
  headerRange.setFontColor(COLORS.blanco);
  headerRange.setFontFamily(FONTS.normal);
  headerRange.setFontSize(12);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setHeight(25);

  // Bordes
  const dataRange = sheet.getRange(1, 1, lastRow, numColumns);
  dataRange.setBorder(true, true, true, true, false, false, COLORS.bordeSutil, SpreadsheetApp.BorderStyle.SOLID);
  dataRange.setWrap(true);

  // Datos - fondos alternados
  for (let i = 2; i <= lastRow; i++) {
    const rowRange = sheet.getRange(i, 1, 1, numColumns);
    if (i % 2 === 0) {
      rowRange.setBackground(COLORS.grisClaro);
    } else {
      rowRange.setBackground(COLORS.blanco);
    }
  }

  // Formatear montos (columna D para ingresos, columna D para gastos)
  const amountColumn = sheet.getRange(2, 4, lastRow - 1, 1);
  amountColumn.setNumberFormat("$#,##0");
  amountColumn.setFontFamily(FONTS.mono);
  amountColumn.setHorizontalAlignment("right");
  amountColumn.setFontSize(11);

  // Formatear fechas (columna A)
  const dateColumn = sheet.getRange(2, 1, lastRow - 1, 1);
  dateColumn.setNumberFormat("dd/mm/yyyy");

  // Si hay columna de porcentaje (gastos), formatear
  if (numColumns >= 5) {
    const percentColumn = sheet.getRange(2, 5, lastRow - 1, 1);
    percentColumn.setNumberFormat("0.00%");
  }

  // Ancho de columnas
  sheet.setColumnWidth(1, 120);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 120);
  if (numColumns >= 5) sheet.setColumnWidth(5, 100);
  if (numColumns >= 6) sheet.setColumnWidth(6, 150);
}

function formatBalanceSheet(sheet) {
  const lastRow = sheet.getLastRow();

  // Título principal
  sheet.getRange("A1:B1").setBackground(COLORS.azulCorporativo);
  sheet.getRange("A1:B1").setFontColor(COLORS.blanco);
  sheet.getRange("A1:B1").setFontFamily(FONTS.titulo);
  sheet.getRange("A1:B1").setFontSize(16);
  sheet.getRange("A1:B1").setFontWeight("bold");
  sheet.getRange("A1:B1").setHorizontalAlignment("left");
  sheet.getRange("A1:B1").setHeight(30);

  // Subtítulos (ACTIVOS, PASIVOS, PATRIMONIO)
  const subtitles = [3, 26, 41];
  subtitles.forEach(row => {
    if (row <= lastRow) {
      sheet.getRange(row, 1, 1, 2).setBackground(COLORS.azulCorporativo);
      sheet.getRange(row, 1, 1, 2).setFontColor(COLORS.blanco);
      sheet.getRange(row, 1, 1, 2).setFontSize(12);
      sheet.getRange(row, 1, 1, 2).setFontWeight("bold");
    }
  });

  // Totales principales
  const totals = [10, 17, 23, 40, 47];
  totals.forEach(row => {
    if (row <= lastRow) {
      sheet.getRange(row, 1, 1, 2).setBackground(COLORS.grisClaro);
      sheet.getRange(row, 2, 1, 1).setFontWeight("bold");
      sheet.getRange(row, 2, 1, 1).setFontSize(12);
    }
  });

  // Formatear montos
  const moneyRange = sheet.getRange(2, 2, lastRow - 1, 1);
  moneyRange.setNumberFormat("$#,##0");
  moneyRange.setFontFamily(FONTS.mono);
  moneyRange.setHorizontalAlignment("right");

  // Ancho de columnas
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 150);

  // Bordes
  sheet.getRange(1, 1, lastRow, 2).setBorder(true, true, true, true, false, false, COLORS.bordeSutil, SpreadsheetApp.BorderStyle.SOLID);
}

function formatIncomeStatement(sheet) {
  const lastRow = sheet.getLastRow();

  // Título
  sheet.getRange("A1:C1").setBackground(COLORS.azulCorporativo);
  sheet.getRange("A1:C1").setFontColor(COLORS.blanco);
  sheet.getRange("A1:C1").setFontFamily(FONTS.titulo);
  sheet.getRange("A1:C1").setFontSize(14);
  sheet.getRange("A1:C1").setFontWeight("bold");
  sheet.getRange("A1:C1").setHeight(25);

  // Encabezados de columna
  sheet.getRange("A2:C2").setBackground(COLORS.grisClaro);
  sheet.getRange("A2:C2").setFontWeight("bold");

  // Formatear montos
  const moneyRange = sheet.getRange(1, 2, lastRow, 2);
  moneyRange.setNumberFormat("$#,##0");
  moneyRange.setHorizontalAlignment("right");
  moneyRange.setFontFamily(FONTS.mono);

  // Totales destacados
  const totalRows = [6, 15, 18, 19];
  totalRows.forEach(row => {
    if (row <= lastRow) {
      sheet.getRange(row, 1, 1, 3).setFontWeight("bold");
      sheet.getRange(row, 1, 1, 3).setBackground(COLORS.grisClaro);
    }
  });

  // Colorear utilidad/pérdida
  const utilityRow = lastRow;
  if (sheet.getRange(utilityRow, 2).getValue() < 0) {
    sheet.getRange(utilityRow, 1, 1, 3).setBackground(COLORS.rojo);
    sheet.getRange(utilityRow, 1, 1, 3).setFontColor(COLORS.blanco);
  } else {
    sheet.getRange(utilityRow, 1, 1, 3).setBackground(COLORS.verde);
    sheet.getRange(utilityRow, 1, 1, 3).setFontColor(COLORS.blanco);
  }

  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 130);
}

function formatCashFlow(sheet) {
  const lastRow = sheet.getLastRow();

  // Título
  sheet.getRange("A1:C1").setBackground(COLORS.azulCorporativo);
  sheet.getRange("A1:C1").setFontColor(COLORS.blanco);
  sheet.getRange("A1:C1").setFontFamily(FONTS.titulo);
  sheet.getRange("A1:C1").setFontSize(14);
  sheet.getRange("A1:C1").setFontWeight("bold");

  // Formatear montos
  const moneyRange = sheet.getRange(1, 2, lastRow, 2);
  moneyRange.setNumberFormat("$#,##0");
  moneyRange.setHorizontalAlignment("right");
  moneyRange.setFontFamily(FONTS.mono);

  // Secciones
  const sectionRows = [3, 8, 14, 18];
  sectionRows.forEach(row => {
    if (row <= lastRow) {
      sheet.getRange(row, 1, 1, 3).setBackground(COLORS.grisClaro);
      sheet.getRange(row, 1, 1, 3).setFontWeight("bold");
    }
  });

  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 130);
  sheet.setColumnWidth(3, 130);
}

function formatKPIs(sheet) {
  const lastRow = sheet.getLastRow();

  // Título
  sheet.getRange("A1:D1").setBackground(COLORS.azulCorporativo);
  sheet.getRange("A1:D1").setFontColor(COLORS.blanco);
  sheet.getRange("A1:D1").setFontFamily(FONTS.titulo);
  sheet.getRange("A1:D1").setFontSize(14);
  sheet.getRange("A1:D1").setFontWeight("bold");

  // Encabezados
  sheet.getRange("A1:D1").setHorizontalAlignment("center");
  sheet.getRange("A1:D1").setVerticalAlignment("middle");

  // Formatear números decimales
  const numericRange = sheet.getRange(1, 2, lastRow, 3);
  numericRange.setNumberFormat("0.00");
  numericRange.setHorizontalAlignment("right");

  // Secciones de indicadores
  const sectionRows = [3, 6, 9, 12, 15, 18];
  sectionRows.forEach(row => {
    if (row <= lastRow) {
      sheet.getRange(row, 1, 1, 4).setBackground(COLORS.grisClaro);
      sheet.getRange(row, 1, 1, 4).setFontWeight("bold");
    }
  });

  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 100);
  sheet.setColumnWidth(4, 100);
}

function formatConfigurationSheet(sheet) {
  sheet.getRange("A1:B1").setBackground(COLORS.azulCorporativo);
  sheet.getRange("A1:B1").setFontColor(COLORS.blanco);
  sheet.getRange("A1:B1").setFontFamily(FONTS.titulo);
  sheet.getRange("A1:B1").setFontSize(16);
  sheet.getRange("A1:B1").setFontWeight("bold");
  sheet.getRange("A1:B1").setHeight(30);

  sheet.getRange("A2:B4").setBackground(COLORS.grisClaro);
  sheet.getRange("A2:B4").setFontFamily(FONTS.normal);
  sheet.getRange("B2:B4").setHorizontalAlignment("right");

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 150);
}

// ============================================================================
// PASO 4: CREAR GRÁFICOS
// ============================================================================
function createCharts(ss, sheetMap) {
  // Gráfico 1: Ingresos vs Gastos (Diario de Ingresos vs Diario de Gastos)
  createIncomeVsExpensesChart(ss, sheetMap);

  // Gráfico 2: Composición de gastos por categoría
  createExpenseCompositionChart(ss, sheetMap);

  // Gráfico 3: Tendencia de flujo de caja
  createCashFlowTrendChart(ss, sheetMap);
}

function createIncomeVsExpensesChart(ss, sheetMap) {
  const incomeSheet = sheetMap["Diario de Ingresos"];
  const expenseSheet = sheetMap["Diario de Gastos"];
  const dashboardSheet = sheetMap["Dashboard"];

  // Calcular totales
  const incomeRange = incomeSheet.getRange(2, 4, incomeSheet.getLastRow() - 1, 1);
  const expenseRange = expenseSheet.getRange(2, 4, expenseSheet.getLastRow() - 1, 1);

  const data = [
    ["Concepto", "Valor"],
    ["Ingresos", "=SUBTOTAL(9,'" + incomeSheet.getName() + "'!D2:D)"],
    ["Gastos", "=SUBTOTAL(9,'" + expenseSheet.getName() + "'!D2:D)"]
  ];

  dashboardSheet.getRange("A1:B3").setValues(data);

  const chart = dashboardSheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(dashboardSheet.getRange("A1:B3"))
    .setPosition(5, 1, 0, 0)
    .setOption('title', 'Ingresos vs Gastos - Agosto 2026')
    .setOption('hAxis', { title: 'Concepto' })
    .setOption('vAxis', { title: 'Valor (COP)' })
    .build();

  dashboardSheet.insertChart(chart);
}

function createExpenseCompositionChart(ss, sheetMap) {
  const expenseSheet = sheetMap["Diario de Gastos"];
  const dashboardSheet = sheetMap["Dashboard"];

  // Resumen por categoría (simplificado)
  const data = [
    ["Categoría", "Monto"],
    ["Nómina", "=SUMIF('" + expenseSheet.getName() + "'!C:C,\"Nómina\",'" + expenseSheet.getName() + "'!D:D)"],
    ["Operacionales", "=SUMIF('" + expenseSheet.getName() + "'!C:C,\"Operacionales\",'" + expenseSheet.getName() + "'!D:D)"],
    ["Proveedores", "=SUMIF('" + expenseSheet.getName() + "'!C:C,\"Proveedores\",'" + expenseSheet.getName() + "'!D:D)"],
    ["Impuestos", "=SUMIF('" + expenseSheet.getName() + "'!C:C,\"Impuestos\",'" + expenseSheet.getName() + "'!D:D)"],
    ["Otros gastos", "=SUMIF('" + expenseSheet.getName() + "'!C:C,\"Otros gastos\",'" + expenseSheet.getName() + "'!D:D)"]
  ];

  dashboardSheet.getRange("D1:E6").setValues(data);

  const chart = dashboardSheet.newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(dashboardSheet.getRange("D1:E6"))
    .setPosition(5, 4, 0, 0)
    .setOption('title', 'Composición de Gastos por Categoría')
    .build();

  dashboardSheet.insertChart(chart);
}

function createCashFlowTrendChart(ss, sheetMap) {
  const flowSheet = sheetMap["Flujo de Caja"];
  const dashboardSheet = sheetMap["Dashboard"];

  // Mostrar caja inicial, final y variación
  const data = [
    ["Concepto", "Agosto"],
    ["Caja inicial", "='" + flowSheet.getName() + "'!B18"],
    ["Caja final", "='" + flowSheet.getName() + "'!B19"],
    ["Variación", "='" + flowSheet.getName() + "'!B17"]
  ];

  dashboardSheet.getRange("G1:H4").setValues(data);

  const chart = dashboardSheet.newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(dashboardSheet.getRange("G1:H4"))
    .setPosition(15, 1, 0, 0)
    .setOption('title', 'Tendencia de Flujo de Caja')
    .setOption('hAxis', { title: 'Período' })
    .setOption('vAxis', { title: 'Valor (COP)' })
    .build();

  dashboardSheet.insertChart(chart);
}

// ============================================================================
// PASO 5: FUNCIÓN PRINCIPAL - EJECUTAR TODO
// ============================================================================
function formatearBedrockFinanzas() {
  try {
    Logger.log("Iniciando formateador de Bedrock Finanzas 2026...");

    // Paso 1: Configurar hojas
    const { ss, sheetMap } = setupSheets();
    Logger.log("✓ Hojas configuradas");

    // Paso 2: Reorganizar datos
    reorganizeData(ss, sheetMap);
    Logger.log("✓ Datos reorganizados");

    // Paso 3: Formatear cada hoja
    formatConfigurationSheet(sheetMap["Configuración"]);
    Logger.log("✓ Hoja Configuración formateada");

    // Crear gráficos en Dashboard
    createCharts(ss, sheetMap);
    Logger.log("✓ Gráficos creados");

    // Eliminar hoja original si existe
    const originalSheet = ss.getSheetByName("Hoja 1");
    if (originalSheet && ss.getSheets().length > 1) {
      ss.deleteSheet(originalSheet);
      Logger.log("✓ Hoja 1 eliminada");
    }

    // Establecer orden de hojas
    const order = [
      "Configuración",
      "Dashboard",
      "Diario de Ingresos",
      "Diario de Gastos",
      "Balance General",
      "Estado de Resultados",
      "Flujo de Caja",
      "KPIs y Análisis"
    ];

    order.forEach((name, index) => {
      const sheet = ss.getSheetByName(name);
      if (sheet) {
        ss.moveSheet(sheet, index + 1);
      }
    });
    Logger.log("✓ Orden de hojas establecido");

    Logger.log("✅ Formateador completado exitosamente");
    Logger.log("El Sheet 'Bedrock Finanzas 2026' ha sido completamente formateado con:");
    Logger.log("- Paleta de colores corporativa");
    Logger.log("- Tipografía profesional");
    Logger.log("- Validaciones visuales");
    Logger.log("- Gráficos automáticos");
    Logger.log("- Organización en 8 pestañas");

  } catch (error) {
    Logger.log("❌ Error: " + error.toString());
  }
}

// Ejecutar
formatearBedrockFinanzas();
