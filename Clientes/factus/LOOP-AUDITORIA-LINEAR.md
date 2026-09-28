---
title: "Loop de Auditoría Linear — Factus"
eyebrow: "Protocolo de validación para tareas de cliente"
lede: "Checklist iterativo que asegura que cada tarea en Linear esté redactada de cara al cliente, sin señales de IA y describiendo claramente el trabajo realizado."
doctype: "Protocolo de auditoría"
docdate: "27 de septiembre de 2026"
docscope: "Interno — Bedrock"
docname: "Loop-Auditoria-Linear-Factus"
---

# Loop de Auditoría Linear — Factus

## Propósito

Verificar que todas las tareas en Linear dedicadas a Factus cumplan con cuatro criterios:

1. **Customer-facing.** Redactadas de cara al cliente. Mencionan Factus, servicios, DIAN, responsabilidades, no la máquina.
2. **/humanizar-texto aplicado.** Sin vocabulario delator, paralelismos negativos, ni patrones de escritura de IA.
3. **Sin señales de IA.** No exponen herramientas internas, rutas de archivo, procesos, o decisiones técnicas del desarrollo.
4. **Describen el trabajo.** Cada descripción explica qué se investigó, qué se documentó, qué se consideró, cuál fue el resultado.

---

## Ciclo de Auditoría

### Triggers

Se ejecuta el loop cuando:

- **Nuevo commit en `PLAN-REESCRITURA-LINEAR.md`** — cambio de descripción de alguna tarea.
- **Antes de cerrar una tarea** — confirmación de que está lista para cliente.
- **Revisión periódica mensual** — 1 de cada mes, todas las tareas abiertas + cerradas.

### Ejecución

1. **Listar todas las tareas Factus en Linear**
   ```bash
   orca linear list --json
   ```
   Filtrar por nombre que contenga "Factus" o por proyecto "BEDROCK".

2. **Para cada tarea, extraer descripción**
   ```
   Tarea: BEDROCK-XX
   Descripción: [texto actual]
   ```

3. **Aplicar 4 tests de validación**

#### Test 1: Customer-facing

**Pregunta:** ¿Se menciona a Factus, servicios, cliente, DIAN, regulación?

**Palabras clave esperadas:** Factus, DIAN, cliente, reseller, servicio, plataforma, disponibilidad, responsabilidad, retracto.

**Palabras clave a evitar:** Claude, agente, script, fork, herramienta interna, Bedrock-Law, proceso, sesión.

**Resultado:** ✓ o ✗

#### Test 2: Sin herramientas internas

**Pregunta:** ¿Se menciona Claude, herramientas de desarrollo, rutas internas, o procesos?

**Frases a detectar:**
- "Claude, agente, script"
- "/humanizar-texto, /loop, /skill"
- "Bedrock-Law, bedrock-ia, bedrock.com.co"
- "hook, commit, rama, versionado"
- "/Users/juanma, /Clientes/factus, .md"

**Resultado:** ✓ o ✗

#### Test 3: Sin señales de IA (humanizar-texto)

**Vocabulario delator a detectar:**

- "momento decisivo", "pilar fundamental", "panorama en evolución"
- "un testimonio de", "enclavado en", "vibrante", "pivotal"
- "delve", "tapestry", "boasts", "showcasing"

**Patrones a detectar:**

- Paralelismos negativos: "no solo X sino Y", "no es X es Y"
- Regla de tres por inercia (3 adjetivos/ideas cuando 2 bastan)
- Gerundios de falso análisis al final: "destacando", "reflejando", "subrayando"
- Cierres de plantilla: "pese a sus logros, X enfrenta desafíos"

**Resultado:** ✓ o ✗

#### Test 4: Describe el trabajo realizado

**Pregunta:** ¿Explica qué se investigó, qué se documentó, cuál fue el resultado?

**Palabras clave esperadas:**
- Verbo de acción: "documentado", "integrado", "realizado", "procedimiento", "matriz"
- Resultado entregado: "entregables", "anexo", "sección", "cláusula"
- Consideraciones: "conforme", "responsabilidad", "SLA", "retracto", "firma"

