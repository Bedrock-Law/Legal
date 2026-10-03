---
name: llm-council
description: Council of models for hard/complex/research questions. Sends the question to several Claude model "seats" independently, has them anonymously peer-review and rank each other, then a Chairman synthesizes one best final answer. Use for complex reasoning, research, high-stakes legal or regulatory analysis, or any question where a single-model answer is risky. Adaptation of karpathy/llm-council (github.com/karpathy/llm-council) to the Claude Code environment.
---

# LLM Council (adaptación de karpathy/llm-council)

Metodología de "consejo de LLMs" para preguntas difíciles, de investigación o de alto riesgo. En vez de responder con un solo modelo, se convoca un consejo y se sintetiza la mejor respuesta.

## Cuándo usarlo
- Preguntas **complejas** o de **investigación** (análisis normativo, estrategia jurídica, decisiones de alto impacto, diseño de argumentos, comparación de opciones).
- Cuando una respuesta de un solo modelo sería riesgosa y conviene contraste y verificación cruzada.
- NO para tareas triviales, mecánicas o de una sola línea (sería desperdicio de tokens).

## Las 3 etapas (idénticas a llm-council)
1. **Primeras opiniones** — la pregunta se da a cada miembro del consejo por separado; se recogen sus respuestas.
2. **Revisión** — a cada miembro se le entregan las respuestas de los demás, **anonimizadas** (Respuesta A, B, C…) para que no haya favoritismos, y las evalúa por exactitud e insight, produciendo un **ranking**.
3. **Respuesta final (Presidente)** — el Presidente (Chairman) toma todas las respuestas y todas las revisiones/rankings y compila **una** respuesta final.

## Cómo ejecutarlo
Este skill orquesta el consejo con la herramienta **Workflow** (esta invocación del skill es la habilitación explícita para llamar a Workflow). Ejecuta:

```
Workflow({ scriptPath: "~/.claude/skills/llm-council/council-workflow.js", args: "<la pregunta / consulta completa, con todo el contexto necesario>" })
```

Si el skill quedó instalado en otra ruta, usa la ruta absoluta del `council-workflow.js` que está en esta misma carpeta.

- Pasa en `args` la pregunta **autocontenida** (incluye el contexto relevante; los miembros del consejo no ven la conversación).
- El workflow devuelve `{ final, opinions, reviews }`. Al usuario se le presenta **`final`** (la respuesta del Presidente). Ofrece mostrar las opiniones individuales o el detalle de las revisiones si el usuario lo pide.
- Para preguntas de **investigación**, los miembros usarán WebSearch/WebFetch y citarán fuentes (así está en el prompt).

## Configuración del consejo
Editable en `council-workflow.js`:
- `COUNCIL` — los "asientos" del consejo. Tres son modelos Claude (opus, sonnet, haiku). El asiento **C (fable)** es un **relay real hacia Gemini**: el subagente que lo ocupa no opina como Claude — ejecuta el CLI de `gemini` instalado en esta máquina y transcribe literalmente la respuesta de Gemini, sin parafrasear ni opinar por su cuenta.
- `CHAIRMAN` — modelo que sintetiza (por defecto `opus`).

### Requisitos del asiento Gemini
- CLI `gemini` instalado (`npm install -g @google/gemini-cli`).
- Clave en `~/.config/gemini-api-key` (permisos 600).
- `timeout` de GNU en el PATH (macOS no lo trae de fábrica; requiere `coreutils` de Homebrew).
- **Degradación grácil:** si el CLI no está disponible o la llamada falla, ese asiento responde `GEMINI_NO_DISPONIBLE` o `GEMINI_ERROR: ...` en vez de opinión, el consejo sigue con los otros tres miembros, y el workflow deja un `log()` explícito avisando la degradación — no falla en silencio.

## Diferencia con el original y opción de la app real
El `llm-council` original usa **múltiples proveedores** (OpenAI, Google, Anthropic, xAI) vía **OpenRouter** y una **UI web** local (backend uv/Flask + frontend React). Esta adaptación corre en línea dentro de Claude Code: tres asientos son modelos Claude y el asiento C es Gemini real (vía CLI local, sin OpenRouter ni costo adicional de intermediario). Si se quiere la app original multi-proveedor completa (con más vendors y UI en el navegador), requiere: clonar el repo, `uv sync`, `npm install`, una **OPENROUTER_API_KEY** (de pago) y correr el servidor — es un montaje aparte que se usa fuera de este chat.
