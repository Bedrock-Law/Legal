# ✅ MCP Servers - Registrados y Activos

Estado actual de los MCP servers registrados en Claude Code.

## Servidores Activos

### 1. bedrock-due-diligence ✓ Connected
```
Comando: node /Users/juanma/Documents/Bedrock IA/Herramientas/mcp-servers/due-diligence-mcp/dist/index.js
Transport: stdio
Herramientas: 4
- analyze_cap_table
- verify_antecedents
- assess_legal_risk
- generate_dd_report
```

### 2. bedrock-drive ✓ Connected
```
Comando: node /Users/juanma/Documents/Bedrock IA/Herramientas/mcp-servers/drive-mcp/dist/index.js
Transport: stdio
Herramientas: 5
- list_drive_files
- read_drive_file
- upload_to_drive
- create_drive_folder
- search_drive
```

## Verificación

```bash
# Listar servidores
claude mcp list

# Resultado:
✓ bedrock-due-diligence: Connected
✓ bedrock-drive: Connected
```

## Skills Integradas

```bash
~/.claude/skills/
├── bedrock-analyze-document.md
├── bedrock-generate-report.md
└── bedrock-setup-project.md
```

## Uso Inmediato

Los MCP servers están listos para usar. Pueden ser invocados desde Claude Code a través de:

1. **Skills**: `/bedrock-analyze-document`, `/bedrock-generate-report`, `/bedrock-setup-project`
2. **Directamente**: Claude puede llamar a las herramientas disponibles en cualquier conversación

## Configuración

La configuración se guarda en:
```
~/.claude.json
```

No se commitea en git (es local del usuario).

## Próximos Pasos

- [ ] Conectar Google Drive real (credenciales)
- [ ] Crear compliance-mcp y fintech-mcp servers
- [ ] Expandir herramientas con lógica real
- [ ] Setup CI/CD para deployment

---

**Fecha de Registro**: 2025-08-25  
**Status**: 🟢 LISTO PARA USAR
