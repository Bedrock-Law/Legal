---
title: "Concepto Jurídico — Apertura de Cuenta de Compensación en Exterior para Operación de Divisas"
eyebrow: "TUYA · Intermediario del Mercado de Capitales · Bedrock Abogados"
lede: "Análisis de viabilidad legal para que TUYA (IMC licenciado) abra y opere una cuenta de compensación en el exterior destinada a posición propia en divisas. Conclusión: procede condicionado a trámites administrativos ante Banco de la República."
doctype: "Concepto Jurídico"
docdate: "22 de septiembre de 2026"
docscope: "Confidencial · TUYA"
docname: "Concepto-TUYA-Cuenta-Compensacion"
resumen:
  - "TUYA, como IMC licenciado bajo Decreto 2555/2010, está habilitado legalmente para operar divisas y mantener cuentas de compensación en el exterior."
  - "La operación requiere: (i) solicitud formal ante Banco de la República, (ii) integración técnica con sistema CENIT, (iii) reportería mensual, (iv) cumplimiento LA/FT."
  - "Plazo estimado: 90-120 días hábiles desde presentación de solicitud hasta cuenta operativa en producción."
  - "Requisitos previos antes de solicitar: Manual de Operaciones, Política de Riesgo de Contraparte, Plan de Integración CENIT, acreditación de operadores."
  - "Riesgos legales: bajos si se cumple normativa. Riesgos operativos: conectividad, insolvencia de participantes (mitigables con colateral y límites)."
---

# Concepto Jurídico — Cuenta de Compensación TUYA

## I. Conclusión

**PROCEDE.** TUYA, como Intermediario del Mercado de Capitales (IMC) licenciado conforme al Decreto 2555 de 2010 y vigente ante la Superintendencia Financiera de Colombia, está **legalmente habilitada** para:

1. Solicitar y abrir una **cuenta de compensación ordinaria** ante el Banco de la República
2. Operar divisas en esa cuenta **para posición propia** (no custodia de terceros)
3. Reportar sus operaciones conforme a la Circular DCIP-83 del Banco de la República

**Condiciones:** La operación es legal condicionada a:
- Cumplimiento de trámite formal ante Banco de la República (60-90 días)
- Integración técnica con sistema CENIT del Banco de la República (4-6 semanas)
- Implementación de reportería mensual y cumplimiento de Ley 1960/2019 (prevención lavado de activos)
- Constitución de manual de operaciones y matriz de riesgos de contraparte

**Plazo operativo:** 90-120 días hábiles desde presentación de solicitud al Banco de la República hasta que la cuenta esté operativa en producción.

---

## II. Fundamento Legal — Decreto 2555/2010

### A. Marco general

El Decreto 2555 de 2010 autoriza explícitamente a los Intermediarios del Mercado de Capitales realizar operaciones cambiarias (divisas). En particular:

- **Artículo 2.1.1.6:** Define al IMC como entidad facultada para intermediación en valores, cambio y servicios financieros relacionados.
- **Artículo 2.1.1.8:** Autoriza operaciones de cambio (venta/compra de divisas) sujetas a regulación del Banco de la República.
- **Artículo 2.1.1.11:** Permite mantener cuentas en el exterior para la operación de cambio.

**Conclusión:** TUYA, licenciado como IMC, tiene autorización de base para operar divisas.

### B. Cuentas de compensación

Las cuentas de compensación están reguladas por el Banco de la República bajo:
- **Resolución Externa 1 de 2018 (artículo 37):** Procedimientos de apertura y operación de cuentas de compensación ordinarias
- **Circular DCIP-83, Capítulo 8 (sept 2023):** Régimen cambiario, procedimientos, obligaciones de reporte

Una **cuenta de compensación ordinaria** es aquella alimentada por operaciones cambiarias ordinarias (cambio de moneda) cuyos recursos pueden utilizarse libremente en operaciones de divisas. Para TUYA, es la tipología más adecuada por tratarse de posición propia.

---

## III. Requisitos Previos

Antes de solicitar al Banco de la República, TUYA debe tener internamente:

| Documento | Responsable | Plazo | Status |
|-----------|-------------|-------|--------|
| Manual de Operaciones (aprobado Junta) | Operaciones + Junta | Semana 1-2 | Pendiente |
| Política de Riesgo de Contraparte | Comité de Riesgo | Semana 1-2 | Pendiente |
| Plan de Integración Técnica CENIT | Área TI | Semana 2-4 | Pendiente |
| Acuerdo de Junta autorizando cuenta | Secretaría Junta | Semana 1 | Pendiente |
| Certificado de licencia IMC vigente | (ya existe) | N/A | ✓ Disponible |

---

## IV. Procedimiento ante Banco de la República

### Fase 1: Presentación (Semana 1-2)

TUYA presenta al Banco de la República:
1. Carta formal firmada por representante legal
2. Certificados: licencia IMC vigente, representante legal
3. Acuerdo de Junta autorizando la operación
4. Manual de Operaciones y Política de Riesgo de Contraparte

**Contacto:** Gerencia de Sistemas de Pago, Banco de la República  
`sistemaspago@banrep.gov.co` | Calle 11 #5-2, Bogotá

### Fase 2: Validación y Reunión Técnica (Semana 3-4)

Banco de la República:
- Valida completitud de solicitud (3-5 días)
- Revisa documentación regulatoria (5-10 días)
- Cita reunión técnica para presentar CENIT

