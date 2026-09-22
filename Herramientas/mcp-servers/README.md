# 🤖 MCP Servers - Integración Claude

Servidores MCP (Model Context Protocol) que exponen las capacidades de Bedrock Abogados directamente en Claude.

## Servidores Activos

### due-diligence-mcp
Análisis automatizado de due diligence, verificación de antecedentes y análisis de riesgo.

**Herramientas:**
- `analyze_cap_table` - Análisis de estructura accionaria
- `verify_antecedents` - Validación de antecedentes legales
- `assess_legal_risk` - Evaluación de riesgo legal
- `generate_dd_report` - Generación de reportes de due diligence

### compliance-mcp
Validación de cumplimiento normativo y SAGRILAFT.

**Herramientas:**
- `check_sagrilaft` - Verificación SAGRILAFT
- `validate_pep_status` - Validación PEP (Personas Expuestas Públicamente)
- `assess_aml_risk` - Evaluación AML/CFT
- `generate_compliance_matrix` - Matriz de compliance

### fintech-mcp
Análisis de viabilidad regulatoria para modelos Fintech disruptivos.

**Herramientas:**
- `analyze_fintech_model` - Análisis del modelo de negocio
- `map_regulatory_gaps` - Identificación de brechas regulatorias
- `propose_legal_structure` - Propuesta de estructura legal
- `generate_regulatory_roadmap` - Hoja de ruta regulatoria

## 📦 Desarrollo

Cada servidor está en su propia carpeta con su propio `package.json` o `pyproject.toml`.

**Stack:**
- TypeScript/Node.js (preferido)
- Python (opcional)
- MCP SDK oficial

**Testing:**
```bash
npm test
```

**Deploy:**
- Local: `npm run dev`
- Remote: Docker + AWS Lambda / Cloudflare Workers

## 🔗 Integración

Agregue el servidor a Claude:
```bash
claude mcp add --transport http <nombre> <url>
```

---

**Estado**: 🔨 En desarrollo  
**Última actualización**: 2025-08-25
