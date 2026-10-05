---
title: "Concepto Jurídico — Requisitos Legales para Intermediario de Mercado Cambiario"
eyebrow: "TUYA · Intermediario de Mercado Cambiario · Bedrock Abogados"
lede: "Guía de compromisos legales y reportería obligatoria ante Banco de la República para que TUYA, como intermediario de mercado cambiario licenciado, abra y opere una cuenta de compensación ordinaria en exterior para posición propia en divisas. Qué debe cumplir, cuándo, cómo y ante quién."
doctype: "Concepto Jurídico"
docdate: "22 de septiembre de 2026"
docscope: "Confidencial · TUYA"
---

# Requisitos Legales para Apertura de Cuenta de Compensación en Exterior

## I. Conclusión

TUYA, como intermediario de mercado cambiario licenciado, está legalmente habilitada para abrir y operar una cuenta de compensación ordinaria en un banco exterior (Fedwire U.S.A. o equivalente). Los requisitos legales se cumplen mediante:

1. **Autorización previa** de Banco de la República (Resolución Externa 1/2018)
2. **Cumplimiento de reportería obligatoria** ante el Banco (diaria, mensual, anual)
3. **Integración técnica con CENIT** (sistema de liquidación del Banco)
4. **Cumplimiento de Ley 1960/2019** (prevención de lavado de activos)

No hay impedimento legal. Los compromisos son administrativos y operativos, no prohibitivos.

---

## II. Requisito 1: Autorización Previa del Banco de la República

### Regulación Aplicable

El Banco de la República regula intermediarios de mercado cambiario conforme a:

**Resolución Externa 1 de 2018, Artículos 37-41** — Define el procedimiento para apertura de cuentas de compensación ordinarias. Banco de la República **aprueba o rechaza** antes de que la cuenta se abra.

**Circular DCIP-83, Capítulo 8** — Operaciones ordinarias de cambio. Aclara que cuentas de compensación ordinarias son para operaciones de cambio libre (no obligatoriamente canalizables), recursos utilizables en operaciones de divisas.

**Decreto 2555/2010** — Marco legal que habilita a intermediarios de mercado cambiario (IMC) para operar divisas.

### Qué Debe Solicitar TUYA (Intermediario de Mercado Cambiario)

Presentar ante **Gerencia de Sistemas de Pago, Banco de la República** (`sistemaspago@banrep.gov.co`):

| Documento | Detalle | Quién lo prepara |
|-----------|---------|------------------|
| **Carta formal** | Representante legal de TUYA, firmada digitalmente | Legal |
| **Licencia de intermediario de mercado cambiario** | Certificado vigente de Superintendencia Financiera (licencia IMC) | Legal |
| **Acuerdo de Junta Directiva** | Autorizando apertura de cuenta y operación de divisas | Junta Directiva |
| **Manual de Operaciones** | Procedimientos de uso de la cuenta, límites, autoridades | Operaciones |
| **Política de Riesgo de Contraparte** | Criterios de selección de contrapartes, límites, monitoreo | Riesgo |
| **Información del banco exterior** | Nombre, país, código SWIFT, dirección, acuerdo con banco para reportería | Operaciones |

### Plazo de Aprobación

Banco de la República responde en **30-60 días hábiles** desde expediente completo:
- 5-10 días: Validación de completitud
- 15-30 días: Revisión regulatoria
- 10-15 días: Comunicación con banco exterior
- 5 días: Expedición de resolución aprobatoria

**Posible denegación por:** Deficiencia en Manual de Operaciones, Política de Riesgo incompleta, o antecedentes de incumplimiento LA/FT.

---

## III. Requisito 2: Reportería Obligatoria Ante Banco de la República

Este es el **principal compromiso** de TUYA con el Banco. Sin cumplimiento de reportería, el Banco puede congelar la cuenta.

### A. Reportería Diaria

**Qué reportar:** Posición en divisas al cierre del día (fin de sesión operativa, ~17:00 hrs Colombia).

**Formato:** Archivo ISO 20022 (XML estándar internacional) enviado a CENIT.

**Contenido por moneda:**
- Saldo en cuenta (apertura del día)
- Ingresos del día (por concepto: operaciones de cambio libre, etc.)
- Egresos del día
- Saldo al cierre
- Operaciones pendientes de liquidación (si las hay)

**Plazo:** Mismo día antes de las 18:00 hrs.

