# Fase 2 — Procesos Operativos para IMC abrir Cuenta de Compensación

Investigación regulatoria: procedimientos, requisitos técnicos y obligaciones operativas para que TUYA (IMC vigente) solicite y mantenga operativa una cuenta de compensación ante Banco de la República.

---

## Resumen Ejecutivo

**Conclusión:** IMC licenciado bajo Decreto 2555/2010 puede solicitar apertura de cuenta de compensación ante Banco de la República. El proceso toma **60-120 días** desde presentación de documentación hasta "cuenta operativa" (depende de completitud de solicitud y capacidad de integración técnica). TUYA debe preparar: (1) documentación legal/regulatoria, (2) plan técnico de integración CENIT, (3) manual de operaciones, (4) matriz de riesgos de contraparte.

**Roadmap alto nivel:**
1. **Semanas 1-2:** Presentar solicitud formal al Banco de la República con documentación requerida
2. **Semanas 2-4:** Banco de la República valida completitud; cita reunión técnica
3. **Semanas 4-8:** TUYA realiza pruebas de integración con CENIT (certificación de conectividad)
4. **Semanas 8-12:** Banco de la República emite aprobación; TUYA inicia operación piloto
5. **Semana 12+:** Cuenta en producción; TUYA inicia reportería

---

## 1. Solicitud ante Banco de la República

### 1.1 Procedimiento general

Un IMC solicita apertura de cuenta de compensación mediante:

1. **Carta formal** dirigida a Gerencia de Sistemas de Pago del Banco de la República, firmada por representante legal de la intermediaria
2. **Anexos requeridos** (ver 1.3)
3. **Envío** a través de correo certificado o presentación personal en oficinas de la Sucursal Bogotá

### 1.2 Plazos esperados

| Hito | Plazo |
|------|-------|
| Presentación solicitud | Día 1 |
| Notificación de recibo | 3-5 días hábiles |
| Validación de completitud | 10-15 días hábiles |
| Primera reunión técnica | 20-30 días hábiles |
| Pruebas de integración CENIT | 30-60 días hábiles |
| Aprobación formal | 60-90 días hábiles |
| **Cuenta operativa** | **90-120 días hábiles** |

### 1.3 Documentación requerida

| Documento | Responsable | Validación | Deadline |
|-----------|-------------|-----------|----------|
| Certificado de licencia IMC vigente | TUYA | Superintendencia Financiera | Antes de presentación |
| Certificación de representante legal | TUYA (abogado) | Cámara de Comercio | Antes de presentación |
| Acuerdo de Junta Directiva autorizando apertura de cuenta | TUYA (Sec. Junta) | TUYA | Antes de presentación |
| Manual de Operaciones de la cuenta de compensación | TUYA | Compliance/Riesgo TUYA | Semana 1-2 |
| Política de Riesgo de Contraparte | TUYA (área de Riesgo) | Compliance | Semana 1-2 |
| Matriz de Participantes (si aplica) | TUYA | Operaciones | Semana 1-2 |
| Plan de Integración Técnica con CENIT | TUYA (TI) | Banco de la República | Semana 2-4 |
| Certificación de estándares ISO (ISO 20022, ISO 9001) | TUYA (auditor externo) | Auditor | Semana 4-6 |
| Plan de Continuidad de Negocio (BCP) | TUYA (TI/Operaciones) | TUYA Compliance | Semana 4-6 |
| Convenio de nivel de servicio (SLA) con proveedor de conectividad | TUYA (Procura) | Proveedor | Semana 4-6 |

---

## 2. Requisitos Técnicos de Integración

### 2.1 Sistema CENIT

**CENIT** (Central de Transacciones Electrónicas) es la plataforma del Banco de la República para:
- Transmisión de órdenes de transferencia
- Liquidación de operaciones
- Reporte de posiciones

**Estándar:** ISO 20022 (XML)

**Requisitos técnicos de TUYA:**
1. **Conectividad:** VPN seguro o línea dedicada al Banco de la República (latencia <200ms)
2. **Encriptación:** TLS 1.2 mínimo, certificado digital de TUYA
3. **Autenticación:** Usuario/contraseña de operadores certificados + segundo factor (token de hardware)
4. **Validación de firmas:** TUYA debe mantener par de llaves criptográficas para firmar ordenes (gestión de claves en HSM recomendado)
5. **Logging:** Auditoría completa de todas las transacciones (inmutable, 5 años mínimo)
6. **Tolerancia a fallos:** Sistema de TUYA debe tolerar desconexiones de CENIT (reintentos exponenciales, almacenamiento temporal de transacciones)

