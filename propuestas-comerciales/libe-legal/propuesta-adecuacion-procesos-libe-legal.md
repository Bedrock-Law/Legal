---
title: "Adecuación de los procesos de Libe Legal a un entorno de trabajo en Claude Code"
eyebrow: "Propuesta de servicios profesionales · Ref. BED-LIBE-2026-01"
lede: "Diagnóstico, adaptación técnica y capacitación para que el equipo de Libe Legal opere sus actividades de firma de abogados desde tres terminales de Claude Code."
doctype: "Propuesta de servicios"
docdate: "2 de septiembre de 2026"
docscope: "Confidencial · Libe Legal"
docname: "Propuesta-Bedrock-Libe-Legal"
resumen:
  - "**Alcance.** Entendimiento de los procesos actuales de Libe Legal y adaptación a un entorno de trabajo en Claude Code, con GitHub como repositorio compartido y Linear como gestor de tareas."
  - "**Equipo cubierto.** Tres terminales de Claude Code, una por cada integrante del equipo actual de Libe Legal."
  - "**Plazo.** Seis semanas, contadas desde la fecha de inicio que se acuerde con el cliente."
  - "**Honorarios.** Cuatro salarios mínimos legales mensuales vigentes, más el impuesto sobre las ventas."
fineprint: "Documento confidencial. Su contenido es de uso exclusivo de Libe Legal y de Bedrock, y no debe circularse a terceros sin autorización de ambas partes."
---

# Contexto

Bedrock es un despacho de abogados que opera sus procesos internos sobre Claude Code: generación de documentos con identidad propia, servidores de protocolo de contexto de modelo (MCP) conectados a su correo, su calendario, su almacenamiento en Drive y sus hojas de cálculo, y un gestor de tareas en Linear. Esta propuesta traslada esa misma arquitectura al equipo de Libe Legal, ajustada a sus procesos.

Dirigido a Lina Lineros, socia de Libe Legal.[^1]

[^1]: Los datos de Libe Legal que aparecen en esta sección se tomaron de su página web pública, `libelegal.com`, consultada el 2 de septiembre de 2026. No se revisó documentación interna de la firma.

# Diagnóstico de partida

Libe Legal es una firma boutique especializada en asuntos financieros, del mercado de valores y asegurador. Su práctica cubre estructuración de productos financieros y de mercado de valores, financiación, mercado de capitales, cumplimiento normativo, fusiones y adquisiciones, solicitudes de licenciamiento ante el regulador, y gobierno corporativo y comercial. El equipo actual está compuesto por tres personas: Lina Lineros como socia, Paula Knudson como asociada senior y Mateo Castro como asociado, con oficina en la calle 98 # 22-64, oficina 504, en Bogotá.

Este diagnóstico de partida se hizo sobre información pública. La firma verificada de los procesos internos de Libe Legal, sus plantillas, sus flujos de trabajo y su volumen de actividad es el primer entregable del servicio, no un supuesto de esta propuesta.

# Alcance del servicio

Al cierre de las seis semanas, Libe Legal queda con tres terminales de Claude Code operando sobre sus propias cuentas de correo, calendario y almacenamiento, un repositorio en GitHub con sus plantillas y su configuración, un proyecto en Linear para sus asuntos, y el equipo capacitado en el uso diario.

## Entendimiento y adaptación de procesos

Bedrock releva los procesos que Libe Legal ejecuta hoy: cómo redacta conceptos y contratos, cómo hace seguimiento a sus asuntos, cómo gestiona correspondencia con clientes y con el regulador, y qué plantillas usa. Sobre ese relevamiento, adapta la configuración de Claude Code, los MCP servers y los skills al flujo real de la firma, en vez de imponerle un flujo genérico.

## Entorno compartido en GitHub

El trabajo de las tres terminales se sincroniza en un repositorio de GitHub. Ese repositorio queda como el registro versionado de las plantillas, los skills y la configuración de Libe Legal, con historial de cambios y control de quién modificó qué.

## Gestión de tareas en Linear

Los asuntos y las tareas de la firma se registran en Linear, con los mismos criterios de trazabilidad que usa Bedrock: un registro por asunto sustantivo, tiempo medido o estimado, y cierre con la decisión final, no con el avance.

## Adaptación del correo electrónico y los MCP necesarios

