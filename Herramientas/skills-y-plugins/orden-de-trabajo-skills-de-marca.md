# Orden de trabajo: construir mis dos skills de documentos

Ya tienes los ejemplos y la explicación de la arquitectura. Esto es lo que quiero que construyas. Sigue el orden y no te adelantes: cada fase se verifica antes de pasar a la siguiente.

## Objetivo

Dos skills que generen documentos con mi identidad visual a partir de Markdown:

| Skill | Salida | Para qué |
|---|---|---|
| `[NOMBRE]-doc` | PDF | Informes, análisis, conceptos, requerimientos |
| `[NOMBRE]-legal-docx` | Word nativo editable | Contratos, minutas, formularios para diligenciar |

Los dos comparten un único archivo de identidad. Esa es la corrección más importante respecto de la implementación que te di como ejemplo, donde la paleta estaba duplicada en siete archivos.

## Paso 0 — Pregúntame esto antes de escribir una línea

No asumas ninguno de estos valores y no uses los del ejemplo. Pregúntame los seis en un solo mensaje, con tus recomendaciones donde tengas criterio:

1. **Nombre del sistema.** Va en el nombre de los skills, de los recursos y en los mensajes del script.
2. **Paleta de seis colores**, en hexadecimal: primario, acento, tinta de títulos, texto de cuerpo, gris secundario, filetes. Recomiéndame un fondo que no sea blanco puro.
3. **Tipografía de marca.** Necesito al menos tres pesos. Antes de proponerme una, verifica que su licencia permita redistribuirla dentro de un skill, y dime bajo qué licencia está. Si no puedes verificarlo, dímelo y propón alternativas libres.
4. **Tipografía de los contratos**, que va aparte y probablemente no es la de marca. Explícame tu recomendación.
5. **Textos fijos**: la línea del pie de página del PDF y el texto de la esquina del encabezado del Word.
6. **Taxonomía del eyebrow**: el vocabulario de las líneas superiores que clasifican el documento.

Si algo no lo sé decidir, propónme dos opciones y una recomendación. No lo dejes en blanco ni lo inventes.

## Paso 1 — Verificar el entorno

Antes de construir, comprueba qué hay instalado y qué falta:

```
pandoc -v ; xelatex --version ; python3 --version ; npx --version ; soffice --version ; pdftoppm -v
```

Con lo que falte, dame los pasos numerados de instalación, uno por comando, y qué debería ver si funcionó. No sigas hasta que yo confirme que corrieron. No soy ingeniero: si un comando falla, explícame el error y dame el siguiente paso, no me pases la salida cruda.

Para la ruta PDF hacen falta al menos estos paquetes de LaTeX: `fontspec`, `titlesec`, `fancyhdr`, `lastpage`, `booktabs`, `array`, `colortbl`, `tcolorbox`, `tikz`, `fvextra`, `setspace`, `geometry`.

## Paso 2 — Archivo de identidad y generador

Esto va primero y es la pieza que sostiene todo lo demás.

Crea un archivo único de identidad, en un formato de datos simple, con: los seis colores, los nombres de los archivos de tipografía, los textos fijos y el nombre del sistema.

Crea un generador pequeño que lea ese archivo y escriba desde ahí:

- Los `\definecolor` de la plantilla LaTeX.
- El archivo de configuración de tema de los diagramas.
- El bloque de color del archivo de estilos del documento de Word.

Regla que quiero que se cumpla: **ningún código hexadecimal escrito a mano en más de un sitio.** Si al final del trabajo encuentro un color duplicado, el diseño está mal. Cuando termines, córrelo y muéstrame la búsqueda que demuestra que cada hexadecimal aparece una sola vez como valor de origen.

Colores nombrados por función, no por color. Si un color se llama `azul` y mañana la marca es verde, el archivo queda mintiendo.

## Paso 3 — Skill de PDF

Construye en este orden y muéstrame el resultado en cada punto:

1. **La plantilla LaTeX** con paleta y tipografía. Pruébala con un documento de una sola página y una tabla. Numeración automática de secciones apagada.
2. **La portada**, como comando propio invocado solo si el documento tiene título. Ajústala sola, sin cuerpo, hasta que quede: es lo que consume más iteraciones. Desactiva la partición de palabras en el título.
3. **El script de construcción**, con cuatro responsabilidades: resolver sus propias rutas a partir de su ubicación, verificar dependencias y abortar con instrucciones de instalación si falta algo, renderizar los diagramas a PDF vectorial si existen, y componer.
4. **Los diagramas**, con el tema tomado del archivo de identidad.

El contrato de variables del encabezado del documento lo defines con lo que yo te responda en el paso 0. Documéntalo en el `SKILL.md` con un ejemplo completo, copiable.

