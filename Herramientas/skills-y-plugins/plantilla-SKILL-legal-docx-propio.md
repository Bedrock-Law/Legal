# Plantilla del SKILL.md del pipeline de contratos en Word

Este es el archivo que hay que crear en `~/.claude/skills/[NOMBRE]-legal-docx/SKILL.md`. Está modelado sobre una implementación real y en funcionamiento.

Reemplaza todo lo que va entre corchetes. Ojo con la sección de datos: ahí van datos reales y verificados, no marcadores, o el skill deja de servir para lo único que sirve.

Copia lo que sigue a partir de la línea de guiones.

---

```markdown
---
name: [NOMBRE]-legal-docx
description: Genera documentos legales en .docx nativo y editable con el diseño de [NOMBRE], a partir de Markdown — CONTRATOS sobre todo. Actívalo cuando el usuario pida un contrato, un acuerdo de confidencialidad, un otrosí, una minuta, un contrato de prestación de servicios, un convenio, un acuerdo de transacción, un poder, o cualquier entregable legal que deba compartirse como archivo de Word editable para que una contraparte lo revise, negocie o firme. También para pasar a .docx de marca un borrador de contrato que ya esté en Markdown, y para formularios que un tercero deba diligenciar y devolver. Produce el diseño corporativo completo: portada con resumen no vinculante, línea de acento, encabezados de cláusula en color de marca, cuerpo en tipografía universal, campos por diligenciar sombreados en gris, logo en el encabezado y paginación. Trae plantillas de ley [JURISDICCIÓN] con los datos de [RAZÓN SOCIAL] ya diligenciados. NO lo uses para control de cambios ni redlines sobre un .docx de un tercero: para eso está el skill docx. Tampoco para PDF, presentaciones ni piezas de marketing: para eso está el skill [NOMBRE]-doc.
---

# [NOMBRE] — documentos legales en .docx

Pipeline Markdown → **.docx nativo editable** con el diseño corporativo, para contratos y documentos legales que una contraparte va a revisar, negociar o firmar.

**Regla de flujo:** el documento **nace y se trabaja en `.md`** (fuente de verdad, lo que se versiona); el `.docx` es solo el render final para compartir. Guarda el `.md` y el `.docx` juntos, en la carpeta del caso o del negocio, nunca sueltos.

## Cómo generar un contrato

1. **Parte de una plantilla** de `assets/templates/` y cópiala a la carpeta donde estés trabajando:

   | Plantilla | Uso |
   |---|---|
   | `acuerdo-confidencialidad.md` | [CUÁNDO] |
   | `contrato-servicios.md` | [CUÁNDO] |
   | `otrosi-modificacion.md` | [CUÁNDO] |
   | `[OTRA].md` | [CUÁNDO] |

   Si ninguna aplica, redacta el documento nuevo en `.md` siguiendo las convenciones de abajo y copia el bloque de portada de cualquier plantilla.

2. **Diligencia** los `[CAMPOS EN MAYÚSCULAS]` que correspondan. Deja en corchetes lo que no se sepa: sale resaltado en gris y es visible que falta. Los datos propios ya están diligenciados en las plantillas (ver §Datos propios).

3. **Genera el .docx** invocando el script por la ruta absoluta de la carpeta de este skill, nunca por una ruta relativa al proyecto del usuario:

   ```bash
   bash "<carpeta-de-este-skill>/assets/build-contract-docx.sh" contrato.md [salida.docx]
   ```

   El script convierte los campos en spans sombreados, corre la conversión con el documento de referencia de marca y aplica los dos parches de posproceso. Requiere `pandoc` y `python3`; hace verificación previa y aborta diciendo qué falta.

4. **Verifica visualmente, siempre, antes de entregar:**

   ```bash
   soffice --headless --convert-to pdf salida.docx && pdftoppm -jpeg -r 80 salida.pdf pagina
   ```

   y **lee las imágenes**. Si el usuario no tiene LibreOffice y Poppler, no lo bloquees: entrégale el `.docx`, dile que la revisión automática no corrió y pídele que lo abra en Word para confirmar.

## Qué produce

- **Portada** (página 1, sin encabezado ni pie): logo, eyebrow en color de marca, título en [TAMAÑO] pt, línea de acento, bloque **«Resumen del documento»** con ítems de barra lateral, y el descargo de que el resumen es informativo y **no vinculante**.
- **Clausulado desde la página 2**: tamaño [PAPEL], márgenes de [MÁRGENES], encabezado con logo y la palabra «[TEXTO ESQUINA]» a la derecha, pie con «Página X de Y».
- **[FUENTE CONTRATOS] [TAMAÑO] pt**, cuerpo justificado, interlineado [INTERLINEADO].
- `# Título` → título del documento, centrado y en negrilla.
- `## CLÁUSULA ...` → encabezado de cláusula en negrilla y color de marca, con la marca que evita que quede huérfano al final de la página.
- `### Parágrafo` → negrilla cursiva.
- `[TEXTO EN MAYÚSCULAS]` → campo por diligenciar, sombreado gris. Para resaltar texto que no está en mayúsculas: `[texto]{custom-style="Campo"}`.
- Tabla de dos columnas al final → bloque de firmas.
- **Anexos: cada uno en página nueva**, después de las firmas, con el salto de página en crudo antes del `# ANEXO N — NOMBRE`.

