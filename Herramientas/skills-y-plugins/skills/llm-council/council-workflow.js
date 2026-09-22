export const meta = {
  name: 'llm-council',
  description: 'Consejo de modelos Claude: opiniones independientes -> revisión anónima con ranking -> síntesis del Presidente. Adaptación de karpathy/llm-council.',
  phases: [
    { title: 'Primeras opiniones', detail: 'cada miembro responde por separado' },
    { title: 'Revisión', detail: 'revisión cruzada anónima + ranking' },
    { title: 'Presidente', detail: 'síntesis de la respuesta final' },
  ],
}

// La pregunta llega por args (string) o {question}
const QUESTION = typeof args === 'string' ? args : (args && args.question) || ''
if (!QUESTION) throw new Error('llm-council: falta la pregunta en args')

// --- Configuración del consejo ---
// "Asientos" del consejo: distintos modelos Claude como miembros (diversidad por nivel de modelo)
const COUNCIL = [
  { seat: 'A', model: 'opus' },
  { seat: 'B', model: 'sonnet' },
  { seat: 'C', model: 'fable' },
  { seat: 'D', model: 'haiku' },
]
const CHAIRMAN = 'opus'

const RESEARCH_NOTE =
  'Si la consulta requiere datos actuales, normativos, cifras o hechos externos, usa WebSearch/WebFetch y CITA las fuentes. Responde en el idioma de la consulta.'

// ---------- Etapa 1: Primeras opiniones (independientes) ----------
phase('Primeras opiniones')
const rawOpinions = await parallel(COUNCIL.map(m => () =>
  agent(
    `Eres un miembro de un consejo de expertos. Responde de forma completa, rigurosa y bien razonada a la siguiente consulta. No te limites: aporta tu mejor análisis.\n\n${RESEARCH_NOTE}\n\n=== CONSULTA ===\n${QUESTION}`,
    { label: `opinión ${m.seat}`, phase: 'Primeras opiniones', model: m.model }
  ).then(text => ({ seat: m.seat, model: m.model, text }))
))
const opinions = rawOpinions.filter(Boolean)
if (!opinions.length) throw new Error('llm-council: ningún miembro respondió')

// Anonimizar las respuestas para la etapa de revisión (Respuesta A, B, C, ...)
const letterOf = i => String.fromCharCode(65 + i)
const anonBlock = opinions
  .map((o, i) => `--- Respuesta ${letterOf(i)} ---\n${o.text}`)
  .join('\n\n')

// ---------- Etapa 2: Revisión anónima + ranking ----------
phase('Revisión')
const reviews = (await parallel(COUNCIL.map((m, idx) => () =>
  agent(
    `Eres un miembro de un consejo de expertos. Abajo están, de forma ANÓNIMA, las respuestas de todos los miembros (posiblemente incluida la tuya) a esta consulta.\n\n=== CONSULTA ===\n${QUESTION}\n\n=== RESPUESTAS ANÓNIMAS ===\n${anonBlock}\n\nEvalúa cada respuesta por su EXACTITUD y su PROFUNDIDAD/INSIGHT. Señala errores, sesgos u omisiones concretas. Termina con un RANKING de mejor a peor (Respuesta ${opinions.map((_, i) => letterOf(i)).join(', ')}) y una justificación breve por posición.`,
    { label: `revisión ${m.seat}`, phase: 'Revisión', model: m.model }
  )
))).filter(Boolean)

// ---------- Etapa 3: Presidente sintetiza ----------
phase('Presidente')
const opinionsBlock = opinions
  .map((o, i) => `--- Respuesta ${letterOf(i)} (miembro ${o.seat}, ${o.model}) ---\n${o.text}`)
  .join('\n\n')
const reviewsBlock = reviews
  .map((r, i) => `--- Revisión ${i + 1} ---\n${r}`)
  .join('\n\n')

const final = await agent(
  `Eres el PRESIDENTE (Chairman) de un consejo de expertos. Tienes (1) las respuestas individuales de los miembros y (2) las revisiones cruzadas y rankings que hicieron entre sí de forma anónima. Produce UNA sola respuesta final, la mejor posible: integra lo más sólido de cada respuesta, corrige los errores señalados en las revisiones, resuelve las discrepancias con criterio propio y no repitas contenido redundante. Sé completo pero claro y bien estructurado. Si hubo investigación, conserva las citas de fuentes. Responde en el idioma de la consulta.\n\n=== CONSULTA ===\n${QUESTION}\n\n=== RESPUESTAS DE LOS MIEMBROS ===\n${opinionsBlock}\n\n=== REVISIONES CRUZADAS ===\n${reviewsBlock}`,
  { label: 'presidente', phase: 'Presidente', model: CHAIRMAN }
)

log(`Consejo finalizado: ${opinions.length} opiniones, ${reviews.length} revisiones.`)
return { final, opinions, reviews }