**Incumplimiento:** Retraso >2 horas genera alerta en CENIT. Retraso >1 día puede generar congelación de cuenta.

### B. Reportería Mensual

**Qué reportar:** Reconciliación completa entre CENIT y libros internos de TUYA.

**Contenido:**
1. Saldo CENIT vs. saldo en libros de TUYA — diferencias explicadas
2. Matriz de operaciones por tipo (cambio libre, etc.)
3. Listado de contrapartes con saldos acumulados
4. Análisis de variaciones respecto mes anterior
5. Certificación de Auditor Externo o Revisor Fiscal

**Plazo:** Dentro de 5 primeros días hábiles del mes siguiente.

**Ejemplo:** Reportería febrero → entrega antes del 6 de marzo.

**Incumplimiento:** Revoca autorización de usar la cuenta.

### C. Reportería Anual

**Qué reportar:** Auditoría externa de conformidad técnica.

**Contenido:**
1. Verificación de cumplimiento con ISO 20022 (100% mensajes válidos)
2. Evaluación de controles internos
3. Certificación de Plan de Continuidad de Negocio (RPO ≤1 hora, RTO ≤4 horas)
4. Evaluación de riesgo operativo en CENIT

**Plazo:** Antes del 31 de marzo del año siguiente.

**Incumplimiento:** Imposibilidad de renovar licencia de IMC al año siguiente.

### D. Reportería Extraordinaria

**Cuándo:** Evento inusual que afecte la cuenta.

**Ejemplos:**
- Cambio de operador autorizado
- Cambio de autoridades de firma (criptográficas)
- Falla de conectividad >4 horas
- Detección de operación sospechosa
- Cambio de Auditor Externo o Revisor Fiscal

**Plazo:** Inmediato (máximo 2 horas).

---

## IV. Requisito 3: Integración Técnica con CENIT

### Sistema CENIT — Qué Es

**Central de Transacciones Electrónicas del Banco de la República.** Es:
- Sistema oficial del Banco para liquidación de cambio
- Fuente de datos para reportería oficial
- Plataforma de comunicación encriptada

### Estándar Técnico: ISO 20022

CENIT requiere que **todas las órdenes** se envíen en formato **ISO 20022** (XML estructurado conforme a especificaciones internacionales).

### Qué Debe Hacer TUYA

1. **Integración técnica:** Conectar sistemas internos de TUYA con CENIT (protocolo SFTP encriptado, certificados TLS 1.2+).

2. **Certificación ISO 20022:** Antes de operar, TUYA debe obtener certificación de auditor externo confirmando que:
   - 100% de mensajes enviados cumplen formato ISO 20022
   - No hay más de 1% de rechazos por validación
   - Firma digital criptográfica funciona correctamente

3. **Plan de Continuidad:**
   - **RPO (Recovery Point Objective):** Máximo 1 hora de pérdida de datos
   - **RTO (Recovery Time Objective):** Máximo 4 horas para recuperación completa
   - Redundancia ISP (2 proveedores de conectividad)
   - Backup automático diario, almacenado en locación física diferente

4. **Seguridad de claves:** Almacenamiento en HSM (Hardware Security Module), acceso restringido, rotación anual.

### Plazo para Certificación

Típicamente **4-6 semanas** desde inicio de pruebas:
- Semana 1-2: Pruebas funcionales en ambiente mock de CENIT
- Semana 3-4: Pruebas de carga y recuperación
- Semana 5-6: Auditoría externa y certificación

---

## V. Requisito 4: Cumplimiento de Ley 1960/2019 (Prevención de Lavado de Activos)

Toda operación de divisas en CENIT activa obligaciones especiales ante **UIAF** (Unidad de Información Financiera).

### Programa de Cumplimiento LA/FT — Requisitos Mínimos

TUYA debe documentar y mantener vigente un programa que incluya:

| Componente | Detalle |
|-----------|---------|
| **Política escrita** | Compromiso público de TUYA contra lavado de activos |
| **Oficial de cumplimiento designado** | Responsable ante UIAF de procedimientos LA/FT |
| **Debida diligencia ordinaria** | Identificación cliente, origen de fondos, PEP (Persona Expuesta Políticamente) |
| **Debida diligencia reforzada** | Para operaciones de divisas, montos altos, jurisdicciones de riesgo |
| **Señales de alerta** | Manual con 50+ indicadores de operación sospechosa |
| **Reporte a UIAF** | Operaciones sospechosas reportadas en <10 días hábiles |
| **Documentación** | Conservación de registros 5 años mínimo |
| **Capacitación de personal** | Entrenamiento anual sobre detección de lavado |

