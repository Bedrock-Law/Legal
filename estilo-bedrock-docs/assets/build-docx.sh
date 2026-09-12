#!/usr/bin/env bash
# build-docx.sh — Markdown -> .docx nativo editable con la identidad de Bedrock.
#
# Uso:
#   bash build-docx.sh documento.md [salida.docx]
#
# Usa el MISMO archivo fuente que build-pdf.sh: la portada del .docx se arma
# automáticamente desde el encabezado YAML del documento, con los campos
# title, eyebrow, lede, resumen y fineprint.
#
# Requiere pandoc y python3.

set -euo pipefail

ASSETS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REFERENCIA="$ASSETS/bedrock-reference.docx"

[ $# -ge 1 ] || { echo "Uso: bash build-docx.sh documento.md [salida.docx]" >&2; exit 1; }
DOC="$1"
[ -f "$DOC" ] || { echo "No existe: $DOC" >&2; exit 1; }
OUT="${2:-${DOC%.md}.docx}"

falta=()
command -v pandoc  >/dev/null 2>&1 || falta+=("pandoc")
command -v python3 >/dev/null 2>&1 || falta+=("python3")
if [ ${#falta[@]} -gt 0 ]; then
  echo "✗ Faltan programas: ${falta[*]}" >&2
  echo "  brew install pandoc" >&2
  exit 1
fi
[ -f "$REFERENCIA" ] || { echo "No encuentro la plantilla $REFERENCIA" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp "$ASSETS/logo-bedrock-horizontal.png" "$TMP/" 2>/dev/null || true

# ---- Portada armada desde el encabezado YAML ----
python3 - "$DOC" "$TMP/fuente.md" <<'PYEOF'
import re, sys

origen, destino = sys.argv[1], sys.argv[2]
texto = open(origen, encoding="utf-8").read()

m = re.match(r"\A---\n(.*?)\n---\n+(.*)\Z", texto, re.S)
if not m:
    sys.exit("El documento no tiene encabezado YAML. La portada del .docx se arma con él.")
cabecera, cuerpo = m.group(1), m.group(2)

def campo(nombre):
    r = re.search(r'^%s:\s*"?(.*?)"?\s*$' % nombre, cabecera, re.M)
    return r.group(1).strip() if r else ""

def lista(nombre):
    r = re.search(r'^%s:\s*\n((?:\s*-\s+.*\n?)+)' % nombre, cabecera, re.M)
    if not r:
        return []
    return [re.sub(r'^\s*-\s+"?(.*?)"?\s*$', r"\1", l) for l in r.group(1).splitlines() if l.strip()]

logos = '![](logo-bedrock-horizontal.png){width=1.85in height=0.36in}'

partes = [logos, ""]
def bloque(estilo, contenido):
    partes.extend(['::: {custom-style="%s"}' % estilo, contenido, ":::", ""])

if campo("eyebrow"):  bloque("Eyebrow", campo("eyebrow"))
if campo("title"):    bloque("PortadaTitulo", campo("title"))
bloque("LineaAcento", "&nbsp;")
if campo("lede"):     bloque("Lede", campo("lede"))

items = lista("resumen")
if items:
    bloque("ResumenTitulo", campo("resumentitulo") or "Resumen del documento")
    for it in items:
        bloque("ResumenItem", it)

fp = campo("fineprint")
if fp:
    bloque("FinePrint", fp)

partes.append('```{=openxml}')
partes.append('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
partes.append('```')
partes.append("")

open(destino, "w", encoding="utf-8").write("\n".join(partes) + cuerpo)
print("portada armada desde el encabezado YAML")
PYEOF

DOCDIR="$(cd "$(dirname "$DOC")" && pwd)"
pandoc "$TMP/fuente.md" -o "$TMP/salida.docx" \
  --reference-doc="$REFERENCIA" \
  --from=markdown+bracketed_spans+raw_attribute+fenced_divs \
  --resource-path="$TMP:$DOCDIR:$ASSETS" \
  --wrap=none

mv "$TMP/salida.docx" "$OUT"
echo "Listo: $OUT"
echo
echo "Revisa el render antes de entregarlo:"
echo "  soffice --headless --convert-to pdf \"$OUT\" && pdftoppm -jpeg -r 80 \"${OUT%.docx}.pdf\" pagina"
