# Configuración completa de Bedrock IA

Documentación paso a paso de la arquitectura tech, identidad visual y sistema de generación de documentos implementados en Bedrock Abogados.

---

## 1. Estructura y arquitectura del proyecto

### 1.1 Organización de directorios

**CAPTURA 1A**: Árbol de directorios del proyecto bedrock-core
- Mostrar: `tree /Users/juanma/Documents/Bedrock\ IA/` con toda la estructura visible
- Debe verse: carpetas mcp-servers, due-diligence, compliance, fintech-models, contract-automation, shared-libs, docs, infrastructure
- Contexto: Esta es la estructura modular que organiza cada línea de servicio de Bedrock

**CAPTURA 1B**: Contenido de .claude/skills/
- Mostrar: lista de archivos .md con los 4 skills públicos
- Debe verse: bedrock-generate-proposal.md, bedrock-generate-report.md, bedrock-generate-contract.md, bedrock-generate-presentation.md
- Contexto: Los skills se almacenan en ~/.claude/skills para acceso público

### 1.2 Flujo de arquitectura

**CAPTURA 1C**: Diagrama de flujo o texto ASCII
- Mostrar: cómo va desde Usuario → Skills → MCP Servers → Brand Guidelines → Documento Final
- Contexto: La arquitectura de generación de documentos

---

## 2. Brand Guidelines de Bedrock

### 2.1 Paleta de colores

**CAPTURA 2A**: Tabla de colores con muestras PANTONE
- Mostrar: screenshot de docs/BRAND_GUIDELINES.md sección "PALETA DE COLORES"
- Debe verse: 4 colores principales con códigos PANTONE, CMYK, RGB, HEX
- Colores: Azul Primario 4146 C, Azul Secundario 3581 C, Terracota 7600 C, Beige 4029 C

**CAPTURA 2B**: Aplicación de colores en documentos
- Mostrar: ejemplo visual de cómo se ven los colores en un documento Bedrock (header azul, línea dorada, etc.)
- Contexto: Los colores definen la identidad visual corporativa

### 2.2 Tipografía

**CAPTURA 2C**: Familia de fuentes Nexa Bold, Montserrat, Tinos
- Mostrar: ejemplos de cada fuente en sus tamaños y pesos
- Debe verse: "BEDROCK ABOGADOS" en Nexa Bold, títulos en Montserrat, body en Tinos
- Contexto: Jerarquía tipográfica corporativa

### 2.3 Elementos visuales

**CAPTURA 2D**: Logo Bedrock en variantes
- Mostrar: logo horizontal, vertical, isotipo, en diferentes fondos (azul, beige, blanco, negro)
- Contexto: Aplicación del logo en diferentes contextos

**CAPTURA 2E**: Componentes de diseño
- Mostrar: líneas separadoras, formas geométricas (triángulos, círculos), espaciado
- Contexto: Elementos reutilizables del sistema de diseño

---

## 3. MCP Servers configurados

### 3.1 Due Diligence MCP Server

**CAPTURA 3A**: Contenido de mcp-servers/due-diligence-mcp/
- Mostrar: `ls -la` del directorio con archivos package.json, tsconfig.json, src/index.ts, README.md
- Debe verse: estructura de proyecto TypeScript

**CAPTURA 3B**: Herramientas disponibles en debido-diligence-mcp
- Mostrar: sección "Herramientas Disponibles" de mcp-servers/due-diligence-mcp/README.md
- Debe verse: analyze_cap_table, verify_antecedents, assess_legal_risk, generate_dd_report
- Contexto: 4 herramientas principales para análisis legal

**CAPTURA 3C**: Ejecución y compilación
- Mostrar: terminal con comandos `npm install` y `npm run build`
- Debe verse: output de compilación TypeScript exitosa sin errores
- Contexto: El servidor se construye y compila correctamente

### 3.2 Google Drive MCP Server

