# Loop de verificación de redacción — documentos Factus

Control que se corre sobre el Contrato Marco y los Términos y Condiciones para
confirmar que ningún pasaje reproduce las señales de escritura de máquina
catalogadas en [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).

Verifica forma, no contenido. El control de exactitud normativa es otro
protocolo, documentado en [LOOP-VERIFICACION-DOCUMENTOS.md](LOOP-VERIFICACION-DOCUMENTOS.md).

El motivo no es estético. Un texto que se lee como salida de máquina pierde
autoridad ante quien lo recibe, y el propio catálogo advierte que ese estilo
suele acompañar el problema de fondo: afirmaciones sin respaldo verificable.

---

## Lo que el control verifica solo

Nueve familias de señales, todas con cero tolerancia:

| Familia | Qué busca |
|---|---|
| Vocabulario delator | "momento decisivo", "pilar fundamental", "panorama en evolución", "rica herencia", "vibrante", "enclavado en", "un testimonio de", "cabe destacar", "es importante resaltar". En inglés: delve, tapestry, pivotal, underscore, showcasing, fostering |
| Rodeos del verbo ser y tener | "se erige como", "funciona como", "sirve como", "se posiciona como", "constituye un elemento de", "ostenta", "alberga" |
| Paralelismos negativos | "no solo X sino Y", "lejos de ser X, es Y", "más que X, es Y" |
| Gerundios que simulan análisis | Cierres con ", destacando", ", reflejando", ", subrayando", ", contribuyendo a", ", garantizando así" |
| Atribuciones vagas | "los expertos señalan", "informes del sector", "según estudios", "la doctrina coincide" sin cita |
| Garantías enlatadas | "se preservó toda la información", "cumple todas las políticas", "debidamente citado", "de manera exhaustiva" |
| Cierres de plantilla | "pese a sus logros", secciones de perspectivas futuras, "en conclusión", "en definitiva" |
| Basura de marcado y tipografía | `[oaicite]`, `contentReference`, `[cite:`, comillas tipográficas donde va comilla recta, caracteres invisibles Unicode, emojis |
| Rastros de asistencia automatizada | Atribuciones de commit, nombres de herramientas, autorreferencias de modelo |

---

## Lo que el control reporta sin fallar

Tres puntos exigen criterio y se entregan como dato, no como falla:

**Densidad de negrilla.** En estos documentos la negrilla marca términos
definidos con función jurídica: **FACTUS**, **EL RESELLER**, **LOS SERVICIOS**,
**LA PLATAFORMA**. Eso es deliberado y necesario para la interpretación del
clausulado. Lo que hay que vigilar es negrilla sobre términos corrientes.

**Listas con encabezado en negrilla.** El catálogo desaconseja convertir todo
en "encabezado en negrilla: descripción". En un clausulado esa estructura tiene
función de navegación: quien busca una obligación concreta la ubica sin leer el
párrafo entero. El contrato tiene veinte; el criterio de conservarlas es del
abogado responsable.

**Títulos con mayúscula en cada palabra.** El control los cuenta y los lista.
No marca los títulos en mayúscula sostenida, que son convención del clausulado,
ni los nombres propios.

---

## Lo que ningún control automático detecta

Cuatro señales exigen lectura de un abogado:

- **Regla de tres.** Tríos de adjetivos o enumeraciones de tres armadas por
  inercia. Si hay dos ideas van dos; si hay cinco van cinco.
- **Variación léxica forzada.** Sinónimos buscados para no repetir. En un
  contrato es peligroso: cambiar la palabra sugiere cambiar el concepto. Se
  repite el término correcto o se usa un pronombre.
- **Tono promocional** donde corresponde tono jurídico.
- **Afirmaciones sin respaldo verificable.** Corregir el estilo no arregla el
  fondo.

---

## Ejecución

```bash
bash verificar-redaccion.sh <archivo.md>
```

El código de salida es el número de señales encontradas. Cero es aprobado. La
tabla de control de versiones se excluye del análisis, porque describe lo que
se corrigió y puede nombrar giros que el cuerpo ya no usa.

---

## Resultado de las corridas

| Documento | Señales automatizables | Títulos ajustados |
|---|---|---|
| Contrato v2.0 | 0 | 70 |
| TYC v2.0 | 0 | 0 |

Ninguno de los dos documentos tenía vocabulario delator, paralelismos
negativos, gerundios de cierre, atribuciones vagas ni garantías enlatadas.

### Lo que sí hubo que corregir

El contrato traía setenta títulos con mayúscula en cada palabra — "Objeto de
los Servicios", "Mora en el Pago y Suspensión Automática", "Naturaleza y
Ejecución de la Cláusula Penal". El TYC no tenía ninguno: se redactó desde el
principio con el estándar. Se pasaron todos a mayúscula solo en la primera
palabra, conservando siglas (SLA, DIAN, LA/FT), términos definidos (FACTUS,
EL RESELLER) y nombres propios (Radian, Colombia).

La conversión automática introdujo tres defectos que hubo que revisar a mano,
y que valen como advertencia para la próxima vez:

1. El numeral romano del ANEXO I se convirtió en minúscula, porque una letra
   sola no se distingue de una palabra corriente.
2. La conjunción "Y" de un título en mayúscula sostenida bajó a minúscula,
   porque ese título llevaba un paréntesis en minúsculas y dejó de parecer
   mayúscula sostenida.
3. "Cláusula Penal" conservó la mayúscula de "Penal" porque la palabra estaba
   en la lista de nombres propios pensando en "Código Penal". Ahí era adjetivo.

Un ajuste masivo de capitalización se revisa título por título después de
correrlo.

---

## Control de versiones

| Versión | Fecha | Cambios | Estado |
|---|---|---|---|
| 1.0 | 28 de septiembre de 2026 | Protocolo inicial: nueve familias de señales automatizadas, tres puntos de criterio y cuatro que exigen lectura. Aplicado al Contrato v2.0 y al TYC v2.0. | Vigente |

**Autor:** Bedrock Abogados S.A.S.
**Clasificación:** Interno — control de calidad documental
