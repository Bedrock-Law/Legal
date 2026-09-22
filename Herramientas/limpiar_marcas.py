#!/usr/bin/env python3
"""
limpiar_marcas.py

Elimina caracteres invisibles Unicode problemáticos (marcas de agua, separadores
de ancho cero, selectores de variación, caracteres de etiqueta) y normaliza
espacios no estándar a espacio normal (U+0020) en un archivo, sobrescribiéndolo
in-place.

Uso:
    python3 limpiar_marcas.py ruta/al/archivo.txt

Solo librería estándar de Python 3. Sin dependencias externas.
"""

import sys


def construir_rangos():
    """Devuelve dos conjuntos: caracteres a eliminar y caracteres a reemplazar por espacio."""

    eliminar = set()

    # Soft hyphen
    eliminar.add(0x00AD)

    # Separadores de ancho cero y marcas de formato/dirección (U+200B a U+200F)
    for cp in range(0x200B, 0x200F + 1):
        eliminar.add(cp)

    # Caracteres de embebido/override direccional (U+202A a U+202E)
    for cp in range(0x202A, 0x202E + 1):
        eliminar.add(cp)

    # Separadores invisibles matemáticos y de ancho cero (U+2060 a U+2069)
    for cp in range(0x2060, 0x2069 + 1):
        eliminar.add(cp)

    # BOM / zero width no-break space
    eliminar.add(0xFEFF)

    # Selectores de variación (U+FE00 a U+FE0F)
    for cp in range(0xFE00, 0xFE0F + 1):
        eliminar.add(cp)

    # Selectores de variación suplementarios (U+E0100 a U+E01EF)
    for cp in range(0xE0100, 0xE01EF + 1):
        eliminar.add(cp)

    # Caracteres de etiqueta (U+E0000 a U+E007F)
    for cp in range(0xE0000, 0xE007F + 1):
        eliminar.add(cp)

    # Espacios no estándar a normalizar a espacio normal (U+0020)
    normalizar = set()
    normalizar.add(0x00A0)  # nbsp
    for cp in range(0x2000, 0x200A + 1):
        normalizar.add(cp)
    normalizar.add(0x202F)
    normalizar.add(0x205F)
    normalizar.add(0x3000)

    return eliminar, normalizar


def limpiar_texto(texto, eliminar, normalizar):
    resultado = []
    reemplazos = 0

    for ch in texto:
        cp = ord(ch)
        if cp in eliminar:
            reemplazos += 1
            continue
        if cp in normalizar:
            resultado.append(" ")
            reemplazos += 1
            continue
        resultado.append(ch)

    return "".join(resultado), reemplazos


def main():
    if len(sys.argv) != 2:
        print("Uso: python3 limpiar_marcas.py ruta/al/archivo", file=sys.stderr)
        sys.exit(1)

    ruta = sys.argv[1]

    with open(ruta, "r", encoding="utf-8") as f:
        contenido = f.read()

    eliminar, normalizar = construir_rangos()
    contenido_limpio, reemplazos = limpiar_texto(contenido, eliminar, normalizar)

    with open(ruta, "w", encoding="utf-8") as f:
        f.write(contenido_limpio)

    print(f"{reemplazos} caracteres reemplazados en {ruta}")


if __name__ == "__main__":
    main()