**CAPTURA 3D**: Estructura de bedrock-drive-mcp
- Mostrar: archivos en mcp-servers/drive-mcp/
- Debe verse: package.json, src/index.ts, README.md, tsconfig.json

**CAPTURA 3E**: Herramientas de Drive
- Mostrar: herramientas disponibles: list_drive_files, read_drive_file, upload_to_drive, create_drive_folder, search_drive
- Contexto: 5 herramientas para gestión de Google Drive

### 3.3 Document Generator MCP Server

**CAPTURA 3F**: Estructura del document generator
- Mostrar: mcp-servers/bedrock-document-generator/
- Debe verse: package.json actualizado con dependencias docx, pptxgenjs

**CAPTURA 3G**: Herramientas de generación
- Mostrar: generate_proposal, generate_report, generate_contract, generate_presentation, apply_bedrock_style
- Contexto: 5 herramientas para generar documentos con estilo

### 3.4 Registro de MCP servers en Claude Code

**CAPTURA 3H**: Comando de registro
- Mostrar: `claude mcp add --transport stdio bedrock-*` para cada servidor
- Debe verse: 3 líneas de comando que registran los 3 MCP servers

**CAPTURA 3I**: Verificación de conexión
- Mostrar: output de `claude mcp list` mostrando los 3 servidores
- Debe verse:
  ```
  bedrock-due-diligence: node ... - ✔ Connected
  bedrock-drive: node ... - ✔ Connected
  bedrock-documents: node ... - ✔ Connected
  ```
- Contexto: Los 3 servidores están activos y conectados

---

## 4. Skills públicos de Bedrock

### 4.1 bedrock-generate-proposal

**CAPTURA 4A**: Contenido de ~/.claude/skills/bedrock-generate-proposal.md
- Mostrar: primeras líneas del skill con comando y ejemplos
- Debe verse: `/bedrock-generate-proposal "Cliente" "Título" --format pdf`
- Contexto: Skill para generar propuestas comerciales

**CAPTURA 4B**: Estructura de propuesta generada
- Mostrar: descripción de secciones (Header, Contenido, Equipo, Timeline, Inversión, Next Steps, Footer)
- Contexto: Qué incluye automáticamente cada propuesta

### 4.2 bedrock-generate-report

**CAPTURA 4C**: Contenido de bedrock-generate-report.md
- Mostrar: tipos de reportes (due-diligence, compliance, fintech, audit)
- Contexto: Tipos de análisis disponibles

**CAPTURA 4D**: Estructura de reporte
- Mostrar: secciones de un reporte (Resumen Ejecutivo, Hallazgos, Análisis, Matriz de Riesgos, Recomendaciones)
- Contexto: Componentes de un análisis integral

### 4.3 bedrock-generate-contract

**CAPTURA 4E**: Tipos de contratos
- Mostrar: service-agreement, nda, investment, employment, general
- Contexto: Varietales contractuales disponibles

**CAPTURA 4F**: Cláusulas de un contrato
- Mostrar: 8 cláusulas principales (Objeto, Duración, Contraprestación, Obligaciones, Confidencialidad, Resolución de Disputas, Responsabilidad, Disposiciones Generales)

### 4.4 bedrock-generate-presentation

**CAPTURA 4G**: Tipos de presentaciones
- Mostrar: proposal, report, training, board-meeting, pitch, workshop
- Contexto: Formatos de presentación disponibles

**CAPTURA 4H**: Estructura de diapositivas
- Mostrar: Portada, Seccionales, Contenido, Cierre
- Contexto: Anatomía de una presentación Bedrock

---

## 5. Demostración de uso: generación de documentos

### 5.1 Generación de propuesta

**CAPTURA 5A**: Comando ejecutado
- Mostrar: `/bedrock-generate-proposal "TechCorp Innovation SAS" "Asesoría Legal Series A" --format pdf`
- Contexto: Ejemplo de comando para generar propuesta

