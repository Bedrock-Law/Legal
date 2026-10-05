# Bedrock Abogados

Repositorio de trabajo de Bedrock Abogados: documentos de clientes y de la firma,
herramientas propias y la configuración de Claude Code. Las reglas de organización,
trazabilidad, redacción y el espejo a Google Drive están en `.claude/rules/`, con
`CLAUDE.md` como índice.

## Cómo se decide dónde va un documento

1. ¿Es de una persona y no de la empresa? → `Personal/<nombre>/`.
2. ¿Es un skill, plugin o herramienta del equipo? → `Herramientas/`.
3. ¿Es sobre un cliente identificable? → `Clientes/<slug>/`, por tipo de documento.
4. Si no es ninguna de las anteriores, es interno → `Negocio/<área>/`.

Ninguna carpeta nueva de primer nivel sin confirmar con el socio responsable. El
detalle está en `.claude/rules/taxonomia.md`.

## El árbol tal como está

```
.claude/rules/        reglas que Claude Code carga en cada sesión
.mcp.json             los ocho servidores MCP propios
CLAUDE.md             índice de las reglas

Clientes/<slug>/
  propuesta-comercial/
  documentos-legales/<tipo>/
  conceptos-juridicos/
  investigacion/            material de proceso de un encargo
  versiones-anteriores/     junto a cada documento que tiene versiones

Herramientas/
  skills-y-plugins/skills/  fuente de los skills de marca (se instalan con instalar-skills.sh)
  mcp-servers/              servidores MCP propios; ver su README
  documentacion-tecnica/    postmortems y documentación de configuración
  limpiar_marcas.py         depurador de caracteres invisibles
  instalar-skills.sh        instala los skills del repo en ~/.claude/skills/
  verificar-cruces-clientes.py  revisa que un documento no lleve material de otro cliente

Negocio/<área>/
Personal/<nombre>/
```

La taxonomía también prevé `facturas/`, `compliance-kyc/` y `propiedad-intelectual/`
dentro de cada cliente. Ningún cliente las usa todavía; se crean con el primer documento.

## Clientes

| Carpeta | Archivos |
|---|---|
| `ambiente-azul` | 6 |
| `asovelenos` | 14 |
| `be-pelvic-serpelvica` | 7 |
| `btg-pactual` | 5 |
| `credix1` | 50 |
| `factus` | 26 |
| `finup` | 1 |
| `jhonatan-londono` | 13 |
| `libe-legal` | 6 |
| `manzanares-de-la-cuenca` | 171 |
| `minca` | 1 |
| `ph-misisipi` | 7 |
| `pmi-payments-international` | 1 |
| `pulso-proyectos` | 6 |
| `serlogisticos` | 1 |
| `tuya` | 22 |

## Negocio

| Área | Archivos |
|---|---|
| `contabilidad` | 0 |
| `estrategia` | 11 |
| `finanzas` | 0 |
| `marketing` | 0 |
| `operaciones` | 0 |
| `talento-humano` | 0 |

Las áreas sin archivos se conservan como estructura prevista.
