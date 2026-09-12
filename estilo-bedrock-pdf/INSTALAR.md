# Instalar el skill estilo-bedrock-pdf

```
mkdir -p ~/.claude/skills
cp -R estilo-bedrock-pdf ~/.claude/skills/
chmod +x ~/.claude/skills/estilo-bedrock-pdf/assets/*.sh
```

Instalar lo que pide el script de generación:

```
brew install pandoc
brew install --cask basictex
```

Después de instalar basictex, abrir una terminal nueva e instalar los paquetes de LaTeX que usa la plantilla:

```
sudo tlmgr update --self
sudo tlmgr install fontspec titlesec fancyhdr lastpage booktabs tcolorbox \
  fvextra setspace anyfontsize xcolor geometry colortbl array
```

Para verificar el render antes de entregar cualquier documento: `brew install poppler` (trae `pdftoppm`).

Confirmar que quedó: en una sesión nueva de Claude Code, escribir `/` y buscar `estilo-bedrock-pdf` en la lista de skills. Si no aparece, cerrar y reabrir la sesión.

Nexa Bold no viene incluida por ser una fuente comercial con licencia aparte — ver `assets/fonts/nexa-bold-licenciada/LEEME.md`. Mientras tanto, el skill usa Montserrat ExtraBold en ese rol.
