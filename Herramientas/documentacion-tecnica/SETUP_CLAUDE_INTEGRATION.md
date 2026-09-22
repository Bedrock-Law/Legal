# 🚀 Setup: Integración Completa Claude + Drive + Skills

Guía para conectar todo: MCP Servers → Google Drive → Claude Code Skills

## 📋 Checklist de Configuración

### 1. Instalar Dependencias (MCP Servers)

```bash
cd mcp-servers/due-diligence-mcp
npm install && npm run build

cd ../drive-mcp
npm install && npm run build

cd ../..
```

### 2. Google Drive Setup (Opcional - Para conectar Drive real)

Si quieres conectar Google Drive real (no simulado):

```bash
# 1. Crear credenciales en Google Cloud Console
# https://console.cloud.google.com/

# 2. Descargar JSON de credenciales

# 3. Guardar en:
mkdir -p ~/.config/bedrock
mv ~/Downloads/credentials.json ~/.config/bedrock/google-credentials.json

# 4. Instalar credenciales en MCP Server
# (Ya incluido en package.json)
```

### 3. Registrar MCP Servers en Claude Code

#### Opción A: Automático (Recomendado)

```bash
cd /Users/juanma/Documents/Bedrock\ IA
claude mcp setup --config .claude/bedrock.mcp.config.json
```

#### Opción B: Manual

```bash
# Due Diligence MCP
claude mcp add --transport stdio bedrock-due-diligence \
  node /Users/juanma/Documents/Bedrock\ IA/mcp-servers/due-diligence-mcp/dist/index.js

# Drive MCP
claude mcp add --transport stdio bedrock-drive \
  node /Users/juanma/Documents/Bedrock\ IA/mcp-servers/drive-mcp/dist/index.js
```

### 4. Verificar MCP Servers

```bash
claude mcp list
```

Deberías ver:
```
✓ bedrock-due-diligence (stdio)
✓ bedrock-drive (stdio)
```

### 5. Skills Disponibles

Ya están listos en:
```
~/.claude/skills/
├── bedrock-analyze-document.md
├── bedrock-generate-report.md
└── bedrock-setup-project.md
```

Úsalos con:
```
/bedrock-analyze-document <file-id>
/bedrock-generate-report "Company Name" dd
/bedrock-setup-project "Project" investment
```

## 🔗 Workflows Disponibles

### Workflow 1: Análisis Rápido
```
/bedrock-analyze-document file-123 legal
↓
Lee documento → Analiza riesgos → Genera reporte
```

### Workflow 2: Setup Completo de Proyecto
```
/bedrock-setup-project "Inversión - Startup" investment --client "Acme"
↓
Crea estructura Drive → Carga plantillas → Lista de tareas
```

### Workflow 3: Generación de Reportes
```
/bedrock-generate-report "TechCorp" integrated --format pdf
↓
Analiza → Crea reporte → Sube a Drive
```

## 🧪 Test

### Test MCP Servers

```bash
# Terminal 1: Iniciar servidor
cd mcp-servers/due-diligence-mcp
npm start

# Terminal 2: Conectar con Claude
claude mcp add --transport stdio test \
  node dist/index.js
```

### Test Skills en Claude Code

1. Abre Claude Code
2. Escribe `/bedrock-analyze-document` + Enter
3. Sigue las instrucciones

## 📁 Estructura de Carpetas (Drive)

Recomendado crear en Google Drive:

```
Bedrock Abogados/
├── Proyectos/
│   ├── [Cada proyecto aquí]
│   └── YYYY-MM-DD - Company Name/
├── Templates/
│   ├── Contratos/
│   ├── Due Diligence/
│   └── Reportes/
├── Archive/
└── Shared with Clients/
```

## 🔐 Seguridad

- ✅ Las credenciales de Google se guardan localmente en `~/.config/bedrock/`
- ✅ No se suben a GitHub
- ✅ MCP Servers se ejecutan localmente
- ✅ Solo lees/escribes documentos que autorices

## ⚙️ Troubleshooting

### "Command not found: claude"
```bash
npm install -g @anthropic-ai/sdk
```

### "MCP Server no responde"
```bash
# Verificar que esté buildado
cd mcp-servers/drive-mcp
npm run build
npm start
```

### "No puede conectar a Google Drive"
- Verificar credenciales en `~/.config/bedrock/google-credentials.json`
- Verificar permisos en Google Cloud Console
- Verificar que la app tenga acceso a Drive API

## 📞 Próximos Pasos

1. [ ] Build MCP servers: `npm run build` en cada carpeta
2. [ ] Registrar MCP servers en Claude
3. [ ] Probar skills: `/bedrock-analyze-document`
4. [ ] Conectar Google Drive real (opcional)
5. [ ] Crear proyectos con `/bedrock-setup-project`

---

**Versión**: 1.0.0  
**Última actualización**: 2025-08-25  
**Status**: 🚀 Listo para usar