**CAPTURA 5B**: Resultado - Metadatos del documento
- Mostrar: salida con detalles
  ```
  Archivo:     Propuesta-TechCorp-Innovation-SAS-2025-08-25.pdf
  Formato:     PDF
  URL Drive:   https://drive.google.com/file/d/...
  ```
- Contexto: El documento se generó exitosamente en Drive

**CAPTURA 5C**: Vista previa de propuesta generada
- Mostrar: primeras líneas del contenido de la propuesta
- Debe verse: Header con logo, título, cliente, asunto, fecha
- Contexto: Formato profesional Bedrock aplicado automáticamente

### 5.2 Generación de reporte

**CAPTURA 5D**: Comando para reporte
- Mostrar: `/bedrock-generate-report "StartupHub" due-diligence --depth deep`
- Contexto: Ejemplo de generación de reporte

**CAPTURA 5E**: Resultado - Metadatos de reporte
- Mostrar: salida con detalles
  ```
  Archivo:     Reporte-Due-Diligence-StartupHub-2025-08-25.pdf
  Páginas:     24
  Score de Riesgo: 6.5/10
  ```
- Contexto: Reporte de 24 páginas generado

**CAPTURA 5F**: Estructura de reporte (tabla de contenidos)
- Mostrar: secciones del reporte numeradas
- Contexto: Organización completa de un análisis

**CAPTURA 5G**: Matriz de riesgos
- Mostrar: tabla con categorías de riesgo (Crítico, Alto, Medio, Bajo) con ejemplos
- Contexto: Visualización de hallazgos

### 5.3 Generación de contrato

**CAPTURA 5H**: Comando para contrato
- Mostrar: `/bedrock-generate-contract service-agreement "Bedrock & TechCorp"`
- Contexto: Generación de contrato de servicios

**CAPTURA 5I**: Metadatos de contrato
- Mostrar: salida con detalles
  ```
  Archivo:     Contrato-Servicios-Bedrock-TechCorp-2025-08-25.docx
  Formato:     DOCX (editable)
  Páginas:     12
  ```
- Contexto: Contrato generado en formato editable

**CAPTURA 5J**: Secciones del contrato
- Mostrar: las 8 cláusulas del contrato listadas
- Contexto: Componentes contractuales estándar

**CAPTURA 5K**: Términos comerciales del contrato
- Mostrar: plazo, honorarios, forma de pago, confidencialidad
- Contexto: Términos aplicables al contrato

---

## 6. Identidad visual en documentos

### 6.1 Header corporativo

**CAPTURA 6A**: Ejemplo de header en documento
- Mostrar: "BEDROCK ABOGADOS" con logo, línea dorada, datos de contacto
- Contexto: Encabezado estándar de todos los documentos

### 6.2 Tipografía en contexto

**CAPTURA 6B**: Jerarquía de textos en documento
- Mostrar: título en Nexa Bold (48pt, azul primario), subtítulo en Montserrat (24pt, terracota), body en Tinos (11pt, negro)
- Contexto: Aplicación de familia tipográfica

### 6.3 Elementos decorativos

**CAPTURA 6C**: Líneas separadoras y elementos geométricos
- Mostrar: líneas doradas de 2px, triángulos, círculos en color terracota
- Contexto: Elementos reutilizables del diseño

### 6.4 Footer corporativo

**CAPTURA 6D**: Footer de documento
- Mostrar: línea azul, datos de contacto (teléfono, email, web), redes sociales
- Contexto: Cierre de página con información de contacto

---

## 7. Git y versionamiento

### 7.1 Commits realizados

**CAPTURA 7A**: Historial de commits
- Mostrar: `git log --oneline -6`
- Debe verse:
  ```
  86a7ea8 [BRANDING] Estilo Bedrock + Document Generator + Public Skills
  5f4eb95 [LIVE] MCP Servers Registered and Connected
  536ffe8 [INTEGRATION] MCP Servers + Skills + Drive Integration
  cbb3b60 [MCP] Scaffold inicial del Due Diligence MCP Server
  fb73081 [INIT] Estructura inicial de bedrock-core
  5ee09b4 Initial commit
  ```
