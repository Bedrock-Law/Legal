#!/bin/bash
# Verificación del Contrato Factus v2 — cuatro pruebas
# Uso: bash verificar_contrato_v2.sh <ruta-del-md>

DOC="$1"
[ -f "$DOC" ] || { echo "FALLO: no existe $DOC"; exit 1; }

FALLOS=0
ok()   { echo "  [OK]     $1"; }
fail() { echo "  [FALLA]  $1"; FALLOS=$((FALLOS+1)); }

# El cuerpo del documento, sin la tabla de control de versiones. Esa tabla
# nombra a proposito las normas que se retiraron, y esa trazabilidad es
# justamente lo que el abogado revisor necesita leer: no es contaminacion.
CUERPO=$(mktemp)
sed '/^# Control de versiones/,$d' "$DOC" > "$CUERPO"
trap 'rm -f "$CUERPO"' EXIT

# Busca un término que NO debe aparecer en el cuerpo
prohibido() {
  local termino="$1"; local etiqueta="$2"
  local n
  n=$(grep -c -i -- "$termino" "$CUERPO" 2>/dev/null); n=${n:-0}
  if [ "$n" -gt 0 ]; then
    fail "$etiqueta — aparece $n vez/veces"
    grep -n -i -- "$termino" "$CUERPO" | head -3 | sed 's/^/           L/'
  else
    ok "$etiqueta"
  fi
}

# Reporta sin fallar — requiere juicio humano
revisar() {
  local termino="$1"; local etiqueta="$2"
  local n
  n=$(grep -c -i -- "$termino" "$CUERPO" 2>/dev/null); n=${n:-0}
  if [ "$n" -gt 0 ]; then
    echo "  [AVISO]  $etiqueta — aparece $n vez/veces"
    grep -n -i -- "$termino" "$CUERPO" | head -3 | sed 's/^/           L/'
  else
    ok "$etiqueta — no aparece"
  fi
}

# Busca un término que SÍ debe aparecer
requerido() {
  local termino="$1"; local etiqueta="$2"
  if grep -q -i -- "$termino" "$DOC" 2>/dev/null; then
    ok "$etiqueta"
  else
    fail "$etiqueta — AUSENTE"
  fi
}

echo "=============================================="
echo "VERIFICACION CONTRATO FACTUS v2"
echo "Archivo: $(basename "$DOC")"
echo "Lineas: $(wc -l < "$DOC" | tr -d ' ')  Palabras: $(wc -w < "$DOC" | tr -d ' ')"
echo "=============================================="

echo
echo "PRUEBA 1 — Sin rastros del contrato ejemplo (Skyedge/Mono)"
echo "----------------------------------------------------------"
prohibido "MONO"                      "Sin 'MONO'"
prohibido "mono\.la"                  "Sin dominio mono.la"
prohibido "cuentamono"                "Sin cuentamono"
prohibido "SKYEDGE"                   "Sin 'SKYEDGE'"
prohibido "skyedgesas"                "Sin dominio skyedgesas"
prohibido "Poveda"                    "Sin rep. legal de Mono"
prohibido "Aranguren"                 "Sin rep. legal de Skyedge"
prohibido "901\.398\.069"             "Sin NIT de Mono"
prohibido "901889110"                 "Sin NIT de Skyedge"
prohibido "EL CONTRATANTE"            "Sin 'EL CONTRATANTE' (debe ser RESELLER)"
prohibido "BANCO PROVEEDOR"           "Sin 'BANCO PROVEEDOR'"
prohibido "nano-cr"                   "Sin nano-creditos"
prohibido "dispersion"                "Sin 'dispersion' (termino de pagos)"
prohibido "tasa de usura"             "Sin tasa de usura"
prohibido "captacion ilegal"          "Sin captacion ilegal de recursos"
prohibido "fondeo"                    "Sin 'fondeo'"
revisar   "Superintendencia Financiera" "Superfinanciera (Factus responde a DIAN — revisar si la mencion es necesaria)"
prohibido "Ley 1266"                  "Sin Ley 1266 (centrales de riesgo)"

echo
echo "PRUEBA 1b — Sin rastros de asistencia automatizada"
echo "--------------------------------------------------"
prohibido "Co-Authored-By"            "Sin atribucion de commit"
prohibido "Claude"                    "Sin mencion de Claude"
prohibido "Anthropic"                 "Sin mencion de Anthropic"
prohibido "noreply@"                  "Sin correo de atribucion"
prohibido "humanizar-texto"           "Sin mencion de herramientas internas"
prohibido "\[oaicite\|contentReference\|\[cite:" "Sin basura de marcado"

