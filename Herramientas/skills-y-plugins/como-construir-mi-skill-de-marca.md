# Cómo se construye un skill de documentos de marca

Briefing técnico para replicar, con identidad propia, un sistema de generación de documentos con diseño a partir de Markdown. Describe la arquitectura de una implementación real que produce dos salidas distintas: PDF de marca para documentos internos y de análisis, y Word nativo editable para contratos que una contraparte va a negociar y firmar.

El documento explica el mecanismo. Los valores de identidad —nombre, colores, tipografía, textos de pie— van como marcadores `[ASÍ]` para que se reemplacen.

## La idea central

Son **dos pipelines separados, no uno con dos salidas**. Esa es la primera decisión y la que más ahorra trabajo entenderla temprano.

La razón es que PDF y Word aplican el diseño por mecanismos incompatibles. En la ruta PDF se escribe una plantilla de LaTeX: un archivo de texto que uno controla línea por línea. En la ruta Word no existe plantilla de texto: el diseño se define **dentro de un documento de Word** que sirve de referencia, y la herramienta de conversión mapea sus estilos con nombre a los elementos del Markdown. Intentar unificarlas produce un sistema que hace mal las dos cosas.

De ahí se sigue el reparto:

| Ruta | Para qué | Editable por el receptor |
|---|---|---|
| Markdown → PDF | Informes, análisis, conceptos, requerimientos, documentos internos | No |
| Markdown → Word | Contratos, minutas, formularios para diligenciar | Sí |

En ambas, el **Markdown es la fuente de verdad**: es lo que se versiona y lo que se edita. El PDF y el Word son renders desechables que se regeneran. Si alguien edita el render y no la fuente, el sistema se rompe. Conviene decirlo en el skill de forma explícita, porque es la regla que más se viola.

---

# Ruta A — Markdown a PDF de marca

## Arquitectura

```
diagramas .mmd  →  PDF vectorial          (paso 1, opcional)
documento .md   →  pandoc  →  XeLaTeX  →  PDF   (paso 2)
                      ↑
              plantilla .latex + tipografías + logo
```

Tres piezas:

1. **Un script de construcción** que orquesta y que resuelve solo la ubicación de sus recursos.
2. **Una plantilla LaTeX** que define toda la identidad visual.
3. **Una carpeta de recursos**: tipografías, logo en PDF vectorial, configuración de tema para diagramas.

## Cómo funciona la plantilla

La herramienta de conversión toma el Markdown, produce el cuerpo en LaTeX y lo inyecta en la plantilla donde esta declara `$body$`. Todo lo demás de la plantilla es diseño.

Lo importante es el **contrato de variables**. La plantilla lee variables que el documento declara en su encabezado YAML, y con ellas arma la portada y los encabezados. En la implementación de referencia el contrato es:

```yaml
---
title:    "Título del documento"
eyebrow:  "[ÁREA] · [SUBÁREA]"
lede:     "Una o dos frases que dicen de qué se trata."
doctype:  "Documento interno"
docdate:  "25 de agosto de 2026"
docscope: "Uso interno · [ÁREA]"
docname:  "Nombre-corto-para-el-encabezado"
---
```

Y en la plantilla se consumen así: `$title$` directo, y las opcionales con condicional, `$if(eyebrow)$ ... $endif$`. Definir este contrato primero es lo que hace que todos los documentos salgan consistentes sin pensar: quien escribe llena siete campos y el diseño se aplica solo.

## Los siete bloques de la plantilla

**1. Paleta.** Se declara al inicio con `\definecolor{nombre}{HTML}{RRGGBB}`, un color por línea, y se usa por nombre en el resto. Conviene una paleta corta y nombrada por función, no por color:

```latex
\definecolor{marcaPrimario}{HTML}{[HEX PRIMARIO]}
\definecolor{marcaAcento}{HTML}{[HEX ACENTO]}
\definecolor{tinta}{HTML}{[HEX TÍTULOS]}
\definecolor{cuerpo}{HTML}{[HEX TEXTO]}
\definecolor{gris}{HTML}{[HEX SECUNDARIO]}
\definecolor{linea}{HTML}{[HEX FILETES]}
```

Nombrar por función y no por color permite cambiar la identidad sin tocar el resto de la plantilla. Si un color se llama `azul` y luego la marca es verde, el archivo queda mintiendo.

**2. Tipografía.** Con el paquete `fontspec`, que es la razón por la que el motor tiene que ser XeLaTeX y no el LaTeX clásico: es el que permite usar tipografías del sistema o de una carpeta.

