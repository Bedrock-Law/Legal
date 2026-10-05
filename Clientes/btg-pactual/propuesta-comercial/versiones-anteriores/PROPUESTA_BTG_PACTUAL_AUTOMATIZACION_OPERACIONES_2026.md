# Propuesta de servicios

## Automatización de procesos de operaciones de depósito de valores

**Para:** BTG Pactual S.A. Comisionista de Bolsa

**De:** Bedrock

**Fecha:** 8 de septiembre de 2026

**Vigencia:** 30 días

---

## 1. Antecedentes

BTG Pactual requiere optimizar los procesos operacionales relacionados con depósito de valores en DECEVAL mediante automatización asistida por inteligencia artificial. Actualmente, la gestión de documentación, validación y comunicación con DECEVAL demanda recursos manuales y es propensa a errores administrativos.

---

## 2. Alcance

Se propone un acompañamiento de tres meses para diseñar e implementar un flujo automatizado de operaciones que comprenda:

### 2.1 Diagnóstico e integración técnica

- Sesiones de trabajo con las áreas de Tecnología, Innovación y Riesgos para mapear flujos actuales
- Documentación de requisitos de depósito conforme normativa DECEVAL vigente
- Especificación técnica de puntos de integración con aplicativos internos de BTG
- Definición de controles y excepciones

### 2.2 Terminal de análisis para operador

Desarrollo de interfaz web que permita al analista designado:

- **Identificación de requerimientos:** Motor de consulta que ayude a clasificar la operación y señale documentación obligatoria según requisitos de DECEVAL (certificaciones del emisor, validación de títulos, características del valor)
- **Carga de documentos:** Interfaz de almacenamiento temporal y preprocesamiento (escaneo de formato, lectura de metadatos, validación de integridad de archivo) integrada con OneDrive/SharePoint mediante MCP para almacenamiento seguro y trazabilidad en el ecosistema Office 365 de BTG
- **Generación de acta de preaprobación:** Sistema que revise documentación cargada y genere acta indicando: documentos recibidos, documentos faltantes, errores detectados (valor nominal, numeración, inconsistencias entre certificación y título físico) y solicitud de correcciones. Los documentos se generan con estilo BTG mediante integración con Word MCP, permitiendo edición colaborativa nativa

### 2.3 Análisis y remisión

- **Documento de análisis final:** Consolidación de revisión documentaria con conclusión sobre completitud y conformidad con requisitos DECEVAL, generado en formato estilo BTG mediante Word MCP
- **Automatización de envío:** Remisión de análisis y documentación a DECEVAL mediante integración de Outlook MCP (redacción de correo automatizado, adjuntos, auditoría de envío). Notificaciones paralelas en Teams al equipo de operaciones

### 2.5 Infraestructura de integraciones Office 365

La solución se integra con el stack de Microsoft Office 365 que opera en BTG:

- **Outlook MCP:** Gestión de correos de operaciones especiales de DECEVAL. Envío automatizado de análisis, seguimiento de respuestas, gestión de excepciones desde la bandeja corporativa
- **OneDrive/SharePoint MCP:** Almacenamiento central de documentación cargada por analistas. Respaldo, versionado, sincronización entre equipos y acceso granular por rol
- **Word MCP:** Generación dinámica de documentos (actas, análisis final) con estilos BTG incorporados. Edición colaborativa, control de cambios integrado en Office
- **Excel MCP:** Registro de operaciones procesadas, trazabilidad de flujo, métricas de desempeño (tiempo de procesamiento, tasa de aprobación, tipos de error frecuentes). Análisis de datos con formatos nativos de Excel
- **Teams/Calendar MCP:** Programación de hitos (revisión, remisión, seguimiento con DECEVAL), alertas para operaciones pendientes, notificaciones en Teams a equipos de operaciones y riesgos

### 2.6 Estilo y branding BTG

- **Plantillas de documento:** Actas de preaprobación y análisis final basadas en identidad visual BTG Pactual (logo, paleta, tipografía, estructura) nativas en Word
- **Metadatos y auditoría:** Cada documento generado incluye metadatos de trazabilidad (analista, fecha, versión, estado de revisión) accesibles en Word y sincronizados en OneDrive para auditoría interna y conformidad regulatoria
- **Generador de estilos:** Motor de template que permite actualizar marca o estructura sin reprogramación. Versionado nativo en OneDrive/SharePoint

### 2.7 Auditoría y capacitación

- Sesión de prueba del flujo completo con el equipo operacional
- Capacitación en uso de terminal, integración con Office 365 (Outlook, OneDrive, Word, Excel, Teams) y procedimientos de excepción
- Documentación de procesos, guías de usuario y manual técnico de integraciones MCP
- Especificación de permisos y roles en Office 365 (qué puede hacer cada usuario en terminal, OneDrive, Outlook, Teams, Excel)

---

## 3. Metodología

### Fase 1: Inmersión (semanas 1–3)

- Entrevistas con Tecnología, Innovación y Riesgos
- Revisión de documentación operativa interna
- Consulta de normativa DECEVAL vigente y requisitos de depósito
- Mapeo de flujo as-is y definición de flujo to-be

### Fase 2: Construcción (semanas 4–8)