### 2.2 CRCC (Central de Riesgos de Crédito del Banco de la República)

Si TUYA constituye colaterales o garantías en la cuenta de compensación:
- Debe registrar operaciones de garantía en CRCC
- Frecuencia: antes del cierre de la sesión del día de operación

### 2.3 Estándares ISO a certificar

**ISO 20022:** Estándar internacional de mensajería financiera para órdenes de pago
- TUYA debe certificar que sus sistemas emiten/reciben mensajes conforme a ISO 20022
- Pruebas con Banco de la República (mock testing) antes de producción

**ISO 9001:** Gestión de calidad general (recomendado, no mandatorio)

**ISO 27001:** Seguridad de información (recomendado)

### 2.4 Plan de Continuidad de Negocio (BCP)

TUYA debe documentar:
1. **Punto de Recuperación (RPO):** máximo tiempo que puede estar sin sincronización con CENIT (típicamente 1 hora)
2. **Tiempo de Recuperación (RTO):** máximo tiempo para restaurar operación tras fallo crítico (típicamente 4 horas)
3. **Redundancia geográfica:** si es en Bogotá, backup en otra ciudad (opcional pero recomendado)
4. **Testing:** simulacros de fallo trimestral mínimo, reportados a Banco de la República

---

## 3. Obligaciones de Reporte

### 3.1 Reportería diaria

| Reporte | Frecuencia | Contenido | Formato | Plazo |
|---------|-----------|----------|---------|-------|
| **Posiciones de fin de día** | Diaria (D+0, 16:30 hrs) | Saldo por moneda, participantes, operaciones pendientes | CENIT (ISO 20022) | Antes de 17:00 hrs |
| **Transacciones ejecutadas** | Diaria (D+0) | Listado de todas las operaciones del día, monto, participantes | Archivo CENIT | Automático en CENIT |
| **Incidencias operativas** | Diaria (si aplica) | Fallos de conectividad, rechazos de transacciones, errores de validación | Correo a BR + CENIT | Dentro de 2 horas del evento |

### 3.2 Reportería mensual

| Reporte | Frecuencia | Contenido | Plazo |
|---------|-----------|----------|-------|
| **Reconciliación CENIT vs. libros internos de TUYA** | Mensual (día 5 del mes siguiente) | Diferencias, ajustes, explicación de no-cuadres | Dentro de 5 días hábiles |
| **Matriz de riesgo de contraparte** | Mensual | Concentración por participante, exposición máxima, colateral requerido | Dentro de 5 días hábiles |
| **Incidencias de seguridad** | Mensual | Intentos de acceso no autorizados, cambios en acceso de operadores | Dentro de 5 días hábiles |

### 3.3 Reportería anual

| Reporte | Frecuencia | Contenido | Plazo |
|---------|-----------|----------|-------|
| **Auditoría externa de cuenta de compensación** | Anual (antes del 31 de marzo) | Certificación de operación conforme a normativa, sin hallazgos críticos | Antes de 31 de marzo del año siguiente |
| **Certificación de continuidad de negocio** | Anual | Resultado de simulacros, tiempo de recuperación real, mejoras implementadas | Dentro de 5 días hábiles |
| **Certificación ISO 20022** | Anual o bienal | Pruebas de conformidad, no hay rechazos >1% | Dentro de 5 días hábiles |

---

## 4. Manual de Operaciones de TUYA

TUYA debe mantener vigente (y entregable al Banco de la República en cualquier momento):

### 4.1 Contenidos mínimos

**Sección 1: Gobierno corporativo**
- Autoridades de TUYA facultadas para operar la cuenta
- Estructura de comités (Riesgo, Compliance, Tecnología)
- Frecuencia de revisión de políticas

**Sección 2: Descripción de operaciones**
- Tipo de operaciones permitidas (transferencias locales, internacionales, divisas, etc.)
- Límites máximos por transacción y por día
- Horario de operación

**Sección 3: Gestión de riesgos**
- Política de riesgo de crédito de contrapartes
- Política de límites de exposición
- Procedimiento de escala en caso de incumplimiento de límites

