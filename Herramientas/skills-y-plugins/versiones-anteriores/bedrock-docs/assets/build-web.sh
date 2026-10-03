#!/usr/bin/env bash
# build-web.sh — incrusta el logotipo en una página HTML y produce el archivo final
# autocontenido, listo para subir a un servidor o enviar como adjunto.
#
# Uso:
#   bash build-web.sh pagina.fuente.html [salida.html]
#
# El archivo de entrada debe traer los marcadores __LOGO_OSCURO__ y __LOGO_BLANCO__
# dentro de las variables de CSS, como los trae plantilla-web.html. El script los
# reemplaza por el logotipo en base64: la versión oscura para fondos claros y la
# clara para fondos oscuros.
#
# Requiere python3 con Pillow.

set -euo pipefail

ASSETS="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

[ $# -ge 1 ] || { echo "Uso: bash build-web.sh pagina.fuente.html [salida.html]" >&2; exit 1; }
FUENTE="$1"
[ -f "$FUENTE" ] || { echo "No existe: $FUENTE" >&2; exit 1; }
OUT="${2:-${FUENTE%.fuente.html}.html}"
[ "$OUT" = "$FUENTE" ] && OUT="${FUENTE%.html}-final.html"

command -v python3 >/dev/null 2>&1 || { echo "✗ Falta python3" >&2; exit 1; }
python3 -c "import PIL" 2>/dev/null || {
  echo "✗ Falta Pillow, que se usa para escalar el logotipo." >&2
  echo "  Instálalo con:  python3 -m pip install --user Pillow" >&2
  exit 1
}

ASSETS="$ASSETS" FUENTE="$FUENTE" OUT="$OUT" python3 <<'PYEOF'
import base64, io, os, sys
from PIL import Image

assets = os.environ["ASSETS"]
fuente = os.environ["FUENTE"]
salida = os.environ["OUT"]

logo = os.path.join(assets, "logo-bedrock.png")
if not os.path.exists(logo):
    sys.exit("No encuentro " + logo)

def b64(im, ancho=620):
    if im.width > ancho:
        im = im.resize((ancho, max(1, int(im.height * ancho / im.width))), Image.LANCZOS)
    buf = io.BytesIO(); im.save(buf, format="PNG", optimize=True)
    return base64.b64encode(buf.getvalue()).decode()

oscuro = Image.open(logo).convert("RGBA")

# versión clara: la tinta pasa a blanco y se conserva la transparencia
px = oscuro.load()
claro = Image.new("RGBA", oscuro.size, (0, 0, 0, 0))
pc = claro.load()
for y in range(oscuro.height):
    for x in range(oscuro.width):
        r, g, b, a = px[x, y]
        if a > 8:
            pc[x, y] = (255, 255, 255, a)

texto = open(fuente, encoding="utf-8").read()
faltan = [m for m in ("__LOGO_OSCURO__", "__LOGO_BLANCO__") if m not in texto]
if faltan:
    sys.exit("El archivo no tiene los marcadores: " + ", ".join(faltan))

texto = texto.replace("__LOGO_OSCURO__", b64(oscuro)).replace("__LOGO_BLANCO__", b64(claro))
open(salida, "w", encoding="utf-8").write(texto)
print("Listo: %s (%d KB)" % (salida, len(texto.encode()) // 1024))
PYEOF

echo
echo "Verifica antes de entregarla:"
echo "  1. Ábrela en el navegador y recorre la página completa."
echo "  2. Comprueba que no haya desplazamiento horizontal del cuerpo en móvil."
echo "  3. Desactiva JavaScript y confirma que el contenido siga visible."
echo "  4. Imprime a PDF y revisa que se expandan los paneles y el acordeón."
