#!/bin/bash

# Script para generar PDFs desde archivos Markdown con estilo Bedrock
# Uso: bash GENERAR_PDFS.sh

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     GENERADOR DE PDFS - ESTILO BEDROCK                        ║"
echo "║     Caso: Jhonatan Londoño vs Serlogísticos                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

CARPETA="/Users/juanma/Documents/Bedrock IA/propuestas-comerciales/jhonatan-londono-2025"

# Verificar que existen los archivos HTML
echo "✓ Verificando archivos HTML convertidos..."

if [ -f "$CARPETA/ANALISIS_BEDROCK_JHONATAN_LONDONO.html" ]; then
    echo "  ✓ ANALISIS_BEDROCK_JHONATAN_LONDONO.html"
else
    echo "  ✗ FALTA: ANALISIS_BEDROCK_JHONATAN_LONDONO.html"
fi

if [ -f "$CARPETA/PROPUESTA_BEDROCK_JHONATAN.html" ]; then
    echo "  ✓ PROPUESTA_BEDROCK_JHONATAN.html"
else
    echo "  ✗ FALTA: PROPUESTA_BEDROCK_JHONATAN.html"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  INSTRUCCIONES PARA GENERAR PDF                               ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "OPCIÓN 1: Desde Safari (Mac) - RECOMENDADO"
echo "───────────────────────────────────────────"
echo "1. Abre el archivo HTML en Safari"
echo "2. Menú → Archivo → Exportar como PDF"
echo "3. Elige carpeta y nombre"
echo "4. Guardar"
echo ""

echo "OPCIÓN 2: Desde Chrome/Firefox (Mac/Windows) - FÁCIL"
echo "──────────────────────────────────────────────────────"
echo "1. Abre el archivo HTML"
echo "2. Cmd+P (Mac) o Ctrl+P (Windows)"
echo "3. Arriba a la derecha → 'Guardar como PDF'"
echo "4. Guardar"
echo ""

echo "OPCIÓN 3: Línea de comandos (Mac con wkhtmltopdf)"
echo "─────────────────────────────────────────────────"
echo "# Instalar si no tienes:"
echo "brew install wkhtmltopdf"
echo ""
echo "# Generar PDF:"
echo "wkhtmltopdf \"$CARPETA/ANALISIS_BEDROCK_JHONATAN_LONDONO.html\" \"$CARPETA/ANALISIS_BEDROCK_JHONATAN_LONDONO.pdf\""
echo "wkhtmltopdf \"$CARPETA/PROPUESTA_BEDROCK_JHONATAN.html\" \"$CARPETA/PROPUESTA_BEDROCK_JHONATAN.pdf\""
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ARCHIVOS LISTOS PARA CONVERTIR A PDF                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "📄 ANALISIS_BEDROCK_JHONATAN_LONDONO.html"
echo "   └─ 33 KB | 15-18 páginas | Análisis técnico profundo"
echo ""
echo "💼 PROPUESTA_BEDROCK_JHONATAN.html"
echo "   └─ 18 KB | 8-10 páginas | Propuesta ejecutiva"
echo ""

echo "✅ Para abrir directamente:"
echo "   open \"$CARPETA/ANALISIS_BEDROCK_JHONATAN_LONDONO.html\""
echo "   open \"$CARPETA/PROPUESTA_BEDROCK_JHONATAN.html\""
echo ""
