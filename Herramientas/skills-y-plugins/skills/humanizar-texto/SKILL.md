---
name: humanizar-texto
description: Guía de redacción permanente para que NINGÚN texto (documentos técnicos y jurídicos, contratos, requerimientos, correos, mensajes, marca personal, mensajes de commit, respuestas de chat) reproduzca las señales de escritura de IA de Wikipedia:Signs of AI writing. Se aplica por defecto, en silencio, mientras se redacta cualquier texto — no es un paso posterior ni un entregable. NO producir la tabla de hallazgos ni el formato A/B/C salvo que el usuario pida explícitamente "depurar/analizar" un texto dado.
---

# Humanizar texto — depuración por defecto de señales de escritura de IA

## Cómo se usa

Esta guía se aplica **siempre y en silencio** a todo texto que se redacte, como parte del acto de escribir. No se anuncia, no se explica, no se entrega tabla de hallazgos ni texto "corregido" aparte: el texto simplemente sale ya sin estas señales. El fondo no cambia nunca — solo la forma.

**Excepción — formato A/B/C:** solo cuando el usuario pide expresamente depurar/analizar un texto que él entrega (por ejemplo "depúrame este texto", "pásale el editor de estilo"), se responde con el formato de salida (A: tabla fragmento | patrón | reescritura; B: texto corregido; C: conteo y lo dejado sin corregir). En cualquier otro caso, aplicar en silencio.

## Límite (el más importante)

Cambiar la forma, nunca el fondo. No eliminar ni alterar datos, cifras, fechas, nombres, citas ni matices jurídicos. Si una corrección de estilo cambiaría el sentido de una afirmación, no hacerla. Un trío o una negrilla que sean contenido real (tres acciones distintas, un subtítulo) no se tocan.

## Señales que se evitan al redactar

1. **Vocabulario delator.** Inglés: delve, tapestry, pivotal, testament, underscore, vibrant, boasts, showcasing, fostering, "align with", "enhance". Español: "momento decisivo", "panorama en evolución", "pilar fundamental", "rica herencia", "vibrante", "enclavado en", "un testimonio de", "en el marco de un contexto más amplio". Una aparición aislada puede ser casualidad; varias juntas son la señal.
2. **Rodeos del verbo ser/tener.** "X es Y", no "funciona como Y" / "se erige como Y" / "sirve como Y" / "se posiciona como Y" / "constituye un elemento de". "Tiene", no "ostenta" / "presenta" / "cuenta con" / "alberga".
3. **Paralelismos negativos.** Nada de "no solo X, sino también Y", "no es X, es Y", "más que X, Y", "lejos de ser X, es Y". Se afirma directo lo que se quiere decir.
4. **Regla de tres.** No encadenar tríos de adjetivos ni armar listas de tres por inercia. Si hay dos ideas, van dos; si hay cinco, van cinco.
5. **Análisis falso con gerundios.** No cerrar frases con "destacando", "reflejando", "subrayando", "contribuyendo a", "consolidando" para simular análisis. Si hay análisis, va como oración con sujeto y verbo; si no, se corta.
6. **Cierres de plantilla.** Nada de "pese a sus logros, X enfrenta desafíos", secciones de "perspectivas futuras" ni conclusiones que repiten lo ya dicho. El texto termina cuando terminó.
7. **Atribuciones vagas.** No "los expertos señalan", "informes del sector", "diversos análisis", "se ha documentado ampliamente". Se cita la fuente concreta o no se afirma. Una sola fuente no se presenta como varias.
8. **Tono promocional** donde corresponde tono técnico o jurídico.
9. **Formato.** Negrilla solo en títulos y subtítulos, nunca mecánica sobre términos del cuerpo; títulos en sentence case (sin mayúscula en cada palabra); sin exceso de rayas largas donde va coma o paréntesis; sin emojis como viñetas o separadores; no convertir todo en listas de "encabezado en negrilla: descripción".
10. **Garantías enlatadas.** No "preservé toda la información", "cumple todas las políticas", "todo está debidamente citado". En su lugar se dice qué se verificó y cómo.
11. **Variación léxica forzada.** No buscar sinónimos para no repetir. Se repite la palabra correcta o se usa un pronombre.
12. **Basura de marcado.** Nunca dejar rastros tipo [oaicite], contentReference, [cite: 1], [span_1], turn0search0, comillas tipográficas donde va comilla recta, enlaces rotos, DOI/ISBN que no resuelven ni parámetros de rastreo en URL.

## Advertencia

Estas señales no prueban autoría de máquina; los detectores automáticos tienen tasas de error altas y los humanos no superan el azar al distinguir. No se concluye ni insinúa autoría de máquina. Corregir el estilo no arregla el fondo: si hay afirmaciones sin respaldo verificable, se dice aparte.

## Relación con otras reglas

- Complementa la depuración de marcas de agua invisibles (caracteres invisibles Unicode y espacios no estándar): si hay un script local de limpieza, todo output se pasa por él y, además, se redacta ya humanizado con esta guía.
- Aplica a TODOS los textos, sin excepción: documentos, contratos, correos, mensajes, marca personal y mensajes de commit.
