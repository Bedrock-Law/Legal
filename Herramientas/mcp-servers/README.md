# Servidores MCP de Bedrock

Ocho servidores propios que dan a Claude Code acceso a Google Workspace y a las
herramientas de documentos de la firma. Se registran en el `.mcp.json` de la raíz
del repositorio y se cargan solos al abrir una sesión en el repo.

| Servidor | Carpeta | Herramientas |
|---|---|---|
| `bedrock-gmail` | `gmail-mcp/` | `list_emails`, `read_email`, `search_emails`, `send_email` |
| `bedrock-calendar` | `calendar-mcp/` | `list_events`, `get_event`, `create_event`, `delete_event` |
| `bedrock-docs` | `docs-mcp/` | `create_doc`, `read_doc`, `append_to_doc`, `replace_text_in_doc` |
| `bedrock-sheets` | `sheets-mcp/` | `create_spreadsheet`, `create_sheet`, `read_sheet`, `write_sheet`, `append_sheet`, `format_sheet` |
| `bedrock-tasks` | `tasks-mcp/` | `list_task_lists`, `list_tasks`, `create_task`, `complete_task` |
| `bedrock-drive` | `drive-mcp/` | `list_drive_files`, `search_drive`, `read_drive_file`, `create_drive_folder`, `upload_to_drive` |
| `bedrock-documents` | `bedrock-document-generator/` | `generate_proposal`, `generate_contract`, `generate_report`, `generate_presentation`, `apply_bedrock_style` |
| `bedrock-due-diligence` | `due-diligence-mcp/` | `analyze_cap_table`, `verify_antecedents`, `assess_legal_risk`, `generate_dd_report` |

## Credenciales

Los servidores de Google leen `credentials/oauth_client.json` y
`credentials/token.json` dentro de esta carpeta. Están excluidos de git por
`.gitignore` y no deben salir de la máquina. `send_email` envía correo real desde
la cuenta autenticada.

## Rutas

El `.mcp.json` usa `${BEDROCK_REPO:-/Users/juanma/Documents/Bedrock IA}`. Si el
repo está en otra carpeta en otra máquina, se define `BEDROCK_REPO` con esa ruta
en el perfil de shell; si no se define, se usa la ruta por defecto.

## Poner a andar los servidores en otra máquina

El código compilado (`dist/`) y las dependencias (`node_modules/`) no están en
git, así que hay que generarlos una vez:

1. Clonar el repo y entrar en esta carpeta:
   `cd "<ruta del repo>/Herramientas/mcp-servers"`
2. Compilar los ocho:
   `for d in */; do [ -f "$d/package.json" ] && (cd "$d" && npm install && npm run build); done`
   Si funcionó, cada carpeta tiene ahora un `dist/index.js`.
3. Copiar `oauth_client.json` y `token.json` a `credentials/` por un canal seguro,
   nunca por correo ni por chat.
4. Si el repo no está en `/Users/juanma/Documents/Bedrock IA`, añadir al perfil
   de shell: `export BEDROCK_REPO="<ruta del repo>"`.
5. Abrir Claude Code en la raíz del repo. La primera vez pide aprobar los ocho
   servidores del `.mcp.json`.
6. Verificar: `claude mcp list` debe mostrar los ocho con `✔ Connected`.

## Linear

El acceso a Linear desde Claude Code no es un servidor propio: es el plugin
oficial `linear@claude-plugins-official`, instalado a nivel de usuario. La primera
vez se autentica desde una sesión con `/mcp`. El trabajo diario con issues sigue
yendo por `orca linear`.
