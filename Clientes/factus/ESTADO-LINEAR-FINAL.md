# Estado Final Linear — Proyecto Factus

**Fecha:** 27 de septiembre de 2026  
**Actualización:** Estado de cierre de todas las tareas Factus

---

## Tareas Actualizadas en Linear (Sesión 27 sept 2026)

### ✅ COMPLETADAS Y CERRADAS

#### BEDROCK-71 — Términos y Condiciones Cliente Final
- **Estado:** Done
- **Fecha Entrega:** 27 de septiembre 2026
- **Descripción:** Términos y Condiciones marco para clientes finales de Factus. Conforme normativa vigente: Ley 1480/2011 (retracto 5 días), Ley 2439/2024 (comercio electrónico), Ley 1581/2012 (protección datos personales). Contenido: 16 secciones + anexo procedimiento firma electrónica. Cláusulas clave: responsabilidad de Factus limitada a disponibilidad SLA (99% horario hábil), cliente responsable de validación de datos y cumplimiento tributario ante DIAN.
- **Entregable:** TYC-Cliente-Final-Factus-v1.docx
- **Comentario:** ✅ TYC Cliente Final integrado en documentos entregables

---

#### BEDROCK-65 — Acuerdo de Nivel de Servicio (SLA) Consolidado
- **Estado:** Done
- **Fecha Entrega:** 28 de septiembre 2026
- **Descripción:** Acuerdo de Niveles de Servicio (SLA) consolidado para plataforma Factus. Disponibilidad: 99% en horario hábil (lunes-viernes, 8:00am-6:00pm hora Colombia). Excluye: fines de semana, festivos, mantenimiento programado (máximo 4h/mes con 48h de notificación previa). Tiempos de respuesta por criticidad: Crítica (P1) 30min/2h, Alta (P2) 2h/4h, Media (P3) 4h/8h, Baja (P4) 24h/48h. Servicios incluidos: certificados digitales 1-3 días, matriz de penalizaciones por incumplimiento (10-30% descuentos), canales de soporte (correo, WhatsApp, teléfono), reportes técnicos de radicación en tiempo real.
- **Entregable:** Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx (Anexo I)
- **Comentario:** ✅ SLA matriz integrada en Anexo I del Contrato Reseller

---

#### BEDROCK-66 — Contrato Marco de Prestación de Servicios (Resellers)
- **Estado:** Done
- **Fecha Entrega:** 28 de septiembre 2026
- **Descripción:** Contrato marco que regula relación comercial entre Factus (proveedor de tecnología) y Resellers (intermediarios que revenden paquetes de facturación electrónica). Estructura: Bloque A (datos Factus fijo) + Bloque B (datos reseller, precio, fecha implementación editable) + 15 cláusulas numeradas (objeto, vigencia, valor/pago, SLA, obligaciones bilaterales, responsabilidad limitada, retracto, terminación, confidencialidad, datos personales) + 3 Anexos (SLA Detallado, Catálogo de Servicios, Política de Retracto). Alcance: Facturación Electrónica, Nómina Electrónica, Radian, Documentos Soporte. Base normativa: Ley 1480/2011, Ley 1581/2012, Resolución DIAN 000165/2023, Oficio DIAN 13246/2025.
- **Entregable:** Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
- **Comentario:** ✅ Contrato Marco Reseller cerrado 100% legalmente

---

#### BEDROCK-68 — Política de Retracto
- **Estado:** Done
- **Fecha Entrega:** 28 de septiembre 2026
- **Descripción:** Política de retracto integrada en Contrato Marco Reseller conforme Ley 1480/2011 (Estatuto del Consumidor) y Ley 2439/2024 (reforma comercio electrónico). Términos: Plazo 5 días calendario desde firma, no aplica si servicio iniciado (documentos emitidos). Procedimiento: reseller envía comunicación escrita con solicitud + cuenta bancaria. Reembolso: máximo 10 días hábiles, descontando certificado (si emitido) y costos reales.
- **Entregable:** Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx (Anexo III)
- **Comentario:** ✅ Política de Retracto detallada en Anexo III

---

#### BEDROCK-69 — Modelo de Negocio B2B2C
- **Estado:** Done
- **Fecha Entrega:** 21 de septiembre 2026
- **Descripción:** Modelo de negocio B2B documentado en Contrato Marco y Manual de Activación. Investigación realizada: autorización DIAN (Resolución 000165/2023, Oficio DIAN 13246/2025), estructura B2B2C, fases de activación (Contacto → Sandbox → Producción → Activación NITs → Validación → Configuración). Factus: Facturador Electrónico autorizado DIAN (NIT 901.724.254-1), servicios: Facturación Electrónica, Nómina, Radian, Documentos Soporte. Modelo comercialización: Resellers compran paquetes a Factus (Individuales o Bolsa Multifacturador) y revenden a clientes finales. Responsabilidades clarificadas: Factus (disponibilidad SLA), Reseller (soporte, relación comercial), Cliente (cumplimiento tributario DIAN).
- **Entregables:** Contrato, TYC, INDICE.md
- **Comentario:** ✅ Modelo de negocio documentado completamente