Se instalan y configuran, sobre las cuentas de correo de Libe Legal, los servidores MCP que permiten a Claude Code leer, buscar y enviar correo, gestionar el calendario, y trabajar sobre Drive, hojas de cálculo y documentos, en los mismos términos que se describen en la sección siguiente.

Fuera de alcance: la licencia de uso de Claude, y cualquier MCP server o skill distinto de los que se describen en la sección siguiente.

# Qué necesita una firma como Libe Legal, y qué se instala

Una firma boutique de derecho financiero, mercado de valores y seguros tiene necesidades concretas y bien documentadas. Esto es lo que se instala para cubrir cada una, apuntado a las cuentas y a la identidad propias de Libe Legal.

| Necesidad | Qué se instala y cómo se adapta |
|---|---|
| Trazabilidad de trámites regulatorios | Una solicitud de autorización ante la Superintendencia Financiera pasa por su Grupo de Autorizaciones, con radicados numerados y notificación electrónica de cada acto administrativo en PDF. Se instalan los servidores de correo y de calendario conectados a las cuentas propias de Libe Legal, y cada trámite queda como un asunto en Linear, con responsable y fecha. |
| Debida diligencia en M&A y licenciamiento | Un due diligence legal estándar cubre gobierno corporativo, tabla de capitalización y sus instrumentos asociados (opciones, warrants, notas convertibles, pactos de accionistas), litigios y cumplimiento regulatorio, en procesos que suelen tomar entre cuatro y ocho semanas. El servidor de debida diligencia trae cuatro herramientas que siguen ese mismo orden: analiza la tabla de capitalización, verifica antecedentes, evalúa riesgo legal y consolida el informe. |
| Conocimiento del cliente, bajo SARLAFT y SAGRILAFT | Las entidades vigiladas por la Superintendencia Financiera operan bajo SARLAFT; las que no, bajo SAGRILAFT, a cargo de la Superintendencia de Sociedades. Ambos exigen verificar identidad, cotejar contra listas de sanciones y clasificar el riesgo desde el ingreso del cliente o la contraparte. La herramienta de verificación de antecedentes cubre ese primer filtro, antes de que el abogado dedique tiempo al análisis de fondo. |
| Control de versiones en negociaciones | Una financiación o una emisión se negocia a punta de borradores que cambian de mano varias veces entre la firma, el cliente y la contraparte. El repositorio en GitHub deja cada versión con su historial y con quién la modificó; el skill de edición de Word con control de cambios cubre el ida y vuelta de comentarios con la contraparte. |
| Documentos con identidad propia | Los reglamentos de emisión, los prospectos, los conceptos jurídicos y los informes de debida diligencia de Libe Legal no deben verse como de Bedrock ni de ningún tercero. Durante la adaptación, el generador de documentos se reconfigura con el logo, los colores y el membrete propios de Libe Legal. |
| Redacción defendible ante el regulador | Un concepto jurídico o una respuesta a un requerimiento se lee distinto si tiene señales de redacción generada sin verificar; en materia financiera y regulatoria esa diferencia pesa. El skill de depuración de redacción revisa cada documento contra ese estándar antes de entregarlo. |
| Segunda opinión en preguntas normativas | La interpretación de una norma financiera o de mercado de valores no siempre tiene una sola lectura correcta. El panel de segunda opinión somete la pregunta a varios modelos antes de que el abogado se apoye en la respuesta. |

Sobre esta misma base operan, además, el manejo de PDF (lee, combina y hace reconocible el texto de las notificaciones y radicados que llegan de la Superintendencia), el manejo de hojas de cálculo y de presentaciones para las salidas de trabajo del día a día, y la gestión de tareas en Linear con las reglas de estado y etiquetas propias de la firma.

# Cronograma de implementación

El servicio se ejecuta en seis semanas. La fecha de inicio queda para acordar con Libe Legal una vez firmada la propuesta.

| Fase | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---|---|---|---|---|---|
| 1 | X | X | | | | |
| 2 | | X | X | | | |
| 3 | | | X | X | | |
| 4 | | | | X | X | |
| 5 | | | | | X | X |

Detalle por fase:

