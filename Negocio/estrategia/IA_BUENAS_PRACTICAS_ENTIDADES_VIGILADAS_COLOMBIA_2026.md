# Inteligencia Artificial en Entidades Vigiladas por la Superintendencia Financiera: Marco Regulatorio y Buenas Prácticas

**Documento Ejecutivo**  
Bedrock Despacho de Abogados  
Septiembre 2026

---

## Resumen Ejecutivo

La implementación de inteligencia artificial en entidades vigiladas por la Superintendencia Financiera de Colombia (bancos, comisionistas de bolsa, gestores patrimoniales, fondos) enfrenta un entorno regulatorio en transformación. Aunque Colombia aún carece de una regulación específica y exhaustiva sobre IA financiera, existen marcos aplicables en gobierno corporativo, gestión de riesgos tecnológicos, prevención de lavado de activos y protección de datos que generan obligaciones concretas.

Este documento integra el marco regulatorio colombiano vigente, estándares internacionales (BIS, FSB, FCA, EBA, OCC) y experiencias de otras jurisdicciones para establecer un modelo de gobernanza y riesgos adaptable a la realidad regulatoria colombiana. Las recomendaciones priorizan compliance sobre innovación, reconociendo que en el sector financiero la prudencia regulatoria manda sobre la velocidad de adopción.

**Hallazgo principal:** Las entidades que logran implementación exitosa en Colombia combinan tres elementos: (i) aprobación y seguimiento del órgano de gobierno corporativo, (ii) documentación exhaustiva de decisiones de IA y validación permanente, (iii) integración con ciclos existentes de auditoría y control. No existe atajo en el tiempo; el período realista de implementación es 18 a 36 meses.

---

## 1. CONTEXTO REGULATORIO COLOMBIANO

### 1.1 Situación Actual de la Regulación de IA

Colombia se encuentra en una etapa de preparación regulatoria. La Superintendencia Financiera ha reconocido la importancia de la IA tanto como oportunidad (modernización, eficiencia) como riesgo (seguridad financiera, consumidor). Actualmente:

- **No existe regulación específica sobre IA en entidades financieras.** Los proyectos de ley 042 y 043 de 2025 se encuentran en trámite legislativo sin probabilidad de conclusión inmediata.
- **La Superintendencia implementa IA internamente** para detección de lavado de activos y financiación del terrorismo, usando la herramienta como referencia de que adopción es compatible con supervisión prudencial.
- **Se contempla un modelo de sandbox regulatorio** siguiendo iniciativas existentes desde 2018 para sectores de alto impacto, permitiendo pruebas controladas con supervisión.

Fuente: Superintendencia Financiera de Colombia, comunicados 2026; proyectos de ley congresionales.

### 1.2 Marcos Regulatorios Vigentes Aplicables

Las entidades vigiladas operan bajo un conjunto de regulaciones que generan obligaciones indirectas sobre tecnología e IA:

**Gobierno Corporativo**
- Decreto 2555 de 2010 (régimen de sociedades vigiladas)
- Circular Externa 029 de 2014 (mejores prácticas de gobierno corporativo)
- External Circular 028 de 2014 (Código País)
- Ley 222 de 1995 (obligaciones contables y de reporte)

Estos marcos exigen que los órganos de gobierno (junta directiva, comité de riesgos) mantengan supervisión efectiva de tecnología, incluyendo IA. No es delegación automática a tecnología.

**Gestión de Riesgos Tecnológicos**
- External Circular 100 de 1995 (marco de riesgos, incluyendo riesgo operacional)
- Decreto 1297 de 2022 (estándares técnicos y de seguridad para arquitectura financiera abierta)

El riesgo operacional cubre falla de sistemas, y un modelo de IA es un sistema con vulnerabilidades específicas (sesgo, deriva de datos, alucinación).

**Lavado de Activos y Financiación del Terrorismo**
- Ley 1962 de 2019 (LAFT)
- Decreto 1727 de 2018 (SARLAFT - Sistema de Administración de Riesgos de Lavado de Activos y Financiación del Terrorismo)

Aplicable a todas las entidades vigiladas. La IA puede ser herramienta de detección, pero también fuente de riesgo si no valida predicciones contra información independiente. La Superintendencia advierte que no se delega la responsabilidad de LAFT a un algoritmo.

**Protección de Datos Personales**
- Ley 1581 de 2012 (HABEAS)
- Decretos 1377/2013 y 1074/2015

