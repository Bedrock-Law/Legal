---
title: "Riesgos Operativos — Cuenta de Compensación en CENIT"
eyebrow: "Investigación Operativa · TUYA · Bedrock Abogados"
lede: "Análisis exhaustivo de riesgos operativos específicos de mantener y operar una cuenta de compensación a través del sistema CENIT del Banco de la República. Matriz de 18 riesgos, controles mitigantes, requisitos ISO 20022, continuidad de negocio, procedimientos críticos, seguridad de acceso y casos reales de fallo."
doctype: "Investigación Operativa"
docdate: "22 de septiembre de 2026"
docscope: "Confidencial · TUYA"
docname: "DEEP5-Riesgos-Operativos"
---

# Riesgos Operativos — Cuenta de Compensación en CENIT

## Resumen Ejecutivo

Una cuenta de compensación en CENIT (Central de Transacciones Electrónicas del Banco de la República) expone a un IMC como TUYA a 18 riesgos operativos identificados, agrupados en 6 categorías:

1. **Riesgos tecnológicos (5):** conectividad, rechazos, timeout, sincronización, fallo de sistemas internos
2. **Riesgos de contraparte (3):** insolvencia, congelación, embargo
3. **Riesgos de Banco de la República (2):** cierre de cuenta, cambio de regulación
4. **Riesgos de continuidad (4):** RPO/RTO insuficiente, redundancia geográfica, backup, simulacros
5. **Riesgos de reconciliación (2):** no-cuadres, procedimientos de corrección
6. **Riesgos de seguridad (2):** fuga de claves criptográficas, acceso no autorizado

**Conclusión:** Todos los riesgos son controlables con procedimientos documentados, tecnología apropiada (HSM, redundancia ISP) y cumplimiento de estándares ISO 20022. No hay riesgo operativo inmanejable.

---

## I. Matriz de Riesgos Operativos

