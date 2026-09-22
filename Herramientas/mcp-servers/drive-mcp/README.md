# 🚗 Bedrock Drive MCP Server

MCP Server para integración con Google Drive. Lee, crea, sube y busca documentos legales.

## Herramientas

- **list_drive_files** - Lista archivos en Drive
- **read_drive_file** - Lee contenido de archivo
- **upload_to_drive** - Sube archivos
- **create_drive_folder** - Crea carpetas
- **search_drive** - Busca archivos

## 🚀 Setup

```bash
npm install
npm run build
npm start
```

## 🔗 Integración

```bash
claude mcp add --transport stdio bedrock-drive \
  node dist/index.js
```

---

**Estado**: 🔨 En desarrollo
