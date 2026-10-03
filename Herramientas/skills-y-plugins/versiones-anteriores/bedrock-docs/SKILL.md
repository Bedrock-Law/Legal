---
name: bedrock-docs
description: Genera entregables con la identidad de Bedrock a partir de Markdown, en tres salidas: PDF de marca, .docx nativo editable y página web interactiva. Actívalo cuando el usuario pida un documento, una propuesta, un concepto, un informe, un memorando, un requerimiento, un contrato, una minuta, un PDF, un Word, una página o cualquier entregable de Bedrock, aunque no mencione diseño ni identidad visual. También para convertir a alguno de esos formatos un texto que ya esté en Markdown. Cubre la paleta, la tipografía, la portada, el membrete y las reglas de verificación del render. No lo uses para control de cambios sobre un .docx de un tercero: para eso está el skill docx.
---

# Bedrock — entregables de marca

Tres salidas desde un mismo archivo Markdown. El `.md` es la fuente de verdad: es lo que se versiona y lo que se edita. El PDF, el Word y la página son renders que se regeneran.

| Salida | Cuándo | Cómo |
|---|---|---|
| PDF | Informes, conceptos, propuestas para leer o imprimir | `assets/build-pdf.sh` |
| Word editable | Contratos, propuestas que la contraparte va a comentar, formularios | `assets/build-docx.sh` |
| Página web | Propuestas y documentos que se envían por enlace | `assets/plantilla-web.html` + `assets/build-web.sh` |

El PDF y el Word salen del **mismo archivo fuente**, sin dos versiones que se desincronicen. La página es distinta: es una pieza interactiva y se construye aparte.

## Identidad

| Uso | Valor |
|---|---|
| Primario: títulos de sección, encabezado, fondos oscuros | `#1B1D36` |
| Secundario: subtítulos, filetes, enlaces, barras | `#224D6E` |
| Acento: filete bajo cada título, cajas de resalte | `#E9CDA5` |
| Texto | `#000000` |
| Fondo | `#FFFFFF` |

Títulos en la sans del sistema. Cuerpo en Georgia. Tamaños: portada 27 pt, sección 21 pt, subsección 15 pt, cuerpo 10,5 pt, equivalentes a 36, 28 y 14 píxeles.

**El acento es detalle ocasional.** El filete bajo los títulos de sección, el borde de una caja de resalte y el botón principal de la página. Nada más.

## El encabezado del documento

Todo documento empieza con este bloque. La plantilla del PDF lo lee para armar la portada y el membrete, y el script del Word lo lee para armar la portada con los estilos propios.

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

`title` es el único obligatorio: sin él no se compone la portada. `docscope` va corto, porque en la portada tiene ancho fijo y se parte. `resumen` y `fineprint` solo los usa el Word; el PDF los ignora sin error.

## Jerarquía de títulos

Esto es lo que más se equivoca y arruina el resultado.

| En el Markdown | Sale como | Tamaño | Color | Filete de acento |
|---|---|---|---|---|
| `# Título` | Sección | 21 pt | Primario | Sí |
| `## Título` | Subsección | 15 pt | Secundario | No |
| `### Título` | Sub-subsección | 12 pt | Secundario | No |

**Las secciones numeradas del documento van con `#`, no con `##`.** Con `##` salen con el tamaño y el color de una subsección y sin filete, y el documento pierde la jerarquía. El título grande no se escribe en el cuerpo: sale del campo `title`.

## Generar el PDF

```bash
bash "<carpeta-de-este-skill>/assets/build-pdf.sh" documento.md [salida.pdf]
```

Invoca el script por la ruta absoluta de la carpeta del skill, no por una ruta relativa al proyecto. El script resuelve solo la plantilla, el logotipo y las tipografías, construye en una carpeta temporal y mueve el resultado.

## Generar el Word

```bash
bash "<carpeta-de-este-skill>/assets/build-docx.sh" documento.md [salida.docx]
```

Arma la portada desde el encabezado YAML y aplica la plantilla de referencia, que ya trae el membrete con el logotipo, el pie con «Página X de Y» como campo real y la primera página sin encabezado.

El membrete de la plantilla no lleva texto fijo, solo el logotipo. Es deliberado: una plantilla reutilizable no puede traer dentro la referencia de un documento concreto. Lo que identifica cada documento va en el pie, y sale de los campos `docname` y `docscope` del encabezado YAML.

## Construir la página web

Dos pasos. Primero se copia `assets/plantilla-web.html`, que trae la identidad, los patrones interactivos y el contenido en marcadores `[ASÍ]`, y se reemplaza el contenido. Después se incrusta el logotipo:

```bash
bash "<carpeta-de-este-skill>/assets/build-web.sh" pagina.fuente.html [salida.html]
```

