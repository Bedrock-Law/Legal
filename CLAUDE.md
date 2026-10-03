# Instrucciones permanentes — Bedrock IA

Repositorio de trabajo de Bedrock Abogados: documentos de clientes y de la firma,
herramientas propias (servidores MCP, skills de marca, scripts) y la
configuración del asistente.

Las reglas están partidas por tema en `.claude/rules/` y se cargan solas en cada
sesión. Este archivo es el índice. Si una regla de aquí choca con una de
`rules/`, manda la de `rules/`, que es la que se mantiene.

## Reglas

| Archivo | Qué cubre |
|---|---|
| `.claude/rules/taxonomia.md` | Dónde va cada archivo: el árbol de cuatro ramas, el slug de cliente y la prohibición de crear ramas nuevas sin confirmar |
| `.claude/rules/linear.md` | Trazabilidad en Linear, registro de tiempo medido o estimado, y los fallos silenciosos de `orca linear` |
| `.claude/rules/redaccion.md` | Señales de escritura de IA que no se reproducen, y depuración de caracteres invisibles con `Herramientas/limpiar_marcas.py` |
| `.claude/rules/drive-sync.md` | El espejo repo → Drive: qué hace, por qué solo corre en una máquina, cómo saber si está activo y las reglas que dejaron los incidentes |
| `.claude/rules/git.md` | Ramas por tarea, commits con identificador, archivos uno por uno |
| `.claude/rules/herramientas.md` | Inventario de skills y plugins, y verificación de origen antes de instalar |

## Material de referencia

- `Herramientas/documentacion-tecnica/postmortem-sync-drive-2026-09.md` — los dos
  episodios de septiembre que dieron forma al espejo de Drive.
- `Herramientas/skills-y-plugins/README.md` — qué hace cada skill instalado y de
  dónde viene.
- `README.md` — el árbol del repositorio tal como está.