Reglas del script: nada de rutas absolutas escritas; el directorio de trabajo debe quedar en la carpeta del documento para que las imágenes relativas resuelvan; y construye en una carpeta temporal y mueve el resultado, para que correrlo dos veces en el mismo sitio no anide carpetas.

## Paso 4 — Skill de Word

1. **Extrae el documento de referencia por defecto:**

```
pandoc --print-default-data-file reference.docx > referencia-base.docx
```

2. Descomprímelo, edita el archivo de estilos —tipografía y tamaño del cuerpo, alineación, interlineado, cada nivel de título—, crea los archivos de encabezado y de pie con el logo y la paginación, configura la sección con tamaño de papel y márgenes y la marca que hace que la primera página tenga encabezado distinto, y vuélvelo a comprimir.

3. Define los estilos con nombre propio para la portada y para los campos. Documenta en el `SKILL.md` cómo se invocan desde Markdown, con el bloque de portada completo listo para copiar.

4. **El preproceso**, con las dos transformaciones:
   - Los corchetes cuyo contenido está en mayúsculas se convierten en campos sombreados. Cuida la condición que evita confundirlos con enlaces de Markdown.
   - Todos los comentarios del Markdown se eliminan siempre. Esto es lo que me permite dejar la guía de diligenciamiento dentro del archivo fuente sin que llegue al cliente.

5. **Los dos parches de posproceso**: la declaración del tipo de imagen del logo, y la alineación a la izquierda de los párrafos dentro de las celdas de tabla. El segundo no es cosmético: sin él los encabezados de columna salen con las palabras separadas por huecos.

## Paso 5 — Plantillas

Crea una plantilla por cada tipo de documento que produzco de forma recurrente. Pregúntame cuáles antes de escribirlas; no adivines mi catálogo.

En cada plantilla: los datos que ya conozcas quedan diligenciados, y todo lo demás en campos entre corchetes en mayúsculas. La guía de diligenciamiento y los valores usuales van en comentarios, nunca dentro de un campo. Un campo lleva solo su nombre.

## Paso 6 — Pruebas de aceptación

No me digas que está listo hasta pasar estas seis. Corre cada una y muéstrame el resultado.

1. **Un documento de prueba con lo difícil**: una tabla de cuatro columnas donde la última esté vacía para diligenciar, una tabla de dos columnas con texto largo, un título de portada largo, una ruta de archivo en monoespaciado, una lista y una caja de acento. Genera el PDF y el Word.
2. **Revisión visual obligatoria.** Convierte a imagen y **mira las páginas**. Busca: la última columna aplastada, encabezados de columna partidos por la justificación, texto en monoespaciado desbordado del margen derecho, el título de portada cortado por un guion, y filas de tabla sin altura donde hay que escribir. Dime qué encontraste y corrígelo. Si el render no lo mirabas, no lo verificaste.
3. **El Word se abre sin advertencias** y sus campos se ven sombreados.
4. **Un comentario del Markdown no aparece** en ninguna de las dos salidas.
5. **Cambio de color de punta a punta**: cambia un color en el archivo de identidad, vuelve a correr el generador y ambos pipelines, y demuéstrame que cambió en el PDF, en el Word y en un diagrama. Esta es la prueba que valida la arquitectura.
6. **Portabilidad**: revisa que ningún archivo del skill tenga una ruta absoluta con mi nombre de usuario escrita.

## Cómo quiero que trabajes en esto

- Instrucciones técnicas numeradas, un comando por paso, y qué debería ver si funcionó.
- Si algo falla, dímelo de una. No lo maquilles ni lo dejes para el final.
- No inventes valores de identidad, licencias ni rutas. Lo que no sepas, pregúntalo.
- Distingue lo que verificaste de lo que supones. Si no corriste una prueba, dilo.
- Un vacío es un vacío: si no pudiste verificar la licencia de una tipografía, no escribas que es libre.
- Tienes autonomía para decidir nombres de archivo, estructura de carpetas y para corregir un defecto que encuentres en el camino. Al final dime qué agregaste por criterio y por qué.
- Pregúntame antes de instalar algo que ocupe mucho espacio, de sobrescribir un archivo que no creamos en esta sesión, y antes de cualquier commit.

## Qué no hacer

- No unifiques los dos pipelines en uno.
- No pongas la tipografía de marca en los contratos.
- No metas más de un tipo de caja de acento ni más de un tipo de portada. La restricción es lo que produce consistencia.
- No incluyas una tipografía cuya licencia no permita redistribuirla.
- No pongas ejemplos ni alternativas dentro de un campo por diligenciar.
- No me entregues nada sin haber mirado el render.
