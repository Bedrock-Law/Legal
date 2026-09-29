#!/bin/bash
# Loop de redaccion — señales de escritura de IA (catalogo de humanizar-texto)
# Uso: bash verificar_redaccion.sh <archivo.md>
#
# Verifica FORMA, no contenido. El loop de contenido normativo es otro script.

DOC="$1"
[ -f "$DOC" ] || { echo "FALLO: no existe $DOC"; exit 1; }

FALLOS=0
ok()   { echo "  [OK]     $1"; }
fail() { echo "  [FALLA]  $1"; FALLOS=$((FALLOS+1)); }

# La tabla de control de versiones describe lo que se corrigio y puede nombrar
# giros que el cuerpo ya no usa. No se evalua como redaccion del documento.
CUERPO=$(mktemp); trap 'rm -f "$CUERPO"' EXIT
sed '/^# Control de versiones/,$d' "$DOC" > "$CUERPO"

# Señal que no debe aparecer
senal() {
  local patron="$1"; local etiqueta="$2"
  local n
  n=$(grep -c -i -E -- "$patron" "$CUERPO" 2>/dev/null); n=${n:-0}
  if [ "$n" -gt 0 ]; then
    fail "$etiqueta — $n linea(s)"
    grep -n -i -E -o -- ".\{0,40\}$patron.\{0,40\}" "$CUERPO" | head -3 | sed 's/^/           L/'
  else
    ok "$etiqueta"
  fi
}

# Reporta sin fallar — exige criterio del abogado
aviso() {
  local patron="$1"; local etiqueta="$2"
  local n
  n=$(grep -c -i -E -- "$patron" "$CUERPO" 2>/dev/null); n=${n:-0}
  if [ "$n" -gt 0 ]; then
    echo "  [AVISO]  $etiqueta — $n"
  else
    ok "$etiqueta — ninguno"
  fi
}

echo "=================================================="
echo "LOOP DE REDACCION — $(basename "$DOC")"
echo "Lineas: $(wc -l < "$DOC" | tr -d ' ')  Palabras: $(wc -w < "$DOC" | tr -d ' ')"
echo "=================================================="

echo
echo "1. Vocabulario delator"
echo "----------------------"
senal "momento decisivo"                    "Sin 'momento decisivo'"
senal "pilar fundamental|piedra angular"    "Sin 'pilar fundamental' / 'piedra angular'"
senal "panorama en evoluci|panorama actual" "Sin 'panorama en evolucion'"
senal "rica herencia|rica tradici"          "Sin 'rica herencia'"
senal "vibrante"                            "Sin 'vibrante'"
senal "enclavado en"                        "Sin 'enclavado en'"
senal "un testimonio de|testimonio del compromiso" "Sin 'un testimonio de'"
senal "en el marco de un contexto"          "Sin 'en el marco de un contexto mas amplio'"
senal "\bdelve\b|tapestry|pivotal|underscore|showcasing|fostering" "Sin vocabulario delator en ingles"
senal "cabe (destacar|resaltar|mencionar)"  "Sin 'cabe destacar / resaltar'"
senal "es importante (destacar|resaltar|senalar|señalar)" "Sin 'es importante destacar'"

echo
echo "2. Rodeos del verbo ser y tener"
echo "-------------------------------"
senal "se erige como"                       "Sin 'se erige como'"
senal "funciona como un|funciona como el"   "Sin 'funciona como' (deberia ser 'es')"
senal "sirve como"                          "Sin 'sirve como'"
senal "se posiciona como"                   "Sin 'se posiciona como'"
senal "constituye un elemento"              "Sin 'constituye un elemento de'"
senal "ostenta"                             "Sin 'ostenta' (deberia ser 'tiene')"
senal "alberga"                             "Sin 'alberga'"

echo
echo "3. Paralelismos negativos"
echo "-------------------------"
senal "no s[oó]lo .{1,80} sino"             "Sin 'no solo X sino Y'"
senal "lejos de ser"                        "Sin 'lejos de ser X, es Y'"
senal "m[aá]s que un[ao]? .{1,40}, es"      "Sin 'mas que X, es Y'"

echo
echo "4. Gerundios que simulan analisis al cierre"
echo "-------------------------------------------"
senal ", destacando"                        "Sin ', destacando'"
senal ", reflejando"                        "Sin ', reflejando'"
senal ", subrayando"                        "Sin ', subrayando'"
senal ", contribuyendo a"                   "Sin ', contribuyendo a'"
senal ", consolidando"                      "Sin ', consolidando'"
senal ", garantizando as[ií]"               "Sin ', garantizando asi'"
senal ", permitiendo as[ií]"                "Sin ', permitiendo asi'"

echo
echo "5. Atribuciones vagas"
echo "---------------------"
senal "los expertos (senalan|señalan|coinciden|recomiendan)" "Sin 'los expertos senalan'"
senal "informes del sector|diversos an[aá]lisis"             "Sin 'informes del sector'"
senal "se ha documentado ampliamente|es ampliamente"         "Sin 'se ha documentado ampliamente'"
senal "seg[uú]n estudios|diversos estudios"                  "Sin 'segun estudios'"
senal "la doctrina (mayoritaria )?(coincide|senala|señala)"  "Sin 'la doctrina coincide' sin cita"

