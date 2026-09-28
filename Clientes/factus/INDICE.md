# Factus S.A.S. — Documentación Legal y Procesos

**NIT:** 901.724.254-1  
**Representante Legal:** Yolher Camilo Albeiro Hernández Reyes  
**Ubicación:** San Gil, Santander  
**Fecha de Inicio:** 21 de septiembre de 2026

---

## Estructura de Carpetas

```
Clientes/factus/
├── INDICE.md (este archivo)
├── documentos-legales/
│   ├── README.md (validación y próximos pasos)
│   ├── contratos/
│   │   ├── Contrato-Prestacion-Servicios-Resellers-Factus-v1.md ← EDITAR
│   │   └── Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx
│   └── tyc/
│       ├── TYC-Cliente-Final-Factus-v1.md ← EDITAR
│       └── TYC-Cliente-Final-Factus-v1.docx
└── [próximas carpetas según se necesite]
```

---

## Documentos Disponibles (v1.0)

### 1. Contrato de Prestación de Servicios (Resellers)

**Archivo:** `documentos-legales/contratos/Contrato-Prestacion-Servicios-Resellers-Factus-v1.md`

**Propósito:** Documento marco entre Factus y resellers que compran paquetes para revender.

**Estructura:**
- Portada + Resumen Ejecutivo
- Bloque A (datos institucionales Factus)
- Bloque B (campos editables por reseller: nombre, NIT, precio, fecha)
- 15 cláusulas numeradas
- 3 Anexos: SLA Detallado, Catálogo de Servicios, Política de Retracto
- Página de firmas

**Campos Editables (Bloque B):**
- Nombre comercial reseller
- NIT y representante legal
- Correo y teléfono
- Paquete adquirido (Individual / Bolsa Multifacturador)
- Precio mensual/anual
- Fecha de implementación
- Número de licencias iniciales

**Cláusulas Clave:**
- Responsabilidad ÚNICA Factus: disponibilidad plataforma conforme SLA
- NO responsable de: DIAN, reportes indebidos, cargue documentos cliente
- Retracto: 5 días desde firma (Ley 1480/2011 + Ley 2439/2024)
- SLA: 99% disponibilidad, tiempos por criticidad, penalizaciones

**Estado:** ✏️ Listo para correcciones

---

### 2. Términos y Condiciones (Cliente Final)

**Archivo:** `documentos-legales/tyc/TYC-Cliente-Final-Factus-v1.md`

**Propósito:** TYC marco para clientes finales que usan Factus directamente o a través de reseller.

**Estructura:**
- Portada + Resumen Ejecutivo
- 16 secciones temáticas
- Anexo I: Procedimiento de aceptación por firma electrónica
- Sin campos editables (documento cerrado)

**Secciones Clave:**
1. Identidad Factus (NIT, contacto, horarios)
2. Objeto y alcance (servicios incluidos)
3. Condiciones de acceso (requisitos para contratar)
4. Prestación de servicio (disponibilidad, certificados)
5. Obligaciones del Cliente (validación datos, tributación, cargues DIAN)
6. Responsabilidad Factus (limitada a disponibilidad SLA)
7. Protección de datos personales (Ley 1581/2012)
8. Confidencialidad (2 años post-terminación)
9. **Retracto: 5 días desde firma, NO aplica si documentos emitidos**
10. Terminación del servicio
11. Limitación de responsabilidad (exoneración por DIAN, reportes, cambios normativos)
12. Cambios en TyC (30 días notificación cambios mayores)
13. Ley aplicable: Colombia
14. Seguridad y responsabilidad del cliente
15. Contacto y soporte
16. Aceptación final (firma electrónica Ley 527/1999)

**Estado:** ✏️ Listo para correcciones

---

## Base Normativa Aplicada

| Norma | Artículos | Aplicación |
|-------|-----------|-----------|
| **Ley 1480/2011** | Art. 47-53 | Retracto 5 días en servicios |
| **Ley 2439/2024** | — | Reforma comercio electrónico (retracto servicios digitales) |
| **Ley 527/1999** | — | Mensajes de datos y firma electrónica |
| **Decreto 2364/2012** | — | Firma electrónica válida |
| **Ley 1581/2012** | — | Protección de datos personales |
| **Decreto 1377/2013** | — | Tratamiento datos personales |
| **Resolución DIAN 000165/2023** | — | Autorización software facturación |
| **Oficio DIAN 13246/2025** | — | Resellers exentos de re-autorización |
| **Ley 1960/2019** | — | Prevención lavado de activos |

---

## Próximos Pasos (Operativos)

### Inmediato (Antes de Usar)
1. **Revisar .md** — Tú haces correcciones
2. **Confirmar datos Factus** — Camilo valida números de contacto, horarios
3. **Instalar tipografías** — Montserrat + Tinos desde `/Users/juanma/.claude/skills/estilo-bedrock-docs/assets/fonts/`
4. **Prueba en sandbox** — Diligenciar Bloque B (reseller de prueba), firmar

### Antes de Publicar
5. **Revisión jurídica** — Camilo o abogado revisa
6. **Ajustes finales** — Cambios mínimos en .md, regenerar .docx
7. **Publicación** — Factus sube a web o portal resellers

### Futuro (Versión 2.0)
8. **Retroalimentación operativa** — Cambios de resellers/clientes reales
9. **Ajuste SLA** — Confirmar tiempos se cumplen
10. **Procedimientos adicionales** — Integración API, capacitación, escalonamiento

---

## Control de Versiones

| Versión | Fecha | Cambios | Responsable | Estado |
|---------|-------|---------|-------------|--------|
| 1.0 | 27 sep 2026 | Inicial: Contrato Marco + TYC | Juan Manuel (Bedrock) | ✏️ En revisión |
| 1.1 | [fecha] | Correcciones usuario | [responsable] | ⏳ Pendiente |
| 2.0 | [fecha] | Mejoras operativas | [responsable] | ⏳ Pendiente |

---

## Archivos por Tipo

| Documento | Tipo | Ubicación | Formato | Uso |
|-----------|------|-----------|---------|-----|
| Contrato Reseller | MD | `contratos/` | .md + .docx | Editar .md, regenerar .docx |
| TYC Cliente Final | MD | `tyc/` | .md + .docx | Editar .md, regenerar .docx |
| Validación | Documento | `documentos-legales/README.md` | .md | Referencia |

---

## Contactos Clave

- **Factus (Camilo Hernández):** camilo@halltec.co
- **Bedrock (Juan Manuel):** tualiado@bedrock.com.co
- **Abogado revisor:** [nombre, email]

---

## Notas Técnicas

- **Markdown como fuente de verdad:** Los `.md` son editables, los `.docx` son renders
- **Cambios futuros:** Edita `.md`, luego regenera `.docx` con `estilo-bedrock-docs`
- **Depuración de caracteres invisibles:** Script `Herramientas/limpiar_marcas.py` (si está instalado)
- **Control de cambios:** Mantén versionado en git, comments en Linear

---

**Preparado por:** Bedrock Abogados S.A.S.  
**Clasificación:** Confidencial — Factus  
**Fecha:** 27 de septiembre de 2026
