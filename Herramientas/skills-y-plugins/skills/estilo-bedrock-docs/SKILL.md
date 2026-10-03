---
name: estilo-bedrock-docs
description: Genera un .docx nativo editable con la identidad de Bedrock a partir de Markdown. Actívalo cuando el usuario pida un contrato, una propuesta que la contraparte va a comentar, un formulario o un Word de Bedrock, aunque no mencione diseño ni identidad visual. Cubre la paleta, la tipografía, la portada y el membrete. No lo uses para PDF ni para página web: para eso están estilo-bedrock-pdf y estilo-bedrock-html. Tampoco para control de cambios sobre un .docx de un tercero: para eso está el skill docx.
---

# Bedrock — Word de marca

Un archivo Markdown como fuente de verdad, un `.docx` nativo y editable como render.

```bash
bash "<carpeta-de-este-skill>/assets/build-docx.sh" documento.md [salida.docx]
```

Invoca el script por la ruta absoluta de la carpeta del skill, no por una ruta relativa al proyecto. Arma la portada desde el encabezado YAML y aplica la plantilla de referencia, que ya trae el membrete con el logotipo, el pie con «Página X de Y» como campo real y la primera página sin encabezado.

El membrete de la plantilla no lleva texto fijo, solo el logotipo. Es deliberado: una plantilla reutilizable no puede traer dentro la referencia de un documento concreto. Lo que identifica cada documento va en el pie, y sale de los campos `docname` y `docscope` del encabezado YAML.

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
| Títulos | **Montserrat** (SemiBold 600 / Bold 700) | Secciones, subsecciones, membrete |
| Cuerpo | **Tinos** | Párrafos del documento |

**Las tipografías no van embebidas dentro del `.docx`.** Word y LibreOffice sustituyen Tinos y Montserrat por una fuente similar si la máquina que abre el archivo no las tiene instaladas. Para que se vean tal cual, instala los archivos de `assets/fonts/` en el sistema (doble clic en cada uno → Instalar) antes de abrir el documento.

### Logotipo

Tres variantes en `assets/`, todas derivadas del mismo trazo (pirámide sobre rectángulo, partido por el eje central), en un solo color `#1B1D36` sobre fondo transparente:

| Archivo | Uso |
|---|---|
| `logo-bedrock-horizontal.png` | Isotipo + nombre en línea. Es la que usa `build-docx.sh`, en la portada y en el membrete |
| `logo-bedrock-vertical.png` | Isotipo arriba, nombre debajo |
| `logo-bedrock-isotipo.png` | Solo el símbolo, sin el nombre |

### Prohibiciones

- **No recolorear el logotipo.** Sale en `#1B1D36`. Nunca en el acento, nunca en gris, nunca con relleno degradado.
- **No mezclar tipografías fuera de los dos roles definidos.** Nada de fuentes del sistema por defecto ni sustitutos visuales de Montserrat o Tinos que no sean los documentados arriba.
- **Máximo dos a tres colores por pieza.** Primario, secundario y acento.
- **El acento es detalle ocasional.** No es color de fondo de bloques de texto corrido.
- **Espacios generosos.** No comprimir el espaciado de la plantilla para ganar una línea.

## El encabezado del documento

Todo documento empieza con este bloque. El script lo lee para armar la portada con los estilos propios.

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

`title` es el único obligatorio. `resumen` y `fineprint` son propios de este pipeline: si el mismo Markdown se usa también para el PDF con `estilo-bedrock-pdf`, esa plantilla los ignora sin error.

## Jerarquía de títulos

| En el Markdown | Sale como | Color |
|---|---|---|
| `# Título` | Sección | Primario |
| `## Título` | Subsección | Secundario |
| `### Título` | Sub-subsección | Secundario |

**Las secciones numeradas del documento van con `#`, no con `##`.** Con `##` el documento pierde la jerarquía. El título grande no se escribe en el cuerpo: sale del campo `title`.

## Verificación antes de entregar, siempre

**Mira el render.** No es recomendación.

```bash
soffice --headless --convert-to pdf salida.docx && pdftoppm -jpeg -r 80 salida.pdf pagina
```

Y lee las imágenes. Lo que falla en la práctica:

- La última columna de una tabla aplastada, sobre todo si es donde alguien debe escribir.
- Encabezados de columna partidos por la justificación heredada.
- El título de portada cortado por un guion.

## Reglas de contenido

- **Nunca inventar datos de la contraparte.** Lo que no se sepa va en un campo visible, y el campo lleva solo su nombre.
- **Las notas internas van en comentarios del Markdown.** El pipeline las elimina, así que la plantilla puede llevar dentro la guía de diligenciamiento sin que llegue al cliente.
- **Nada de compromisos numéricos gratuitos.** Un entregable que promete «quince a veinte páginas» se convierte en obligación al aceptarse la propuesta.
- **Sin paralelismos negativos ni regla de tres.** Aplica el skill `humanizar-texto` si está instalado.

## Assets

| Archivo | Qué es |
|---|---|
| `assets/build-docx.sh` | Markdown a Word. Arma la portada desde el YAML |
| `assets/bedrock-reference.docx` | Plantilla de Word: estilos, siete estilos propios de portada, membrete con logotipo, pie con paginación |
| `assets/generar-plantilla-word.py` | Reconstruye la plantilla de Word desde la referencia por defecto de pandoc. Se corre si cambia tipografía, color, logotipo o membrete |
| `assets/logo-bedrock-horizontal.png` | Logotipo por defecto, en la portada y en el membrete |
| `assets/logo-bedrock-vertical.png` | Variante apilada |
| `assets/logo-bedrock-isotipo.png` | Solo el símbolo |
| `assets/fonts/` | Tinos y Montserrat, para instalar en el sistema si se quiere el render fiel en Word. `nexa-bold-licenciada/` trae las instrucciones para activar Nexa Bold cuando haya licencia |

## Requisitos

`pandoc` y `python3` para generar. LibreOffice y Poppler para la verificación visual. El script hace comprobación previa y aborta con las instrucciones de instalación si falta algo.

## Relación con otros skills

- **`humanizar-texto`** — si está instalado, se aplica solo a todo el texto que se redacte aquí.
- **`estilo-bedrock-pdf`** y **`estilo-bedrock-html`** — mismo Markdown fuente, otras salidas. Son skills independientes, no comparten carpeta de assets con este.
- **`docx`** — para editar un `.docx` existente con control de cambios. No es este pipeline.
