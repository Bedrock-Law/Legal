#!/bin/bash
# Instala los skills de Bedrock desde el repo hacia ~/.claude/skills/.
#
# La fuente de verdad es Herramientas/skills-y-plugins/skills/. Lo que hay en
# ~/.claude/skills/ es una copia instalada: no se edita ahí, se edita en el repo
# y se vuelve a correr este script.
#
# Uso:
#   bash Herramientas/instalar-skills.sh             muestra los cambios y pide confirmación
#   bash Herramientas/instalar-skills.sh --dry-run   solo muestra qué cambiaría
#   bash Herramientas/instalar-skills.sh --si        instala sin preguntar
#
# Antes de reemplazar un skill instalado que difiere del repo, guarda una copia
# en ~/.claude/_archivo-skills/<skill>-<fecha-hora>/. Nunca borra sin copia.

set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
ORIGEN="$REPO/Herramientas/skills-y-plugins/skills"
DESTINO="$HOME/.claude/skills"
ARCHIVO="$HOME/.claude/_archivo-skills"
MODO="${1:-}"

command -v rsync >/dev/null || { echo "Falta rsync." >&2; exit 1; }
[ -d "$ORIGEN" ] || { echo "No encuentro $ORIGEN" >&2; exit 1; }
mkdir -p "$DESTINO"

pendientes=()
echo "Fuente:  $ORIGEN"
echo "Destino: $DESTINO"
echo
for dir in "$ORIGEN"/*/; do
  nombre="$(basename "$dir")"
  [ -f "$dir/SKILL.md" ] || { echo "  omitido  $nombre (no tiene SKILL.md)"; continue; }
  if [ ! -d "$DESTINO/$nombre" ]; then
    echo "  nuevo    $nombre"
    pendientes+=("$nombre")
  elif diff -rq -x .DS_Store "$dir" "$DESTINO/$nombre" >/dev/null 2>&1; then
    echo "  igual    $nombre"
  else
    echo "  cambia   $nombre"
    diff -rq -x .DS_Store "$dir" "$DESTINO/$nombre" 2>&1 | sed "s|$ORIGEN/||; s|$DESTINO/||; s|^|             |" || true
    pendientes+=("$nombre")
  fi
done

echo
if [ ${#pendientes[@]} -eq 0 ]; then
  echo "Todo instalado coincide con el repo. No hay nada que hacer."
  exit 0
fi
[ "$MODO" = "--dry-run" ] && { echo "Modo de prueba: no se instaló nada."; exit 0; }

if [ "$MODO" != "--si" ]; then
  read -r -p "¿Instalar ${#pendientes[@]} skill(s)? [s/N] " r
  [[ "$r" =~ ^[sS]$ ]] || { echo "Cancelado. No se instaló nada."; exit 0; }
fi

marca="$(date +%Y%m%d-%H%M%S)"
for nombre in "${pendientes[@]}"; do
  if [ -d "$DESTINO/$nombre" ]; then
    mkdir -p "$ARCHIVO"
    cp -R "$DESTINO/$nombre" "$ARCHIVO/$nombre-$marca"
    echo "  copia de lo instalado: $ARCHIVO/$nombre-$marca"
  fi
  rsync -a --delete --exclude .DS_Store "$ORIGEN/$nombre/" "$DESTINO/$nombre/"
  echo "  instalado: $nombre"
done
echo
echo "Listo. Claude Code recarga los skills sin reiniciar la sesión."