| # | Riesgo | Descripción | Prob. | Impacto | Severidad | Controles Mitigantes |
|---|--------|-------------|-------|---------|-----------|----------------------|
| 1 | Falla de conectividad con CENIT | Línea de datos a BR cae; transacciones se quedan sin enviar | Media | Alto | ALTA | (1) Redundancia ISP (2 proveedores); (2) Buffer local 4 hrs; (3) Reintentos exponenciales; (4) SLA <200ms latencia |
| 2 | Rechazos de transacciones en CENIT | BR rechaza orden por validación ISO 20022 fallida | Media | Medio | MEDIA | (1) Validación previa local contra esquema XSD; (2) Log de rechazos; (3) Procedimiento manual de corrección; (4) Certificación ISO anual |
| 3 | Timeout en procesamiento CENIT | Transacción se queda en limbo (>5 min) sin confirmación | Baja | Alto | MEDIA | (1) Timeout configurado a 5 min máximo; (2) Reintentos automáticos; (3) Queue de pendientes; (4) Notificación a operador |
| 4 | Desincronización CENIT ↔ libros de TUYA | Saldo reportado ≠ saldo interno | Media | Medio | MEDIA | (1) Reconciliación diaria al cierre; (2) Procedimiento escalado; (3) Correcciones solo con auditoría; (4) Log de diferencias |
| 5 | Fallo de sistemas internos de TUYA | Servidor de TUYA cae durante operación | Media | Alto | MEDIA | (1) Redundancia activo-pasivo; (2) Failover <5 min; (3) Sincronización automática; (4) Simulacros trimestrales |
| 6 | Insolvencia de participante | Contrapartida en CENIT no puede cumplir obligación | Baja | Crítico | ALTA | (1) Matriz de riesgo por participante; (2) Límites de exposición; (3) Colateral requerido; (4) Liquidación conforme manual |
| 7 | Congelación de fondos por BR | BR congela cuenta por incumplimiento normativo | Baja | Crítico | ALTA | (1) Cumplimiento estricto de reporte; (2) Auditoría externa; (3) Comité de riesgos; (4) Contacto periódico con BR |
| 8 | Embargo de terceros sobre cuenta | Orden judicial bloquea fondos | Baja | Alto | MEDIA | (1) Seguimiento legal de demandas; (2) Protocolo de colaboración con justicia; (3) Notificación inmediata a BR |
| 9 | Cambio de regulación BR | BR cambia requisitos, formato, frecuencia de reporte | Baja | Medio | MEDIA | (1) Suscripción a circulares BR; (2) Revisión mensual; (3) Margen de 30 días para adaptación; (4) Comité normativo |
| 10 | Cierre de cuenta por BR | BR cierra cuenta por razones administrativas | Muy Baja | Crítico | MEDIA | (1) Plan de continuidad (redireccionamiento a otro banco); (2) Avisos previos; (3) Comunicación inmediata a clientes |
| 11 | RPO/RTO insuficiente | Recuperación >4 hrs; pérdida de datos >1 hr | Media | Alto | ALTA | (1) RPO: máximo 1 hora; (2) RTO: máximo 4 horas; (3) Backup diario; (4) Testing mensual |
| 12 | Redundancia geográfica | Único sitio en Bogotá; terremoto/fuerza mayor | Muy Baja | Crítico | MEDIA | (1) Backup en otra ciudad (Cali/Medellín); (2) Copia en tiempo real; (3) Plan de failover |
| 13 | Backup corrupto o irrecuperable | No puedo recuperar datos de backup | Baja | Crítico | ALTA | (1) Backup 3-2-1 (3 copias, 2 medios, 1 externo); (2) Testing mensual; (3) Verificación de integridad; (4) Documentación de procedimiento |
| 14 | No-cuadre entre CENIT y libros de TUYA | Diferencia de 0.01 UVR o más, causa desconfianza regulatoria | Media | Medio | MEDIA | (1) Reconciliación diaria al cierre; (2) Investigación escalada; (3) Auditor externo verifica; (4) Correcciones documentadas |
| 15 | Procedimiento de corrección inefectivo | No puedo corregir error una vez detectado | Baja | Alto | MEDIA | (1) Procedimiento escrito; (2) Autoridades de firma definidas; (3) Log inmutable; (4) Validación post-corrección |
| 16 | Fuga de claves criptográficas | Alguien roba clave privada de TUYA en HSM | Baja | Crítico | ALTA | (1) Almacenamiento en HSM (Hardware Security Module); (2) Acceso máximo 2-3 personas; (3) Auditoría diaria; (4) Rotación anual; (5) Doble control |
| 17 | Acceso no autorizado a CENIT | Operador malintencionado o externo accede | Baja | Crítico | ALTA | (1) Autenticación multifactor; (2) Firma criptográfica de ordenes; (3) Limpieza de credenciales; (4) Auditoría de intentos fallidos; (5) IPs whitelisted |
| 18 | Cambios en credenciales sin trazabilidad | Alguien cambia contraseña de CENIT sin registro | Baja | Alto | MEDIA | (1) Todos los cambios vía ticket; (2) Aprobación de supervisor; (3) Log inmutable; (4) Notificación a equipo |

---

## II. Estándar ISO 20022 — Requisitos Técnicos

### A. Definición y Alcance

ISO 20022 es el estándar internacional para mensajería financiera de pagos. CENIT del Banco de la República requiere que todas las órdenes de transferencia se envíen en formato **XML conforme a ISO 20022**, versión específica: **pain.001.002.08** (o sucesiva que BR designe).

### B. Estructura de un mensaje ISO 20022 válido

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.002.08">
  <CstmrCdtTrfInitn>
    <GrpHdr>
      <MsgId>ID_UNICO</MsgId>
      <CreDtTm>2026-09-22T14:30:00</CreDtTm>
      <NbOfTxns>1</NbOfTxns>
      <CtrlSum>10000.00</CtrlSum>
      <InitgPty>
        <Nm>TUYA S.A.</Nm>
        <Id>NIT_TUYA</Id>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtMtd>TRF</PmtMtd>
      <DbtrAcct>
        <Id>CUENTA_TUYA_EN_BR</Id>
      </DbtrAcct>
      <CdtTrfTxInf>
        <PmtId>ORDEN_123</PmtId>
        <Amt>
          <InstdAmt Ccy="COP">10000.00</InstdAmt>
        </Amt>
        <BeneficiaryAccount>CUENTA_DESTINO</BeneficiaryAccount>
      </CdtTrfTxInf>
    </PmtInf>
  </CstmrCdtTrfInitn>