El script genera de un solo archivo las dos versiones del logotipo —la oscura para fondos claros y la clara para fondos oscuros— y las incrusta en base64. Requiere Pillow: `python3 -m pip install --user Pillow`.

Conviene conservar el fuente con los marcadores y la salida aparte: el fuente pesa la tercera parte y es el que se edita.

Los patrones que la plantilla trae resueltos, y que no hay que rehacer: barra de progreso, menú fijo con sección activa, menú desplegable en móvil con cierre por Escape, pestañas con navegación por flechas y semántica completa, acordeón que se retira del árbol de accesibilidad al cerrarse, tablas con scroll alcanzable por teclado, revelado al entrar en pantalla y hoja de estilos de impresión.

Reglas que la plantilla ya cumple y que hay que conservar:

- **Un solo archivo autocontenido.** El logotipo va incrustado en base64 como variable de CSS, definido una vez y reutilizado. Cero peticiones externas: ni tipografías, ni scripts, ni hojas de estilo.
- **La mejora progresiva va en el sentido correcto.** El script añade una clase al elemento raíz y de ella cuelgan el colapso del acordeón, el ocultamiento de los paneles y la opacidad del revelado. Sin JavaScript la página se ve completa. Es el error más costoso de este tipo de pieza: si se invierte, un visor que bloquee el script muestra una página vacía.
- **Las filas de las tablas generadas por script van también en el marcado.** Si no, sin JavaScript la tabla sale con encabezados y cero filas.
- `<meta name="robots" content="noindex, nofollow">` en cualquier documento confidencial.
- Hoja de estilos de impresión que expanda los paneles y el acordeón, libere el ancho máximo, invierta los logotipos claros y fuerce el color de las barras de gráficos.

## Verificación antes de entregar, siempre

**Mira el render.** No es recomendación.

```bash
# PDF
pdftoppm -jpeg -r 60 salida.pdf pagina

# Word
soffice --headless --convert-to pdf salida.docx && pdftoppm -jpeg -r 80 salida.pdf pagina
```

Y lee las imágenes. Lo que falla en la práctica:

- La última columna de una tabla aplastada, sobre todo si es donde alguien debe escribir.
- Encabezados de columna partidos por la justificación heredada.
- Rutas o texto en monoespaciado desbordados del margen derecho: el motor no parte esas cadenas, hay que acortar el texto en el fuente.
- El título de portada cortado por un guion.
- En impresión: logotipos claros sobre fondo blanco, texto claro sobre fondo reseteado y barras de gráficos que no se dibujan.

Para la página, además: capturas en escritorio y en móvil, prueba sin JavaScript, y comprobar que el cuerpo no tenga desplazamiento horizontal en 320, 390, 768 y 1280 píxeles. El desbordamiento dentro de un contenedor de tabla es correcto; el del cuerpo es un defecto grave.

## Reglas de contenido

- **Nunca inventar datos de la contraparte.** Lo que no se sepa va en un campo visible, y el campo lleva solo su nombre.
- **Las notas internas van en comentarios del Markdown.** El pipeline del Word las elimina, así que la plantilla puede llevar dentro la guía de diligenciamiento sin que llegue al cliente.
- **Nada de compromisos numéricos gratuitos.** Un entregable que promete «quince a veinte páginas» o «doce a quince riesgos» se convierte en obligación al aceptarse la propuesta.
- **Sin paralelismos negativos ni regla de tres.** Aplica el skill `humanizar-texto`.

## Assets

| Archivo | Qué es |
|---|---|
| `assets/build-pdf.sh` | Markdown a PDF. Verificación previa incluida |
| `assets/build-docx.sh` | Markdown a Word. Arma la portada desde el YAML |
| `assets/bedrock-doc.latex` | Plantilla de composición del PDF: paleta, tipografía, portada, membrete, tablas, caja de acento |
| `assets/bedrock-reference.docx` | Plantilla de Word: estilos, siete estilos propios de portada, membrete con logotipos, pie con paginación |
| `assets/generar-plantilla-word.py` | Reconstruye la plantilla de Word desde la referencia por defecto de pandoc. Se corre si cambia tipografía, color, logotipo o membrete |
| `assets/logo-bedrock.png` | Logotipo recortado al contenido. La versión clara la genera `build-web.sh` |
| `assets/build-web.sh` | Incrusta el logotipo y produce la página autocontenida |
| `assets/plantilla-web.html` | Plantilla de página con la identidad y el contenido en marcadores |

## Requisitos

`pandoc`, XeLaTeX de TeX Live y `python3` para generar; Pillow para la página. LibreOffice y Poppler para la verificación visual. Los scripts hacen comprobación previa y abortan con las instrucciones de instalación.

## Relación con otros skills

- **`humanizar-texto`** — se aplica solo a todo el texto que se redacte aquí.
- **`docx`** — para editar un `.docx` existente con control de cambios. No es este pipeline.