echo
echo "6. Garantias enlatadas"
echo "----------------------"
senal "se preserv[oó] toda|preserv[eé] toda"    "Sin 'se preservo toda la informacion'"
senal "cumple (con )?todas las pol[ií]ticas"    "Sin 'cumple todas las politicas'"
senal "debidamente citado|debidamente verificado" "Sin 'debidamente citado'"
senal "de manera exhaustiva|de forma exhaustiva"  "Sin 'de manera exhaustiva'"

echo
echo "7. Cierres de plantilla"
echo "-----------------------"
senal "pese a sus logros|a pesar de sus logros"  "Sin 'pese a sus logros'"
senal "perspectivas futuras|mirando hacia el futuro" "Sin seccion de perspectivas futuras"
senal "en conclusi[oó]n|en resumen, "            "Sin cierre de plantilla"
senal "en definitiva"                            "Sin 'en definitiva'"

echo
echo "8. Basura de marcado y tipografia"
echo "---------------------------------"
senal "\[oaicite|contentReference|\[cite:|\[span_|turn[0-9]+search" "Sin basura de marcado"
COMILLAS=$(LC_ALL=C grep -c -P '[\x{201C}\x{201D}\x{2018}\x{2019}]' "$CUERPO" 2>/dev/null); COMILLAS=${COMILLAS:-0}
[ "$COMILLAS" = "0" ] && ok "Sin comillas tipograficas" || fail "Comillas tipograficas en $COMILLAS linea(s)"
INVIS=$(LC_ALL=C grep -c -P '[\x{00AD}\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2069}\x{FEFF}]' "$CUERPO" 2>/dev/null); INVIS=${INVIS:-0}
[ "$INVIS" = "0" ] && ok "Sin caracteres invisibles" || fail "Caracteres invisibles en $INVIS linea(s)"
EMOJI=$(LC_ALL=C grep -c -P '[\x{1F300}-\x{1FAFF}\x{2700}-\x{27BF}\x{2600}-\x{26FF}]' "$CUERPO" 2>/dev/null); EMOJI=${EMOJI:-0}
[ "$EMOJI" = "0" ] && ok "Sin emojis" || fail "Emojis en $EMOJI linea(s)"

echo
echo "9. Rastros de asistencia automatizada"
echo "-------------------------------------"
senal "Co-Authored-By|noreply@anthropic"     "Sin atribucion de commit"
senal "\bClaude\b|Anthropic"                 "Sin mencion de la herramienta"
senal "humanizar-texto|estilo-bedrock"       "Sin nombres de skills internos"
senal "como modelo de lenguaje|como asistente" "Sin autorreferencia de modelo"

echo
echo "10. Formato — exige criterio, no falla automatica"
echo "-------------------------------------------------"
NEG=$(grep -o -E '\*\*[^*]+\*\*' "$CUERPO" 2>/dev/null | wc -l | tr -d ' ')
PAL=$(wc -w < "$CUERPO" | tr -d ' ')
echo "  [DATO]   Negrillas: $NEG sobre $PAL palabras"
echo "           En estos documentos la negrilla marca terminos definidos"
echo "           (FACTUS, EL RESELLER, LOS SERVICIOS). Eso es deliberado."
echo "           Revisar que no haya negrilla sobre terminos corrientes."
LISTA_NEG=$(grep -c -E '^- \*\*[^*]+:\*\*' "$CUERPO" 2>/dev/null); LISTA_NEG=${LISTA_NEG:-0}
echo "  [DATO]   Listas con encabezado en negrilla: $LISTA_NEG"
echo "           El catalogo desaconseja convertir todo en 'encabezado: descripcion'."
echo "           En clausulado tiene funcion de navegacion. Criterio del abogado."
# Detecta Title Case incluso con numeracion delante ("3.1 Objeto de los Servicios").
# No marca la mayuscula sostenida ("1. DATOS GENERALES"), que es convencion
# del clausulado, ni los nombres propios sueltos.
TITLECASE='^#{1,3} ([0-9]+(\.[0-9]+)*\.? )?[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,}( [a-záéíóúñ]+)* [A-ZÁÉÍÓÚÑ][a-záéíóúñ]{2,}'
NT=$(grep -c -E "$TITLECASE" "$CUERPO" 2>/dev/null); NT=${NT:-0}
if [ "$NT" -gt 0 ]; then
  echo "  [AVISO]  Titulos con mayuscula en cada palabra: $NT"
  grep -n -E "$TITLECASE" "$CUERPO" | head -6 | sed 's/^/           L/'
else
  ok "Titulos sin mayuscula en cada palabra"
fi

echo
echo "=================================================="
if [ "$FALLOS" -eq 0 ]; then
  echo "RESULTADO: APROBADO — 0 señales automatizables"
else
  echo "RESULTADO: $FALLOS señal(es) por corregir"
fi
echo
echo "Lo que este script NO puede verificar y exige lectura:"
echo "  - Regla de tres: trios de adjetivos o listas de tres por inercia."
echo "  - Variacion lexica forzada: sinonimos usados para no repetir."
echo "  - Tono promocional donde corresponde tono juridico."
echo "  - Parrafos que afirman sin respaldo verificable."
echo "=================================================="
exit $FALLOS