Especialmente relevante para IA de credit scoring, análisis de riesgo crediticio y atención al cliente. Modelos que usen datos personales enfrentan obligaciones de acceso, rectificación, revocatoria y limitación de transferencias internacionales.

Fuente: Superintendencia Financiera, compilación de normativa vigente disponible en www.superfinanciera.gov.co.

### 1.3 Circulares y Documentos de Orientación Recientes

- **External Circular 004 de 2024:** Estándares para finanzas abiertas (open banking). Establece requerimientos técnicos y de seguridad relevantes para sistemas que integren IA.
- **Comunicados Superintendencia Financiera (2025-2026):** Reconocimiento de sandbox regulatorio como herramienta para probar IA en ambiente controlado con supervisión.

No existe a la fecha una circular específica sobre gobernanza de IA o validación de modelos en el sector financiero colombiano. Las obligaciones se derivan de aplicación de marcos existentes.

---

## 2. ESTÁNDARES INTERNACIONALES APLICABLES

### 2.1 Banco de Pagos Internacionales (BIS)

El BIS, como organismo de coordinación para bancos centrales, ha publicado en 2025-2026 reportes de peso regulatorio internacional:

**Reportes Clave:**
- **Octubre 2025:** Informe sobre "Monitoring Adoption of Artificial Intelligence in the Financial Sector". Advierte sobre vulnerabilidades compartidas en sistemas financieros que adopten IA simultáneamente, sin independencia de modelos.
- **Junio 2025:** Financial Stability Implications of AI. Analiza contagio sistémico si múltiples intermediarios adoptan modelos similares con datos correlacionados.
- **Septiembre 2025:** Managing Explanations - How Regulators Can Address AI Explainability. Subraya que reguladores no pueden supervisar lo que no pueden explicar.

**Implicación para Colombia:** Aunque el BIS no regula directamente, la Superintendencia sigue sus indicaciones. Las entidades que implementen IA sin ser capaces de explicar sus decisiones enfrentarán presión regulatoria cuando se endurezca la normativa.

Fuente: www.bis.org, reportes 2025-2026.

### 2.2 Financial Stability Board (FSB)

El FSB publicó en junio 2026 un reporte de consulta sobre **Sound Practices for Responsible Adoption of AI**, con adopción esperada en octubre 2026:

**12 Prácticas de Sonoridad Identificadas:**
1. Gobierno corporativo de IA (junta directiva debe aprobar y supervisar)
2. Roles y responsabilidades claros (no delegación a un equipo)
3. Gestión de riesgos integrada en ciclo de desarrollo, no ex-post
4. Capacidad de auditoria y trazabilidad de decisiones
5. Validación independiente antes de producción
6. Monitoreo post-despliegue (performance drift, sesgo emergente)
7. Documentación del modelo (entrenamiento, datos, limitaciones conocidas)
8. Planes de continuidad si falla IA
9. Transparencia a clientes/reguladores según corresponda
10. Gestión de riesgos de cadena de suministro (terceros que entregan modelos)
11. Gestión de datos de entrenamiento (sesgo, representatividad)
12. Escalada de excepciones a governance

Estas prácticas son aplicables por proporcionalidad: lo que exige un banco grande con IA en decisiones crediticias es distinto a una pequeña sociedad comisionista. Pero la dirección es clara.

Fuente: FSB, www.fsb.org, junio 2026.

### 2.3 Reguladores Específicos

**FCA (UK):** Regulación principles-based, no prescriptiva. Ofrece "AI Live Testing" (sandbox con regulador) y relanza supervisión a través de existing frameworks. No crea reglas nuevas, aplica existing rigor a IA.

**EBA (Unión Europea):** En contexto de EU AI Act (vigente desde 2024), ha publicado guidance sobre implicaciones para banca. Distingue entre AI de alto riesgo (credit scoring) y bajo riesgo (análisis de balances). Requiere auditoría específica en ML para modelos IRB (Basilea III).

**OCC (USA):** Desde mayo 2026, requiere que bancos con IA significativa documenten: (i) gobierno corporativo, (ii) validación de modelos, (iii) detección de sesgo, (iv) kill switches (opción de desconectar modelo si falla), (v) planes de continuidad. Elevó IA a item permanente de examen regulatorio.

Síntesis: Los reguladores internacionales convergen en que IA no es excepción a control prudencial existente, sino extensión.

---

