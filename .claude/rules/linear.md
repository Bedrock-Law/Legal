# Trazabilidad en Linear

Nada se trabaja sin tarea. Si no existe, se crea antes de producir el
entregable, proponiendo título/estado/prioridad y esperando visto bueno para
crear etiquetas nuevas.

Cada avance se comenta en la tarea, en este orden: qué se hizo; qué se
produjo (ruta en el repo, y el enlace de Drive del render final si ya existe);
qué se decidió y con qué fundamento; qué queda abierto y de quién depende.
Sin relleno, sin repetir lo que ya está en el issue.

El tiempo lo registra el asistente, nunca se le pregunta a la persona:

- **Medido**, cuando hay evidencia (marcas de tiempo de archivos, commits,
  mensajes de Slack/correo del asunto, ventana de la sesión de trabajo).
- **Estimado por línea base**, cuando no hay evidencia suficiente.

Se deja como última línea del comentario:

⏱ 1 h 30 m — medido
⏱ 45 m — estimado por línea base

(Carácter U+23F1 a secas, sin selector de variación — el depurador de marcas
invisibles quita los selectores, así que con selector queda inestable.)

# Reglas técnicas — orca linear (equipo BEDROCK)

- Usa `state`, no `status`, para cambiar el estado de un issue — `status` no da error, inserta el valor como texto basura en la descripción.
- Antes de `create` / `save-issue` / `status set`, verifica el nombre exacto del parámetro con `orca linear <comando> --help`.
- Para agregar una etiqueta sin tocar las existentes, usa `label add` — `label set` reemplaza el conjunto completo.
- En `list-issues`, omite el selector de campos si no estás seguro del nombre exacto — un nombre inválido tumba toda la consulta.
- Las relaciones entre issues se acumulan. Para quitar una, pídelo explícito con `relation remove`.
- No existe borrado real de issues en `orca linear` — lo más cercano es `status set --to Canceled`. Un borrado real requiere la UI de Linear.

## Gotchas

- Edición parcial de descripción con ancla: el ancla debe coincidir EXACTAMENTE una vez en el texto, o la operación se aborta completa.

## Remedios y verificación

- Si ya entró texto basura en una descripción por un parámetro mal nombrado, se
  arregla con una edición parcial que borre el rango contaminado. Nunca
  reescribiendo la descripción completa a mano.
- Las ediciones parciales de descripción admiten tres operaciones: reemplazar un
  texto exacto, agregar al final, y reemplazar el rango entre dos anclas.
- `comment add` recibe el issue como argumento posicional:
  `orca linear comment add BEDROCK-84 --body-file <ruta>`. Con `--issue` no da
  error visible: devuelve `ok: false` y el comentario no se publica. Verificado
  el 30 de septiembre de 2026.
- `relation add` también es posicional:
  `orca linear relation add BEDROCK-85 --related BEDROCK-74 --type related`.
  Verificado el 3 de octubre de 2026.
- Después de cualquier escritura, confirmar que la respuesta diga `ok: true`.

Por qué importa: estos fallos son silenciosos. No lanzan error y contaminan
datos, de modo que el costo de no conocerlos es limpieza manual después.
