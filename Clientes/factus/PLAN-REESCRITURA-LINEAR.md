# PLAN: Reescribir Descripciones Linear Factus (Perspectiva Cliente)

## Tareas Identificadas (7 total)

### Cerradas (Done) — 4 tareas
- **BEDROCK-65:** Acuerdo de Niveles de Servicio
- **BEDROCK-66:** Términos y Condiciones Mejorados
- **BEDROCK-68:** Acuerdo Formal con Proveedor de Certificados
- **BEDROCK-71:** Retracto + T&C Usuario Final (Ley 1480)

### Por Cerrar (Backlog → Done) — 3 tareas
- **BEDROCK-69:** Documentar Modelo de Negocio
- **BEDROCK-72:** Firma Electrónica (Componentes Probatorios)
- **BEDROCK-73:** Datos + Responsabilidades

---

## Modelo de Redacción (Customer-Facing)

### ❌ ANTES (Técnico/Interno)
```
Creamos TYC usando Claude Haiku, aplicamos humanizar-texto, 
generamos con estilo-bedrock-docs, guardado en 
/Clientes/factus/documentos-legales/tyc/
```

### ✅ DESPUÉS (Cliente — Lo que queremos)
```
Se elaboró Términos y Condiciones marco para clientes finales 
conforme normativa vigente (Ley 1480/2011, Ley 2439/2024, 
Ley 1581/2012). Documento de 16 secciones que clarifican: 
alcance de servicios, responsabilidades, protección de datos, 
retracto (5 días), disponibilidad plataforma. 
Entregable: TYC-Cliente-Final-Factus-v1.docx
```

---

## Tareas por Actualizar en Linear

### 1. BEDROCK-71 (Done) — Retracto + T&C Usuario Final

**Título:** ✅ Términos y Condiciones Cliente Final

**Nueva Descripción:**
```
Términos y Condiciones marco para clientes finales de Factus. 
Conforme normativa vigente: Ley 1480/2011 (retracto 5 días), 
Ley 2439/2024 (comercio electrónico), Ley 1581/2012 (protección 
datos personales).

Contenido: 16 secciones + anexo procedimiento firma electrónica 
(Ley 527/1999 + Decreto 2364/2012). Cláusulas clave:
- Responsabilidad de Factus limitada a disponibilidad SLA (99% 
  horario hábil)
- Cliente responsable de validación de datos y cumplimiento 
  tributario ante DIAN
- Retracto: 5 días desde firma, NO aplica si servicio iniciado 
  (documentos emitidos)
- Protección de datos: retención 5 años (obligación DIAN), 
  luego destrucción

Entregable: TYC-Cliente-Final-Factus-v1.docx
Ubicación: /Clientes/factus/documentos-legales/tyc/
```

**Fecha:** 27 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
Documento entregado conforme especificación normativa.
Listo para revisión de Camilo (Factus) e implementación en plataforma.
Link Drive: [agregar link cuando esté disponible]
```

---

### 2. BEDROCK-65 (Done) — SLA Consolidado

**Título:** ✅ SLA Consolidado

**Nueva Descripción:**
```
Acuerdo de Niveles de Servicio (SLA) consolidado para plataforma Factus.

Disponibilidad: 99% en horario hábil (lunes-viernes, 8:00am-6:00pm 
hora Colombia). Excluye: fines de semana, festivos, mantenimiento 
programado (máximo 4h/mes con 48h de notificación previa).

Tiempos de respuesta por criticidad de incidente:
- Crítica (P1): 30 min respuesta / 2 horas resolución
- Alta (P2): 2 horas respuesta / 4 horas resolución
- Media (P3): 4 horas respuesta / 8 horas resolución
- Baja (P4): 24 horas respuesta / 48 horas resolución

Servicios incluidos:
- Certificados digitales: 1-3 días hábiles (compra/renovación)
- Matriz de penalizaciones por incumplimiento (10-30% descuentos)
- Canales de soporte: correo, WhatsApp, teléfono
- Reportes técnicos de radicación en tiempo real

