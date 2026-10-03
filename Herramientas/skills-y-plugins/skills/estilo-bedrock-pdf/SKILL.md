---
name: estilo-bedrock-pdf
description: Genera PDF de marca de Bedrock a partir de Markdown. Actívalo cuando el usuario pida un documento, una propuesta, un concepto, un informe, un memorando o un PDF de Bedrock, aunque no mencione diseño ni identidad visual. Cubre la paleta, la tipografía, la portada, el membrete y las reglas de verificación del render. No lo uses para Word ni para página web: para eso están estilo-bedrock-docs y estilo-bedrock-html.
---

# Bedrock — PDF de marca

Un archivo Markdown como fuente de verdad, un PDF como render. El `.md` es lo que se versiona y lo que se edita; el PDF se regenera cada vez.

```bash
bash "<carpeta-de-este-skill>/assets/build-pdf.sh" documento.md [salida.pdf]
```

Invoca el script por la ruta absoluta de la carpeta del skill, no por una ruta relativa al proyecto. El script resuelve solo la plantilla, el logotipo y las tipografías, construye en una carpeta temporal y mueve el resultado.

## Identidad

| Uso | Valor |
|---|---|
| Primario: títulos de sección, encabezado, fondos oscuros | `#1B1D36` |
| Secundario: subtítulos, filetes, enlaces, barras | `#224D6E` |
| Acento: filete bajo cada título, cajas de resalte | `#E9CDA5` |
| Texto | `#000000` |
| Fondo | `#FFFFFF` |

No se usa un cuarto color de marca fuera de esta paleta. Los grises de apoyo (`#6B6F7A`, `#D8DDE4`) son neutros de composición, no color de marca.

### Tipografía

| Rol | Fuente | Dónde |
|---|---|---|
| Display: título de portada | **Nexa Bold** (con Montserrat ExtraBold como reemplazo mientras no haya licencia — ver `assets/fonts/nexa-bold-licenciada/LEEME.md`) | Título grande de la portada |
| Títulos | **Montserrat** (SemiBold 600 / Bold 700) | Secciones, subsecciones, membrete |
| Cuerpo | **Tinos** | Párrafos del documento |

Tinos y Montserrat van embebidas como archivos en `assets/fonts/` y se cargan por ruta directa: no dependen de que la máquina donde se instale el skill las tenga puestas como fuentes del sistema.

### Logotipo

Tres variantes en `assets/`, todas derivadas del mismo trazo (pirámide sobre rectángulo, partido por el eje central), en un solo color `#1B1D36` sobre fondo transparente:

| Archivo | Uso |
|---|---|
| `logo-bedrock-horizontal.png` | Isotipo + nombre en línea. Es la que usa `build-pdf.sh` por defecto |
| `logo-bedrock-vertical.png` | Isotipo arriba, nombre debajo. Para portadas angostas o cuadradas |
| `logo-bedrock-isotipo.png` | Solo el símbolo, sin el nombre |

### Prohibiciones

- **No recolorear el logotipo.** Sale en `#1B1D36`. Nunca en el acento, nunca en gris, nunca con relleno degradado.
- **No mezclar tipografías fuera de los tres roles definidos.** Nada de fuentes del sistema por defecto ni sustitutos visuales de Nexa Bold, Montserrat o Tinos que no sean los documentados arriba.
- **Máximo dos a tres colores por pieza.** Primario, secundario y acento. El texto en negro y el fondo en blanco no cuentan dentro de ese límite.
- **El acento es detalle ocasional.** El filete bajo los títulos de sección y el borde de una caja de resalte. Nada más.
- **Espacios generosos.** No comprimir el espaciado de la plantilla para ganar una línea.

Tamaños: portada 27 pt, sección 21 pt, subsección 15 pt, cuerpo 10,5 pt.

## El encabezado del documento

Todo documento empieza con este bloque. La plantilla lo lee para armar la portada y el membrete.

