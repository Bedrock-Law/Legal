# Instalar el skill estilo-bedrock-docs

```
mkdir -p ~/.claude/skills
cp -R estilo-bedrock-docs ~/.claude/skills/
chmod +x ~/.claude/skills/estilo-bedrock-docs/assets/*.sh
```

Instalar lo que pide el script de generación:

```
brew install pandoc
```

Para verificar el render antes de entregar cualquier documento: LibreOffice y `brew install poppler` (trae `pdftoppm`).

Confirmar que quedó: en una sesión nueva de Claude Code, escribir `/` y buscar `estilo-bedrock-docs` en la lista de skills. Si no aparece, cerrar y reabrir la sesión.

## Para que Word muestre Tinos y Montserrat tal cual

Las tipografías no van embebidas dentro del `.docx`. Instala los archivos de `assets/fonts/` en el sistema (doble clic en cada uno → Instalar) antes de abrir cualquier documento generado con este skill; si no, Word sustituye por una fuente similar.

Nexa Bold no viene incluida por ser una fuente comercial con licencia aparte — ver `assets/fonts/nexa-bold-licenciada/LEEME.md`.