```latex
\usepackage{fontspec}
\setmainfont{[FUENTE]-Regular.ttf}[
  Path = $fontdir$ ,
  BoldFont = [FUENTE]-Bold.ttf ,
  ItalicFont = [FUENTE]-Italic.ttf ]
\newfontfamily\titulos{[FUENTE]-Semibold.ttf}[Path=$fontdir$]
```

`$fontdir$` es una variable que el script pasa en la invocación, con la ruta de la carpeta de tipografías. Ese detalle es el que hace el skill portable: la plantilla no tiene rutas absolutas escritas.

**Advertencia que hay que resolver antes de empezar.** Las tipografías comerciales no se pueden redistribuir dentro de un skill. Si la identidad usa una fuente licenciada, el skill no se puede compartir con nadie. Para un sistema propio conviene una familia libre con variantes de peso suficientes: hacen falta al menos regular, semibold y bold, porque el sistema distingue cuerpo, subtítulos y títulos por peso y no por tamaño.

**3. Jerarquía de títulos.** Con el paquete `titlesec`, que permite redefinir cómo se ve cada nivel. La decisión de diseño relevante es que la numeración automática se apaga (`\setcounter{secnumdepth}{-\maxdimen}`): los títulos se numeran a mano en el Markdown cuando hace falta, lo que da control total sobre esquemas de numeración jurídicos que LaTeX no sabe hacer.

**4. Encabezado y pie.** Con `fancyhdr` y `lastpage`. La combinación de los dos permite el «página X de Y», que necesita conocer el total. La estructura de la implementación de referencia: arriba a la izquierda el nombre corto del documento, arriba a la derecha la paginación, abajo a la izquierda una línea fija de identidad, abajo a la derecha el alcance del documento. Los filetes se pintan con el color de línea de la paleta, no con el negro por defecto.

**5. Tablas.** Con `booktabs`, que produce tablas de filetes horizontales sin cuadrícula. Es la diferencia visual más grande entre un documento que parece de diseño y uno que parece de procesador de texto. Se sube el `\arraystretch` a 1.25 para dar aire vertical.

**6. Cuadro de acento.** Con `tcolorbox`, para el bloque que resalta una conclusión o una advertencia. Se define una sola vez como entorno con nombre y se usa desde el Markdown. Uno basta: dos o tres tipos de caja distintos se usan mal.

**7. La portada.** Es un comando propio, `\portada`, que se invoca solo si el documento tiene título. Su composición: logo arriba, un `\vfill` que empuja el resto abajo, una línea de gradiente dibujada con `tikz` como único acento gráfico, el eyebrow en versalitas con espaciado de letra aumentado, el título grande, el lede, y una tabla de tres columnas con documento, fecha y alcance. Termina con `\clearpage`.

El truco del `\vfill` es lo que da el aire: el contenido de la portada vive en el tercio inferior y arriba queda espacio en blanco. Es una decisión de composición, no un accidente.

## El script de construcción

Cuatro responsabilidades, en este orden:

**Resolver sus propias rutas.** El script averigua dónde vive él mismo y de ahí deduce dónde están la plantilla, las tipografías y el logo:

```bash
ASSETS="$(cd "$(dirname "$0")" && pwd)"
```

Sin esto el skill solo funciona en la máquina donde se escribió.

**Verificar dependencias antes de correr.** Comprueba que estén los programas necesarios y, si falta alguno, aborta con las instrucciones de instalación para cada sistema operativo. Esto importa más de lo que parece: sin la verificación previa, la falla aparece como un error interno del motor de composición, ilegible, treinta líneas más abajo.

**Renderizar los diagramas.** Convención: los diagramas viven en una subcarpeta `diagrams/` junto al documento, en formato de texto, y el script los convierte a **PDF vectorial** antes de la composición. Vectorial y no imagen: un diagrama en PNG dentro de un PDF se ve borroso al ampliar y delata el documento. El tema del diagrama se pasa por un archivo de configuración con los colores de la paleta, de modo que los diagramas no se salen de la identidad.

**Componer.** Una sola invocación que pasa la plantilla, el motor, las variables de recursos y una ruta de búsqueda que incluye tanto la carpeta del documento como la del skill.

Un detalle operativo con consecuencia: el script debe correr **con el directorio de trabajo en la carpeta del documento**, para que las rutas relativas a imágenes funcionen. Si además la implementación tiene la costumbre de escribir salidas junto al fuente, conviene construir en una carpeta temporal y mover el resultado, porque construir en el mismo sitio repetidas veces puede anidar carpetas.

---

# Ruta B — Markdown a Word editable

## El cambio de mecanismo

Aquí no hay plantilla de texto. El diseño vive en un **documento de Word de referencia** y la herramienta de conversión hace un mapeo por nombre de estilo: cuando encuentra un título de primer nivel busca el estilo llamado `Heading 1` en el documento de referencia y lo aplica; cuando encuentra un párrafo, aplica el estilo del cuerpo.

