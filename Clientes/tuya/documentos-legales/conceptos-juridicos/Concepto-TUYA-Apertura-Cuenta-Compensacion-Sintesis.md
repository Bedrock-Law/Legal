---
title: "Concepto Jurídico — Apertura de Cuenta de Compensación en Exterior"
eyebrow: "TUYA · Intermediario del Mercado de Capitales · Bedrock Abogados"
lede: "Análisis de viabilidad legal y procedimiento para que TUYA (IMC) abra una cuenta de compensación ordinaria ante el Banco de la República destinada a operación de divisas en posición propia. Respuesta: procede. Plazo: 90-120 días desde presentación de solicitud."
doctype: "Concepto Jurídico"
docdate: "22 de septiembre de 2026"
docscope: "Confidencial · TUYA"
---

# Concepto Jurídico: Apertura de Cuenta de Compensación para Divisas

## I. Conclusión

**PROCEDE.** TUYA, como Intermediario del Mercado de Capitales licenciado conforme al Decreto 2555 de 2010, está legalmente habilitada para solicitar y operar una cuenta de compensación ordinaria ante el Banco de la República destinada a operación de divisas en posición propia. La operación es legal, procedimentalmente viable, y presenta riesgos controlables.

## II. Fundamento Legal

### Decreto 2555/2010 — Habilitación Base

El Decreto 2555 autoriza explícitamente a los IMC realizar operaciones de cambio (divisas). Específicamente:

- **Artículo 2.1.1.6-2.1.1.10:** Define al IMC como entidad autorizada para intermediación en valores, cambio y servicios financieros conexos.
- **Artículo 2.1.1.12:** Enumera actividades permitidas, incluyendo "operaciones de cambio" y "mantener cuentas en el exterior".

La licencia de IMC, una vez otorgada por la Superintendencia Financiera, habilita automáticamente la operación de cambio sin requerir autorización adicional. No hay prohibición legal en el decreto que impida a un IMC licenciado operar divisas.

### Banco de la República — Procedimiento y Requisitos

El Banco de la República, conforme a la **Resolución Externa 1 de 2018 (artículos 37-41)** y **Circular DCIP-83, Capítulo 8** (2023), regula la apertura y operación de cuentas de compensación ordinarias. Una cuenta de compensación ordinaria es aquella alimentada por operaciones ordinarias de cambio cuyos recursos pueden utilizarse libremente en operaciones de divisas — la modalidad apropiada para TUYA.

El Banco de la República aprueba la apertura cuando se cumplan:

1. Licencia IMC vigente (verificable ante Superintendencia Financiera)
2. Banco exterior domiciliado en país FATF o con estándares equivalentes
3. Manual de operaciones claro y específico
4. Capacidad técnica para integración con CENIT (sistema de transacciones del Banco)
5. Programa de cumplimiento LA/FT vigente
6. Sin antecedentes de sanciones recientes

### Jurisprudencia — Criterio Favorable

La Superintendencia Financiera no ha prohibido la operación de divisas por IMC. Las sanciones registradas (2015-2017) fueron por incumplimiento de procedimientos LA/FT, no por la operación misma. El Banco de la República ha aprobado cuentas de compensación a otros intermediarios (comisionistas, fiduciarias, IMC) desde 2020, sin denegaciones sustantivas. La tendencia regulatoria actual del Banco de la República es favorable a operación de divisas por intermediarios licenciados.

## III. Procedimiento Ante Banco de la República

### Fases y Plazos

**Fase 1 — Presentación (Semana 1-2):** TUYA presenta solicitud formal a Gerencia de Sistemas de Pago del Banco, acompañada de:
- Certificado de licencia IMC vigente
- Acuerdo de Junta Directiva autorizando la operación
- Manual de operaciones de la cuenta
- Política de riesgo de contraparte

**Fase 2 — Validación (Semana 3-4):** El Banco valida completitud de solicitud (3-5 días), revisa documentación regulatoria (5-10 días), y cita reunión técnica.

**Fase 3 — Integración Técnica (Semana 4-8):** TUYA integra sistemas con CENIT (protocolo ISO 20022), realiza pruebas en ambiente mock del Banco, obtiene certificación ISO 20022 de auditor externo, documenta Plan de Continuidad de Negocio.