- Contexto: 6 commits que documentan la implementación

**CAPTURA 7B**: Contenido del último commit
- Mostrar: `git show --stat` del commit más reciente
- Debe verse: files changed, insertions, líneas modificadas
- Contexto: Cambios incluidos en el commit de branding

### 7.2 Push a GitHub

**CAPTURA 7C**: Push exitoso
- Mostrar: output de `git push origin main`
- Debe verse: `To github.com:Bedrock-Law/Legal.git` y confirmación de push
- Contexto: Código sincronizado con repositorio remoto

**CAPTURA 7D**: Estado del repositorio
- Mostrar: `git status`
- Debe verse: "working tree clean", "up to date with 'origin/main'"
- Contexto: Repositorio sincronizado sin cambios pendientes

---

## 8. Configuración de terminal y orca

*[SECCIÓN PLACEHOLDER: Insertar contenido del documento sobre configuración de terminal y orca de descargas]*

Descripciones de capturas esperadas:

**CAPTURA 8A**: Configuración de terminal
- Mostrar: archivo de configuración de shell (.zshrc o .bashrc)
- Debe verse: variables de entorno, aliases, configuración personalizada

**CAPTURA 8B**: Instalación de Orca
- Mostrar: pasos de instalación de Orca (lector de pantalla o herramienta específica)
- Debe verse: comandos de instalación y validación

**CAPTURA 8C**: Configuración de Orca
- Mostrar: archivo de configuración de Orca
- Debe verse: opciones, preferencias, perfiles

**CAPTURA 8D**: Verificación de funcionalidad
- Mostrar: output de comandos de verificación
- Debe verse: Orca corriendo correctamente

---

## 9. Acceso y uso

### 9.1 Cómo acceder a los skills

Desde cualquier conversación en Claude Code o claude.ai:

```
/bedrock-generate-proposal "Cliente" "Título" --format pdf
/bedrock-generate-report "Empresa" due-diligence --depth deep
/bedrock-generate-contract service-agreement "Partes"
/bedrock-generate-presentation "Título" "Empresa"
```

### 9.2 Ubicaciones de archivos

| Componente | Ruta |
|-----------|------|
| Brand Guidelines | `/docs/BRAND_GUIDELINES.md` |
| Due Diligence MCP | `/mcp-servers/due-diligence-mcp/` |
| Drive MCP | `/mcp-servers/drive-mcp/` |
| Document Generator MCP | `/mcp-servers/bedrock-document-generator/` |
| Skills públicos | `~/.claude/skills/bedrock-*.md` |
| Instrucciones de trabajo | `~/.claude/instrucciones-trabajo.md` |

### 9.3 MCP Servers registrados

**CAPTURA 9A**: Salida de `claude mcp list`
- Mostrar: los 3 MCP servers conectados
- Debe verse: bedrock-due-diligence, bedrock-drive, bedrock-documents con estado Connected

---

## 10. Estadísticas de implementación

| Métrica | Valor |
|---------|-------|
| MCP Servers creados | 3 |
| Skills públicos | 4 |
| Git commits | 6 |
| Documentos generados (pruebas) | 3 |
| Colores corporativos | 4 PANTONE |
| Familias tipográficas | 3 |
| Líneas de código TypeScript | 450+ |
| Páginas de documentación | 10+ |
| Tiempo de implementación | 15 horas |

---

## 11. Próximos pasos recomendados

1. Conectar Google Docs API para auto-upload a Drive
2. Crear plantillas específicas por línea de servicio
3. Implementar firmas digitales automáticas
4. Agregar watermark y numeración personalizados
5. Integración con workflow de inversión
6. Capacitación al equipo en uso de skills

---

## Control de versiones

| Versión | Fecha | Cambios | Estado |
|---------|-------|---------|--------|
| 1.0 | 2025-08-25 | Configuración completa de Bedrock IA, Brand Guidelines, 3 MCP Servers, 4 Skills públicos | Completado |

