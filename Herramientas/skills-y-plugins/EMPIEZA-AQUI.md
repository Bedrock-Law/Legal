# Empieza aquí

Este paquete configura Claude Code en una máquina nueva con la identidad de Bedrock y la capacidad de generar PDF, Word y páginas web con ella.

## Los tres pasos

**1. Copia esta carpeta a tu directorio de usuario.**

La carpeta descomprimida se llama `configuracion-claude`. Muévela a `~/Juan Manuel/`:

```
mkdir -p ~/Juan\ Manuel
mv configuracion-claude ~/Juan\ Manuel/
```

Si prefieres otra ubicación, sirve igual: solo tendrás que decirle al asistente dónde quedó.

**2. Abre Claude Code en una sesión nueva.**

**3. Pégale el prompt.** Está al final de `INSTALACION-COMPLETA.md`, después de la línea que dice «El prompt». Cópialo tal cual y él hace el resto: diagnostica qué falta, instala, copia los skills, corre la prueba y te muestra el resultado.

Si prefieres hacerlo a mano, la misma guía tiene los seis pasos con cada comando.

## Qué hay en el paquete

| Archivo o carpeta | Qué es |
|---|---|
| `INSTALACION-COMPLETA.md` | La guía paso a paso y el prompt para el asistente |
| `CLAUDE-personal.md` | Instrucciones globales de trabajo. Se instala en `~/.claude/CLAUDE.md` |
| `reglas-de-linear.md` | Cómo manejar el gestor de tareas. No se instala: se le entrega cuando haga falta |
| `skills/bedrock-docs/` | El skill de documentos: plantillas, logotipo y los tres scripts |
| `skills/humanizar-texto/` | Que ningún texto salga con señales de escritura de máquina |
| `skills/llm-council/` | Consejo de modelos para preguntas complejas |
| `skills/INSTALAR.md` | Instalación de los skills, por si quieres hacerla suelta |
| `como-construir-mi-skill-de-marca.md` | Arquitectura del sistema de documentos, por si hay que rehacerlo |
| `orden-de-trabajo-skills-de-marca.md` | Orden de trabajo para construirlo desde cero con otra identidad |
| `plantilla-SKILL-estilo-propio.md` · `plantilla-SKILL-legal-docx-propio.md` | Los dos `SKILL.md` como referencia |

## Qué necesita la máquina

Programas que se instalan con Homebrew: pandoc, BasicTeX, LibreOffice, Poppler y Node. Más la librería Pillow de Python. La guía trae el comando de cada uno y el de verificación, en orden.

Sin pandoc y BasicTeX no hay PDF. Sin LibreOffice y Poppler no se puede revisar el render antes de entregar, que es una regla del sistema y no una recomendación.

## Advertencia

Este paquete contiene material propio: la identidad de la firma, sus plantillas y su logotipo. No lo subas a un servicio de nube. Muévelo en una llave o un disco.
