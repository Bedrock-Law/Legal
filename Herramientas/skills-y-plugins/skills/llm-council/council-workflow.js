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
// "Asientos" del consejo: distintos modelos Claude como miembros (diversidad por nivel de modelo).
// El asiento 'fable' (C) es un RELAY real hacia Gemini (vía CLI local) en vez de opinar como Claude:
// el subagente que ocupa ese asiento no da su propia opinión, solo ejecuta el CLI de Gemini y
// devuelve la respuesta real de Gemini, sin parafrasear. Da diversidad cross-vendor genuina.
const COUNCIL = [
  { seat: 'A', model: 'opus' },
  { seat: 'B', model: 'sonnet' },
  { seat: 'C', model: 'fable', provider: 'gemini' },
  { seat: 'D', model: 'haiku' },
]
const CHAIRMAN = 'opus'

const RESEARCH_NOTE =
  'Si la consulta requiere datos actuales, normativos, cifras o hechos externos, usa WebSearch/WebFetch y CITA las fuentes. Responde en el idioma de la consulta.'

// Envuelve una tarea (instrucción + contenido) en instrucciones de RELAY puro hacia Gemini.
// El subagente que recibe esto NO debe opinar por su cuenta: solo ejecuta el CLI y transcribe.
const geminiRelayPrompt = (task) => `Eres un RELAY técnico. NO das tu propia opinión ni la de Claude. Tu única tarea es obtener la respuesta REAL de Gemini vía su CLI local y transcribirla tal cual.

Pasos:
1. Ejecuta con la herramienta Bash: \`command -v gemini\`
2. Si NO está disponible, responde exactamente (sin nada más): GEMINI_NO_DISPONIBLE
3. Si está disponible, escribe la tarea completa de abajo (marcador ===TAREA=== hasta el final) en un archivo temporal (Write tool o \`cat > /tmp/gemini-council-$$.txt <<'EOF' ... EOF\`), y ejecuta:
   \`GEMINI_API_KEY=$(cat ~/.config/gemini-api-key 2>/dev/null) GEMINI_CLI_TRUST_WORKSPACE=true timeout 180 gemini -p "$(cat /tmp/gemini-council-$$.txt)" --approval-mode=plan -o text -m gemini-2.5-flash 2>&1\`
4. La salida puede traer ruido del CLI (líneas tipo "Ripgrep is not available", reintentos "Attempt N failed with status 503", stack traces de retry). Es normal y no es la respuesta — Gemini reintenta solo y al final imprime el texto real. IGNORA ese ruido.
5. Si tras el timeout no hay ningún texto de respuesta real (solo ruido/errores), responde exactamente: GEMINI_ERROR: <resumen breve del error>
6. Si SÍ hay respuesta real de Gemini, devuélvela COMPLETA y LITERAL como tu texto de salida. No la resumas, no la comentes, no agregues tu propio análisis, no digas "Gemini respondió que...". Tu texto de salida ES la respuesta de Gemini, nada más.
7. Borra el archivo temporal al terminar.

===TAREA===
${task}`

// ---------- Etapa 1: Primeras opiniones (independientes) ----------
phase('Primeras opiniones')
const opinionTask = (m) => m.provider === 'gemini'
  ? geminiRelayPrompt(`Eres un miembro de un consejo de expertos. Responde de forma completa, rigurosa y bien razonada a la siguiente consulta. No te limites: aporta tu mejor análisis.\n\n${RESEARCH_NOTE}\n\n=== CONSULTA ===\n${QUESTION}`)
  : `Eres un miembro de un consejo de expertos. Responde de forma completa, rigurosa y bien razonada a la siguiente consulta. No te limites: aporta tu mejor análisis.\n\n${RESEARCH_NOTE}\n\n=== CONSULTA ===\n${QUESTION}`

const rawOpinions = await parallel(COUNCIL.map(m => () =>
  agent(
    opinionTask(m),
    { label: `opinión ${m.seat}`, phase: 'Primeras opiniones', model: m.model }
  ).then(text => ({
    seat: m.seat,
    model: m.provider === 'gemini' ? 'gemini-2.5-flash (vía relay)' : m.model,
    provider: m.provider || 'claude',
    degraded: m.provider === 'gemini' && /^GEMINI_(NO_DISPONIBLE|ERROR)/.test((text || '').trim()),
    text,
  }))
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
const reviewTask = (m) => {
  const base = `Eres un miembro de un consejo de expertos. Abajo están, de forma ANÓNIMA, las respuestas de todos los miembros (posiblemente incluida la tuya) a esta consulta.\n\n=== CONSULTA ===\n${QUESTION}\n\n=== RESPUESTAS ANÓNIMAS ===\n${anonBlock}\n\nEvalúa cada respuesta por su EXACTITUD y su PROFUNDIDAD/INSIGHT. Señala errores, sesgos u omisiones concretas. Termina con un RANKING de mejor a peor (Respuesta ${opinions.map((_, i) => letterOf(i)).join(', ')}) y una justificación breve por posición.`
  return m.provider === 'gemini' ? geminiRelayPrompt(base) : base
}

const reviews = (await parallel(COUNCIL.map((m, idx) => () =>
  agent(
    reviewTask(m),
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

const geminiSeat = opinions.find(o => o.provider === 'gemini')
if (geminiSeat?.degraded) {
  log(`Aviso: el asiento Gemini (seat ${geminiSeat.seat}) degradó — "${geminiSeat.text}". El consejo siguió con los demás miembros.`)
} else if (geminiSeat) {
  log(`Asiento Gemini (seat ${geminiSeat.seat}) respondió vía CLI real.`)
}

log(`Consejo finalizado: ${opinions.length} opiniones, ${reviews.length} revisiones.`)
return { final, opinions, reviews }
