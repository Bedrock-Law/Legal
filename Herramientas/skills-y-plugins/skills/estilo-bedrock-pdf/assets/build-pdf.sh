#!/usr/bin/env bash
# build-pdf.sh — Markdown -> PDF con la identidad de Bedrock.
#
# Uso:
#   bash build-pdf.sh documento.md [salida.pdf]
#
# Requiere pandoc y XeLaTeX. Hace verificación previa y aborta diciendo qué falta.

set -euo pipefail

ASSETS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLANTILLA="$ASSETS/bedrock-doc.latex"
LOGO="$ASSETS/logo-bedrock-horizontal.png"

[ $# -ge 1 ] || { echo "Uso: bash build-pdf.sh documento.md [salida.pdf]" >&2; exit 1; }
DOC="$1"
[ -f "$DOC" ] || { echo "No existe: $DOC" >&2; exit 1; }
OUT="${2:-${DOC%.md}.pdf}"
DOCDIR="$(cd "$(dirname "$DOC")" && pwd)"

# ---- verificación previa ----
falta=()
command -v pandoc  >/dev/null 2>&1 || falta+=("pandoc")
command -v xelatex >/dev/null 2>&1 || falta+=("xelatex (TeX Live)")
if [ ${#falta[@]} -gt 0 ]; then
  cat >&2 <<EOF
✗ Faltan programas para generar el PDF: ${falta[*]}

Instálalos así (macOS con Homebrew):

  brew install pandoc
  brew install --cask basictex

Después de instalar basictex, abre una terminal nueva y añade los paquetes que usa
la plantilla:

  sudo tlmgr update --self
  sudo tlmgr install fontspec titlesec fancyhdr lastpage booktabs tcolorbox \\
    fvextra setspace anyfontsize xcolor geometry colortbl array

Verifica con:  pandoc -v && xelatex --version
EOF
  exit 1
fi

[ -f "$PLANTILLA" ] || { echo "No encuentro la plantilla $PLANTILLA" >&2; exit 1; }
[ -f "$LOGO" ] || { echo "No encuentro el logotipo $LOGO" >&2; exit 1; }

# ---- construcción ----
# Se construye en una carpeta temporal y se mueve, para que correrlo dos veces
# sobre el mismo sitio no deje residuos junto al fuente.
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

OPTS=(-V logo="$LOGO" -V fontsdir="$ASSETS/fonts")

( cd "$DOCDIR" && pandoc "$(basename "$DOC")" \
    --template="$PLANTILLA" \
    --pdf-engine=xelatex \
    "${OPTS[@]}" \
    --resource-path="$DOCDIR:$ASSETS" \
    -o "$TMP/salida.pdf" )

mv "$TMP/salida.pdf" "$OUT"
echo "Listo: $OUT"
echo
echo "Revisa el render antes de entregarlo:"
echo "  pdftoppm -jpeg -r 60 \"$OUT\" pagina && open pagina-1.jpg"