## Reglas que no se rompen

- **El .docx es un documento final para la contraparte: sale sin ninguna nota interna.** Las notas —guía de diligenciamiento, valores usuales, alternativas, instrucciones— van solo en comentarios `<!-- ... -->` del `.md`. El script los elimina siempre. Es lo que permite que la plantilla se documente a sí misma sin riesgo.
- **Nunca inventar datos de la contraparte.** Lo que no se sepa queda en `[CAMPO EN MAYÚSCULAS]`.
- **Nunca poner ejemplos ni alternativas dentro de un campo.** El campo lleva solo su nombre: `[PLAZO DE PAGO EN DÍAS]`, no `[PLAZO — usualmente 30]`. La sugerencia va al comentario.
- **La tipografía del clausulado no es la de la marca**, y es deliberado: el archivo se abre en la máquina de la contraparte, y si la fuente no está instalada Word la sustituye y el documento se descompone. La identidad la sostienen el logo, el color de los encabezados de cláusula y la portada.
- **La voz comercial de la marca no aplica al clausulado.** El lenguaje es jurídico tradicional. Lo que sí aplica es la integridad de los datos.

## Convenciones de redacción

- Idioma [IDIOMA], ley [JURISDICCIÓN].
- Numeración de cláusulas en letras y con raya: `## CLÁUSULA PRIMERA — OBJETO`. Raya larga, no guion.
- Términos definidos en negrilla y comillas la primera vez: `**"Servicios"**`.
- Cifras en letras y números: `treinta (30) días calendario`.
- El título legal en mayúsculas (`# TÍTULO`) va en la página 2. El de la portada va en sentence case, que es la regla de la marca.
- El resumen de portada: cuatro o cinco ítems con lead-in en negrilla —Partes, Objeto, Contraprestación, Vigencia, Anexos— y una línea de síntesis cada uno.
- El clausulado declara los anexos «parte integral» del documento.

## Datos propios

Estos datos van diligenciados en las plantillas. **Verifícalos contra un documento firmado real antes de fijarlos aquí, y anota contra qué se verificaron y cuándo.** Un dato societario equivocado en una plantilla se propaga a todos los contratos que salgan de ella.

| Dato | Valor |
|---|---|
| Razón social | [RAZÓN SOCIAL] |
| Identificación | [IDENTIFICACIÓN] |
| Representante legal | [NOMBRE], documento [NÚMERO] |
| Domicilio | [DIRECCIÓN, CIUDAD] |
| Notificaciones | [CORREO] |
| Domicilio contractual | [CIUDAD, PAÍS] |

Verificado contra [DOCUMENTO FUENTE], [FECHA].

## La portada en el .md

La portada se escribe al inicio del `.md` con bloques de estilo, en este orden: `PortadaLogo` (la imagen del logo), `Eyebrow`, `PortadaTitulo`, `LineaGradiente` (la imagen de la tira de acento), `ResumenTitulo`, cuatro o cinco `ResumenItem`, `FinePrint` con el descargo, y el salto de página en crudo. Las imágenes viven en `assets/` y las resuelve el script. Copia el bloque de cualquier plantilla incluida.

## Referencias y assets

