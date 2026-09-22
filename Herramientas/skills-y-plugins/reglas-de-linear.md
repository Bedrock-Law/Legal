# Reglas de Linear

Cómo quiero que manejes mi Linear. Aplica a crear, clasificar, actualizar y cerrar tareas.

## El principio

La clasificación se sostiene por diseño y no por disciplina: **cada tarea lleva exactamente una etiqueta de cada grupo que le aplique**, y Linear impide poner dos etiquetas del mismo grupo. Eso es lo que mantiene el tablero limpio sin tener que revisarlo.

De ahí se sigue la consecuencia práctica: si las etiquetas no están agrupadas, el sistema no funciona. Los grupos se crean primero y las etiquetas van siempre dentro de un grupo.

## Estructura de etiquetas

Todo vive en un solo equipo. No se duplican etiquetas ni grupos entre equipos.

Los grupos se organizan por naturaleza, no por tema, y esa distinción importa porque define quién puede crear una etiqueta nueva:

| Naturaleza | Cómo crece | Regla |
|---|---|---|
| **Cerrada** | No crece | Las subcategorías son fijas. Abrir una nueva es decisión mía, nunca automática |
| **Dinámica por sujeto** | Una etiqueta por cliente, contraparte o entidad | Se crea cuando entra un sujeto nuevo, previa confirmación |
| **Dinámica por materia** | Una etiqueta por norma, proyecto o tipo | Se crea cuando aparece una materia nueva, previa confirmación |
| **Operativa** | Tareas internas y herramientas | Estable |

Los grupos que quiero, y sus etiquetas iniciales, te los doy aparte. No los inventes.

Etiquetas transversales que no pertenecen a ningún grupo temático: **Recordatorio**, para las tareas de seguimiento con fecha futura, que se filtran del tablero activo.

## Antes de crear: paso cero, obligatorio

**Busca si el issue ya existe.** Siempre, sin excepción. Un asunto que vuelve no es un issue nuevo: es el mismo issue con un avance más.

Si existe, actualízalo. Si no existe, créalo. Si hay dudas de si dos issues son el mismo asunto, pregúntame antes de crear el segundo.

Esto es lo que más se incumple y es lo que degrada el tablero más rápido: dos issues del mismo asunto significan que ninguno tiene la historia completa.

## Qué lleva un issue

**Ninguna tarea sin macro-categoría, subcategoría y responsable.** Ante ambigüedad, pregunta; no adivines la clasificación.

Título accionable: lo que hay que hacer, no el tema. «Responder el requerimiento de X con los soportes», no «Requerimiento de X».

La descripción es la memoria del asunto y tiene que servirle a alguien que llegue en seis meses sin contexto. Va con:

- Qué se entregó, con el enlace al documento final.
- **Las decisiones de criterio que se tomaron y por qué.** Esto es lo más valioso y lo que siempre se pierde.
- **Los riesgos que se aceptaron a sabiendas**, con la constancia de que se aceptaron.
- Lo que quedó pendiente, con nombre de responsable y no en abstracto.
- Los hallazgos que contradicen lo que se creía. Un hallazgo incómodo sin registrar reaparece igual, pero más tarde y peor.

Relaciona el issue con los que tengan que ver. Un issue aislado obliga a reconstruir el contexto a mano.

## Registro de tiempo

Cada avance sustantivo se registra con su tiempo.

**Distingue siempre el tiempo medido del estimado.** Si lo medí, dilo. Si lo estimaste contra una línea base, dilo y di cuál. Un consolidado que mezcla los dos sin distinguirlos no sirve para sacar estadísticas ni para negociar carga.

Las líneas base de carga las mantengo yo y te las doy. Cuando una tarea se desvíe mucho de su línea base, dímelo: o la línea base está mal calibrada o la tarea tenía algo que no se vio al principio, y las dos cosas hay que saberlas.

El tiempo va en la descripción del issue, no solo en el campo de estimado. El estimado en puntos es para planear; el tiempo real es para medir.

## Estados y cierre

**Un issue se cierra con la decisión final, no con el avance.** Si hay avance, se actualiza y se deja en el estado que corresponda. Cerrarlo porque «ya se entregó algo» rompe la trazabilidad, que es justamente para lo que sirve el registro.

Para asuntos con decisión de por medio, el cierre exige que la decisión esté tomada y escrita: proceder, no proceder, o esperar tal cosa. «Se entregó el análisis» no es una decisión.

Cuando el entregable esté hecho pero falte algo que no depende de mí —una firma, una respuesta de un tercero, un dato— el issue va a revisión y no a terminado, con el pendiente nombrado.

## Recordatorios

Los recordatorios van como issue con la etiqueta **Recordatorio**, colgados del issue padre del asunto, en el backlog, y con la fecha de vencimiento real.

Además van al calendario, y ahí hay un detalle operativo: **tres alertas**, a un mes, a cinco días hábiles y el día del vencimiento. La de un mes va en un evento aparte, porque el calendario no admite avisos con más de cuatro semanas de anticipación.

Un vencimiento que solo avisa el día que vence no es un recordatorio: es una notificación de que ya es tarde.

## Autonomía y sus límites

Haz sin preguntarme:

- Actualizar un issue existente con el avance, el tiempo y los enlaces.
- Cambiar el estado cuando el trabajo efectivamente cambió de estado.
- Relacionar issues entre sí.
- Corregir un título mal puesto o una descripción incompleta.

Pregúntame antes de:

- **Crear una etiqueta o un grupo nuevo.** Es lo que más ensucia el sistema y lo que menos cuesta consultar.
- Clasificar un issue cuando la subcategoría no sea evidente.
- **Borrar un issue o una etiqueta.** Nunca sin confirmación.
- Cerrar un issue que implique una decisión de fondo.
- Reasignar a otra persona.

## Detalles técnicos que cuestan tiempo si no se saben

Estos los aprendí a golpes con la integración de Linear. Tenlos presentes:

- Al crear o actualizar un issue, el parámetro del estado es **`state`**, no `status`. Si pasas `status`, no falla con error: **se serializa dentro de la descripción** y queda basura visible en el issue. Lo mismo pasa con otros parámetros mal nombrados.
- Si eso ocurre, se arregla con una edición parcial que borre el rango de texto contaminado, no reescribiendo la descripción completa a mano.
- Las ediciones parciales tienen tres operaciones útiles: reemplazar un texto exacto, agregar al final, y reemplazar un rango entre dos anclas. Cada ancla tiene que coincidir exactamente una vez, o la operación completa se aborta.
- Al listar issues, el parámetro que selecciona campos solo acepta los nombres de su lista cerrada. Si pones uno que no está, falla toda la consulta. Ante la duda, omítelo y usa la respuesta por defecto.
- Las etiquetas se pasan como lista y **reemplazan el conjunto completo**: lo que no incluyas se quita. Si solo quieres agregar una, primero lee las que ya tiene.
- Las relaciones entre issues son acumulativas: se agregan y no se reemplazan. Para quitar una hay que pedirlo explícitamente.

## Lo que no quiero

- Issues sin responsable.
- Issues cerrados con el trabajo a medias.
- Etiquetas creadas al vuelo para un caso puntual.
- Descripciones que solo dicen qué se hizo y no por qué se decidió así.
- Tiempo estimado presentado como medido.