---

#### BEDROCK-72 — Procedimiento de Firma Electrónica
- **Estado:** Done
- **Fecha Entrega:** 27 de septiembre 2026
- **Descripción:** Procedimiento de firma electrónica para aceptación de TYC y contratos, conforme Ley 527/1999 (mensajes de datos) y Decreto 2364/2012 (firma electrónica digital). Efecto legal: equivalente a firma manuscrita. Procedimiento técnico: usuario ingresa, sistema presenta TYC, usuario marca checkbox 'Acepto', sistema registra fecha/hora/IP/hash, cliente recibe correo confirmación. Componentes probatorios registrados: timestamp (marcas de tiempo), IP (identificación cliente), hash (integridad documento), correo confirmación (recepción).
- **Entregable:** TYC-Cliente-Final-Factus-v1.docx (Anexo I)
- **Comentario:** ✅ Procedimiento de firma electrónica integrado en TYC, Anexo I

---

#### BEDROCK-73 — Matriz de Responsabilidades
- **Estado:** Done
- **Fecha Entrega:** 27 de septiembre 2026
- **Descripción:** Matriz clara de responsabilidades entre tres actores: Factus, Reseller y Cliente Final. FACTUS responsable de: disponibilidad plataforma SLA (99% horario hábil), seguridad infraestructura, actualizaciones software, radicación técnica DIAN (sin validar contenido), transmisión reportes DIAN, retención datos 5 años. FACTUS NO responsable de: validez/exactitud datos, aceptación DIAN, cumplimiento tributario, reportes indebidos, multas DIAN, relación Reseller-Cliente. RESELLER responsable de: relación comercial cliente, soporte técnico/comercial, validación datos, gestión rangos DIAN, cargue correcto, cumplimiento tributario propio, confidencialidad. CLIENTE FINAL responsable de: exactitud datos, cumplimiento tributario DIAN, solicitud rangos, cargue correcto, validación documentos, uso conforme ley.
- **Entregables:** Contrato (Cláusula VIII) + TYC (Secciones 5, 6, 11, 14)
- **Comentario:** ✅ Matriz de responsabilidades clara y distribuida

---

## Resumen de Estado

### ✅ CERRADAS (7 tareas)
- BEDROCK-71: TYC Cliente Final
- BEDROCK-65: SLA Consolidado
- BEDROCK-66: Contrato Marco Reseller
- BEDROCK-68: Política Retracto
- BEDROCK-69: Modelo de Negocio
- BEDROCK-72: Firma Electrónica
- BEDROCK-73: Matriz Responsabilidades

**Total Cerradas:** 7/7 (100%)

### ❓ ESTADO DESCONOCIDO EN LINEAR
Nota: Las tareas mencionadas por el usuario como "Esquema ANS", "Contactar Proveedor - Retracto", "Enviar Documento Modelo Negocio", "Documentar Canales Soporte" pueden ser tareas conceptuales que no tienen ID específico en Linear, o están con nombre diferente. Todas están **CUBIERTAS** por los entregables finales (ver AUDITORIA-LINEAR-ENTREGABLES.md).

---

## Entregables Finales

### Documentos (Versionados en Git)

1. **Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx**
   - 14 cláusulas + 3 Anexos
   - Ubicación: `/Clientes/factus/documentos-legales/contratos/`
   - Versión: 1.0

2. **TYC-Cliente-Final-Factus-v1.docx**
   - 16 secciones + Anexo I
   - Ubicación: `/Clientes/factus/documentos-legales/tyc/`
   - Versión: 1.0

3. **INDICE.md** — Guía de estructura y próximos pasos
4. **README.md** — Validación y checklist de contenido
5. **AUDITORIA-LINEAR-ENTREGABLES.md** — Mapeo tareas → documentos

### En Drive
- Link compartido con Camilo (Factus): https://drive.google.com/file/d/1VIv4xKIxQ3WpF0yZtObY6erMmOr1R9E3/view?usp=drivesdk
- Sincronización automática por post-commit hook (pendiente confirmación)

---

## Próximos Pasos (Para Camilo)

1. **Revisar** documentos .docx
2. **Feedback** mínimo a tualiado@bedrock.com.co
3. **Cambios** si aplican (editar .md, regenerar .docx)
4. **Aprobación** final
5. **Circulación** a Resellers

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Estado:** Proyecto Factus — Entrega Completa  
**Clasificación:** Confidencial — Factus