## 3. MEJORES PRÁCTICAS: GOBERNANZA Y RIESGO

### 3.1 Estructura de Gobernanza

**Nivel Consejo/Junta Directiva:**
- Aprobación explícita de política de IA (no delegación completa a tecnología)
- Definición de límites (ej: IA no puede decidir sola sobre exclusión crediticia, solo recomendar)
- Supervisión trimestral de: nuevos modelos desplegados, incidentes, metrics de fairness
- Nombrar un "AI Chief Risk Officer" o rol equivalente con reporte directo a junta

**Nivel Comité de Riesgos/Cumplimiento:**
- Validación independiente antes de producción (equipo externo a desarrollo)
- Monitoreo mensual de performance drift, sesgo detectado, false positives/negatives
- Auditoría anual de cumplimiento normativo (HABEAS, LAFT, gobierno corporativo)
- Documentación de todas las decisiones (por qué se eligió este modelo, qué se descartó, qué riesgos se aceptan)

**Nivel Operacional (Tecnología/Data):**
- Documentación exhaustiva: especificación del modelo, datos usados, hiperparámetros, performance en muestra de test
- Procedimientos de escalada si modelo viola límites (ej: tasa de rechazo > 60%)
- Auditoría de código y reproducibilidad (puede otro analista recrear el modelo con mismos datos)

### 3.2 Gestión de Riesgos de IA

**Riesgos a gestionar (incorporando estándares BIS/FSB/OCC):**

| Riesgo | Descripción | Control Típico |
|--------|-------------|-----------------|
| **Sesgo** | Modelo discrimina contra grupo protegido (raza, género, edad, procedencia) | Auditoría anual de fairness; test de disparate impact; diverse training data |
| **Alucinación** | Modelo genera información falsa (especialmente generative AI) | Validación manual de outputs críticos; prohibir en decisiones sobre cliente |
| **Deriva de datos** | Performance decae porque distribución de datos en producción difiere del entrenamiento | Monitoreo automático de distribution shift; retrenamiento cuando degrada |
| **Privacidad** | Fuga de datos de entrenamiento que contienen PII | Anonimización; restricción de acceso; auditoría de HABEAS compliance |
| **Modelo contrario** | Adversario intenta manipular decisión (ej: transferencias para evadir AML) | Validación robustez; pruebas adversariales; combinación de señales |
| **Dependencia excesiva** | Humanos dejan de verificar porque "confían en el algoritmo" | Capacitación; kill switches; límites de aplicación automática |
| **Terceros** | Proveedor de modelo (cloud AI provider) cambia términos, cierra servicio o es comprometido | Contrato que asegure auditabilidad; plan de contingencia; no usar para decisiones críticas si no es auditable |

### 3.3 Validación de Modelos

Protocolo mínimo (adaptado de OCC 2026 guidance):

1. **Pre-despliegue:**
   - Test en muestra independiente (no usada en entrenamiento)
   - Análisis de sesgo por subgrupos (por género, edad, región, ingreso)
   - Pruebas de robustez (qué pasa si datos son ruido, o se pierden campos)
   - Benchmarking vs. modelo anterior o regla manual (el nuevo debe mejorar, no solo ser "automático")
   - Revisión independiente por equipo sin interés en despliegue

2. **Post-despliegue (primeros 3-6 meses):**
   - Monitoreo semanal de performance metrics (accuracy, precision, recall)
   - Detección automática de distribution shift
   - Auditoría manual de sample de decisiones (verificar que recomendaciones eran acertadas)
   - Reporte mensual a comité de riesgos

3. **Operación permanente:**
   - Auditoría trimestral de sesgo
   - Retrenamiento anual con datos nuevos
   - Documentación de cambios
   - Actualización de política si aplicación se expande

---

## 4. RECOMENDACIONES ESPECÍFICAS PARA COMISIONISTAS DE BOLSA

### 4.1 Casos de Uso de Mayor Aplicabilidad

**1. Automatización de Back-Office (Bajo Riesgo, Alta ROI)**
- Clasificación de operaciones, reconciliación, data entry
- Control: Auditoría manual de excepciones; logs de decisiones
- Timeline: 6-12 meses

**2. Detección de Fraude y Lavado de Activos (Riesgo Medio, Crítico)**
- ML para identificar patrones anómalos en transacciones
- Control: Modelo NO decide automáticamente, solo escala a compliance officer
- Validación: Backtesting sobre casos históricos de fraude confirmado
- Timeline: 12-18 meses