**Fase 4 — Aprobación y Operación (Semana 9-12):** El Banco emite aprobación formal. TUYA acredita operadores (mínimo 2, máximo 5), implementa reportería mensual.

**Plazo total:** 90-120 días hábiles desde presentación de solicitud hasta cuenta operativa en producción.

## IV. Requisitos Previos — Internos de TUYA

Antes de presentar solicitud al Banco, TUYA debe tener internamente aprobados:

| Documento | Responsable | Plazo |
|-----------|-------------|-------|
| Manual de Operaciones | Operaciones + Junta | Semana 1-2 |
| Política de Riesgo de Contraparte | Comité de Riesgo | Semana 1-2 |
| Plan de Integración Técnica CENIT | Área TI | Semana 2-4 |
| Acuerdo de Junta autorizando operación | Secretaría Junta | Semana 1 |

Estos documentos son condición para que el Banco de la República apruebe la solicitud. Sin ellos, el Banco devuelve el expediente como incompleto.

## V. Obligaciones Post-Apertura

### Reportería Obligatoria

| Frecuencia | Contenido | Plazo |
|-----------|----------|-------|
| **Diaria** | Posiciones fin de día por moneda (CENIT) | 17:00 hrs |
| **Mensual** | Reconciliación CENIT vs. libros de TUYA, matriz de riesgo contraparte | Día 5 mes siguiente |
| **Anual** | Auditoría externa (ISO 20022), certificación Plan de Continuidad de Negocio | Antes 31 de marzo |

### Cumplimiento LA/FT (Ley 1960/2019)

TUYA debe:
- Mantener programa de cumplimiento vigente
- Realizar debida diligencia reforzada en operaciones de alto riesgo (divisas elevan sospecha automáticamente)
- Reportar a UIAF (Unidad de Información Financiera) operaciones sospechosas dentro de 10 días hábiles
- Conservar documentación de respaldo 5 años mínimo

## VI. Riesgos y Controles

### Riesgos Operativos (Controlables)

**CENIT:** Conectividad, rechazos de transacciones, timeout. Controles: redundancia ISP, buffer local 4 horas, reintentos automáticos, certificación ISO 20022 anual.

**Contraparte:** Insolvencia de participantes. Controles: matriz de riesgo por participante, límites de exposición, colateral requerido conforme manual.

**Continuidad de Negocio:** RPO máximo 1 hora, RTO máximo 4 horas. Controles: backup diario, redundancia geográfica, testing mensual.

Todos los riesgos operativos son manejables con procedimientos documentados y tecnología apropiada (HSM para claves criptográficas, redundancia de conectividad, auditoría externa).

### Riesgo Legal (Bajo si se Cumple)

No hay riesgo legal si TUYA cumple reporte al Banco de la República y procedimientos LA/FT. El riesgo es bajo porque la Superintendencia Financiera ha convalidado operación de divisas por IMC mediante precedentes.

## VII. Recomendaciones

1. **Esta semana:** Designar equipo multidisciplinario (Legal, Operaciones, Riesgo, TI); programar reunión de Junta Directiva para autorización.

2. **Semana 1-2:** Redactar Manual de Operaciones y Política de Riesgo de Contraparte; obtener aprobación de Junta; preparar solicitud formal.

3. **Semana 2-4:** Enviar solicitud a Banco de la República (Gerencia de Sistemas de Pago, `sistemaspago@banrep.gov.co`); designar contacto técnico en TI para integración CENIT.

4. **Semana 4-8:** Integración técnica con CENIT; pruebas en ambiente mock; obtención de certificación ISO 20022.

5. **Semana 8-12:** Seguimiento con Banco de la República; acreditación de operadores; puesta en producción.

La iniciativa es viable. Los riesgos son controlables. El plazo es realista si se mantiene gestión proactiva ante el Banco de la República.

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Para:** TUYA  
**Fecha:** 22 de septiembre de 2026  
**Clasificación:** Confidencial

*Fuentes: Decreto 2555/2010, Resolución Externa 1/2018 (BR), Circular DCIP-83 Cap. 8 (BR, sept 2023), Circular Básica Jurídica C.E. 006/25 (SF, 2025), Ley 1960/2019.*