La consecuencia práctica es que **para cambiar el diseño se edita un archivo de Word, no código**. Y como un archivo de Word es en realidad un archivo comprimido con documentos de marcado dentro, editarlo con precisión significa descomprimirlo, modificar el marcado de estilos y volverlo a comprimir.

## Cómo se construyó el documento de referencia

El procedimiento exacto, que es el que hay que repetir para una identidad propia:

1. Extraer el documento de referencia por defecto de la herramienta de conversión. Sale un Word con los estilos estándar.
2. Descomprimirlo.
3. Editar el archivo de estilos: tipografía y tamaño del cuerpo, alineación, interlineado, y la definición de cada nivel de título.
4. Crear los archivos de encabezado y de pie, con el logo y la paginación.
5. Configurar la sección: tamaño de papel, márgenes, y la marca que hace que la primera página tenga encabezado distinto —así la portada sale limpia.
6. Volver a comprimir.

Ese documento queda como recurso del skill y no se vuelve a tocar salvo que cambie la identidad. Cuando cambie, se repite el ciclo sobre el documento actual.

## Estilos con nombre propio

Además de los estándar, se definen estilos propios que el Markdown puede invocar directamente. En la referencia son siete, todos para la portada, más uno para los campos:

| Estilo | Función |
|---|---|
| `PortadaLogo` | Contenedor de la imagen del logo |
| `Eyebrow` | Línea superior en versalitas, color de marca |
| `PortadaTitulo` | Título grande de portada |
| `LineaGradiente` | Contenedor de la imagen de la línea de acento |
| `ResumenTitulo` | Encabezado del bloque de resumen |
| `ResumenItem` | Ítem del resumen, con barra lateral de color |
| `FinePrint` | Letra pequeña del descargo |
| `Campo` | Sombreado gris para los campos por diligenciar |

Desde el Markdown se invocan con bloques delimitados:

```markdown
::: {custom-style="Eyebrow"}
[ÁREA] · [SUBÁREA]
:::

::: {custom-style="PortadaTitulo"}
Título del documento
:::
```

Esto exige habilitar dos extensiones del formato de entrada en la invocación: la de bloques y atributos entre corchetes, y la de bloques de marcado en crudo. Sin ellas, los delimitadores aparecen como texto literal en el resultado.

**La línea de gradiente es una imagen, no un gráfico.** En Word no hay forma limpia de dibujar un degradado desde Markdown, así que se exporta una tira de píxeles y se inserta con ancho fijo. Es la solución fea que funciona.

## El preproceso: dos transformaciones antes de convertir

Aquí está la parte más útil de copiar, porque resuelve dos problemas reales de los documentos jurídicos.

**Primera: los campos por diligenciar se detectan solos.** Se escribe `[NÚMERO DE CÉDULA]` en el Markdown y sale sombreado en gris en el Word. Lo hace una expresión regular que busca corchetes cuyo contenido está **en mayúsculas** y los envuelve en el estilo `Campo`:

```
\[([A-ZÁÉÍÓÚÑÜ0-9][A-ZÁÉÍÓÚÑÜ0-9 .,;:/%$§°\-–—#()]*)\](?![({\[])
```

La condición de mayúsculas es lo que hace que funcione sin falsos positivos: los enlaces en Markdown también usan corchetes, pero su texto no va en mayúsculas, y la mirada negativa al final descarta lo que va seguido de paréntesis o llave. El resultado es que quien redacta no piensa en estilos: escribe el nombre del campo en mayúsculas entre corchetes y aparece resaltado.

Esta convención va acompañada de una regla de redacción: **el campo lleva solo su nombre**, nunca ejemplos ni alternativas dentro. `[PLAZO DE PAGO EN DÍAS]`, no `[PLAZO — usualmente 30]`.

**Segunda: las notas internas se eliminan siempre.** Todos los comentarios del Markdown se borran en el preproceso. Eso permite escribir la guía de diligenciamiento, los valores usuales y las instrucciones internas dentro del propio archivo fuente, con la garantía de que el documento entregable sale limpio. Es lo que hace que la plantilla pueda documentarse a sí misma sin riesgo de filtrar notas al cliente.

## Dos parches de posproceso

El resultado de la conversión necesita dos correcciones que la herramienta no hace.

**Declaración del tipo de imagen.** Cuando el logo va en el encabezado, la herramienta copia el archivo pero omite declarar su tipo en el índice interno del documento comprimido. Sin esa declaración, Word puede reportar el archivo como dañado. El parche abre el comprimido, agrega la línea que falta y lo vuelve a cerrar.

