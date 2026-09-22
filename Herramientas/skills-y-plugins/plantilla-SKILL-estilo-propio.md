# Plantilla del SKILL.md del sistema de diseño

Este es el archivo que hay que crear en `~/.claude/skills/[NOMBRE]-doc/SKILL.md`. Está modelado sobre una implementación real y en funcionamiento.

Reemplaza todo lo que va entre corchetes. Las secciones marcadas **[opcional]** se borran completas si no se construye ese canal: un skill que anuncia recursos que no existen hace que el asistente los busque, no los encuentre e improvise.

Copia lo que sigue a partir de la línea de guiones.

---

```markdown
---
name: [NOMBRE]-doc
description: Aplica la identidad visual de [NOMBRE] al crear cualquier entregable con diseño: documentos (informes, análisis, conceptos, requerimientos, propuestas, resúmenes ejecutivos, one-pagers, cualquier cosa que el usuario llame "documento", "PDF", "doc" o "Word"), y piezas visuales o de HTML. Actívalo aunque el usuario no mencione diseño, marca ni sistema visual: cualquier petición de redactar, armar, maquetar, exportar o dar formato a una pieza de [NOMBRE] lo usa, para que color, tipografía, portada, encabezados y voz salgan correctos. Cubre también las reglas de voz y de redacción. Para CONTRATOS y documentos legales en .docx nativo editable (acuerdos de confidencialidad, minutas, otrosíes, contratos de servicios, formularios para diligenciar) usa el skill [NOMBRE]-legal-docx. Para control de cambios sobre un .docx de un tercero, usa el skill docx. No lo uses para trabajo ajeno a [NOMBRE].
---

# [NOMBRE] — sistema de diseño

La identidad visual de [NOMBRE]. Este skill hace que todo entregable salga con la identidad correcta: color, tipografía, portada, jerarquía, tablas y voz.

## Cómo trabajar con este skill

1. **Identifica el contexto.** Son lenguajes distintos y no se mezclan en una misma pieza.
   - **Documento técnico o jurídico en PDF** (informes, análisis, conceptos, requerimientos): es la ruta principal. Escribe el Markdown con el encabezado de metadatos de §Contrato de metadatos y expórtalo con `assets/build-doc.sh`. Requiere paquetes instalados; el script hace verificación previa y aborta diciendo qué falta y cómo instalarlo.
   - **Contrato o cualquier Word que la contraparte deba editar o firmar**: no es esta ruta. Usa el skill `[NOMBRE]-legal-docx`.
   - **Documento con diagramas**: los diagramas van en `diagrams/*.mmd` junto al documento, en Mermaid, y se referencian desde el Markdown como `diagrams/<nombre>.pdf`. El script los renderiza a PDF vectorial con el tema de `assets/[NOMBRE]-mermaid.json`. Parte de los ejemplos de `assets/diagram-examples/`.
   - **[opcional — borrar si no se construye] Pieza web o de HTML**: carga `assets/[NOMBRE]-tokens.css` dentro de un `<style>`.
2. **Aplica la voz** de `references/voz-y-redaccion.md` en todo el texto. La voz pesa tanto como el diseño.
3. **Consulta la referencia que aplique** a lo que estés construyendo. No las leas todas por defecto.
4. **Mira el render antes de entregar.** Convierte el resultado a imagen y revísalo. Es obligatorio, no una recomendación: los defectos de composición no se ven en el archivo fuente.

## No-negociables

- **Tipografía: [FUENTE], una sola familia.** [PESO] es el peso de identidad para títulos y subtítulos. El peso más alto se reserva para una palabra por titular. Nunca los pesos extremos de la familia.
- **Color: [PRIMARIO] como primario, [ACENTO] como acento en menos del diez por ciento del área.** Dos colores fuertes compitiendo hacen un documento más difícil de leer, no más vistoso.
- **El fondo de las piezas de marca no es blanco puro**, sino [FONDO CLARO]. Excepción: los documentos, PDF y Word, donde el blanco sí es válido porque el tinte no se puede garantizar en la impresión ni en el visor de quien lo reciba.
- **El gradiente [PRIMARIO] → [ACENTO] se usa con moderación:** la línea de acento de la portada y, si acaso, un elemento por pieza. Nunca en fondos grandes ni en documentos técnicos.
- **Negrilla solo en títulos y subtítulos.** Nunca mecánica sobre los términos del cuerpo ni sobre el primer término de cada ítem de una lista.
- **Títulos sin mayúscula en cada palabra.**
- **Una sola caja de acento y un solo tipo de portada.** La restricción es lo que produce consistencia.
- **Voz:** afirmaciones directas, sin preámbulos; datos solo si son verificables; el dato que no se tiene va en un campo visible para diligenciar y nunca se inventa.

## Contrato de metadatos

Todo documento de la ruta PDF empieza con este encabezado. La plantilla lee estos campos y arma la portada y los encabezados; quien redacta solo los llena.

```yaml
---
title:    "Título del documento"
eyebrow:  "[ÁREA] · [SUBÁREA]"
lede:     "Una o dos frases que dicen de qué se trata el documento."
doctype:  "[TIPO DE DOCUMENTO]"
docdate:  "26 de agosto de 2026"
docscope: "[ALCANCE]"
docname:  "Nombre-corto-para-el-encabezado"
---
```

`title` es el único obligatorio: si falta, no se compone la portada. `docname` es lo que aparece en el encabezado de cada página, así que va corto.

Taxonomía del eyebrow, que es lo que hace que una serie de documentos se lea como una serie:

| Eyebrow | Cuándo |
|---|---|
| `[ÁREA] · [SUBÁREA 1]` | [CUÁNDO] |
| `[ÁREA] · [SUBÁREA 2]` | [CUÁNDO] |
| `[ÁREA] · [SUBÁREA 3]` | [CUÁNDO] |

## Cómo se genera el PDF

```bash
bash "<carpeta-de-este-skill>/assets/build-doc.sh" documento.md [salida.pdf]
```

Invócalo por la ruta absoluta de la carpeta de este skill, no por una ruta relativa al proyecto del usuario. El script resuelve solo la plantilla, las tipografías y el logo.

Construye en una carpeta temporal y mueve el resultado a su destino: correr el script dos veces sobre el mismo sitio puede anidar carpetas.

Verificación, siempre antes de entregar:

```bash
pdftoppm -jpeg -r 60 salida.pdf pagina && ls pagina-*.jpg
```

y **lee las imágenes**. Busca: la última columna de una tabla aplastada, sobre todo si es la columna donde alguien tiene que escribir; encabezados de columna partidos en pedazos; rutas de archivo o texto en monoespaciado desbordados del margen derecho; el título de portada cortado por un guion; y filas de tabla sin altura donde hay que diligenciar. Si encuentras algo, corrígelo en el fuente y vuelve a generar.

## Identidad: una sola fuente de verdad

Los valores de identidad viven **únicamente** en `assets/identidad.json`: los seis colores, los nombres de los archivos de tipografía y los textos fijos.

De ahí, `assets/generar.py` escribe los colores de la plantilla LaTeX, el tema de los diagramas y el bloque de color de los estilos del Word. **No edites un color en la plantilla:** edítalo en `identidad.json` y vuelve a correr el generador. Si un código hexadecimal aparece escrito a mano en dos sitios, el sistema está mal y hay que corregirlo, no seguir.

```bash
python3 "<carpeta-de-este-skill>/assets/generar.py"
```

## Referencias

- `references/voz-y-redaccion.md` — Reglas de voz, longitud, tono por contexto e integridad de datos. **Léela siempre que escribas texto.**
- `references/color-y-tipografia.md` — La paleta, la jerarquía de uso y los pesos de la familia con sus reglas.
- `references/documentos-y-pdf.md` — El patrón de documento: portada, secciones, tablas, cajas de acento, y el pipeline completo.
- `references/diagramas.md` — Convenciones de los diagramas y las clases de estilo de marca.
- `references/[opcional] web-y-piezas.md` — Composición de piezas web, área de protección del logo, fondos.

## Assets

- `assets/identidad.json` — los valores de identidad. Fuente de verdad única.
- `assets/generar.py` — escribe desde `identidad.json` la paleta de la plantilla LaTeX, el tema de diagramas y el color de los estilos del Word.
- `assets/build-doc.sh` — orquesta el pipeline Markdown → PDF. Verificación previa de dependencias incluida.
- `assets/[NOMBRE]-doc.latex` — plantilla de composición: paleta, tipografía, portada, encabezado y pie, tablas, caja de acento.
- `assets/fonts/` — los archivos de tipografía. Licencia: [LICENCIA].
- `assets/logo.pdf` — logo vectorial para la portada del PDF.
- `assets/logo.png` — logo para el encabezado del Word.
- `assets/linea-gradiente.png` — la tira de acento de la portada del Word, que en Word no puede dibujarse.
- `assets/[NOMBRE]-mermaid.json` — tema de diagramas.
- `assets/diagram-examples/*.mmd` — diagramas de ejemplo con las clases de estilo. Cópialos como punto de partida.
- `assets/[opcional] [NOMBRE]-tokens.css` — tokens de color y tipografía para piezas de HTML.

## Requisitos

La ruta PDF necesita `pandoc`, XeLaTeX de TeX Live y `node` con `npx` para los diagramas. La verificación del render necesita LibreOffice y Poppler. `build-doc.sh` hace la comprobación previa y, si falta algo, aborta con las instrucciones de instalación para macOS y para Linux.

Paquetes de LaTeX que usa la plantilla: `fontspec`, `titlesec`, `fancyhdr`, `lastpage`, `booktabs`, `array`, `colortbl`, `tcolorbox`, `tikz`, `fvextra`, `setspace`, `geometry`.

## Relación con otros skills

- **`[NOMBRE]-legal-docx`** — especialización para contratos y Word editable. Ese pipeline es distinto y no se mezcla con este.
- **`docx`** — para editar un `.docx` existente con control de cambios o comentarios. No es este pipeline.
- **`humanizar-texto`** — se aplica solo, en silencio, a todo el texto que se redacte aquí.
```

---

## Qué mirar al llenarla

**El campo `description` es la pieza más importante y la que más se hace mal.** No es una descripción: es el disparador. El asistente decide si carga el skill leyendo solo esa línea, sin haber abierto el archivo. Por eso en el original es largo y hace cuatro cosas a la vez:

1. Enumera los sinónimos con los que el usuario va a pedir la cosa, incluidos los imprecisos: «documento», «PDF», «doc», «Word». Si un sinónimo no está, con esa palabra el skill no se activa.
2. Dice expresamente que se active **aunque el usuario no mencione diseño ni marca**. Sin esa frase, el skill solo se dispara cuando uno pide diseño explícitamente, que es casi nunca.
3. Enumera los verbos: redactar, armar, maquetar, exportar, dar formato.
4. Deriva a los skills hermanos para los casos que no le corresponden, y cierra con la frontera negativa: no usarlo para trabajo ajeno.

Ese cuarto punto es el que evita el problema real. Sin la derivación explícita, un skill de documentos también se activa con los contratos y produce un PDF donde hacía falta un Word editable.

**Los no-negociables van en el cuerpo y no en las referencias.** Es la lista que el asistente memoriza al cargar el skill; las referencias las lee solo si las necesita. Todo lo que no puede fallar nunca va en esa lista, corto y en imperativo. Si la lista pasa de ocho o nueve puntos, deja de funcionar como memoria.

**El contrato de metadatos y la taxonomía del eyebrow van en el cuerpo por la misma razón.** Son lo que el asistente necesita para escribir el encabezado de un documento sin abrir nada más.

**Cada asset listado tiene que existir.** Un skill que anuncia un archivo inexistente hace que el asistente lo busque, no lo encuentre e improvise algo con el aspecto equivocado. Si un canal no se construyó, se borra su línea y su referencia.