**3. Análisis de Riesgo de Contraparte (Riesgo Medio)**
- Scoring de nuevos clientes, monitoreo continuo
- Control: Decisión final con humano; acceso a justificación del modelo
- Compliance: Debe respetar HABEAS (si incluye datos de terceras personas)
- Timeline: 12-18 meses

**4. Robo-Advisors (Recomendación, Riesgo Medio-Alto)**
- Algoritmos que sugieren asignación de portafolio
- Control: Disclosure claro de que es IA; cliente puede rechazar; auditoría de sesgo en recomendaciones
- Regulación aplicable: Ley 1581 (datos personales), Circular 028 de 2014 (gobierno corporativo sobre servicios de asesoramiento)
- Timeline: 18-24 meses

**5. Chatbots y Atención al Cliente (Riesgo Bajo-Medio)**
- Respuestas automáticas a preguntas frecuentes
- Control: Debe poder escalar a humano; no debe simular ser regulador o dar asesoramiento legal
- Timeline: 6-12 meses

**NO recomendado sin arquitectura avanzada:**
- Decisiones crediticias autónomas (riesgo legal, regulatorio)
- Decisiones sobre exclusión de cliente (reputación, discriminación)
- Sustitución completa de compliance en LAFT

### 4.2 Arquitectura de Cumplimiento para Comisionistas

Una comisionista típica debe establecer:

**Governance:**
- Política de IA aprobada por junta (documento 5-10 páginas que defina límites)
- Comité de riesgos que autorice cada despliegue
- Chief Digital Officer / CTO con reporte a comité
- Auditor independiente (interno o externo) que valide antes de producción

**Ciclo de Vida:**
- Fase 1 (Definición): Especificación de caso de uso, métricas de éxito, límites, riesgos
- Fase 2 (Desarrollo): Build del modelo con documentación completa
- Fase 3 (Validación): Test independiente, auditoría de sesgo, backtesting
- Fase 4 (Despliegue): Pilotos controlados (muestra pequeña primero)
- Fase 5 (Monitoreo): Alertas de degradación, retrenamiento programado

**Documentación:**
- Registro de todas las decisiones (archivo único de verdad)
- Especificación del modelo (qué variables usa, cómo se preparó data, qué performance tiene)
- Auditoría trail (quién pidió qué, quién aprobó, cuándo se cambió)
- Evidencia de validación (reportes de test, sesgo, benchmarking)

**Integración Regulatoria:**
- Incluir IA en Matriz de Riesgos (ERM - Enterprise Risk Management)
- Reportar a Superintendencia en SARLAFT si modelo es de riesgo (ej: client onboarding)
- Cumplimiento de HABEAS si procesa datos personales (especialmente de terceros)
- Auditoría externa anual de sistemas críticos que incluya IA

### 4.3 Estimaciones de Inversión y Timeline

Para una comisionista pequeña-mediana (100-500 personas):

| Componente | Costo Estimado | Timeline |
|------------|-----------------|----------|
| Gobierno y política | COP 20-40M | 1-2 meses |
| Herramientas de MLOps | COP 100-200M/año | 1 mes |
| Desarrollo del modelo (outsourced) | COP 200-400M | 4-6 meses |
| Validación independiente | COP 50-100M | 1-2 meses |
| Capacitación staff | COP 30-50M | 2-3 meses |
| **Total Fase 1** | **COP 400-790M** | **6-12 meses** |

Retorno estimado (fraude + eficiencia):
- Prevención de fraude: COP 500M-2B anuales (depende volumen transaccional)
- Eficiencia operativa: 15-30% reducción de costos back-office
- Payback típico: 2-3 años

---

## 5. ROADMAP DE IMPLEMENTACIÓN TÍPICO

### 5.1 Fase 0: Preparación (Meses 1-2)

- [ ] Diagnóstico de datos disponibles (¿están limpios? ¿qué edad tienen?)
- [ ] Entrevistas con stakeholders (tecnología, cumplimiento, negocio)
- [ ] Benchmarking de soluciones (build vs. buy vs. partnerships)
- [ ] Redacción de política de IA (gobierno corporativo)
- [ ] Identificación de casos de uso prioritarios
- [ ] Presupuestación realista

Entregable: Governance Framework, Use Case Prioritization Matrix, Budget.

### 5.2 Fase 1: Piloto Controlado (Meses 3-9)