### Señales de Alerta Específicas para Divisas

Operaciones que **activan investigación inmediata:**

- Monto inconsistente con perfil cliente (ej. cliente pequeño, operación >USD 1M)
- Fraccionamiento: múltiples operaciones de monto pequeño en corto plazo
- Operación circular: dinero entra y sale en patrón sospechoso
- Depósito sin justificación de origen documentada
- Operación con jurisdicción de alto riesgo (FATF gris o negro)
- Cliente en lista de PEP (Personas Expuestas Políticamente)
- Operación inconsistente con CIIU (actividad económica del cliente)

### Reporte a UIAF

**Cuándo:** Dentro de 10 días hábiles de detectar operación sospechosa.

**Dónde:** Plataforma ReITA (www.reita.org.co) del UIAF.

**Qué reportar:**
- Identificación cliente y operación
- Montos, fechas, contrapartes
- Razón de sospecha (qué señal de alerta se activó)
- Acciones tomadas por TUYA

**Incumplimiento:** Multa hasta 50 SMMLV (~$87.5M COP), suspensión temporal de licencia, o revocación.

---

## VI. Modalidad de Cuenta: Ordinaria vs. Especial

### Cuenta de Compensación Ordinaria (Recomendada para TUYA)

| Aspecto | Ordinaria |
|--------|-----------|
| **Origen de fondos** | Cualquier operación de cambio libre |
| **Destino de fondos** | Libre — operaciones de cambio, posición propia, etc. |
| **Reportería** | Mensual (posición + operaciones) |
| **Límites** | No explícitos, se aplican controles de razonabilidad según patrimonio TUYA |
| **Cambio de modalidad** | Posible comunicando al Banco |

**Para TUYA:** Ordinaria es la modalidad correcta porque opera **posición propia en divisas** (no custodia, no operaciones obligatoriamente canalizables).

### Cuenta de Compensación Especial (No aplica para TUYA)

Especial se usa para operaciones **obligatoriamente canalizables** (exportaciones, servicios, remesas). No aplica a posición propia.

---

## VII. Modalidad de Operación: Posición Propia vs. Custodia

### Posición Propia (Lo que hace TUYA)

TUYA **es propietaria** de los fondos en la cuenta. Compra divisas, las mantiene, las vende. Riesgo es de TUYA.

**Requisitos legales:**
- Manual de operaciones que especifique: límites por moneda, horizonte de tenencia, estrategia de cobertura
- Reportería de posición (cuántas USD tiene TUYA, cuántas EUR, etc.)
- Cumplimiento LA/FT sobre origen de fondos de TUYA

### Custodia (No aplica)

Si TUYA fuera custodio de fondos de terceros, requisitos serían diferentes (depósito en garantía, segregación, etc.). No es el caso.

---

## VIII. Resumen de Compromisos Legales

| Compromiso | Frecuencia | Responsable | Consecuencia Incumplimiento |
|-----------|-----------|-----------|---------------------------|
| **Reporte diario CENIT** | Diariamente (17:00 hrs) | Operaciones | Congelación cuenta |
| **Reporte mensual BR** | 5° día hábil mes siguiente | Operaciones + Auditoría | Revocación de uso |
| **Auditoría anual** | Antes 31 de marzo | Auditor externo | Imposibilidad renovar licencia IMC |
| **Reportería extraordinaria** | Cuando ocurra evento | Oficial cumplimiento | Sanción SFC |
| **Reporte a UIAF** | <10 días desde detección | Oficial cumplimiento | Multa hasta 50 SMMLV |
| **Documentación LA/FT** | Permanente | Oficial cumplimiento | Sanción SFC |
| **Certificación ISO 20022** | Antes de operar + anual | Auditor externo | No puede usar CENIT |
| **Plan continuidad negocio** | Antes de operar + anual | TI + Operaciones | No puede usar CENIT |

---

## IX. Banco Exterior Específico: Fedwire (EUA)

### Regulación Aplicable

Banco de la República requiere que banco exterior esté domiciliado en **país FATF** (Financial Action Task Force) o con **estándares equivalentes**.

### Fedwire — Qualificación

**Fedwire** (Federal Reserve Wire Services, EUA) cumple:
- ✅ Domiciliado en EUA (país FATF A)
- ✅ Supervisado por Federal Reserve (estándar internacional)
- ✅ Conectado a SWIFT (liquidación internacional)
- ✅ Cumple ISO 20022 (que es estándar SWIFT)

