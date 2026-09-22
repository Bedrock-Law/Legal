# Bedrock Abogados

Repositorio de trabajo de Bedrock: documentos del despacho, herramientas propias de integración con Claude Code (MCP servers de Gmail, Calendar, Docs, Sheets, Drive, Tasks y due diligence) y la configuración del asistente.

## Estructura

```
Negocio/
  estrategia/        conocimiento y posicionamiento de la firma
  marketing/
  operaciones/
  contabilidad/
  finanzas/
  talento-humano/

Clientes/
  <cliente-slug>/
    propuesta-comercial/
    facturas/
    documentos-legales/
      societario/
      contratos/
      compliance-kyc/
      tributario/
      poderes-y-representacion/
      propiedad-intelectual/
      litigios-y-contingencias/
    conceptos-juridicos/

Herramientas/
  skills-y-plugins/    skills de Claude Code instalados por el equipo
  mcp-servers/         servidores MCP propios de Bedrock
  documentacion-tecnica/
  limpiar_marcas.py    depurador de caracteres invisibles

Personal/
  <nombre>/
```

Las reglas completas de organización, trazabilidad en Linear, redacción y el mecanismo de espejo hacia Google Drive están en `CLAUDE.md`.

## Cómo se decide dónde va un documento

1. ¿Es de una persona, no de la empresa? → `Personal/<nombre>/`.
2. ¿Es un skill, plugin o herramienta del equipo? → `Herramientas/skills-y-plugins/`.
3. ¿Es sobre un cliente identificable? → `Clientes/<slug>/`, por tipo de documento.
4. Si no es ninguna de las anteriores, es interno de la empresa → `Negocio/<área>/`.

Ninguna carpeta nueva de primer nivel sin confirmar con el socio responsable.