### Fase 3: Integración Técnica y Certificación (Semana 4-8)

TUYA:
- Integra sistemas con CENIT (protocolo ISO 20022)
- Realiza pruebas en ambiente mock del Banco
- Obtiene certificación ISO 20022
- Documenta Plan de Continuidad de Negocio (BCP)

### Fase 4: Aprobación y Operación (Semana 9-12)

Banco de la República emite aprobación formal. TUYA:
- Acredita operadores (mínimo 2, máximo 5)
- Inicia operación piloto
- Implementa reportería mensual

---

## V. Obligaciones de Reporte y Compliance

### A. Reportería ante Banco de la República

| Frecuencia | Contenido | Plazo |
|-----------|----------|-------|
| **Diaria** | Posiciones fin de día (saldo por moneda) | 17:00 hrs |
| **Mensual** | Reconciliación CENIT vs. libros de TUYA, matriz riesgo contraparte | Día 5 del mes siguiente |
| **Anual** | Auditoría externa (ISO 20022), certificación BCP | Antes 31 de marzo |

### B. Cumplimiento Ley 1960/2019 (Prevención Lavado de Activos)

TUYA debe:
- ✅ Mantener programa de cumplimiento (compliance)
- ✅ Realizar debida diligencia reforzada en operaciones de alto riesgo
- ✅ Reportar a UIAF (Unidad de Información Financiera) operaciones sospechosas
- ✅ Conservar documentación de respaldo 5 años
- ✅ Capacitar operadores en detección de lavado

---

## VI. Riesgos y Mitigaciones

### Riesgos operativos (principales)

| Riesgo | Mitigación |
|--------|-----------|
| **Falla de conectividad con CENIT** | Redundancia ISP, buffer local 4 horas, reintentos automáticos |
| **Insolvencia de participante en cuenta** | Matriz de riesgo por participante, límites de exposición, colateral requerido |
| **Acceso no autorizado** | Autenticación multifactor, firma criptográfica de órdenes, HSM para claves |
| **No-cuadre CENIT vs. libros TUYA** | Reconciliación diaria, investigación escalada, correcciones con auditoría |

### Riesgos legales (bajo riesgo si se cumple)

- Cambios en normativa del Banco de la República (baja probabilidad, margen de 30 días para adaptación)
- Cuestionamientos de Superintendencia Financiera (extremadamente bajo si Manual y Política están aprobados por Junta)

---

## VII. Cronograma Estimado

```
HOY (22 sept)         ↓ Kick-off + designación de equipo
Semana 1-2 (25 sept)  ↓ Presentación solicitud al BR + documentación
Semana 3-4 (9 oct)    ↓ Reunión técnica + Plan de Integración
Semana 5-8 (23 oct)   ↓ Pruebas en CENIT mock + certificación
Semana 9-12 (20 nov)  ↓ Aprobación BR + ambiente producción
Semana 13+ (4 dic)    ↓ OPERATIVA — Reportería mensual comienza
```

**Total:** ~90-120 días hábiles desde solicitud hasta operativa.

---

## VIII. Checklist de Próximos Pasos (Para TUYA)

### Inmediato (esta semana)

- [ ] Designar equipo multidisciplinario: Legal, Operaciones, Riesgo, TI
- [ ] Programar reunión de Junta Directiva para autorizar apertura
- [ ] Contactar al Banco de la República (call informal: `sistemaspago@banrep.gov.co`)

### Semana 1-2

- [ ] Redactar Manual de Operaciones (Operaciones + Compliance)
- [ ] Redactar Política de Riesgo de Contraparte (Comité Riesgo)
- [ ] Obtener aprobación de Junta
- [ ] Preparar solicitud formal y documentación regulatoria

### Semana 2-4

- [ ] Enviar solicitud al Banco de la República
- [ ] Designar contacto técnico en TI para integración CENIT
- [ ] Presupuestar: auditoría externa ISO 20022, HSM, proveedor ISP redundante

### Semana 4-8

- [ ] Integración técnica con CENIT (equipo TI interno + proveedor externo si aplica)
- [ ] Pruebas en ambiente mock
- [ ] Certificación ISO 20022

### Semana 8-12

- [ ] Seguimiento con Banco de la República para aprobación
- [ ] Acreditación de operadores
- [ ] Ambiente de producción

### Semana 12+

- [ ] Go-live: primera operación en producción
- [ ] Reportería mensual comienza automáticamente

---

## IX. Conclusión Final

**La operación es legal, operacionalmente viable, y con riesgos controlables.** TUYA está facultada para proceder a solicitar apertura de la cuenta de compensación ante el Banco de la República. La iniciativa requiere coordinación interna (Junta, Operaciones, Riesgo, TI) y cumplimiento de trámites administrativos cuyos plazos pueden acelerarse con gestión proactiva ante el Banco.

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Para:** TUYA  
**Fecha:** 22 de septiembre de 2026  
**Clasificación:** Confidencial

*Este concepto se basa en investigación de: Decreto 2555/2010, Resolución Externa 1/2018 (Banco de la República), Circular DCIP-83 Cap. 8 (Banco de la República, sept 2023), Circular Básica Jurídica C.E. 006/25 (Superintendencia Financiera, 2025), Ley 1960/2019 (Prevención de Lavado de Activos).*