**TUYA puede abrir cuenta en Fedwire sin restricción regulatoria adicional.**

### Acuerdo con Fedwire

Fedwire requerirá:
1. Identificación de TUYA (NIT, certificado legal)
2. Demostración de licencia IMC ante SFC
3. IBAN o número de cuenta específico
4. **Autorización de Banco de la República** (enviada por BR directamente a Fedwire, o certificado que TUYA presenta)
5. Acuerdo sobre reportería (BR necesita que Fedwire reporte ciertos datos a BR)

**Plazo:** Fedwire típicamente abre cuenta en **10-15 días hábiles** una vez recibida autorización de BR.

---

## X. Cronograma de Cumplimiento de Requisitos

### Antes de Solicitar a BR

**Semana 1-2:**
- [ ] Redactar Manual de Operaciones (Operaciones)
- [ ] Redactar Política de Riesgo de Contraparte (Riesgo)
- [ ] Designar Oficial de Cumplimiento LA/FT (Compliance)
- [ ] Obtener aprobación de Junta Directiva

### Solicitud a BR

**Semana 2-3:**
- [ ] Enviar solicitud con documentos arriba

### Aprobación BR

**Semana 3-9 (30-60 días hábiles):**
- [ ] BR valida y aprueba
- [ ] BR comunica aprobación a Fedwire

### Integración Técnica y Certificación

**Semana 9-15 (4-6 semanas paralelo con BR):**
- [ ] Conectar TUYA a CENIT (protocolo SFTP)
- [ ] Pruebas funcionales en ambiente mock
- [ ] Certificación ISO 20022 por auditor externo
- [ ] Documentación de Plan de Continuidad

### Apertura en Fedwire

**Semana 15-17 (10-15 días hábiles):**
- [ ] Fedwire abre cuenta

### Operativa

**Semana 17+:**
- [ ] Primera operación en CENIT
- [ ] Inicio de reportería diaria
- [ ] Cumplimiento mensual y anual

**Plazo total:** 120-150 días hábiles desde inicio de preparación.

---

## XI. Responsabilidades Internas de TUYA

### Operaciones
- Diariamente: Reporte de posición a CENIT (ISO 20022)
- Mensualmente: Reconciliación y reporte a BR
- Anualmente: Participación en auditoría externa

### Riesgo
- Antes: Redacción de Política de Riesgo de Contraparte
- Continuamente: Monitoreo de contrapartes
- Mensualmente: Reporte de matriz de riesgo a BR

### Compliance / Oficial de Cumplimiento
- Continuamente: Monitoreo de operaciones contra señales de alerta LA/FT
- <10 días: Reporte a UIAF si operación es sospechosa
- Anualmente: Certificación de cumplimiento LA/FT

### Auditoría Externa / Revisor Fiscal
- Anualmente: Certificación de cumplimiento ISO 20022 e integración CENIT
- Anualmente: Certificación de Plan de Continuidad de Negocio
- Mensualmente: Validación de reportería

### TI
- Antes: Integración técnica con CENIT (protocolo SFTP, certificados TLS)
- Continuamente: Monitoreo de disponibilidad (<200ms latencia a BR)
- Continuamente: Backup diario, redundancia ISP
- Anualmente: Testing de Plan de Continuidad

---

## XII. Conclusión Final

**TUYA está habilitada legalmente. Los requisitos son cumplibles.**

La complejidad está en **operaciones continuas**, no en autorización previa. Una vez aprobada por BR, TUYA adquiere **obligaciones permanentes** de reportería, auditoría y cumplimiento LA/FT.

**Recomendación:** Designar un equipo dedicado (1 persona de Operaciones tiempo completo, 1 de Compliance, 1 de Auditoría/Revisión Fiscal) para gestionar estas obligaciones desde el día 1 de operativa. El incumplimiento de reportería diaria puede resultar en congelación de cuenta en <24 horas.

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Para:** TUYA — Intermediario de Mercado Cambiario  
**Fecha:** 22 de septiembre de 2026  
**Clasificación:** Confidencial

*Bases: Decreto 2555/2010 (intermediarios de mercado cambiario), Resolución Externa 1/2018 (BR), Circular DCIP-83 Cap. 8 (BR, sept 2023), Ley 1960/2019 (prevención lavado de activos), estándares ISO 20022.*