echo
echo "PRUEBA 2 — Cobertura de lo acordado en reunion (26 sep)"
echo "-------------------------------------------------------"
requerido "retracto"                  "Politica de retracto"
requerido "Ley 1480"                  "Ley 1480/2011 (Estatuto Consumidor)"

# Art. 47 Ley 1480/2011 fija DOS plazos distintos:
#   - para retractarse: cinco (5) dias HABILES
#   - para devolver el dinero: treinta (30) dias CALENDARIO
# Solo el primero es falla si aparece en calendario. Se excluyen las lineas
# de reembolso, que legitimamente van en calendario.
EXCL="reintegr|reembols|devolu|devolv|devuelv|restitu|pago de las sumas"
RETRACTO_MAL=$(grep -i -- "retract" "$DOC" 2>/dev/null \
  | grep -v -i -E -- "$EXCL" \
  | grep -c -i -- "d[ií]as calendario"); RETRACTO_MAL=${RETRACTO_MAL:-0}
if [ "$RETRACTO_MAL" -gt 0 ]; then
  fail "Plazo para retractarse en dias CALENDARIO — art. 47 Ley 1480/2011 exige HABILES"
  grep -n -i -- "retract" "$DOC" | grep -v -i -E -- "$EXCL" \
    | grep -i -- "d[ií]as calendario" | head -3 | sed 's/^/           L/'
else
  ok "Plazo para retractarse en dias habiles (art. 47 Ley 1480/2011)"
fi
requerido "2439"                      "Ley 2439/2024 (comercio electronico)"
requerido "certificado digital"       "Certificados digitales"
requerido "sandbox\|pruebas"          "Entorno de pruebas"
requerido "Bolsa\|Multifacturador"    "Modalidad Bolsa Multifacturador"
requerido "Paquete\|paquetes"         "Modalidad Paquetes Individuales"
requerido "firma electr"              "Firma electronica"
requerido "527"                       "Ley 527/1999 (mensajes de datos)"
requerido "2364"                      "Decreto 2364/2012 (firma electronica)"
prohibido "1960"                      "Sin Ley 1960/2019 (es de CARRERA ADMINISTRATIVA, no de lavado de activos)"
prohibido "000019"                    "Sin Resolucion DIAN 000019/2012 (no es el regimen vigente)"
prohibido "1796"                      "Sin Resolucion DIAN 1796/2014 (no es el regimen de nomina)"
prohibido "1116"                      "Sin Decreto 1116/2013 (intereses moratorios: art. 884 C.Co.)"
prohibido "Procedimiento Civil"       "Sin Codigo de Procedimiento Civil (derogado por Ley 1564/2012)"
prohibido "13246"                     "Sin Concepto DIAN 13246/2025 (trata requisitos de software, no habilitacion)"

# Ley 2439/2024 art. 3 modifico el art. 47 de la Ley 1480: la devolucion del
# dinero por retracto es de QUINCE dias calendario, no treinta.
DEV_MAL=$(grep -i -E -- "retract|devoluci" "$CUERPO" 2>/dev/null \
  | grep -c -i -E -- "treinta \(30\) d[ií]as|30 d[ií]as calendario"); DEV_MAL=${DEV_MAL:-0}
if [ "$DEV_MAL" -gt 0 ]; then
  fail "Devolucion del retracto en 30 dias — Ley 2439/2024 la fijo en QUINCE dias calendario"
  grep -n -i -E -- "retract|devoluci" "$CUERPO" | grep -i -E -- "treinta \(30\)|30 d[ií]as calendario" | head -3 | sed 's/^/           L/'
else
  ok "Devolucion del retracto en 15 dias calendario (Ley 2439/2024)"
fi
requerido "000165"                    "Resolucion DIAN 000165/2023 (facturacion vigente)"
requerido "Control de versiones\|control de versiones\|Versi[oó]n \[" "Identificacion de version"
requerido "Firma\b"                   "Bloque de firmas"
requerido "1581"                      "Ley 1581/2012 (datos personales)"
requerido "confidencial"              "Clausula de confidencialidad"
requerido "WhatsApp"                  "Canal WhatsApp"
requerido "cliente final\|CLIENTE FINAL\|el cliente\|EL CLIENTE" "Identifica al cliente"