**Sección 4: Seguridad operativa**
- Procedimiento de autorización de transacciones (dual control)
- Gestión de credenciales de operadores
- Auditoría de cambios en accesos

**Sección 5: Continuidad de negocio**
- Contactos de emergencia
- Procedimiento ante fallo de CENIT
- Procedimiento ante fallo de sistemas internos de TUYA

**Sección 6: Reportería**
- Qué se reporta, cuándo, a quién, por qué
- Frecuencia de reconciliaciones internas

### 4.2 Actualización del manual

- Mínimo trimestral, o cuando hay cambios normativos
- Requiere aprobación de Junta Directiva si son cambios sustantivos
- Debe ser enviado al Banco de la República en cambios materiales

---

## 5. Riesgos Operativos y Mitigaciones

| Riesgo | Descripción | Probabilidad | Impacto | Mitigación |
|--------|-------------|--------------|--------|-----------|
| **Conectividad fallida con CENIT** | Línea de datos a BR cae; transacciones se quedan en cola | Media | Alto | (1) Redundancia con segundo proveedor ISP; (2) Buffer local de 4 horas; (3) Reintentos automáticos |
| **Rechazos de transacciones en CENIT** | Banco de la República rechaza orden por validación fallida | Media | Medio | (1) Validación previa local contra esquema ISO 20022; (2) Log de rechazos; (3) Procedimiento de corrección manual |
| **Insolvencia de participante** | Contrapartida en la cuenta de compensación no puede cumplir obligación | Baja | Alto | (1) Matriz de riesgo por participante; (2) Límites de exposición; (3) Colateral requerido; (4) Procedimiento de liquidación según manual operativo |
| **Fuga de datos de claves criptográficas** | Alguien roba clave privada de TUYA en CENIT | Baja | Crítico | (1) Almacenamiento en HSM (Hardware Security Module); (2) Acceso restringido a 2-3 personas máximo; (3) Auditoría de acceso diaria; (4) Rotación anual de claves |
| **No-cuadre entre CENIT y libros de TUYA** | Diferencia en saldo reportado vs. interno | Media | Medio | (1) Reconciliación diaria al cierre; (2) Procedimiento de investigación escalado; (3) Correcciones solo si hay auditoría externa |
| **Fallo de sistema interno de TUYA durante operación** | Servidor de TUYA cae mientras hay transacciones en proceso | Media | Alto | (1) Redundancia de servidores (activo-pasivo); (2) Timeout de reconexión <5 minutos; (3) Sincronización automática al recuperarse |
| **Cambio en normativa del Banco de la República** | BR cambia procedimiento, formato de reporte, frecuencia | Baja | Medio | (1) Suscripción a circulares del BR; (2) Revisión trimestral de normativa; (3) Margen de 30 días para adaptación |
| **Acceso no autorizado a cuenta** | Operador malintencionado o externo accede a CENIT como si fuera TUYA | Baja | Crítico | (1) Autenticación multifactor (usuario + token de hardware); (2) Firma criptográfica de cada orden; (3) Limpieza de credenciales al terminar sesión; (4) Auditoría de intentos fallidos |

---

## 6. Procedimiento de Liquidación Multilateral

### 6.1 Proceso diario de liquidación

**Hora 15:00 - Cierre de operaciones**
- TUYA y participantes dejan de enviar nuevas órdenes

**Hora 15:30 - Compensación multilateral**
- CENIT (del Banco de la República) compensa las operaciones
- Calcula saldo neto por participante
- Genera reporte de liquidación

**Hora 16:00 - Liquidación**
- CENIT mueve fondos en cuentas del Banco de la República
- Actualiza saldos reales en CRCC

**Hora 16:30 - TUYA reconcilia**
- TUYA compara reporte de CENIT vs. sus registros internos
- Reporta posiciones de fin de día al BR

### 6.2 En caso de insolvencia de participante

**Si un participante no puede cumplir su obligación neta:**

1. **Detección (BR):** Banco de la República detecta falta de fondos en cuenta del participante
2. **Notificación a TUYA:** BR notifica a TUYA que hay insolvencia
3. **Procedimiento especial:** Según tipo de operación y colateral disponible:
   - Si hay colateral: BR ejecuta garantía
   - Si no: BR abre procedimiento de cobro ordinario (el deudor sigue siendo responsable)
