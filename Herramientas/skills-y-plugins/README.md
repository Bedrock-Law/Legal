# Skills y plugins

Inventario de lo que está instalado en Claude Code y de dónde viene. Se actualiza
cada vez que se instala, retira o modifica un skill o plugin. Antes de instalar
algo nuevo se verifica su origen: el marketplace se agrega por `owner/repo` de
GitHub y solo después de confirmar que el repositorio es el que dice ser.

Revisado el 5 de octubre de 2026.

## Skills propios de Bedrock

La fuente está en `skills/` de esta carpeta. Se instalan en `~/.claude/skills/`
con `bash Herramientas/instalar-skills.sh`, que muestra los cambios antes de
aplicarlos y guarda una copia de lo que reemplaza. No se editan en la copia
instalada.

| Skill | Qué hace | Cuándo se activa |
|---|---|---|
| `estilo-bedrock-pdf` | PDF de marca desde Markdown, con portada, resumen y membrete | Documento, concepto, informe, memorando o PDF de Bedrock |
| `estilo-bedrock-docs` | Word nativo editable desde Markdown, con portada y tabla de datos | Contrato, formulario o propuesta que la contraparte va a comentar |
| `estilo-bedrock-html` | Página web interactiva de marca a partir de una plantilla | Propuesta o documento para enviar por enlace |
| `humanizar-texto` | Guía para que ningún texto reproduzca señales de escritura de IA | Siempre, en silencio, al redactar |
| `llm-council` | Consejo de modelos con revisión anónima entre pares; un asiento consulta a Gemini | Preguntas complejas o de alto impacto |

Retirados el 3 de octubre de 2026: `bedrock-docs`, que competía con los tres
`estilo-bedrock-*` por el mismo disparador (sus dos capacidades propias se
portaron antes; queda en `versiones-anteriores/`), y `propuesta-bedrock-html`,
que no tenía `SKILL.md` y nunca se cargaba.

## Skills personales, solo en esta máquina

| Skill | Qué hace | Fuente |
|---|---|---|
| `co-think` | Panel de modelos para pensar una decisión desde varios ángulos | `~/.claude/skills/co-think/`, no versionado |
| `edilma` | Auditoría del contexto de Claude Code: CLAUDE.md, skills, memoria | `~/.claude/skills/edilma/`, no versionado |
| `orca-linear` | Trabajo con Linear a través de la línea de comandos de Orca | Lo instala Orca (enlace a `~/.agents/skills/`) |

## Skills de Anthropic

`academy-guide`, `algorithmic-art`, `brand-guidelines`, `canvas-design`,
`claude-api`, `discernment-nudge`, `doc-coauthoring`, `docx`, `frontend-design`,
`internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`,
`slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`,
`xlsx`. Se cargan desde `~/.claude/skills/`. La carpeta `~/.claude/skills/synced/`
la administra Claude para los skills sincronizados desde la cuenta.

## Plugins

| Plugin | Origen | Alcance | Para qué |
|---|---|---|---|
| `linear` | `anthropics/claude-plugins-official` | usuario | Acceso a Linear desde Claude Code vía `mcp.linear.app`. Se autentica con `/mcp` |
| `everything-claude-code` | carpeta local `~/.claude-plugins-src/` | usuario | Comandos, agentes y hooks de terceros. Trae su propio `/plan` |
| `frontend-design` | `anthropics/claude-plugins-official` | proyecto | Duplica el skill del mismo nombre; revisar si sobra |
| `mcp-server-dev` | `anthropics/claude-plugins-official` | proyecto | Desarrollo de servidores MCP |

## Otros archivos de esta carpeta

| Archivo | Qué es |
|---|---|
| `CLAUDE-personal.md` | Fuente de `~/.claude/CLAUDE.md` para instalar en una máquina nueva. Hoy es idéntico al instalado; si se edita uno, se copia al otro |
| `EMPIEZA-AQUI.md`, `INSTALACION-COMPLETA.md` | Guías para montar Claude Code en una máquina nueva. La parte de skills está superada por `instalar-skills.sh` |
| `reglas-de-linear.md` | Reglas de Linear anteriores a `.claude/rules/linear.md` |
| `plantillas/` | Plantillas HTML de propuestas y landing, anteriores a la plantilla del skill `estilo-bedrock-html` |
| `como-construir-mi-skill-de-marca.md`, `orden-de-trabajo-skills-de-marca.md`, `plantilla-SKILL-*.md` | Material de trabajo de cuando se construyeron los skills de marca |
| `format-bedrock-sheets.js`, `sheets-formatter.gs`, `verify-formatting.js`, `FORMATTER-README.md` | Formateador de hojas de cálculo con el estilo Bedrock |
| `versiones-anteriores/` | Skills retirados |
