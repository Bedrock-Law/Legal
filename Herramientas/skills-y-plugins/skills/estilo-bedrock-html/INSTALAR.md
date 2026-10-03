# Instalar el skill estilo-bedrock-html

```
mkdir -p ~/.claude/skills
cp -R estilo-bedrock-html ~/.claude/skills/
chmod +x ~/.claude/skills/estilo-bedrock-html/assets/*.sh
```

Instalar lo que pide el script de generación:

```
python3 -m pip install --user Pillow
```

Confirmar que quedó: en una sesión nueva de Claude Code, escribir `/` y buscar `estilo-bedrock-html` en la lista de skills. Si no aparece, cerrar y reabrir la sesión.

## Qué trae

La plantilla ya lleva Tinos y Montserrat embebidas en base64 dentro del propio HTML — no hace falta instalar nada más para que la página se vea igual en cualquier máquina. `build-web.sh` solo incrusta el logotipo (oscuro y blanco) en el archivo final.

Nexa Bold no viene incluida por ser una fuente comercial con licencia aparte. Mientras tanto, el hero de la página usa Montserrat ExtraBold en ese rol — ver la sección de tipografía en `SKILL.md` para activarla cuando haya licencia.