1. **Entendimiento de procesos.** Entrevistas con los tres integrantes del equipo, revisión de plantillas y precedentes propios, mapeo de los flujos de trabajo que hoy sigue la firma.
2. **Diseño de la adaptación.** Definición de la estructura del repositorio en GitHub, del flujo de trabajo en Linear y de la configuración de cada MCP server sobre las cuentas propias de Libe Legal.
3. **Instalación y configuración.** Instalación de Claude Code en los tres equipos, configuración de credenciales y de los MCP servers, migración de las plantillas propias de Libe Legal al nuevo entorno.
4. **Capacitación.** Sesiones de uso de la terminal para los tres integrantes del equipo, con los casos de uso reales relevados en la fase uno.
5. **Acompañamiento y cierre.** Resolución de dudas sobre el uso diario, ajustes finales a la configuración según el uso real de la primera semana de operación, y entrega de la documentación de cierre.

# Modalidad de trabajo

Las capacitaciones y las instalaciones se hacen de forma remota. La primera sesión comercial presencial, en las oficinas de Libe Legal en Bogotá, no genera cobro adicional por viáticos. Cualquier otra sesión de trabajo presencial que se acuerde durante la ejecución del servicio sí se factura aparte, sobre soporte, por los gastos de desplazamiento que genere.

# Honorarios y forma de pago

Los honorarios de este servicio son cuatro salarios mínimos legales mensuales vigentes, más el impuesto sobre las ventas.

| Concepto | Valor |
|---|---|
| Cuatro salarios mínimos legales mensuales vigentes (2026) | $7.003.620 |
| Impuesto sobre las ventas (19%) | $1.330.688 |
| **Total** | **$8.334.308** |

El salario mínimo legal mensual vigente para 2026 es de $1.750.905, fijado por el Decreto 1469 de 2025. Ese decreto estuvo bajo suspensión provisional entre febrero y julio de 2026; el Consejo de Estado revocó la suspensión en julio de 2026 y el decreto recobró plena vigencia, sin perjuicio de que la demanda de nulidad de fondo sigue en trámite.[^2] Si antes del inicio del servicio se profiere una decisión judicial que modifique el valor del salario mínimo vigente, los honorarios se recalculan sobre el valor que resulte aplicable en esa fecha.

[^2]: Consejo de Estado, Sección Segunda, decisión de julio de 2026 que revoca el auto de suspensión provisional del 12 de febrero de 2026 sobre el Decreto 1469 de 2025.

Forma de pago: cincuenta por ciento a la firma de esta propuesta ($4.167.154) y cincuenta por ciento contra entrega, al cierre de la semana seis ($4.167.154).

# Vigencia de la propuesta

Esta propuesta es válida por quince días calendario contados desde su fecha de emisión, es decir, hasta el 17 de septiembre de 2026. Vencido ese plazo sin aceptación, los honorarios deben revisarse antes de cualquier confirmación, en particular si para entonces cambió el salario mínimo legal mensual vigente que sirve de base al cálculo.

# Advertencia sobre licencias de Claude

Este servicio adapta los procesos de Libe Legal a un entorno de trabajo en Claude Code. No incluye la licencia de uso de Claude. Libe Legal debe contratar directamente con Anthropic el plan que corresponda para cada uno de los tres integrantes de su equipo actual.

A la fecha de esta propuesta, Anthropic ofrece planes individuales Pro y Max por persona; el plan Team exige un mínimo de cinco licencias, por lo que no aplica de forma directa a un equipo de tres personas.[^3] La elección entre Pro y Max para cada integrante del equipo se define durante la fase de entendimiento de procesos, según el volumen de uso real de cada rol. El costo de esa licencia lo asume Libe Legal directamente con Anthropic, y no está incluido en los honorarios de este servicio.

[^3]: Valores de referencia consultados en septiembre de 2026. Los precios de los planes al consumidor de Anthropic cambian con el tiempo; se debe verificar el valor vigente en `claude.com/pricing` antes de contratar.

# Condiciones generales

El servicio se presta bajo confidencialidad respecto de la información de Libe Legal a la que Bedrock tenga acceso durante el entendimiento de procesos. La propiedad de las plantillas, precedentes y flujos de trabajo propios de Libe Legal permanece en cabeza de Libe Legal; lo que se adapta es la forma en que esos activos operan dentro de Claude Code.

# Control de versiones

| Versión | Fecha | Cambios | Estado |
|---|---|---|---|
| 1.0 | 2 de septiembre de 2026 | Versión inicial de la propuesta | Borrador para revisión |