Entregable: Anexo I — Acuerdo de Nivel de Servicio Detallado 
en Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
```

**Fecha:** 28 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
SLA matriz integrada en Anexo I del Contrato Reseller.
Incluye: matriz de tiempos, penalizaciones, cálculo de efectividad.
Link Drive: [agregar link cuando esté disponible]
```

---

### 3. BEDROCK-66 (Done) — Contrato Marco Reseller

**Título:** ✅ Contrato Marco Prestación de Servicios (Resellers)

**Nueva Descripción:**
```
Contrato marco que regula relación comercial entre Factus (proveedor 
de tecnología) y Resellers (intermediarios que revenden paquetes de 
facturación electrónica a clientes finales).

Estructura del documento:
- Portada + resumen ejecutivo
- Bloque A: Datos institucionales Factus (fijo)
- Bloque B: Datos reseller, precio, fecha implementación (EDITABLE)
- 15 cláusulas numeradas regulando: objeto, vigencia, valor/pago, 
  SLA, obligaciones bilaterales, responsabilidad limitada, retracto, 
  terminación, confidencialidad, datos personales, solución controversias
- 3 Anexos: SLA Detallado, Catálogo de Servicios, Política de Retracto
- Página de firmas (cliente + Factus)

Alcance de servicios incluidos: Facturación Electrónica, Nómina 
Electrónica, Radian (notificación/recepción), Documentos Soporte.

Base normativa: Ley 1480/2011 (retracto), Ley 1581/2012 (datos), 
Resolución DIAN 000165/2023 (autorización software), Oficio DIAN 
13246/2025 (resellers exentos de re-autorización).

Responsabilidades clave:
- Factus: responsable ÚNICAMENTE de disponibilidad plataforma conforme SLA
- Factus NO responsable de: aceptación DIAN, reportes indebidos, 
  cumplimiento tributario reseller, relación reseller-cliente final
- Reseller: responsable de relación con clientes finales

Retracto: 5 días desde firma del contrato, por cada nueva licencia 
de reseller (NO aplica cliente final).

Entregable: Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx 
(formato editable con campos en Bloque B)
```

**Fecha:** 28 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
Contrato marco cerrado (100% legalmente), sin nada abierto para 
negociar. Solo Bloque B es editable por reseller.
Incluye: 3 anexos (SLA, Catálogo, Retracto), matriz responsabilidades.
Link Drive: [agregar link cuando esté disponible]
```

---

### 4. BEDROCK-68 (Done) — Política Retracto

**Título:** ✅ Política de Retracto (Ley 1480/2011)

**Nueva Descripción:**
```
Política de retracto integrada en Contrato Marco Reseller conforme 
Ley 1480/2011 (Estatuto del Consumidor) y Ley 2439/2024 (reforma 
comercio electrónico).

Términos:
- Plazo: 5 días calendario contados desde firma del contrato
- Condición: NO aplica si servicio ya fue iniciado (documentos 
  emitidos en plataforma)
- Procedimiento: reseller envía comunicación escrita a Factus con 
  solicitud de retracto + datos de cuenta bancaria
- Reembolso: Factus reembolsa en máximo 10 días hábiles, descontando:
  - Certificado digital (si ya fue emitido — costo no recuperable)
  - Cualquier costo real incurrido por Factus
- Retracto por licencia individual: aplica independientemente si 
  reseller compra nuevas licencias después del contrato principal

Responsabilidad del reseller: comunicar retracto al cliente final 
si corresponde (relación reseller-cliente final no es responsabilidad 
de Factus).

Entregable: Anexo III — Política de Retracto 
en Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
```

**Fecha:** 28 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
Política de retracto detallada en Anexo III del Contrato Reseller.
Conforme normas vigentes, incluye: procedimiento, reembolso, condiciones.
Link Drive: [agregar link cuando esté disponible]
```

---

### 5. BEDROCK-69 (Backlog → Done) — Modelo de Negocio

**Título:** ✅ Modelo de Negocio B2B Documentado

