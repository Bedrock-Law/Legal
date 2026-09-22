# Instalación de los skills

Los skills viven en `~/.claude/skills/<nombre>/SKILL.md`. Cada uno es una carpeta con su `SKILL.md` y los archivos que necesite.

## Pasos

1. Crear la carpeta de skills, si no existe:

```
mkdir -p ~/.claude/skills
```

2. Copiar los dos skills de esta carpeta:

```
cp -R humanizar-texto ~/.claude/skills/
cp -R llm-council ~/.claude/skills/
cp -R bedrock-docs ~/.claude/skills/
chmod +x ~/.claude/skills/bedrock-docs/assets/*.sh
```

3. Verificar que quedaron:

```
ls ~/.claude/skills/
```

Deberías ver `humanizar-texto`, `llm-council` y `bedrock-docs`.

4. Confirmar que Claude Code los reconoce: en una sesión nueva, escribir `/` y buscarlos en la lista de skills disponibles. Si no aparecen, cerrar y reabrir la sesión.

## Qué hace cada uno

**humanizar-texto.** Se aplica solo, en silencio, mientras se redacta cualquier texto. No hay que invocarlo. Su función es que ningún texto salga con las señales de escritura de máquina. La única vez que produce una salida propia es cuando se le pide expresamente depurar un texto ya escrito: ahí entrega la tabla de hallazgos, el texto corregido y el conteo.

**bedrock-docs.** Se aplica solo al pedir un documento, una propuesta, un PDF, un Word o una página con la identidad de Bedrock. Genera las tres salidas desde un mismo archivo Markdown. Requiere pandoc, XeLaTeX y python3; para verificar el render, LibreOffice y Poppler. El detalle de instalación está en `../INSTALACION-COMPLETA.md`.

**llm-council.** Se invoca con `/llm-council` seguido de la pregunta, o pidiendo que se convoque el consejo. Manda la pregunta a cuatro modelos por separado, les hace revisar y rankear las respuestas de los demás de forma anónima, y un modelo presidente sintetiza una sola respuesta final. Requiere que la herramienta `Workflow` esté disponible en el entorno.

Para llm-council, la pregunta que se le pasa tiene que ser autocontenida: los miembros del consejo no ven la conversación, solo lo que se les manda.

## Configuración del consejo

En `llm-council/council-workflow.js` se editan dos cosas:

- `COUNCIL` — los asientos del consejo y qué modelo ocupa cada uno.
- `CHAIRMAN` — el modelo que sintetiza la respuesta final.

Si un modelo de la lista no está disponible en tu plan, cámbialo ahí o quita el asiento.