```yaml
---
title: "Título del documento"
eyebrow: "Propuesta de servicios profesionales · Ref. XXX-00-2026-01"
lede: "Una o dos frases que dicen de qué se trata."
doctype: "Propuesta de servicios"
docdate: "27 de agosto de 2026"
docscope: "Confidencial · Nombre del destinatario"
docname: "Nombre-corto-para-el-pie"
resumen:
  - "**Plazo.** Ocho semanas contadas desde la reunión de inicio."
  - "**Honorarios.** Cincuenta millones de pesos, más el impuesto sobre las ventas."
fineprint: "Documento confidencial. Su contenido es de uso exclusivo del destinatario."
---
```

`title` es el único obligatorio: sin él no se compone la portada. `docscope` va corto, porque en la portada tiene ancho fijo y se parte. `resumen` (con `resumentitulo` opcional para cambiar el rótulo) arma un recuadro con filete lateral bajo la tabla de portada, y `fineprint` una línea en cursiva debajo; los dos son opcionales y se leen igual en `estilo-bedrock-docs`.

## Jerarquía de títulos

Esto es lo que más se equivoca y arruina el resultado.

| En el Markdown | Sale como | Tamaño | Color | Filete de acento |
|---|---|---|---|---|
| `# Título` | Sección | 21 pt | Primario | Sí |
| `## Título` | Subsección | 15 pt | Secundario | No |
| `### Título` | Sub-subsección | 12 pt | Secundario | No |

**Las secciones numeradas del documento van con `#`, no con `##`.** Con `##` salen con el tamaño y el color de una subsección y sin filete, y el documento pierde la jerarquía. El título grande no se escribe en el cuerpo: sale del campo `title`.

## Verificación antes de entregar, siempre

**Mira el render.** No es recomendación.

```bash
pdftoppm -jpeg -r 60 salida.pdf pagina
```

Y lee las imágenes. Lo que falla en la práctica:

- La última columna de una tabla aplastada.
- Encabezados de columna partidos por la justificación heredada.
- Rutas o texto en monoespaciado desbordados del margen derecho: el motor no parte esas cadenas, hay que acortar el texto en el fuente.
- El título de portada cortado por un guion.

## Reglas de contenido

- **Nunca inventar datos de la contraparte.** Lo que no se sepa va en un campo visible, y el campo lleva solo su nombre.
- **Nada de compromisos numéricos gratuitos.** Un entregable que promete «quince a veinte páginas» o «doce a quince riesgos» se convierte en obligación al aceptarse la propuesta.
- **Sin paralelismos negativos ni regla de tres.** Aplica el skill `humanizar-texto` si está instalado.

## Assets

| Archivo | Qué es |
|---|---|
| `assets/build-pdf.sh` | Markdown a PDF. Verificación previa incluida |
| `assets/bedrock-doc.latex` | Plantilla de composición: paleta, tipografía, portada, membrete, tablas, caja de acento |
| `assets/logo-bedrock-horizontal.png` | Logotipo por defecto |
| `assets/logo-bedrock-vertical.png` | Variante apilada |
| `assets/logo-bedrock-isotipo.png` | Solo el símbolo |
| `assets/fonts/` | Tinos y Montserrat en los pesos que usa la plantilla. `nexa-bold-licenciada/` trae las instrucciones para activar Nexa Bold cuando haya licencia |

## Requisitos

`pandoc`, XeLaTeX de TeX Live y `python3`. Poppler para la verificación visual (`pdftoppm`). El script hace comprobación previa y aborta con las instrucciones de instalación si falta algo.

## Relación con otros skills

- **`humanizar-texto`** — si está instalado, se aplica solo a todo el texto que se redacte aquí.
- **`estilo-bedrock-docs`** y **`estilo-bedrock-html`** — mismo Markdown fuente, otras salidas. Son skills independientes, no comparten carpeta de assets con este.
