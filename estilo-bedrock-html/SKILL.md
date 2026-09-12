---
name: estilo-bedrock-html
description: Genera una página web interactiva con la identidad de Bedrock. Actívalo cuando el usuario pida una página, una propuesta o un documento de Bedrock para enviar por enlace, aunque no mencione diseño ni identidad visual. Cubre la paleta, la tipografía y los patrones de interacción. No lo uses para PDF ni para Word: para eso están estilo-bedrock-pdf y estilo-bedrock-docs.
---

# Bedrock — página de marca

Una pieza interactiva autocontenida en un solo archivo HTML. No sale del mismo Markdown que el PDF y el Word: se construye aparte, a partir de una plantilla con contenido en marcadores.

Dos pasos. Primero se copia `assets/plantilla-web.html`, que trae la identidad, los patrones interactivos y el contenido en marcadores `[ASÍ]`, y se reemplaza el contenido. Después se incrusta el logotipo:

```bash
bash "<carpeta-de-este-skill>/assets/build-web.sh" pagina.fuente.html [salida.html]
```

Invoca el script por la ruta absoluta de la carpeta del skill, no por una ruta relativa al proyecto. El script incrusta en base64 el logotipo oscuro y el blanco —dos exportaciones reales de la marca, no una versión invertida por color— y produce el archivo final. Requiere Pillow: `python3 -m pip install --user Pillow`.

Conviene conservar el fuente con los marcadores y la salida aparte: el fuente pesa la tercera parte y es el que se edita.

## Identidad

| Uso | Valor |
|---|---|
| Primario: encabezado, hero, fondos oscuros | `#1B1D36` |
| Secundario: subtítulos, enlaces, tarjetas | `#224D6E` |
| Acento: filete bajo cada título, footer de la página | `#E9CDA5` |
| Texto | `#000000` |
| Fondo | `#FFFFFF` |

No se usa un cuarto color de marca fuera de esta paleta. Los grises de apoyo (`#6B6F7A`, `#E2E6EB`) son neutros de composición, no color de marca. El footer de la página es dorado (acento) con el logotipo y los enlaces en primario, para contraste — es la única excepción resuelta de "el acento es detalle ocasional".

### Tipografía

| Rol | Fuente | Dónde |
|---|---|---|
| Display: título del hero | **Nexa Bold** (con Montserrat ExtraBold como reemplazo mientras no haya licencia — ver más abajo) | `<h1>` del hero, variable `--display` |
| Títulos y navegación | **Montserrat** (SemiBold 600 / Bold 700 / ExtraBold 800) | Menú, botones, tarjetas, tablas, variable `--sans` |
| Cuerpo | **Tinos** | Párrafos, variable `--serif` |

Tinos y Montserrat van embebidas como `@font-face` en base64 dentro del propio `plantilla-web.html`. La página no hace ninguna petición externa: ni tipografías, ni scripts, ni hojas de estilo. Nexa Bold es una fuente comercial (Fontfabric) sin licencia incluida; mientras no se agregue, `--display` cae a Montserrat ExtraBold. Para activarla cuando haya licencia: conseguir el archivo, convertirlo a base64 y agregar un `@font-face` más al inicio de la hoja de estilos, con el mismo patrón que los de Tinos y Montserrat.

### Logotipo

Todas las variantes derivan del mismo trazo (pirámide sobre rectángulo, partido por el eje central):

| Archivo | Uso |
|---|---|
| `logo-bedrock-horizontal.png` | Isotipo + nombre en línea, en `#1B1D36`. Logotipo oscuro, para fondos claros |
| `logo-bedrock-horizontal-blanco.png` | Mismo trazo, en blanco. Logotipo claro, para fondos oscuros (encabezado, hero) |
| `logo-bedrock-vertical.png` | Isotipo arriba, nombre debajo. No la usa la plantilla por defecto, queda disponible para variantes |
| `logo-bedrock-isotipo.png` | Solo el símbolo, sin el nombre |