- [ ] Seleccionar caso de uso de riesgo bajo (ej: automatización back-office)
- [ ] Desarrollo del modelo (equipo interno o vendor)
- [ ] Validación independiente
- [ ] Despliegue en 10-20% del volumen transaccional
- [ ] Monitoreo intensivo (alertas si performance < umbral)
- [ ] Auditoría de resultados vs. línea base
- [ ] Documentación de lecciones aprendidas

Entregable: Model Card, Validation Report, Deployment Log, Lessons Learned.

### 5.3 Fase 2: Escalado Gradual (Meses 10-18)

- [ ] Ampliar a 50% del volumen si métricas sostenidas
- [ ] Iniciar desarrollo del segundo caso de uso (ej: detección de fraude)
- [ ] Retrenamiento del primer modelo con datos nuevos
- [ ] Auditoría interna de compliance (HABEAS, LAFT)
- [ ] Capacitación de personal operativo
- [ ] Integración con sistemas de reporting (a Superintendencia si aplica)

Entregable: Scaling Report, Second Model Specification, Compliance Audit.

### 5.4 Fase 3: Operación Sostenida (Meses 19-36)

- [ ] Despliegue completo de modelos fase 1 y 2
- [ ] Iniciar fase 3 (robo-advisor, chatbot)
- [ ] Programa de retrenamiento trimestral
- [ ] Auditoría anual de sesgo
- [ ] Integración de IA en Risk Dashboard (para junta directiva)
- [ ] Preparación para auditoría regulatoria

Entregable: Annual Audit Report, Updated Governance Framework, Risk Dashboard.

### 5.5 Factores de Riesgo que Alargan Timeline

- Datos fragmentados o de baja calidad (common blocker)
- Resistencia interna (equipos que ven IA como amenaza)
- Cambios regulatorios (nueva norma puede invalidar decisiones anteriores)
- Proveedores externos no confiables (vendor lock-in, falta de auditoría)
- Falta de presupuesto de validación (se "saltea" por ahorrar)

Una entidad que acumule tres de estos factores se enfrenta a timeline de 36+ meses.

---

## 6. RIESGOS Y ERRORES COMUNES EN IMPLEMENTACIÓN

### 6.1 Errores Recurrentes (Caso Prácticas Internacionales)

**1. Delegación Completa a Tecnología**
- Gobernanza corporativa no aprueba ni supervisa
- Riesgo: Modelo en producción con sesgo, Superintendencia descubre
- Lección: Junta directiva debe ser capaz de explicar el modelo

**2. Validación Insuficiente**
- Se entrena en 80% de datos, se valida en remaining 20% (data leakage)
- No se testea sesgo separadamente
- Riesgo: Performance en pruebas, degradación en producción
- Lección: Test set debe ser independiente; auditoría externa es estándar

**3. Sin Documentación**
- "Solo el data scientist entiende cómo funciona"
- Riesgo: El data scientist se va, modelo es black-box para regulador
- Lección: Documentación es requisito de despliegue, no tarea posterior

**4. Aplicación Excesiva**
- Se empieza con "predecir riesgo crediticio" en cliente onboarding
- Luego: "También predecir riesgo operacional", "También predecir churn"
- Riesgo: Modelo entrenado en múltiples tareas, performance decae en todas
- Lección: Especificidad es virtud; un modelo per caso de uso

**5. Integración con Sistemas Legados Débil**
- Modelo predice bien, pero sistema core no puede ejecutar decisión
- O: Decisiones del modelo se pierden si sistema cae
- Riesgo: Modelo queda desacoplado de negocio
- Lección: Arquitectura de integración es parte del proyecto de IA, no segundo acto

**6. Confianza Excesiva en Vendor Externo**
- Contratar a empresa que promete "IA turnkey"
- Sin requerimientos de auditabilidad, especificación, validación
- Riesgo: Vendor no cumple, entidad no puede cambiar, regulador presiona
- Lección: Contrato de IA debe especificar documentación, auditoría, kill switch

### 6.2 Prevención

Estas prácticas reducen riesgo de los errores comunes:

