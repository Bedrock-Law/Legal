# Documentación Legal Factus — Contrato Marco + TYC

## Entregables Completados

| Documento | Ubicación | Versión | Estado |
|-----------|-----------|---------|--------|
| Contrato de Prestación de Servicios (Resellers) | `contratos/` | v1.0 | ✅ Listo |
| Términos y Condiciones (Cliente Final) | `tyc/` | v1.0 | ✅ Listo |

## Contenido de Cada Documento

### 1. Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx

**Propósito:** Documento marco entre FACTUS y resellers que compran paquetes para revenderlos.

**Estructura:**
- Portada + Resumen Ejecutivo (p1)
- Bloque A (datos institucionales FACTUS) + Bloque B (identificación reseller, precio, fecha) — campos editables (p2)
- 15 cláusulas numeradas: Objeto, Vigencia, Valor/Pago, SLA, Obligaciones, Responsabilidad (limitada), Retracto, Terminación, Garantías, Confidencialidad, Solución Controversias, Cláusula Penal, Propiedad Intelectual
- Firmas (última página)
- 3 Anexos: SLA Detallado, Catálogo de Servicios, Política de Retracto

**Cláusulas Clave:**
- Responsabilidad ÚNICA Factus: disponibilidad plataforma conforme SLA
- NO responsable de: DIAN, reportes indebidos, cargue documentos cliente
- Retracto: 5 días desde firma (Ley 1480/2011 + Ley 2439/2024)
- SLA: 99% disponibilidad, tiempos por criticidad, penalizaciones por incumplimiento
- Campos editables (solo identificación, precio, fecha implementación)

**Campos a Diligenciar (Bloque B):**
- Nombre comercial reseller
- NIT reseller
- Representante legal
- Contacto
- Precio paquete
- Fecha implementación
- Fecha firma

### 2. TYC-Cliente-Final-Factus-v1.docx

**Propósito:** Términos y Condiciones para clientes finales de Factus (directo o a través de reseller).

**Estructura:**
- Portada + Resumen (p1)
- 16 secciones: Identidad FACTUS, Objeto, Condiciones Acceso, Prestación, Obligaciones Cliente, Responsabilidad (limitada), Datos Personales, Confidencialidad, Retracto, Terminación, Limitación Responsabilidad, Cambios TyC, Ley Aplicable, Seguridad, Contacto, Aceptación
- Anexo I: Procedimiento Aceptación Firma Electrónica

**Puntos Críticos:**
- FACTUS es canal tecnológico, NO asesor tributario
- Cliente responsable de validar datos, cumplimiento tributario, cargues ante DIAN
- Retracto: 5 días desde firma, NO aplica si documentos ya emitidos (Ley 1480/2011)
- Disponibilidad: 99% horario hábil (no incluye fines de semana, festivos, mantenimiento programado)
- Datos: retención 5 años (obligación DIAN), luego destrucción

**Aceptación:** Firma electrónica conforme Ley 527/1999 + Decreto 2364/2012

---

## Base Normativa Aplicada

| Tema | Norma | Aplicación |
|------|-------|-----------|
| Retracto | Ley 1480/2011 art. 47-53 + Ley 2439/2024 | 5 días desde firma, NO aplica si servicio iniciado |
| Firma Electrónica | Ley 527/1999 + Decreto 2364/2012 | Aceptación válida a través de plataforma |
| Protección Datos | Ley 1581/2012 + Decreto 1377/2013 | Tratamiento, retención, destrucción |
| Autorización Factus | Resolución DIAN 000165/2023 + Oficio DIAN 13246/2025 | Factus autorizado como Facturador Electrónico |
| Prevención LA/FT | Ley 1960/2019 | Verificación identidad, prohibición PEP |

---

## Validación Completada

### ✅ Contenido Legal

- [x] Responsabilidad Factus limitada a disponibilidad SLA
- [x] NO responsable por: DIAN, reportes indebidos, cumplimiento tributario cliente
- [x] Retracto 5 días conforme Ley 1480/2011 + Ley 2439/2024
- [x] SLA detallado con tiempos y penalizaciones
- [x] Confidencialidad y datos personales (Ley 1581/2012)
- [x] Terminación con causales claras

### ✅ Estructura Contrato Reseller