echo
echo "PRUEBA 3 — SLA integrados"
echo "-------------------------"
requerido "99"                        "Disponibilidad 99%"
requerido "P1\|Critica\|Crítica"      "Prioridad critica"
requerido "P2\|Alta"                  "Prioridad alta"
requerido "P3\|Media"                 "Prioridad media"
requerido "P4\|Baja"                  "Prioridad baja"
requerido "30 minutos"                "Tiempo respuesta 30 min (P1)"
requerido "lunes a viernes"           "Horario habil lunes-viernes"
requerido "8:00"                      "Hora inicio 8:00 a.m."
requerido "6:00"                      "Hora cierre 6:00 p.m."
requerido "mantenimiento"             "Ventana de mantenimiento"
requerido "48 horas\|cuarenta y ocho" "Preaviso 48h de mantenimiento"
requerido "indisponibilidad"          "Definicion de indisponibilidad"

echo
echo "PRUEBA 4 — Redaccion aplicable a Factus"
echo "---------------------------------------"
requerido "FACTUS"                    "Termino definido FACTUS"
requerido "RESELLER\|reseller\|distribuidor" "Identifica al intermediario"
requerido "901\.724\.254"             "NIT Factus 901.724.254-1"
requerido "San Gil"                   "Domicilio San Gil"
requerido "Hern.ndez Reyes"           "Representante legal Factus"
requerido "DIAN"                      "Autoridad DIAN"
requerido "000165"                    "Resolucion DIAN 000165/2023"
requerido "habilitaci[óo]n\|habilitad"  "Acredita la habilitacion DIAN de FACTUS"
requerido "Factura\|factura"          "Facturacion electronica"
requerido "N.mina"                    "Nomina electronica"
requerido "Radian"                    "Eventos Radian"
requerido "Documento.* [Ss]oporte"    "Documentos soporte"
requerido "radicaci\|transmisi\|transmit"  "Radicacion o transmision ante DIAN"

echo
echo "PRUEBA 4b — Elementos propios del tipo de documento"
echo "---------------------------------------------------"
case "$(basename "$DOC")" in
  *Contrato*)
    echo "  (contrato marco con resellers)"
    requerido "DECLARACIONES"                    "Seccion de declaraciones de las partes"
    requerido "DEFINICIONES\|Definiciones"       "Anexo de definiciones"
    requerido "PAR[ÁA]GRAFO"                     "Paragrafos numerados"
    requerido "[Cc]esi[óo]n"                     "Clausula de cesion"
    requerido "[Nn]otificacion"                  "Clausula de avisos y notificaciones"
    requerido "[Aa]cuerdo [úu]nico\|sustituye cualquier" "Clausula de acuerdo unico"
    requerido "firma"                            "Bloque de firmas"
    ;;
  *TYC*|*TyC*|*Terminos*|*T[eé]rminos*)
    echo "  (terminos y condiciones de adhesion)"
    requerido "adhesi[óo]n"                      "Se declara contrato de adhesion"
    requerido "art[íi]culo 5\|art\. 5"           "Art. 5 Ley 1480 (definicion de adhesion)"
    requerido "37"                               "Art. 37 Ley 1480 (condiciones negociales)"
    requerido "4[23]"                            "Art. 42/43 Ley 1480 (clausulas abusivas)"
    requerido "abusiv"                           "Trata las clausulas abusivas"
    requerido "consumidor"                       "Distingue la calidad de consumidor"
    requerido "acepta"                           "Mecanismo de aceptacion"
    requerido "distribuidor\|RESELLER\|reseller"  "Trata la contratacion por intermediario"
    requerido "retract"                          "Derecho de retracto"
    ;;
esac

echo
echo "PRUEBA 5 — Marcas invisibles y limpieza"
echo "---------------------------------------"
INVIS=$(LC_ALL=C grep -c -P '[\x{00AD}\x{200B}-\x{200F}\x{202A}-\x{202E}\x{2060}-\x{2069}\x{FEFF}]' "$DOC" 2>/dev/null); INVIS=${INVIS:-0}
[ "$INVIS" = "0" ] && ok "Sin caracteres invisibles Unicode" || fail "Caracteres invisibles en $INVIS linea(s)"
PEND=$(grep -c "\[•\]\|TODO\|PENDIENTE POR\|XXX" "$DOC" 2>/dev/null); PEND=${PEND:-0}
[ "$PEND" = "0" ] && ok "Sin marcadores sin resolver" || echo "  [AVISO]  $PEND marcador(es) tipo TODO/XXX — revisar si son campos por diligenciar"

echo
echo "=============================================="
if [ "$FALLOS" -eq 0 ]; then
  echo "RESULTADO: APROBADO — 0 fallas"
else
  echo "RESULTADO: $FALLOS falla(s) por corregir"
fi
echo "=============================================="
exit $FALLOS
