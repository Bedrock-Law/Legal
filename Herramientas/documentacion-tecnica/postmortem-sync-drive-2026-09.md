# Postmortem — espejo de Drive, septiembre de 2026

Relato histórico de dos episodios del diseño del espejo repo → Drive. Las reglas
que dejaron están en `.claude/rules/drive-sync.md`; este documento conserva el
contexto y las decisiones de criterio que las explican.

## Decisión del 22 de septiembre: acceso como usuario y no como cuenta de servicio

Texto que figuraba en la regla del espejo hasta el 3 de octubre de 2026:

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

## Nota histórica — intento de cuenta de servicio con Domain-Wide Delegation

El 21 de septiembre de 2026 se intentó el diseño alternativo de una cuenta de
servicio (`robot-claude@bedrock-ia-integrations.iam.gserviceaccount.com`) con
Domain-Wide Delegation, que habría dado acceso a **todo el Drive** de
`tualiado@bedrock.com.co` (no solo la Unidad Compartida del espejo) — una
ampliación de riesgo aceptada conscientemente en su momento. Ese diseño
quedó descartado el 22 de septiembre al descubrir que la política de
organización `iam.disableServiceAccountKeyCreation` bloquea la generación de
la clave JSON que ese mecanismo requería. Se optó por el diseño de la
sección «Acceso que tiene» de `.claude/rules/drive-sync.md` en su lugar, que es de hecho más simple y evita crear una
identidad separada con alcance ampliado. La Unidad Compartida y la
delegación ya configuradas en admin.google.com para esa cuenta de servicio
quedan sin uso — se pueden desactivar si se quiere limpiar, no son
necesarias para el mecanismo vigente.

## Incidente — el sync subió credenciales OAuth reales a Drive (22 sep 2026)

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