- [x] Página 1: Resumen ejecutivo
- [x] Página 2: Bloque A (datos Factus) + Bloque B (campos editables: reseller, precio, fecha)
- [x] Páginas 3+: 15 cláusulas numeradas (marco, 100% cerrado)
- [x] Última: Firmas
- [x] Anexos: SLA (con matriz tiempos), Catálogo Servicios, Política Retracto

### ✅ Estructura TYC Cliente Final

- [x] Identidad Factus clara
- [x] Objeto y alcance servicios
- [x] Obligaciones cliente (validación datos, cumplimiento tributario)
- [x] Responsabilidad Factus limitada
- [x] Retracto 5 días (no aplica si documentos emitidos)
- [x] Datos personales conforme Ley 1581/2012
- [x] Aceptación por firma electrónica

### ✅ Redacción

- [x] Texto técnico, directo, sin rodeos
- [x] Sin señales de escritura de IA (humanizar-texto aplicado)
- [x] Vocabulario claro: "es" en vez de "constituye"; "tiene" en vez de "ostenta"
- [x] Sin paralelismos negativos ni regla de tres por inercia
- [x] Tablas bien estructuradas
- [x] Negrilla solo en títulos y subtítulos

### ✅ Formato Word

- [x] Portada con YAML (título, eyebrow, lede, doctype, docdate, docscope)
- [x] Membrete con logotipo Bedrock
- [x] Paginación automática ("Página X de Y")
- [x] Tipografía: Montserrat (títulos), Tinos (cuerpo)
- [x] Paleta: Primario #1B1D36, Secundario #224D6E, Acento #E9CDA5

---

## Próximos Pasos

### Antes de Uso Operativo

1. **Revisión jurídica interna:** Camilo (Factus) revisa ambos documentos
2. **Ajustes de datos:** Factus confirma:
   - Horarios exactos soporte (sustituir [número] en TYC)
   - Canales soporte (WhatsApp, email, teléfono)
   - Tiempos SLA confirmados
3. **Instalación Montserrat + Tinos:** Usuarios instalan tipografías desde `/Users/juanma/.claude/skills/estilo-bedrock-docs/assets/fonts/` para render fiel en Word
4. **Prueba en ambiente sandbox:** Diligenciar Bloque B (un reseller de prueba), generar, firmar
5. **Publicación:**
   - Contrato Reseller: Sitio web Factus o portal resellers
   - TYC Cliente Final: Plataforma Factus (aceptación obligatoria antes de usar)

### Cambios Futuros (Versión 2.0)

- Incorporar retroalimentación de Camilo y resellers
- Ajustar tiempos SLA si operación lo requiere
- Incluir procedimiento de escalado (si SLA es incumplido 3 veces)
- Plantilla de anexos adicionales (integración API, capacitación, etc.)

---

## Artefactos Generados (Sesión 27 Sept 2026)

| Artefacto | Ubicación | Formato | Observaciones |
|-----------|-----------|---------|---|
| Contrato Marco Reseller | `contratos/` | .docx v1.0 | Plantilla editable; campos editables Bloque B |
| TYC Cliente Final | `tyc/` | .docx v1.0 | Listo para publicar en plataforma |
| Markdown fuente (Contrato) | scratchpad (sesión) | .md | Fuente de verdad; control de cambios futuro |
| Markdown fuente (TYC) | scratchpad (sesión) | .md | Fuente de verdad; control de cambios futuro |
| Deep-research | [reporte fork] | .txt | Hallazgos: Ley 1480/2011, Resolución DIAN, Oficio 13246/2025 |

---

## Control de Versiones

| Versión | Fecha | Cambios | Responsable | Estado |
|---------|-------|---------|-------------|--------|
| 1.0 | 27 sep 2026 | Inicial: Contrato Marco Reseller + TYC Cliente Final | Juan Manuel (Bedrock) | Entregado |
| 1.1 | [fecha] | [cambios tras revisión Camilo] | [responsable] | Pendiente |
| 2.0 | [fecha] | [mejoras operativas] | [responsable] | Pendiente |

---

## Contactos Clave

- **Factus (Camilo):** camilo@halltec.co
- **Bedrock (Juan Manuel):** tualiado@bedrock.com.co
- **Revisión jurídica:** [nombre abogado revisor]

---

**Documento preparado por:** Bedrock Abogados S.A.S.  
**Clasificación:** Confidencial — Factus  
**Fecha:** 27 de septiembre de 2026
