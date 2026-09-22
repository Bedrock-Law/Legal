# EHOLDINGS FLORIDA S.A.S. (CREDIX1) — paquete documental

Cliente: EHOLDINGS FLORIDA S.A.S., sigla CREDIX1 S.A.S. Representante y accionista: Lawrence Soto Borja. Elaborado por Bedrock S.A.S. como asesor externo.

**Corrección (22 sep 2026):** este paquete se redactó originalmente como prueba del skill `ai-law` (2026-09-12), pero CREDIX1 es un cliente real — confirmado en auditoría de la organización del repo. La nota anterior de "almacenamiento transitorio, sin tarea de Linear asociada" quedó obsoleta; se conserva el resto del documento tal como se generó.

**v2 (esta versión):** el concepto jurídico y todos los documentos se reescribieron tras un consejo de tres modelos (Opus, Sonnet, Haiku — opiniones independientes, revisión cruzada anónima, síntesis del presidente) que auditó el v1 en busca de brechas regulatorias, errores de cita y riesgos frente al cliente. El consejo corrigió cuatro errores de fondo del v1 (norma derogada de SAGRILAFT, numeración de la Ley 1676/2013, ausencia del régimen de permanencia/caducidad del dato, tasa de usura citada como cifra fija) e identificó 14 brechas adicionales, ya incorporadas. Detalle completo de la deliberación en `_proceso-interno/`.

Los documentos viven en una sola carpeta plana para que un futuro skill de marca de EHOLDINGS/CREDIX1 los tome directamente. Cada uno trae marcadores `[MARCA: ...]` que ese futuro skill debe resolver — ninguno debe llegar al documento final entregado al cliente.

## Documentos finales

**Viabilidad jurídica**
- [Concepto jurídico — tarjeta de crédito rotativa garantizada (v1, revisado)](Concepto-Juridico_CREDIX1-Tarjeta-Garantizada-Historial-Crediticio_v1.md) — análisis de viabilidad legal, concluye **procede**, con 14 tesis de conformidad normativa.

**Documentos operativos de reporte y cumplimiento**
- [Manual de reporte a centrales de riesgo (v1, procedimientos operativos)](Manual-Reporte-Centrales-Riesgo_CREDIX1_v1.md) — periodicidad, condiciones de reporte, actualización simultánea, permanencia y caducidad conforme Ley 1266 de 2008.
- [Manual de prevención LA/FT/FP (nuevo)](Manual-Prevencion-LAFT-FP_CREDIX1_v1.md)
- [Procedimiento de debida diligencia de cliente + checklist de afiliación como fuente de información (v1, ampliado)](Procedimiento-DD-Cliente_y_Checklist-Afiliacion-Fuente-Informacion_CREDIX1_v1.md)

**Flujo operativo**
- [Flujograma operativo (v1, con salvaguardas nuevas)](Flujograma_CREDIX1_v1.md)

**De cara al cliente**
- [Términos y condiciones del servicio CREDIX1 (v1, ampliado)](Terminos-y-Condiciones_CREDIX1_v1.md)
- [Política de tratamiento de datos personales (v1, ampliada)](Politica-Tratamiento-Datos-Personales_EHOLDINGS-CREDIX1_v1.md)
- [Disclaimers por fase — publicidad, onboarding, uso, cierre (v1, ampliado)](Disclaimers-por-Fase_CREDIX1_v1.md)
- [Checkboxes de aceptación con fundamento jurídico (v1, de 5 a 10 casillas)](Checkboxes-Aceptacion-Fundamento-Juridico_CREDIX1_v1.md)

**Contractuales**
- [**Contrato Marco CREDIX1 (v1, consolidado)**](Contrato-Marco-CREDIX1_v1.md) — único documento que integra: términos y condiciones, contrato de línea de crédito rotativa, pagaré y carta de instrucciones, contrato DACA con adhesión individual del cliente. Cliente diligencia sus datos una sola vez (página 2) y el resto es referencia a esos datos.
- [Contrato de emisión, patrocinio de BIN y procesamiento (nuevo)](Contrato-Emision-Patrocinio-BIN-Procesamiento_CREDIX1_v1.md)

**Documentos anteriores archivados**
- Los cuatro documentos que se consolidaron en el Contrato Marco (Términos y Condiciones, Contrato de Línea de Crédito, Pagaré y Carta de Instrucciones, DACA) están archivados en `md/_archivo-consolidado-en-contrato-marco/` con sus correspondientes PDF en `pdf/_archivo-consolidado-en-contrato-marco/` — conservados como referencia, no activos en la entrega.

**Costo, cobranza y publicidad**
- [Anexo de costo total del crédito + manual interno de metodología de tasa (nuevo)](Anexo-Costo-Total_y_Manual-Metodologia-Tasa_CREDIX1_v1.md)
- [Política de cobranza (nueva, Ley 2300 de 2023)](Politica-Cobranza_CREDIX1_v1.md)
- [Política de publicidad y protocolo de aprobación de piezas (nueva)](Politica-Publicidad_CREDIX1_v1.md)

## Pendiente de redactar (identificado por el consejo, no crítico para el lanzamiento)

- Contrato de fuente de información con cada operador (DataCrédito Experian, CIFIN-TransUnion, Procrédito) — depende de los formatos que cada operador exija; hoy referenciado pero no redactado como documento independiente.
- Contratos de encargo del tratamiento con cada proveedor tecnológico (verificación de identidad, nube, cobranza si se terceriza) — referenciados en la política de datos, sección 6, pendientes de redactar por proveedor una vez estén definidos.
- Plan de continuidad, cesión de cartera y liquidación ordenada del esquema, más allá de las cláusulas ya incluidas en el contrato de línea de crédito y en el contrato marco DACA.

## Fuente y proceso interno (no forman parte del paquete a marcar)

- [Estatutos de EHOLDINGS FLORIDA S.A.S.](estatutos-eholdings-florida.docx)
- [Transcripción de la reunión del 26 de junio de 2026](reunion-cambios-estatutarios-2026-06-26.md)
- [_proceso-interno/](_proceso-interno/) — borradores del concepto y del flujograma antes del primer ajuste (v0), previos al consejo de modelos.

## Pendiente si esto se convirtiera en caso real

- Todos los documentos son borradores de trabajo: quedan campos en blanco (`[•]` y `[MAYÚSCULAS]`) por completar con datos reales del cliente, de Coopcentral y del emisor del instrumento de pago.
- Los anexos del contrato marco con Coopcentral (adhesión individual, mecanismo técnico de control dinámico, remuneración, liquidación de cartera) no están desarrollados — dependen de una negociación conjunta con el banco, en particular si acepta subordinar su derecho de compensación (cláusula sexta).
- Las verificaciones pendientes de la sección 10 del concepto jurídico siguen abiertas: texto exacto del Capítulo IX de la Circular Básica Jurídica de Supersociedades, articulado preciso de la Ley 2445 de 2025, y numeración definitiva de la Ley 1676 de 2013 contra el Diario Oficial.
- No existe todavía un skill de marca para EHOLDINGS/CREDIX1: los `[MARCA: ...]` quedan como referencia gráfica hasta que se construya uno.
- Pendiente: crear tarea de Linear para este cliente (no existe todavía, ver nota de corrección al inicio del documento) y evaluar si la estructura de carpetas de CREDIX1 (`diagrams/`, `md/`, `pdf/`) se migra a la taxonomía estándar de `Clientes/<slug>/documentos-legales/` que usan los demás clientes del repo.