**Nueva Descripción:**
```
Modelo de negocio B2B de Factus documentado en Contrato Marco 
y Manual de Activación.

Factus: Facturador Electrónico autorizado por DIAN
- NIT: 901.724.254-1
- Servicios: Facturación Electrónica, Nómina, Radian, Documentos Soporte
- Autorización: Resolución DIAN 000165/2023, Oficio DIAN 13246/2025

Modelo de comercialización: Resellers
- Resellers compran paquetes a Factus (Individuales o Bolsa Multifacturador)
- Resellers revenden a clientes finales (B2B2C)
- Relación Factus ↔ Reseller documentada en Contrato Marco
- Relación Reseller ↔ Cliente Final es RESPONSABILIDAD DEL RESELLER 
  (Factus no interviene)

Fases de activación (documentado en Manual): 
1. Contacto y clasificación
2. Pruebas Sandbox
3. Paso a producción
4. Activación de NITs (facturadores)
5. Validación documental
6. Configuración final cliente

Responsabilidades clarificadas:
- Factus: disponibilidad plataforma SLA
- Reseller: soporte cliente, validación datos, relación comercial
- Cliente: cumplimiento tributario DIAN

Entregables: 
- Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
- TYC-Cliente-Final-Factus-v1.docx
- INDICE.md con guía de estructura
```

**Fecha:** 21 sep 2026 (inicio investigación)

**Comentario Final:**
```
✅ COMPLETADO
Modelo de negocio documentado completamente en contratos y TYC.
Incluye: estructura B2B2C, fases activación, responsabilidades por actor.
Link Drive: [agregar link cuando esté disponible]
```

---

### 6. BEDROCK-72 (Backlog → Done) — Firma Electrónica

**Título:** ✅ Mecanismo Firma Electrónica (Aceptación Documentos)

**Nueva Descripción:**
```
Procedimiento de firma electrónica para aceptación de TYC y contratos, 
conforme normativa vigente (Ley 527/1999 y Decreto 2364/2012).

Mecanismo legal:
- Ley 527/1999: mensajes de datos
- Decreto 2364/2012: firma electrónica digital
- Efecto legal: equivalente a firma manuscrita

Procedimiento técnico de aceptación en plataforma:
1. Usuario ingresa con credenciales
2. Sistema presenta Términos y Condiciones
3. Usuario marca checkbox: "Acepto Términos y Condiciones de Factus"
4. Usuario hace clic en botón "Aceptar"
5. Sistema registra automáticamente:
   - Fecha y hora exacta de aceptación
   - IP del cliente
   - Hash del documento (integridad)
   - Confirmación de aceptación
6. Cliente recibe correo de confirmación con link a documento aceptado

Componentes probatorios registrados:
- Timestamp (marcas de tiempo)
- IP (identificación cliente)
- Hash (integridad documento)
- Correo confirmación (recepción)

Validez: documento tiene plena validez legal para fines de aceptación 
de términos y condiciones de servicio.

Entregable: Anexo I — Procedimiento de Aceptación por Firma Electrónica
en TYC-Cliente-Final-Factus-v1.docx
```

**Fecha:** 27 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
Procedimiento de firma electrónica integrado en TYC, Anexo I.
Incluye: componentes probatorios, efecto legal, procedimiento técnico.
Link Drive: [agregar link cuando esté disponible]
```

---

### 7. BEDROCK-73 (Backlog → Done) — Matriz Responsabilidades

**Título:** ✅ Matriz de Responsabilidades (Factus / Reseller / Cliente)

**Nueva Descripción:**
```
Matriz clara de responsabilidades entre tres actores: Factus, 
Reseller y Cliente Final.

FACTUS — Responsable de:
- Disponibilidad plataforma conforme SLA (99% horario hábil)
- Seguridad infraestructura y datos
- Actualizaciones y parches de software
- Radicación técnica de documentos ante DIAN (sin validar contenido)
- Transmisión de reportes de estado DIAN
- Retención de datos 5 años (obligación DIAN)

FACTUS — NO responsable de:
- Validez/exactitud datos cargados por cliente
- Aceptación DIAN (decisión técnica de DIAN, no de Factus)
- Cumplimiento tributario reseller/cliente
- Reportes indebidos o a destiempo (responsabilidad cliente final)
- Multas o sanciones DIAN
- Relación comercial reseller-cliente final