`build-web.sh` incrusta la horizontal oscura y la horizontal blanca; son las únicas que la plantilla referencia mediante las variables CSS `--logo-oscuro` y `--logo-claro`.

### Prohibiciones

- **No recolorear el logotipo.** Solo existen las dos versiones dadas: oscura y blanca. Nunca en el acento, nunca en gris, nunca con relleno degradado.
- **No mezclar tipografías fuera de los tres roles definidos.** Nada de fuentes del sistema por defecto ni sustitutos visuales de Nexa Bold, Montserrat o Tinos que no sean los documentados arriba.
- **Máximo dos a tres colores por pieza.** Primario, secundario y acento.
- **El acento como fondo se reserva para el footer.** En el resto de la página es filete, borde o detalle puntual.
- **Márgenes generosos.** Mínimo 40 px en el footer y en las secciones de cierre; no comprimir para ganar espacio.

## Patrones que la plantilla trae resueltos

Barra de progreso, menú fijo con sección activa, menú desplegable en móvil con cierre por Escape, pestañas con navegación por flechas y semántica completa, acordeón que se retira del árbol de accesibilidad al cerrarse, tablas con scroll alcanzable por teclado, revelado al entrar en pantalla y hoja de estilos de impresión. No hay que rehacerlos.

Reglas que la plantilla ya cumple y que hay que conservar:

- **Un solo archivo autocontenido.** Logotipos y tipografías van incrustados en base64, definidos una vez y reutilizados. Cero peticiones externas.
- **La mejora progresiva va en el sentido correcto.** El script añade una clase al elemento raíz y de ella cuelgan el colapso del acordeón, el ocultamiento de los paneles y la opacidad del revelado. Sin JavaScript la página se ve completa. Es el error más costoso de este tipo de pieza: si se invierte, un visor que bloquee el script muestra una página vacía.
- **Las filas de las tablas generadas por script van también en el marcado.** Si no, sin JavaScript la tabla sale con encabezados y cero filas.
- `<meta name="robots" content="noindex, nofollow">` en cualquier documento confidencial.
- Hoja de estilos de impresión que expanda los paneles y el acordeón, libere el ancho máximo, invierta el logotipo del hero y fuerce el color de las barras de gráficos.

## Verificación antes de entregar, siempre

Capturas en escritorio y en móvil, prueba sin JavaScript, e imprimir a PDF para revisar que se expandan los paneles y el acordeón. Comprobar que el cuerpo no tenga desplazamiento horizontal en 320, 390, 768 y 1280 píxeles — el desbordamiento dentro de un contenedor de tabla es correcto, el del cuerpo es un defecto grave.

## Reglas de contenido

- **Nunca inventar datos de la contraparte.** Lo que no se sepa va en un campo visible, con solo su nombre.
- **Nada de compromisos numéricos gratuitos.** Un entregable que promete cifras concretas se convierte en obligación al aceptarse.
- **Sin paralelismos negativos ni regla de tres.** Aplica el skill `humanizar-texto` si está instalado.

## Assets

| Archivo | Qué es |
|---|---|
| `assets/build-web.sh` | Incrusta los logotipos y produce la página autocontenida |
| `assets/plantilla-web.html` | Plantilla de página con la identidad, las tipografías embebidas en base64 y el contenido en marcadores |
| `assets/logo-bedrock-horizontal.png` | Logotipo oscuro, para fondos claros |
| `assets/logo-bedrock-horizontal-blanco.png` | Logotipo claro, para fondos oscuros |
| `assets/logo-bedrock-vertical.png` | Variante apilada, disponible pero no usada por defecto |
| `assets/logo-bedrock-isotipo.png` | Solo el símbolo |

## Requisitos

`python3` con Pillow para incrustar el logotipo. Un navegador para la verificación visual.

## Relación con otros skills

- **`humanizar-texto`** — si está instalado, se aplica solo a todo el texto que se redacte aquí.
- **`estilo-bedrock-pdf`** y **`estilo-bedrock-docs`** — misma identidad, otros formatos. Son skills independientes, no comparten carpeta de assets con este.
