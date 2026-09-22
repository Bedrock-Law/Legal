# 🔍 Bedrock Due Diligence MCP Server

MCP Server especializado en análisis de due diligence, verificación de antecedentes y evaluación de riesgo legal.

## Características

- **Análisis de Cap Table** - Estructura accionaria y dilución
- **Verificación de Antecedentes** - RUES, demandas, sanciones
- **Evaluación de Riesgo Legal** - Matriz de riesgos y exposición
- **Generación de Reportes** - Due diligence integral

## Herramientas Disponibles

### `analyze_cap_table`
Analiza la estructura accionaria de una empresa.

**Parámetros:**
- `company_name` (string, requerido) - Nombre de la empresa
- `shareholders_data` (array) - Datos de accionistas

**Ejemplo:**
```json
{
  "company_name": "Tech Startup SAS",
  "shareholders_data": [
    {"name": "Founder A", "shares": 500000, "type": "founder"},
    {"name": "Investor A", "shares": 200000, "type": "preferred"}
  ]
}
```

### `verify_antecedents`
Verifica antecedentes legales en registros públicos.

**Parámetros:**
- `entity_name` (string, requerido) - Nombre de la entidad
- `entity_type` (string) - Tipo: company | individual | fund

### `assess_legal_risk`
Evalúa riesgos legales de una empresa.

**Parámetros:**
- `company_name` (string, requerido)
- `industry` (string) - Industria
- `key_issues` (array) - Problemas conocidos

### `generate_dd_report`
Genera reporte integral de due diligence.

**Parámetros:**
- `company_name` (string, requerido)
- `report_type` (string) - executive_summary | full_report | risk_assessment
- `include_recommendations` (boolean) - Default: true

## 🚀 Instalación

```bash
npm install
```

## 📝 Desarrollo

```bash
npm run dev
```

## 🔨 Build

```bash
npm run build
npm start
```

## 🤖 Integración con Claude

```bash
claude mcp add --transport stdio bedrock-due-diligence \
  node /Users/juanma/Documents/Bedrock\ IA/mcp-servers/due-diligence-mcp/dist/index.js
```

## 📊 Arquitectura

- **TypeScript** - Type safety
- **MCP SDK** - Protocol implementation
- **Modular** - Fácil de extender

## 🗂️ Estructura

```
src/
├── index.ts          # Servidor principal
└── tools/            # Lógica de herramientas (futura expansión)
```

## 🔄 Próximos Pasos

- [ ] Integración con servicios de verificación (RUES)
- [ ] Base de datos de cap tables
- [ ] Generación de PDFs
- [ ] Análisis avanzado de estructuras
- [ ] Integración con IA para análisis predictivo

---

**Versión**: 1.0.0  
**Estado**: 🔨 En desarrollo  
**Última actualización**: 2025-08-25