**Resultado:** ✓ o ✗

---

## Matriz de Validación Rápida

| Tarea | Customer-facing | Sin interno | Sin IA | Describe trabajo | Veredicto |
|-------|-----------------|------------|--------|------------------|-----------|
| BEDROCK-71 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-65 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-66 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-68 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-69 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-72 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |
| BEDROCK-73 | ✓ | ✓ | ✓ | ✓ | ✅ PASA |

---

## Correcciones Aplicadas

### Sesión 27 septiembre 2026

**Hallazgo:** BEDROCK-69 no describía claramente el trabajo realizado.

**Original:**
```
Modelo de negocio B2B de Factus documentado en Contrato Marco y Manual de Activación...
```

**Problema:** Falta de palabras clave que describan qué se investigó, qué se documentó.

**Mejora:**
```
Modelo de negocio B2B de Factus documentado en Contrato Marco Reseller y Manual de Activación. 
Investigación realizada: autorización DIAN (Resolución 000165/2023, Oficio DIAN 13246/2025), 
estructura B2B2C, fases de activación (Contacto → Sandbox → Producción...). 
Responsabilidades clarificadas: Factus (disponibilidad SLA), Reseller (soporte...), 
Cliente (cumplimiento tributario DIAN). Entregables: Contrato-Prestacion-Servicios-Resellers-Factus-v1.docx, 
TYC-Cliente-Final-Factus-v1.docx...
```

**Resultado:** ✅ PASA después de mejora

---

## Cómo Usar Este Loop

### Opción 1: Auditoría manual (rápida)

Antes de cerrar una tarea o hacer commit:

1. Copia la descripción actual de la tarea en Linear
2. Recorre los 4 tests (ver matriz arriba)
3. Si hay fallo, edita la descripción y re-testa

### Opción 2: Auditoría con script (completa)

```bash
# Ejecutar auditoría sobre las 7 tareas Factus
python3 /Users/juanma/Documents/Bedrock\ IA/Herramientas/audit-linear-factus.py

# Script verifica contra 4 criterios y reporta hallazgos
```

### Opción 3: Auditoría periódica (mensual)

Primer día de cada mes:

1. Listar todas las tareas abiertas + cerradas en último mes
2. Aplicar 4 tests a cada una
3. Documentar hallazgos en este archivo (sección "Correcciones Aplicadas")
4. Reportar a Camilo si hay cambios importantes

---

## Checklist de Redacción para Nueva Tarea

Cuando se cree una nueva tarea en Linear que sea visible para Factus:

- [ ] ¿Menciona Factus, servicios, cliente o DIAN?
- [ ] ¿NO menciona Claude, scripts, rutas de archivo?
- [ ] ¿NO tiene vocabulario delator (momento decisivo, pilar fundamental)?
- [ ] ¿NO tiene paralelismos negativos (no solo...sino)?
- [ ] ¿Explica qué se investigó/documentó/realizó?
- [ ] ¿Menciona entregables concretos (documentos, anexos, conceptos)?
- [ ] ¿Está redactado en tono técnico, directo (es/tiene, no ostenta/constituye)?

Si todos son SÍ → tarea lista para cliente.

---

## Contactos

- **Bedrock (auditoría):** tualiado@bedrock.com.co
- **Factus (revisión cliente):** camilo@halltec.co

---

## Control de Versiones

| Versión | Fecha | Cambios | Estado |
|---------|-------|---------|--------|
| 1.0 | 27 sep 2026 | Inicial: 4 criterios, matriz de 7 tareas, script de auditoría | ✅ Activo |
| 1.1 | [fecha] | [cambios por experiencia operativa] | ⏳ Pendiente |

---

**Protocolo preparado por:** Bedrock Abogados S.A.S.  
**Clasificación:** Interno — Factus  
**Última revisión:** 27 de septiembre de 2026