- **Governance primero, desarrollo después.** Política de IA aprobada por junta antes de build.
- **Auditor independiente desde el inicio.** No validar el propio trabajo.
- **Test set verdaderamente independiente.** Nunca used en entrenamiento ni tuning.
- **Especificar límites explícitamente.** "Este modelo recomienda, no decide" es distinto a "decide automáticamente".
- **Plan de contingencia.** Si modelo falla, ¿cómo continúa el proceso? No asumir que fallará pero tener procedimiento.
- **Retrenamiento programado.** Cada 6-12 meses, no "cuando se note degradación".
- **Cultura de documentación.** Equipos de IA producen especificación, not just code.

---

## 7. CUMPLIMIENTO NORMATIVO ESPECÍFICO

### 7.1 Protección de Datos (Ley 1581)

Si el modelo utiliza datos personales (nombre, cédula, ingresos, referencias, etc.):

- **Consentimiento:** ¿Fue informado el titular que sus datos se usarían en IA?
- **Finalidad:** Datos recolectados para "evaluación crediticia" no se usan en "perfilamiento".
- **Acceso:** Cliente tiene derecho a saber qué variables usó el modelo para decidir rechazarlo.
- **Rectificación:** Si datos fueron incorrectos, modelo debe retrenarse.
- **Revocatoria:** Cliente puede pedir que sus datos se borren (aunque modelo ya fue entrenado).

Riesgo regulatorio: SIC (Superintendencia de Industria y Comercio) multa entre 1 y 2,000 SMLMV por violación. En 2026, multas anuales superan COP 100 mil millones.

Procedimiento mínimo:
- Auditoría de cumplimiento HABEAS antes de despliegue
- Política de acceso a datos para clientes
- Registro de consentimientos
- Procedimiento de revocatoria integrado en sistema

### 7.2 Lavado de Activos (LAFT/SARLAFT)

Si el modelo se usa en detección de lavado o evaluación de riesgo de cliente:

- **No sustituye a compliance officer.** Modelo es herramienta de análisis, no decisión final.
- **Trazabilidad:** Auditoría debe poder seguir cómo modelo detectó anomalía.
- **Escalabilidad humana:** Toda alerta del modelo va a compliance para revisión.
- **Retención de evidencia:** Logs del modelo deben conservarse 7 años (SARLAFT requirement).

Riesgo regulatorio: Si modelo deja pasar lavado, Superintendencia multa a entidad por falta de control.

### 7.3 Gobierno Corporativo (Circular 028 de 2014)

La junta directiva es responsable de supervisión de tecnología incluyendo IA. Implicaciones prácticas:

- Informes trimestrales de IA a junta (no informe anual)
- Designar responsable (Chief Digital Officer o equivalente)
- Política aprobada por junta
- Límites claros (hasta dónde llega IA, dónde entra humano)
- Plan de continuidad si IA falla

---

## 8. LÍNEA DE TIEMPO REGULATORIA ESPERADA EN COLOMBIA

**2026 (Hoy):**
- Proyectos de ley sin conclusión probable este año
- Superintendencia usa IA internamente, pero no publica regulación
- Sandbox regulatorio disponible pero bajo uso

**2027-2028:**
- Probable aprobación de ley general de IA (amplia, no financiera)
- Superintendencia publica circular de orientación sobre IA en entidades vigiladas
- Primeros requerimientos de reporte de riesgos de IA

**2029-2030:**
- Posible resolución específica de Superintendencia en gobierno corporativo de IA
- Requisitos de validación independiente (siguiendo estándares OCC/EBA)
- Auditoría regulatoria de modelos en entidades grandes

Implicación: **Implementar ahora según estándares internacionales posiciona mejor la entidad que esperar a regulación local.** Regulación en Colombia tiende a retomar estándares internacionales ya probados.

---

## 9. RECOMENDACIONES FINALES PARA COMISIONISTA DE BOLSA

### 9.1 Prioridades en Orden

1. **Gobierno corporativo (prioritario crítico):** Antes de build de cualquier modelo, política de IA aprobada por junta. Riesgo: Sin esto, modelo está deslegitimado desde inicio.

2. **Caso de uso de bajo riesgo primero (estratégico):** Automatización back-office, no decisiones crediticias. Permite aprender gobernanza y procesos sin puesta en riesgo reputacional.

3. **Validación independiente no negociable:** Auditor externo que valide antes de producción. Costo ~COP 50-100M es inversión pequeña vs. riesgo de modelo sesgado.

4. **Documentación exhaustiva:** Especificación, datos, performance, sesgo. Es requisito de Superintendencia futura y de cualquier auditoría.

5. **Integración con SARLAFT/HABEAS desde inicio:** No como addendum post-despliegue.

