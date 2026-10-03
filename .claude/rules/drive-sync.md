# Espejo de Drive — mecanismo, acceso y reglas de seguridad

## Qué hace

Un script (`bedrock_drive_sync.py`, fuera del repo, en `~/.bedrock-tools/`) hace
espejo exacto y **unidireccional** repo → Drive hacia **una única Unidad
Compartida**, identificada por su ID fijo. Sube lo nuevo, actualiza lo
modificado (por md5), detecta movimientos y re-parentea sin romper links
compartidos, conserva el formato nativo (no convierte a Google Docs), y
**borra en Drive (a papelera) todo lo que no exista en el repo en ese
momento**. Corre solo desde un hook `post-commit` — no versionado, no
distribuido con el repo — o manualmente.

## Acceso que tiene

El script se autentica como el propio usuario (`tualiado@bedrock.com.co`) vía
OAuth, con scope `https://www.googleapis.com/auth/drive` y la misma credencial
que usa `Herramientas/mcp-servers/drive-mcp/`, copiada en
`~/.bedrock-tools/oauth_client.json` y `~/.bedrock-tools/token.json`. No hay
cuenta de servicio ni identidad separada: actúa con todos los permisos del
usuario, en segundo plano y sobre el árbol completo del repo cada vez que corre.
Es distinto del conector que el asistente usa dentro de una conversación, que es
selectivo y queda registrado en el chat, aunque comparten la credencial de fondo.

Por qué no hay cuenta de servicio: ver el postmortem.

## Por qué es de una sola máquina — regla rígida

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

## Estado de activación en este repo

**Activo desde el 22 de septiembre de 2026.** El hook `post-commit` está
instalado en `.git/hooks/post-commit` (local, no versionado) y exporta él mismo
`BEDROCK_REPO` y `BEDROCK_DRIVE_SHARED_DRIVE_ID`, así que no hace falta
configurarlas en el perfil de shell. El ID de la Unidad Compartida destino es
`0AEVROSTy1h7gUk9PVA` (Unidad "Bedrock IA"). El script vive en
`~/.bedrock-tools/bedrock_drive_sync.py`, las credenciales OAuth en
`~/.bedrock-tools/oauth_client.json` y `~/.bedrock-tools/token.json`, y cada
corrida queda registrada en `~/.bedrock-tools/sync.log`.

Para saber si está activo: `ls .git/hooks/ | grep post-commit`. Si aparece como
`post-commit.disabled`, se desactivó a propósito; ver la última regla de abajo.

## Reglas que dejaron los incidentes

El relato completo de los dos incidentes de septiembre está en
`Herramientas/documentacion-tecnica/postmortem-sync-drive-2026-09.md`.

- La lista de archivos que se sincronizan sale de
  `git ls-files --cached --others --exclude-standard`. Todo lo que esté en
  `.gitignore` queda fuera del espejo. No se mantiene una segunda lista de
  exclusiones a mano.
- Ningún mecanismo automático que escriba sobre un sistema compartido se activa
  sin haber visto antes una corrida completa y limpia, con el log a la vista.
- Para confirmar que un archivo **no** está en Drive se consulta la API
  directamente. El buscador del conector tiene retraso de indexación y no sirve
  para probar ausencia.
- Durante una reorganización que mueva muchos archivos, el hook se desactiva
  (`mv .git/hooks/post-commit .git/hooks/post-commit.disabled`) y se restaura al
  terminar con una corrida manual y el log a la vista, estando en la rama
  principal y con `git status` limpio.