**Alineación dentro de las tablas.** Si el cuerpo del documento es justificado, las celdas heredan la justificación y los encabezados de columna salen con las palabras separadas por huecos, ilegibles. La herramienta aplica a los párrafos dentro de celdas un estilo propio con nombre reconocible; el parche agrega a ese estilo la alineación a la izquierda. Es un cambio de una línea en el archivo de estilos y es la diferencia entre una tabla presentable y una que no.

---

# Lo que hay que decidir antes de construir

Seis decisiones. Tomarlas primero evita rehacer.

**1. Nombre del sistema.** Va a aparecer en el nombre del skill, en el de los recursos y en los mensajes del script. Cambiarlo después es tedioso.

**2. Paleta, nombrada por función.** Seis colores bastan: primario, acento, tinta de títulos, texto de cuerpo, gris secundario, filetes. Dos advertencias de la implementación de referencia: el fondo no es blanco puro sino un gris muy claro, y el color de acento se usa en menos del diez por ciento del área. Un documento con dos colores fuertes compitiendo se lee peor que uno con uno.

**3. Tipografía, y la licencia.** Verificar que se pueda redistribuir. Hacen falta tres pesos como mínimo.

**4. La tipografía de los contratos es aparte, y probablemente no es la de la marca.** Decisión deliberada de la implementación de referencia: los contratos van en una fuente universal, no en la de la identidad. El motivo es que el archivo se abre en la máquina de la contraparte, y si la fuente no está instalada Word la sustituye y el documento se descompone. Un contrato con el diseño roto en la pantalla de quien lo tiene que firmar es peor que un contrato sobrio. La identidad en los contratos se sostiene con el logo, el color de los encabezados de cláusula y la portada; no con la tipografía.

**5. El contrato de variables del encabezado.** Los siete campos, o los que se decidan. Es lo que hace que el sistema sea automático.

**6. La taxonomía del eyebrow.** La línea superior clasifica el documento. Vale la pena fijar el vocabulario desde el principio, porque es lo que hace que una serie de documentos se lea como una serie.

## Orden de construcción

1. La plantilla LaTeX con la paleta y la tipografía, probada con un documento de una página.
2. La portada. Es lo que consume más iteraciones: conviene ajustarla sola, sin cuerpo.
3. El script, con la verificación de dependencias.
4. Los diagramas, si se van a usar.
5. El documento de referencia de Word, siguiendo los seis pasos de arriba.
6. Los estilos propios de portada y el preproceso de campos.
7. Los dos parches de posproceso.
8. Las plantillas de documento: una por tipo que se produzca de forma recurrente.

## Verificación, que no es opcional

**Cada render se mira antes de entregarlo.** Se convierte a imagen y se revisa. Lo que hay que buscar, que es lo que falla en la práctica:

- Tablas cuya última columna quedó aplastada, sobre todo si es la columna donde alguien tiene que escribir.
- Encabezados de columna partidos por la justificación heredada.
- Rutas de archivo o texto en monoespaciado que se desbordan del margen derecho. El motor de composición no parte esas cadenas: hay que acortar el texto en el fuente.
- Portada con el título cortado por un guion, si no se desactivó la partición de palabras.
- Filas de tabla sin altura donde debería haber espacio para diligenciar.

Un documento con el texto perfecto y la tabla ilegible no sirve. Y es un error que solo se ve mirando la imagen: el fuente se ve bien.

## Lo que se hereda del diseño de referencia y conviene conservar

- **El Markdown es la fuente de verdad.** El render se regenera; no se edita.
- **Las notas internas viven en el fuente y nunca en el entregable.** Lo garantiza el preproceso, no la disciplina.
- **Nunca inventar un dato de la contraparte.** Lo que no se sabe va en un campo visible.
- **El script resuelve sus propias rutas.** Nada absoluto escrito.
- **La verificación previa de dependencias con instrucciones de instalación.** Convierte un error críptico en un paso ejecutable.
- **Una sola caja de acento, un solo tipo de portada.** La restricción es lo que produce consistencia.

## El defecto de la implementación de referencia

La paleta está escrita en más de siete archivos: la plantilla LaTeX, la hoja de tokens del canal web, la configuración de tema de los diagramas, los dos logos vectoriales, el archivo de estilos del documento de Word y la documentación del propio skill. **No hay una única fuente de verdad para el color.** Cambiar un tono obliga a buscarlo en todos esos sitios, y basta olvidar uno para que un diagrama salga con el color viejo.

Para un sistema propio conviene invertirlo desde el principio: un solo archivo de definición de identidad —los seis colores, los nombres de las tipografías, los textos fijos del pie— y un pequeño generador que escriba desde ahí la plantilla LaTeX, la configuración de diagramas y el archivo de estilos de Word. Es media hora más de trabajo al principio y elimina la clase entera de errores.