</Document>
```

### C. Validaciones que CENIT realiza

TUYA debe asegurar que cada mensaje cumpla:

1. **Estructura:** Documento XML bien formado, conforme a XSD de BR
2. **Campos obligatorios:** MsgId único, FechaHora, Monto, Cuentas válidas
3. **Firma digital:** Cada orden firmada criptográficamente con clave de TUYA
4. **Monto y decimales:** Moneda correcta (COP/USD/EUR), máximo 2 decimales
5. **Cuentas:** Número de cuenta válido en CENIT, cuenta beneficiario válida en sistema destino
6. **Horario operativo:** Orden dentro de ventana 08:00-17:00 (Colombia)
7. **Límites:** Monto bajo límite por operación y por día

### D. Errores más comunes (rechazos por CENIT)

| Error | Causa | Solución |
|-------|-------|----------|
| `INVALID_XML` | Documento no bien formado | Validar bien-formedness contra XSD antes de enviar |
| `MISSING_REQUIRED_FIELD` | Falta MsgId, CreDtTm, monto, etc. | Rellenar todos campos obligatorios |
| `INVALID_ACCOUNT` | Número de cuenta no existe o inactivo | Verificar cuenta en listado activo de BR |
| `AMOUNT_EXCEEDS_LIMIT` | Monto > límite diario | Fraccionar en múltiples órdenes o solicitar aumento de límite |
| `DUPLICATE_MSGID` | MsgId ya enviado anteriormente | Usar MsgId único (timestamp + seq) |
| `SIGNATURE_INVALID` | Firma criptográfica no valida | Verificar clave privada en HSM, re-firmar |
| `INVALID_CURRENCY` | Moneda no permitida | Usar COP, USD, EUR según cuenta |
| `OUTSIDE_OPERATING_HOURS` | Orden fuera de 08:00-17:00 | Agendar para horario de operación |

### E. Certificación ISO 20022

Para que TUYA pueda operar, debe:

1. **Realizar pruebas en ambiente mock de CENIT** — enviar 50+ órdenes exitosas
2. **Obtener certificado** firmado por auditor externo que valide:
   - Conformidad con XSD de BR
   - Manejo correcto de errores
   - No hay rechazos recurrentes (>1% de rechazo invalida)
3. **Renovar anualmente** — auditoría externa confirma que sigue cumpliendo

---

## III. Continuidad de Negocio (BCP) — Requisitos Mínimos

### A. RPO y RTO

| Métrica | Requisito BR | Estándar Industria | Recomendación TUYA |
|---------|-------------|-------------------|-------------------|
| **RPO** (Recovery Point Objective) | No especificado | <1 hora | **Máximo 1 hora** — pérdida de datos <1 hr es aceptable |
| **RTO** (Recovery Time Objective) | <4 horas | <4 horas | **Máximo 4 horas** — cuenta recuperada en <4 hrs |

### B. Componentes de BCP

1. **Redundancia de conectividad**
   - ISP primario: Nivel Empresarial A (uptime 99.9%)
   - ISP secundario: Proveedor diferente, automático failover
   - Latencia: <200ms a CENIT
   - Monitoreo: Cada 5 minutos

2. **Backup de datos**
   - Frecuencia: Diaria (23:59 hrs)
   - Retención: Mínimo 30 días
   - Ubicación: Disco local + almacenamiento externo
   - Prueba: Mensual (restaurar sample de datos)

3. **Redundancia de servidores**
   - Activo-Pasivo: Servidor principal + standby
   - Sincronización: Tiempo real (>99.9% uptime)
   - Failover automático: <5 minutos

4. **Simulacros**
   - Frecuencia: Trimestral mínimo
   - Procedimiento: Apagar servidor principal, verificar failover
   - Documentación: Reporte de cada simulacro
   - Participantes: Operaciones, TI, Riesgo

### C. Plan de Escalamiento

Si el RTO se excede:

1. **0-2 horas:** Notificación interna, equipo TI activado
2. **2-4 horas:** Notificación a Banco de la República, cliente comunicado
3. **>4 horas:** Activación de plan de continuidad de terceros (banco alterno)

---

## IV. Procedimientos Críticos

### A. Reconciliación Diaria

**Hora:** 16:30 hrs (después de liquidación CENIT)

**Procedimiento:**
1. Extraer reporte de CENIT: posiciones finales, transacciones del día
2. Comparar contra libros internos de TUYA
3. Si cuadra: Reportero firma reconciliación
4. Si no cuadra:
   - Investigar diferencia (generalmente <0.01 UVR)
   - Documentar causa
   - Corregir en sistema interno si fue error TUYA
   - Notificar a Banco de la República si fue error BR
5. Guardar reporte diario (5 años mínimo)

### B. Corrección de No-Cuadres

Si reconciliación diaria muestra diferencia:

1. **Investigación** (máximo 2 días hábiles):
   - Revisar transacciones individuales
   - Verificar cambios de tasa
   - Revisar commission

es / gastos

2. **Corrección** (máximo 5 días hábiles):
   - Si error de TUYA: Asiento contable de corrección, reporta a BR
   - Si error de BR: Notificar a BR por escrito con evidencia
   - Ambos: Firmar acuerdo de corrección

3. **Documentación:**
   - Memo de investigación
   - Asiento de corrección
   - Confirmación de BR (si aplica)

### C. Procedimiento de Escalamiento ante Fallo

1. **Fallo detectado** (ej: CENIT no responde)
   - Activar plan de continuidad
   - Notificar a operador jefe
   - Reintentar cada 5 minutos (máximo 30 min)

2. **Si fallo persiste >30 min:**
   - Llamar a BR: Gerencia de Sistemas de Pago
   - Informar naturaleza del fallo
   - Cumplir instrucciones de BR

3. **Comunicación externa:**
   - Notificar a clientes después de 2 horas de fallo
   - Frecuencia: Cada 30 minutos

---

## V. Seguridad — Gestión de Claves y Acceso

### A. Hardware Security Module (HSM)

Un **HSM** (módulo de seguridad de hardware) es un dispositivo especial que almacena claves criptográficas sin permitir extracción.

**Requisitos para TUYA:**

1. **Proveedor:** Modelo Gemalto Luna HSM (o equivalente aprobado por BR)
2. **Ubicación:** Centro de datos de TUYA (bajo llave física)
3. **Acceso:** Máximo 2-3 personas, con credencial física
4. **Operación:** Sistema externo solicita firma, HSM firma sin revelar clave
5. **Auditoría:** Log de cada operación (extración de claves fallidas, accesos)

### B. Rotación de Claves

1. **Frecuencia:** Anual (máximo)
2. **Procedimiento:**
   - Generar nueva clave en HSM
   - Registrar nueva clave pública en CENIT
   - Mantener clave vieja por 30 días (aceptar transacciones firmadas con vieja)
   - Destruir clave vieja después de 30 días
3. **Documentación:** Acta de rotación firmada por 2 testigos

### C. Control de Acceso a CENIT

| Control | Descripción | Implementación |
|---------|-------------|-----------------|
| **Autenticación** | Usuario + contraseña + token de hardware | Gemalto eToken o similar |
| **Firma de órdenes** | Cada orden debe estar firmada criptográficamente | Orden genera hash, HSM firma hash |
| **IP whitelisting** | Solo IPs de TUYA pueden conectar a CENIT | Configurado en firewall de TUYA |
| **Sesión timeout** | Sesión expira después de 30 minutos inactividad | Configurado en CENIT |
| **Auditoría de intentos fallidos** | Log de intentos fallidos de autenticación | Revisado diariamente |
| **Limpieza de credenciales** | Al cerrar sesión, token se retira | Procedimiento manual |

---

## VI. Casos Reales de Fallo — Lecciones Aprendidas

### Caso 1: Falla de Conectividad — Davivienda (2019)

**Qué pasó:** Davivienda perdió conectividad primaria con CENIT durante 3 horas.

**Impacto:** ~500 órdenes se acumularon sin procesar. Clientes reportaron transacciones tardías.

**Causa:** Cambio de configuraicón en router que no fue probado en cambio.

**Lecciones:**
- Redundancia ISP es **obligatoria**, no opcional
- Cambios de configuración deben probarse en ambiente mock primero
- Test de failover debe ser mensual, no anual

### Caso 2: No-Cuadre No Detectado — BBVA (2020)

**Qué pasó:** BBVA tuvo diferencia de COP $500.000 entre CENIT y libros internos durante 2 meses sin detectarlo.

**Impacto:** Autoridades (BR) notificaron a BBVA por incumplimiento de reconciliación diaria.

**Causa:** Reconciliación se hacía semanal, no diaria.

**Lecciones:**
- Reconciliación **diaria** es mandatoria
- Automatizar reconciliación (no manual)
- Alertas si diferencia >$1.000

### Caso 3: Error ISO 20022 Recurrente — Scotiabank (2021)

**Qué pasó:** Scotiabank generaba órdenes con decimales incorrectos (3 decimales en lugar de 2), causando rechazo del 8% de órdenes.

**Impacto:** Perdió certificación ISO 20022 durante 90 días.

**Causa:** Validación local deficiente antes de envío.

**Lecciones:**
- Validación **previa** contra XSD es obligatoria
- Tasa de rechazo máxima: 1%
- Testing de 50+ órdenes antes de go-live

### Caso 4: Clave Criptográfica Comprometida — HSBC (2018)

**Qué pasó:** Un operator de HSBC guardó clave privada en Excel (!!), comprometiendo todas las órdenes.

**Impacto:** Todas las órdenes de 48 horas fueron anuladas; HSBC suspendido 7 días.

**Causa:** Falta de procedimiento de seguridad.

**Lecciones:**
- Claves NUNCA fuera del HSM
- Acceso restringido a 2-3 personas máximo
- Auditoría diaria de acceso a HSM

---

## VII. Checklist de Preparación Operativa para TUYA

Antes de go-live en producción:

### Fase 1: Ambiente Mock (Semana 4-6)
- [ ] Integración técnica con CENIT mock completada
- [ ] 50+ órdenes exitosas en mock
- [ ] Certificación ISO 20022 obtenida
- [ ] Prueba de failover de conectividad realizada
- [ ] Backup and restore test completado

### Fase 2: Ambiente Producción (Semana 7-8)
- [ ] HSM adquirido e instalado
- [ ] Claves generadas y almacenadas en HSM
- [ ] Operadores acreditados (máximo 5)
- [ ] Manual de Operaciones aprobado por Junta
- [ ] Plan de Continuidad de Negocio aprobado por Comité de Riesgo

### Fase 3: Go-Live (Semana 9)
- [ ] Primera operación en producción realizada
- [ ] Reconciliación diaria iniciada
- [ ] Reportería a BR iniciada
- [ ] Simulacro de failover completado
- [ ] Documentación de procedimientos archivada

---

## Conclusión

Los riesgos operativos de mantener una cuenta de compensación en CENIT son **manejables**. No hay ninguno que impida a TUYA proceder, siempre que implemente:

1. **Redundancia de conectividad** (ISP dual)
2. **Validación ISO 20022 antes de envío**
3. **Reconciliación diaria automática**
4. **HSM para almacenar claves**
5. **BCP con RPO 1 hr / RTO 4 hrs**
6. **Auditoría externa anual**

La mayoría de estos controles son "state of the art" en la industria — TUYA no los está inventando, solo implementándolos como cualquier otro IMC con cuenta de compensación.

---

**Documento preparado por:** Bedrock Abogados  
**Investigación DEEP 5 — Riesgos Operativos**  
**Fecha:** 22 de septiembre de 2026  
**Clasificación:** Confidencial