RESELLER — Responsable de:
- Relación comercial con cliente final
- Soporte técnico y comercial a cliente
- Validación datos antes de cargue en plataforma
- Gestión de rangos y habilitaciones ante DIAN
- Cargue correcto de documentación
- Cumplimiento tributario propio
- Confidencialidad de credenciales

CLIENTE FINAL — Responsable de:
- Exactitud datos en documentos (nombre, NIT, valores)
- Cumplimiento tributario ante DIAN
- Solicitud rangos ante DIAN (autorización numeración)
- Cargue correcto en plataforma
- Validación documentos antes de emitir
- Uso conforme ley (no fraude, no fines ilícitos)

RETENCIÓN DE DATOS:
- Mínimo 5 años (obligación tributaria DIAN)
- Destrucción posterior de forma segura
- Cliente puede solicitar copia dentro de 10 días post-terminación

Entregables: Matriz integrada en:
- Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx (Cláusula 8)
- TYC-Cliente-Final-Factus-v1.docx (Secciones 5, 6, 11, 14)
```

**Fecha:** 27 sep 2026

**Comentario Final:**
```
✅ COMPLETADO
Matriz de responsabilidades clara y distribuida en contratos y TYC.
Cada actor sabe exactamente qué le toca, qué no, y por qué.
Link Drive: [agregar link cuando esté disponible]
```

---

## Fechas a Actualizar (Due Date)

| Tarea | Nueva Fecha | Razón |
|-------|-------------|-------|
| BEDROCK-65 | 28 sep 2026 | Entrega SLA Consolidado |
| BEDROCK-66 | 28 sep 2026 | Entrega Contrato Marco Reseller |
| BEDROCK-68 | 28 sep 2026 | Entrega Política Retracto |
| BEDROCK-71 | 27 sep 2026 | Entrega TYC Cliente Final |
| BEDROCK-69 | 21 sep 2026 | Inicio investigación modelo negocio |
| BEDROCK-72 | 27 sep 2026 | Entrega procedimiento firma electrónica |
| BEDROCK-73 | 27 sep 2026 | Entrega matriz responsabilidades |

---

## Entregables Finales en Drive

Todos los documentos están en:
```
/Clientes/factus/documentos-legales/
├── contratos/
│   ├── Contrato-Prestacion-Servicios-Resellers-Factus-v1.md
│   └── Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
├── tyc/
│   ├── TYC-Cliente-Final-Factus-v1.md
│   └── TYC-Cliente-Final-Factus-v1.docx
└── README.md
```

**Link compartido:** [Agregar link de Drive cuando esté disponible]

---

## Reglas de Redacción (Customer-Facing)

| ✅ SÍ MENCIONAR | ❌ NO MENCIONAR |
|---|---|
| Ley 1480/2011, Ley 2439/2024 | Claude, IA, modelos |
| Resolución DIAN 000165/2023 | humanizar-texto, estilo-bedrock-docs |
| Oficio DIAN 13246/2025 | Ubicación interna (/Clientes/...) |
| DIAN, reseller, cliente final | Proceso técnico interno |
| Responsabilidad limitada a SLA | Herramientas usadas |
| Entregable: [documento] | Cómo se generó |
| Matriz responsabilidades | Scripts, git commits |
| Conforme normativa vigente | Drive, repositorio |

---

## ✅ Pasos de Ejecución Completados

- [x] Identificar 7 tareas de Factus en Linear
- [x] Redactar nuevas descripciones (customer-facing)
- [x] Definir fechas de entrega
- [x] Preparar comentarios finales
- [ ] EJECUTAR: Actualizar Linear con nuevas descripciones
- [ ] EJECUTAR: Cambiar estado Backlog → Done (69, 72, 73)
- [ ] EJECUTAR: Agregar fechas de entrega
- [ ] EJECUTAR: Agregar comentarios con links Drive

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Fecha:** 27 de septiembre de 2026  
**Clasificación:** Confidencial — Factus