### 9.2 Conversación con Superintendencia

Si entidad desea ser proactiva (recomendado):

- Presentar a Superintendencia el plan de IA (gobierno corporativo, casos de uso, validación)
- Solicitar participación en sandbox regulatorio si aplica
- Reportar incidentes (modelo detecta sesgo inesperado, performance degrada)
- Responder a surveys sobre adopción de IA que Superintendencia lance

Beneficio: Entidades que son transparentes enfrentan menor presión cuando regulación se endurezca.

### 9.3 Presupuesto Realista

Para comisionista pequeña con 1-2 casos de uso:

- Gobierno, política, capacitación: COP 50-100M
- Herramientas (MLOps, data warehouse): COP 100-200M/año
- Desarrollo y validación: COP 300-500M
- Auditoría externa: COP 50-100M
- **Total Año 1: COP 500M-900M**
- Mantenimiento Año 2+: COP 150-300M/año

No es presupuesto menor, pero retorno es: eficiencia operativa (15-30% reducción costos), menor fraude, mejor decisiones. Payback realista 2-3 años.

---

## 10. REFERENCIAS Y FUENTES VERIFICADAS

### Normativa Colombiana

- Decreto 2555 de 2010: "Régimen de sociedades vigiladas"
- Circular Externa 029 de 2014 (SFC): "Mejores prácticas de gobierno corporativo"
- Circular Externa 028 de 2014 (SFC): "Código País"
- Circular Externa 004 de 2024 (SFC): "Estándares de finanzas abiertas"
- Ley 1581 de 2012: "Protección de datos personales (HABEAS)"
- Decretos 1377/2013 y 1074/2015: "Regulación HABEAS"
- Ley 1962 de 2019: "Prevención de lavado de activos y financiación del terrorismo"
- Decreto 1727 de 2018: "SARLAFT"
- Decreto 1297 de 2022: "Finanzas abiertas"

Disponible en: www.superfinanciera.gov.co, www.funcionpublica.gov.co

### Estándares Internacionales

- **BIS (Banco de Pagos Internacionales):**
  - "Monitoring Adoption of Artificial Intelligence in the Financial Sector" (Octubre 2025)
  - "Financial Stability Implications of Artificial Intelligence" (Junio 2025)
  - "Managing Explanations: How Regulators Can Address AI Explainability" (Septiembre 2025)
  - www.bis.org

- **FSB (Financial Stability Board):**
  - "Sound Practices for Responsible Adoption of Artificial Intelligence (AI)" (Junio 2026)
  - "Monitoring Adoption of AI and Related Vulnerabilities in the Financial Sector" (Octubre 2025)
  - www.fsb.org

- **FCA (UK Financial Conduct Authority):**
  - "AI: Artificial Intelligence in Financial Services" (2026)
  - "AI and the FCA: Our Approach"
  - www.fca.org.uk

- **EBA (European Banking Authority):**
  - "Special Topic: Artificial Intelligence"
  - "AI Act Implications for the EU Banking and Payments Sector" (2025)
  - www.eba.europa.eu

- **OCC (Office of the Comptroller of the Currency, USA):**
  - Model Risk Management Guidance (Abril 2026)
  - Semiannual Risk Perspective on AI (Mayo 2026)
  - www.occ.gov

- **ISO/IEC 42001:2023:** "Artificial Intelligence Management Systems"

### Materiales de Orientación

- Microsoft Compliance: ISO/IEC 42001 guidance
- BIS Innovation Hub Project Noor: Explainable AI for supervisors

### Reportes de Prácticas

- Baker Tilly: "AI in AML Compliance" (2026)
- Brookings Institution: "Reducing Bias in AI-Based Financial Services" (2025)
- EY: "Model Risk Management for AI and Machine Learning" (2026)
- Ondato: "AI in AML: Detection to Insights" (2026)

---

## Tabla de Control de Versiones

| Versión | Fecha | Cambios | Estado |
|---------|-------|---------|--------|
| 1.0 | Sept 2026 | Investigación inicial: marcos colombiano e internacional, mejores prácticas, recomendaciones comisionistas | Final |

---

**Documento Preparado por:** Bedrock Despacho de Abogados  
**Para:** BTG Pactual / Propuesta de Automatización de Operaciones Especiales  
**Confidencialidad:** Solicitar autorización antes de compartir con terceros  
**Contacto:** tualiado@bedrock.com.co

