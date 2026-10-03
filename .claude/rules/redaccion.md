# Redacción

Ningún texto reproduce las señales de escritura de IA de
[Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing):
vocabulario delator ("momento decisivo", "pilar fundamental", delve/tapestry/
pivotal en inglés), rodeos del verbo ser, paralelismos negativos ("no solo X
sino Y"), regla de tres por inercia, gerundios que simulan análisis al cierre
de una frase, cierres de plantilla, atribuciones vagas, garantías enlatadas
("preservé toda la información"), negrilla mecánica sobre cada término.
Negrilla solo en títulos y subtítulos. Títulos sin mayúscula en cada palabra.

# Marcas invisibles

Todo entregable —documentos, correos, mensajes, código, respuestas— se depura
con `Herramientas/limpiar_marcas.py <archivo>` antes de renderizarlo o
compartirlo: caracteres invisibles Unicode (U+00AD, U+200B–200F, U+202A–202E,
U+2060–2069, U+FEFF, selectores de variación, tag chars) y espacios no
estándar, normalizados a espacio corriente.
