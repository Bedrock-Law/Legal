# Instrucciones permanentes — Bedrock IA

## 1. Taxonomía y cómo decidir dónde va cada cosa

Antes de crear o guardar un archivo, recorre esta decisión en orden. Si después
de recorrerla sigue sin ser obvio, pregunta — no inventes una carpeta nueva.

1. ¿Es de una persona, no de la empresa? → `Personal/<nombre>/`.
2. ¿Es un skill, plugin o herramienta que el equipo usa? → `Herramientas/skills-y-plugins/`.
3. ¿Es sobre un cliente identificable? → `Clientes/<slug-del-cliente>/`, y dentro,
   por tipo de documento (ver 1.2).
4. Si no es ninguna de las anteriores, es interno de la empresa → `Negocio/<área>/`.

### 1.1 Estructura

```
Negocio/
  estrategia/
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
  skills-y-plugins/
  mcp-servers/
  documentacion-tecnica/

Personal/
  juan-manuel/
```

### 1.2 Regla del slug de cliente

`<cliente-slug>` es el nombre comercial en minúsculas, con guiones, sin razón
social ni sufijos (S.A.S., Ltda.). Si el cliente ya tiene carpeta con un slug
distinto, se reutiliza ese — nunca se crean dos carpetas para el mismo cliente.
Antes de crear una carpeta de cliente nueva, buscar si ya existe con otra grafía.

### 1.3 Ninguna carpeta nueva de primer nivel sin confirmar

Si un documento no encaja en `Negocio/`, `Clientes/`, `Herramientas/` o
`Personal/`, se pregunta antes de inventar una quinta rama.

## 2. Trazabilidad en Linear

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

## 3. Redacción