- Desarrollo de terminal con módulos de consulta, carga, análisis y generación de actas
- Integración con aplicativos internos (API, conectores, bases de datos según arquitectura BTG)
- Diseño de reglas de negocio y validación de documentos
- Pruebas internas y ajustes

### Fase 3: Piloto y cierre (semanas 9–12)

- Ejecución de operación de prueba end-to-end
- Correcciones derivadas del piloto
- Capacitación del equipo
- Documentación de procesos
- Handoff a operaciones

---

## 4. Conformidad regulatoria y seguridad

- Todas las integraciones con Office 365 operan bajo controles de acceso Microsoft Azure AD con scopes limitados (principio de menor privilegio). Cumplimiento con Conditional Access y MFA de BTG
- Cumplimiento con normas de superintendencia financiera respecto a custodia de documentación (respaldo, retención, auditoría). Integración con políticas de retención de OneDrive/SharePoint
- Trazabilidad completa de operaciones (quién accedió qué, cuándo, qué cambió). Auditoría de Office 365 nativa mediante Security & Compliance Center
- Integración con control de cambios nativo de Office (versioning en OneDrive, historial de revisiones en Word, logs en Excel)
- Encriptación en tránsito y en reposo mediante infraestructura Microsoft Azure. Cumplimiento con estándares ISO 27001, SOC 2 de Microsoft

---

## 5. Entregables

1. **Especificación técnica** de requisitos DECEVAL, flujo de operaciones e integraciones MCP con Office 365
2. **Terminal web** funcional con módulos de análisis, carga y generación de documentos
3. **Plantillas de documento** (actas, análisis final) con estilo BTG en Word, sincronizadas en OneDrive
4. **Configuración de integraciones MCP:** Outlook, OneDrive/SharePoint, Word, Excel, Teams/Calendar con permisos Azure AD y workflows
5. **Documentación de procesos** internos, manual de usuario y guía de administración de integraciones Office 365
6. **Sesión de capacitación** presencial o remota según disponibilidad de BTG
7. **Acta de cierre** con estado de sistemas, plan de mantenimiento y escalamiento futuro

---

## 6. Inversión

| Concepto | Valor |
|----------|-------|
| Acompañamiento, diseño e integración (3 meses, ~40h/sem) | Por confirmar |
| Desarrollo de terminal web y módulos de análisis | Por confirmar |
| Configuración de integraciones MCP y Google Workspace | Por confirmar |
| Diseño de plantillas y branding BTG | Por confirmar |
| Capacitación, documentación y cierre | Por confirmar |
| **Total (3 meses)** | **Por confirmar** |

Modelo de facturación: Acompañamiento de dedicación mensual + horas adicionales de soporte técnico post-implementación.

Los valores se detallarán en propuesta económica separada tras confirmación de alcance técnico con BTG.

---

## 7. Soporte y evolución posterior

Post-implementación, Bedrock ofrece (facturación separada):

- **Soporte técnico:** Resolución de incidencias, actualizaciones de integraciones MCP, mantenimiento de plantillas
- **Evolución:** Nuevos requisitos DECEVAL, ampliación de flujos (ej. liquidación, compensación), integraciones adicionales
- **Capacitación continua:** Nuevos usuarios, actualización de procedimientos

---

## 8. Condiciones

- **Dedicación:** Un profesional de Bedrock en jornada de 30–40 horas semanales durante 12 semanas
- **Acceso técnico:** BTG otorga acceso a sistemas internos, APIs, bases de datos necesarias para integración. Acceso administrativo a Office 365 (Outlook, OneDrive, SharePoint, Word, Excel, Teams, Azure AD)
- **Acceso informativo:** Documentación normativa interna, manual de procesos actual, lista de requisitos DECEVAL validada por BTG
- **Equipo de referencia:** Contactos designados en Tecnología, Innovación, Riesgos y Operaciones (disponibilidad mínima 4 horas/semana para sesiones de sincronización)
- **Comunicación:** Sesiones de trabajo semanales (2h) vía Teams + sesiones ad-hoc según necesidad
- **Entorno de desarrollo:** BTG proporciona o autoriza infraestructura para desarrollo, testing y staging (servidor de pruebas, ambiente aislado, tenant de pruebas en Office 365)
- **Alineación inicial:** Sesión de alineación en semana 1 para confirmar alcance técnico, requisitos exactos DECEVAL, estructura de roles y permisos en Office 365/Azure AD, fechas de hitos

---

## 9. Notas

- Esta propuesta se basa en normativa DECEVAL de acceso público y procesos de depósito documentados. Requisitos operacionales específicos de BTG Pactual serán confirmados en fase de inmersión
- El alcance de integración técnica con aplicativos internos se precisará tras revisión de arquitectura actual y sesión de alineación
- Los servidores MCP de Bedrock (Outlook, OneDrive, Word, Excel, Teams) operan con seguridad Azure AD/OAuth2 y se integran nativamente con infraestructura Office 365 de BTG
- Cambios de alcance durante ejecución serán facturados adicionalmente
- La terminal web es independiente del stack tecnológico actual de BTG (compatible con integraciones REST, webhooks, SSO corporativo vía Azure AD)

---

## Control de versiones

| Versión | Fecha | Cambios | Estado |
|---------|-------|---------|--------|
| 1.0 | 2026-09-08 | Propuesta inicial | Enviada |