- `references/pipeline-y-convenciones.md` — detalle del pipeline, la anatomía de la portada en el `.md` y **cómo regenerar el documento de referencia** cuando cambie la tipografía, el logo o el pie.
- `assets/build-contract-docx.sh` — el script.
- `assets/[NOMBRE]-contract-reference.docx` — el documento de referencia de Word: estilos, encabezado, pie y configuración de sección.
- `assets/logo.png` · `assets/linea-gradiente.png` — las imágenes de la portada.
- `assets/templates/*.md` — las plantillas de documento.
- `assets/identidad.json` — compartido con el skill `[NOMBRE]-doc`. Los colores salen de ahí; no se editan en el documento de referencia a mano.

## Cómo regenerar el documento de referencia

Se construyó así: se extrae el documento de referencia por defecto (`pandoc --print-default-data-file reference.docx > base.docx`), se descomprime, se editan los estilos —tipografía y tamaño del cuerpo, alineación, interlineado, cada nivel de título, y los estilos propios de portada y de campo—, se crean los archivos de encabezado y de pie con el logo y la paginación, se configura la sección con papel, márgenes y la marca de primera página distinta, y se vuelve a comprimir. Si hay que cambiar tipografía, logo o pie, se repite ese ciclo sobre el documento actual.

Dos parches que el script aplica después de convertir y que no son opcionales: declarar el tipo de imagen del logo en el índice interno del archivo, sin lo cual Word puede reportarlo como dañado; y alinear a la izquierda los párrafos dentro de las celdas de tabla, porque si el cuerpo es justificado las celdas lo heredan y los encabezados de columna salen con las palabras separadas por huecos.

## Relación con otros skills

- **`[NOMBRE]-doc`** — la marca general y la ruta Markdown → PDF. Este skill es su especialización legal en `.docx`.
- **`docx`** — para editar un `.docx` existente: redlines, control de cambios, comentarios. Ese caso no se resuelve con este pipeline.
- **`humanizar-texto`** — se aplica solo a todo el texto que se redacte aquí.

## Advertencia de uso

Las plantillas son **punto de partida, no asesoría legal cerrada**: el clausulado se adapta a cada negocio. Todo documento que salga a una contraparte pasa por revisión antes de enviarse. Nunca inventes datos de la contraparte: lo que no se sepa queda en un campo visible para que sea evidente que falta diligenciar.
```

---

## Qué mirar al llenarla

**El `description` tiene una diferencia con el del otro skill:** aquí la frontera negativa es doble y las dos importan. Hacia el skill `docx`, porque control de cambios sobre un archivo ajeno no se hace con este pipeline —se convertiría un documento de la contraparte en uno propio, perdiendo su redacción—. Y hacia el skill de PDF, porque un contrato en PDF no sirve: la contraparte tiene que poder editarlo. Sin esas dos derivaciones escritas, el asistente escoge mal en los dos sentidos.

Lista también los sinónimos de tu práctica y no solo los genéricos: si trabajas acuerdos de transacción, poderes o formularios para diligenciar, van nombrados. La palabra que no esté es la petición con la que el skill no se activa.

**La sección de datos propios es la única donde no van marcadores.** Va con datos reales y con la anotación de contra qué documento se verificaron y en qué fecha. Un número de identificación equivocado en una plantilla se propaga silenciosamente a todos los contratos que salgan de ella, y aparece cuando alguien va a firmar.

**La regla de las notas internas es lo más útil del diseño y conviene no debilitarla.** Como el script borra todos los comentarios, la plantilla puede llevar dentro la guía de diligenciamiento completa: qué valores son los usuales, qué cláusula es negociable, qué se pregunta antes de enviar. Todo eso viaja con el archivo fuente y no llega nunca al documento del cliente. Es lo que hace que una plantilla sirva a alguien que no la escribió.

**La decisión de la tipografía va explicada y no solo enunciada.** Si en el skill solo dice «usa tal fuente», el asistente la va a cambiar en cuanto le pidas que el contrato «se vea más de marca». Con el motivo escrito —que Word sustituye la fuente que no está instalada y descompone el documento en la pantalla de quien va a firmar— la decisión se sostiene.

**Los dos parches de posproceso van documentados en el cuerpo,** no escondidos en el script. Si alguien regenera el documento de referencia y no sabe que existen, los va a perder y va a concluir que la herramienta de conversión funciona mal.