Ningún texto reproduce las señales de escritura de IA de
[Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing):
vocabulario delator ("momento decisivo", "pilar fundamental", delve/tapestry/
pivotal en inglés), rodeos del verbo ser, paralelismos negativos ("no solo X
sino Y"), regla de tres por inercia, gerundios que simulan análisis al cierre
de una frase, cierres de plantilla, atribuciones vagas, garantías enlatadas
("preservé toda la información"), negrilla mecánica sobre cada término.
Negrilla solo en títulos y subtítulos. Títulos sin mayúscula en cada palabra.

## 4. Marcas invisibles

Todo entregable —documentos, correos, mensajes, código, respuestas— se depura
con `Herramientas/limpiar_marcas.py <archivo>` antes de renderizarlo o
compartirlo: caracteres invisibles Unicode (U+00AD, U+200B–200F, U+202A–202E,
U+2060–2069, U+FEFF, selectores de variación, tag chars) y espacios no
estándar, normalizados a espacio corriente.

## 5. Espejo de Drive — mecanismo, acceso y reglas de seguridad

### 5.1 Qué hace

Un script (`bedrock_drive_sync.py`, fuera del repo, en `~/.bedrock-tools/`) hace
espejo exacto y **unidireccional** repo → Drive hacia **una única Unidad
Compartida**, identificada por su ID fijo. Sube lo nuevo, actualiza lo
modificado (por md5), detecta movimientos y re-parentea sin romper links
compartidos, conserva el formato nativo (no convierte a Google Docs), y
**borra en Drive (a papelera) todo lo que no exista en el repo en ese
momento**. Corre solo desde un hook `post-commit` — no versionado, no
distribuido con el repo — o manualmente.

### 5.2 Acceso que tiene

**Decisión del 22 de septiembre de 2026 (revierte el diseño de cuenta de
servicio):** el Workspace de `bedrock.com.co` tiene activada la política de
organización `iam.disableServiceAccountKeyCreation`, que bloquea por diseño
la creación de claves JSON para cuentas de servicio — Google lo recomienda
por seguridad. No se pidió desactivar esa política.

El script se autentica en cambio como el propio usuario
(`tualiado@bedrock.com.co`) vía OAuth, reutilizando el mismo
`oauth_client.json`/`token.json` que ya usa `Herramientas/mcp-servers/drive-mcp/`
del repo (con scope `https://www.googleapis.com/auth/drive` ya autorizado),
copiados a `~/.bedrock-tools/oauth_client.json` y `~/.bedrock-tools/token.json`.
No hay cuenta de servicio, no hay clave privada, no hay Domain-Wide Delegation,
no hay identidad "robot" separada — el script actúa exactamente con los
mismos permisos que el propio usuario, sobre el mismo Drive que ya usa a
diario. Esto es distinto del conector interactivo que un asistente usa
dentro de una conversación para buscar/leer/compartir archivos puntuales
— esa vía es de lectura/escritura selectiva y queda registrada en el chat;
la del sync es automática, en segundo plano, y actúa sobre el árbol
completo del repo cada vez que corre (aunque comparte la misma credencial
de fondo).

### 5.3 Por qué es de una sola máquina — regla rígida

El sync compara Drive contra **el árbol de trabajo actual en git**, no
contra "lo que debería existir". Si el árbol de trabajo está en una rama o en
un punto de la historia que no tiene todavía un archivo legítimo (por estar
en otra rama sin mergear, por un checkout intermedio, por trabajo local sin
pushear), el sync interpreta que ese archivo ya no existe y lo manda a
papelera — aunque sí exista en la rama principal.

Esto ya pasó una vez: un cambio de rama para revisar un PR ajeno, seguido de
un commit en esa rama, disparó el hook sobre un árbol que no tenía los
commits más recientes de main, y el sync borró 24 archivos vigentes de Drive
(recuperables de papelera, pero fue un susto real, no hipotético).

Reglas que se derivan de eso:
- Solo corre en la máquina de la persona con autoridad final sobre el repo.
  Nadie más instala el hook ni ejecuta el script.
- Nunca se corre manualmente sin antes confirmar `git status` limpio y estar
  parado en la rama principal, actualizada.
- Si un asistente de IA está trabajando en una rama distinta a la principal
  (por ejemplo revisando o corrigiendo un PR), el hook puede seguir
  disparándose solo porque el `post-commit` no distingue de rama — quien
  opera la máquina debe saber que eso es una condición de riesgo mientras
  dure ese trabajo.

### 5.4 Estado de activación en este repo

**Ya activo.** El ID de la Unidad Compartida de Drive destino es
`0AEVROSTy1h7gUk9PVA` (Unidad "Bedrock IA"). El script vive en
`~/.bedrock-tools/bedrock_drive_sync.py`, las credenciales OAuth en
`~/.bedrock-tools/oauth_client.json` y `~/.bedrock-tools/token.json` (sección
5.2). Falta únicamente exportar `BEDROCK_REPO` y `BEDROCK_DRIVE_SHARED_DRIVE_ID`
en el perfil de shell de esta máquina, y replicar el hook `post-commit` local
(no versionado) — instrucciones completas al final del propio script.

### 5.5 Nota histórica — intento de cuenta de servicio con Domain-Wide Delegation

El 21 de septiembre de 2026 se intentó el diseño alternativo de una cuenta de
servicio (`robot-claude@bedrock-ia-integrations.iam.gserviceaccount.com`) con
Domain-Wide Delegation, que habría dado acceso a **todo el Drive** de
`tualiado@bedrock.com.co` (no solo la Unidad Compartida del espejo) — una
ampliación de riesgo aceptada conscientemente en su momento. Ese diseño
quedó descartado el 22 de septiembre al descubrir que la política de
organización `iam.disableServiceAccountKeyCreation` bloquea la generación de
la clave JSON que ese mecanismo requería. Se optó por el diseño de la
sección 5.2 en su lugar, que es de hecho más simple y evita crear una
identidad separada con alcance ampliado. La Unidad Compartida y la
delegación ya configuradas en admin.google.com para esa cuenta de servicio
quedan sin uso — se pueden desactivar si se quiere limpiar, no son
necesarias para el mecanismo vigente.

### 5.6 Incidente — el sync subió credenciales OAuth reales a Drive (22 sep 2026)

En la primera corrida real del script (tras corregir el diseño de la sección
5.2), el sync subió a la Unidad Compartida `Herramientas/mcp-servers/credentials/token.json`
y `oauth_client.json` — las credenciales OAuth reales del usuario (con scope
de Gmail, Drive, Calendar, Sheets, Tasks y Docs). Se detectó mirando el log
en tiempo real, el proceso se detuvo de inmediato, y ambos archivos se
eliminaron permanentemente (no solo papelera) de la Unidad Compartida tras
confirmar por API directa que sí se habían subido (la herramienta MCP de
búsqueda no los mostraba por retraso de indexación — no es fiable para
confirmar ausencia). El usuario decidió no rotar el token dado que la
Unidad Compartida no tenía otros miembros con acceso en ese lapso.

**Causa raíz:** `walk_repo_files()` recorría el disco con `os.walk()` y
mantenía su propia lista de exclusión a mano (`ALWAYS_IGNORE`), que nunca
incluyó `credentials/` — ignoraba por completo el `.gitignore` real del
repo, que sí protege esa carpeta para git.

**Corrección:** `walk_repo_files()` ahora usa `git ls-files --cached --others
--exclude-standard` como fuente de la lista de archivos a sincronizar, en
vez de recorrer el disco. Esto hereda automáticamente cualquier regla de
`.gitignore` presente o futura — no depende de mantener una segunda lista
de exclusiones sincronizada a mano. Cualquier carpeta que se agregue a
`.gitignore` en el futuro queda protegida también del espejo a Drive sin
tocar el script.

**Regla derivada:** antes de instalar el hook `post-commit` para que esto
corra automático en cada commit, se probó manualmente al menos una vez con
el log visible en tiempo real — no se activa un mecanismo automático de
escritura sobre un sistema compartido sin haber visto al menos una corrida
completa y limpia primero.

## 6. Herramientas

`Herramientas/skills-y-plugins/README.md` mantiene, por cada skill o plugin
instalado, qué hace, cuándo se activa, y desde qué marketplace viene. Nada se
instala desde un enlace sin verificar su origen — el marketplace se agrega
por `owner/repo` de GitHub, y solo después de confirmar que el repositorio es
el que dice ser.

## 7. Git (si el repo lo usa más de una persona)

Cada tarea en su rama `<slug>-<número>-<descripción-corta>`. Commits con el
identificador de la tarea. Nunca `git add -A` ni `git add .` — archivos uno
por uno. PR hacia main con revisión obligatoria; nadie mergea su propio
trabajo salvo que sea la única persona con autoridad de aprobación.

## 8. Reglas técnicas — orca linear (equipo BEDROCK)

- Usa `state`, no `status`, para cambiar el estado de un issue — `status` no da error, inserta el valor como texto basura en la descripción.
- Antes de `create` / `save-issue` / `status set`, verifica el nombre exacto del parámetro con `orca linear <comando> --help`.
- Para agregar una etiqueta sin tocar las existentes, usa `label add` — `label set` reemplaza el conjunto completo.
- En `list-issues`, omite el selector de campos si no estás seguro del nombre exacto — un nombre inválido tumba toda la consulta.
- Las relaciones entre issues se acumulan. Para quitar una, pídelo explícito con `relation remove`.
- No existe borrado real de issues en `orca linear` — lo más cercano es `status set --to Canceled`. Un borrado real requiere la UI de Linear.

### 8.1 Gotchas

- Edición parcial de descripción con ancla: el ancla debe coincidir EXACTAMENTE una vez en el texto, o la operación se aborta completa.

Detalle y razones de cada regla (histórico, promovido el 2026-08-30): memoria `_DEPRECATED_2026-08-30_linear-bedrock-api-gotchas`.
