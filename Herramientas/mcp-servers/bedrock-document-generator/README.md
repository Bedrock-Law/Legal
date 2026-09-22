# 📄 Bedrock Document Generator MCP

Generador de documentos con estilo Bedrock Abogados. Crea propuestas, reportes, contratos y presentaciones automáticamente con la identidad visual corporativa.

## Características

- **Propuestas**: Comerciales, técnicas, cualquier tipo
- **Reportes**: Due diligence, compliance, fintech, auditoría
- **Contratos**: Service agreements, NDAs, inversión, empleo
- **Presentaciones**: Slides con estilo Bedrock
- **Estilos**: Aplicación automática de paleta de colores, tipografía, logo

## Herramientas Disponibles

### `generate_proposal`
Crea una propuesta comercial.

**Parámetros:**
- `company_name` (string, requerido) - Empresa cliente
- `title` (string, requerido) - Título
- `content` (string, requerido) - Contenido
- `format` (string) - docx | pdf (default: docx)

### `generate_report`
Genera un reporte legal.

**Parámetros:**
- `company_name` (string, requerido)
- `report_type` (string) - due_diligence | compliance | fintech | audit
- `content` (string, requerido)
- `format` (string) - docx | pdf (default: pdf)

### `generate_contract`
Crea un contrato.

**Parámetros:**
- `contract_type` (string) - service_agreement | nda | investment | employment | general
- `parties` (string, requerido) - Partes
- `terms` (string, requerido) - Términos
- `format` (string) - docx | pdf (default: docx)

### `generate_presentation`
Genera presentación PPTX.

**Parámetros:**
- `title` (string, requerido) - Título
- `company_name` (string) - Empresa
- `slides` (array) - [{title, content}...]

### `apply_bedrock_style`
Aplica estilo Bedrock a cualquier contenido.

**Parámetros:**
- `content` (string, requerido) - Contenido

## 🎨 Estilo Aplicado

Todos los documentos incluyen:
- ✅ Paleta oficial: Azul primario, Terracota, Beige dorado
- ✅ Tipografía: Nexa Bold (títulos), Montserrat, Tinos
- ✅ Logo Bedrock en headers
- ✅ Líneas doradas separadoras
- ✅ Footer con contactos y redes
- ✅ Márgenes y espaciados corporativos

## 🚀 Instalación

```bash
npm install
npm run build
npm start
```

## 🤖 Integración con Claude

```bash
claude mcp add --transport stdio bedrock-documents \
  node dist/index.js
```

## 📋 Ejemplo de Uso

```bash
# Generar propuesta
/bedrock-generate-proposal
  company_name: "TechCorp SAS"
  title: "Propuesta de Asesoría Legal"
  content: "Soluciones integrales en..."
  format: "pdf"

# Resultado
→ Propuesta-TechCorp-1234567890.pdf
→ URL: https://drive.google.com/file/d/...
```

## 📊 Flujos de Trabajo

```
1. Redacta contenido
2. Ejecuta herramienta de generación
3. Sistema aplica estilo Bedrock automáticamente
4. Documento se sube a Drive
5. Acceso compartible para cliente
```

## 🔄 Próximas Actualizaciones

- [ ] Integración real con Google Docs API
- [ ] Templates personalizables
- [ ] Generación de firmas digitales
- [ ] Plantillas por línea de servicio
- [ ] Watermark y numeración automática

---

**Versión**: 1.0.0  
**Estado**: 🔨 En desarrollo  
**Última actualización**: 2025-08-25