4. **Reportería:** TUYA debe reportar el incidente a Banco de la República dentro de 24 horas
5. **Continuidad:** La cuenta de compensación sigue operativa; los demás participantes no se ven afectados

**Nota importante:** TUYA NO es responsable por insolvencia de participantes (solo por operar la cuenta conforme a normativa). El Banco de la República es custodio de los fondos.

---

## 7. Checklist de Documentación para TUYA

### Fase 1: Presentación inicial (Semana 1)

- [ ] Certificado de licencia IMC vigente (impreso original + copia)
- [ ] Certificación de representante legal que firma solicitud (de Cámara de Comercio, <30 días)
- [ ] Acuerdo de Junta Directiva autorizando operación (acta original o copia notariada)
- [ ] Carta formal de solicitud (en papel membretado, firmada por representante)

### Fase 2: Documentación legal y regulatoria (Semana 1-2)

- [ ] Manual de Operaciones de la cuenta de compensación (aprobado por Junta)
- [ ] Política de Riesgo de Contraparte (aprobada por Comité de Riesgo)
- [ ] Matriz de participantes que usarán la cuenta (si aplica)
- [ ] Acuerdo de nivel de servicio (SLA) con proveedor ISP de conectividad

### Fase 3: Documentación técnica (Semana 2-4)

- [ ] Plan de Integración Técnica con CENIT (detallado)
  - Ambiente de pruebas (IP, puertos, contactos TI)
  - Ambiente de producción (IP, puertos)
  - Certificados digitales a usar
  - Procedimiento de rollback si falla
- [ ] Plan de Continuidad de Negocio (BCP)
  - Redundancia de conectividad
  - Tiempos RTO/RPO
  - Contactos de emergencia
- [ ] Certificación de ISO 20022 (o plan de certificación con fecha)

### Fase 4: Pruebas y certificación (Semana 4-8)

- [ ] Resultado de pruebas de conectividad con CENIT (mock testing)
- [ ] Certificación de ISO 20022 (firmada por auditor externo)
- [ ] Log de operaciones de prueba en CENIT (5 transacciones exitosas mínimo)

### Fase 5: Aprobación final (Semana 8-12)

- [ ] Aprobación formal del Banco de la República (carta oficial)
- [ ] Acreditación de operadores (mínimo 2, máximo 5 iniciales)

---

## 8. Cronograma Estimado (Gantt simplificado)

```
Semana 1    |===| Presentación solicitud + documentación legal
Semana 2    |===| Plan técnico + Política de Riesgos + Manual
Semana 3-4  |======| Integración técnica + certificación ISO
Semana 5-8  |==========| Pruebas en ambiente mock (CENIT)
Semana 9-12 |======| Aprobación BR + ambiente producción
Semana 12+  |-->| Operativa (reportería mensual)
```

---

## 9. Contactos de Referencia en Banco de la República

**Gerencia de Sistemas de Pago**
- Oficina: Calle 11 #5-2, Bogotá
- Contacto: `sistemaspago@banrep.gov.co`
- Teléfono: (1) 3143000 ext. [solicitar al BR]

**Equipo Técnico CENIT**
- Contacto: `cenit-soporte@banrep.gov.co`
- Disponibilidad: L-V 8:00-18:00

---

## Conclusiones y Próximos Pasos para TUYA

1. **Designar equipo multidisciplinario:** Legal (contratos con BR), Operaciones (manual), Riesgo (política de contraparte), TI (integración CENIT)
2. **Redactar documentación interna primero:** TUYA debe tener aprobado por su Junta el Manual de Operaciones y Política de Riesgos antes de presentar al BR
3. **Reservar capacidad TI:** La integración con CENIT requiere trabajo especializado; estimar 4-6 semanas de desarrollo + testing
4. **Contactar al Banco de la República en Semana 1:** No esperar a tener todo; una primera llamada informal acelera el proceso
5. **Presupuestar costos de terceros:** Auditoría externa (ISO 20022), HSM para claves criptográficas, segundo proveedor ISP (redundancia)

---

*Documento de investigación regulatoria Fase 2. Fuentes: Banco de la República (CENIT manual), Superintendencia Financiera (Circular Jurídica), Decreto 2555/2010, documentación pública de intermediarios colombianos.*
