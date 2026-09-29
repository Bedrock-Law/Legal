# Loop de verificación — documentos contractuales Factus

Protocolo de control que se corre sobre el Contrato Marco y los Términos y
Condiciones antes de considerarlos entregables. Nace de un riesgo concreto: la
versión 2 de ambos documentos se redactó tomando como modelo de estilo un
contrato de otra operación (Mono Colombia — Skyedge, servicios de pagos y
crédito). Un modelo de estilo arrastra contenido si nadie lo revisa.

El protocolo son cinco pruebas. Las tres primeras se automatizan con `grep`;
las dos últimas exigen lectura.

---

## Prueba 1 — Contaminación del modelo de estilo

Ningún rastro de la operación ajena puede sobrevivir en el documento de Factus.
Se busca y se exige cero coincidencias:

| Categoría | Términos |
|---|---|
| Identidad de las empresas del modelo | MONO, Skyedge, mono.la, cuentamono, skyedgesas |
| Personas y NIT del modelo | Poveda, Aranguren, 901.398.069, 901889110 |
| Partes mal nombradas | EL CONTRATANTE (en Factus la contraparte es RESELLER o CLIENTE) |
| Vocabulario de otro negocio | BANCO PROVEEDOR, nano-crédito, dispersión, fondeo, cartera, tasa de usura, captación ilegal |
| Normativa que no aplica | Ley 1266 de 2008 (centrales de riesgo) |

Se agrega un control que no proviene del modelo sino del proceso de redacción:
ninguna traza de asistencia automatizada puede quedar en el documento —
atribuciones de commit, nombres de herramientas, basura de marcado tipo
`[oaicite]` o `[cite:`.

### Punto que exige criterio, no regla

La mención de listas restrictivas (OFAC, PEP, UIAF) en la declaración de
prevención de lavado de activos **no es contaminación**. Es cláusula estándar
en contratación comercial colombiana y Factus tiene deber de debida diligencia
bajo la Ley 1960 de 2019. Se conserva.

La mención de la **Superintendencia Financiera** sí es un error de fondo.
Factus no es entidad vigilada por esa superintendencia. Las autoridades con
competencia sobre esta operación son la DIAN en lo tributario y la
Superintendencia de Industria y Comercio en protección al consumidor y datos
personales. Se corrigió en las tres apariciones.

---

## Prueba 2 — Cobertura de lo acordado

Verifica que el documento contenga lo que se definió en el kick off del 14 de
septiembre y en la reunión del 26 de septiembre con Camilo Hernández Reyes:

- Derecho de retracto, con Ley 1480 de 2011 y Ley 2439 de 2024, contado en
  días hábiles conforme al artículo 47.
- Certificados digitales y entorno de pruebas.
- Las dos modalidades comerciales: paquetes individuales y bolsa multifacturador.
- Firma electrónica, con Ley 527 de 1999 y Decreto 2364 de 2012.
- Protección de datos, con Ley 1581 de 2012.
- Prevención de lavado de activos, con Ley 1960 de 2019.
- Confidencialidad, canales de soporte y el rol del cliente final.
- Tabla de control de versiones y bloque de firmas.

---

## Prueba 3 — Niveles de servicio

El acuerdo de nivel de servicio es el núcleo de la obligación de Factus, porque
es lo único de lo que responde. Debe estar completo:

| Elemento | Valor exigido |
|---|---|
| Disponibilidad | 99% en horario hábil |
| Horario | Lunes a viernes, 8:00 a.m. a 6:00 p.m., hora de Colombia |
| Clasificación de incidentes | P1 a P4, con tiempo de respuesta y de resolución |
| Respuesta a incidente crítico | 30 minutos |
| Ventana de mantenimiento | Con preaviso de 48 horas |
| Indisponibilidad | Definida en el texto, no supuesta |

---

## Prueba 4 — Aplicabilidad a Factus

El documento debe hablar de Factus con precisión verificable:

NIT 901.724.254-1; domicilio en San Gil, Santander; representante legal Yolher
Camilo Albeiro Hernández Reyes; habilitación por Resolución DIAN 000165 de 2023
y Oficio DIAN 13246 de 2025; los cuatro servicios (facturación electrónica,
nómina electrónica, eventos Radian, documentos soporte); y los términos
definidos **FACTUS**, **RESELLER** y **CLIENTE FINAL** usados con consistencia.

---

## Prueba 5 — Limpieza

Sin caracteres invisibles Unicode (U+00AD, U+200B a U+200F, U+202A a U+202E,
U+2060 a U+2069, U+FEFF). Sin marcadores sin resolver. Los campos por
diligenciar van visibles y con corchetes, que es distinto de un marcador
olvidado.

---

## Ejecución

```bash
bash verificar_contrato_v2.sh <ruta-del-archivo.md>
```

Devuelve código de salida igual al número de fallas. Cero significa aprobado.
Los avisos no cuentan como falla: señalan pasajes que requieren lectura.

---

## Resultado de las corridas

| Documento | Fallas | Hallazgos |
|---|---|---|
| Contrato v1.0 | 2 | Ley 527 de 1999 ausente pese a invocar firma electrónica. Mención de Superintendencia Financiera. |
| Contrato v2.0 (primera corrida) | 3 | Lo anterior, más Ley 1266 de 2008 arrastrada del modelo. Atribución de commit al pie del documento. |
| Contrato v2.0 (tras corrección) | 0 | Aprobado. |
| TYC v1.0 | — | Retracto contado en días calendario (sección 9.1). Corregido en la v2.0. |

### Correcciones aplicadas al Contrato v2.0

1. Se eliminó la Ley 1266 de 2008 de la cláusula de datos personales y del
   listado de normativa aplicable. Regula bancos de datos de contenido
   crediticio y financiero; Factus no es fuente ni operador de información
   bajo esa ley.
2. Se agregó la Ley 527 de 1999 como fundamento de la firma electrónica, junto
   al Decreto 2364 de 2012, que la reglamenta. El documento citaba el decreto
   sin la ley.
3. Se reemplazó Superintendencia Financiera por Superintendencia de Industria
   y Comercio en sus tres apariciones.
4. Se eliminó una línea de atribución de commit al pie del documento.
5. Se agregó bloque de firmas con cláusula de perfeccionamiento por firma
   electrónica, que el documento no tenía.
6. Se agregó la tabla de control de versiones.

### Criterio fijado — plazo de retracto

El plazo de retracto se cuenta en **días hábiles**, no calendario. El artículo
47 de la Ley 1480 de 2011 dispone que "el término máximo para ejercer el
derecho de retracto será de cinco (5) días hábiles contados a partir de la
entrega del bien o de la celebración del contrato en caso de la prestación de
servicios". El plazo es de orden público y no admite pacto en contrario que lo
reduzca.

La v1.0 de ambos documentos contaba el término en días calendario, lo que lo
acortaba frente a lo que la norma concede. Se corrigió. La prueba 2 verifica
que ninguna mención del retracto quede contada en calendario.

---

## Control de versiones

| Versión | Fecha | Cambios | Estado |
|---|---|---|---|
| 1.0 | 28 de septiembre de 2026 | Protocolo inicial: cinco pruebas, aplicado al Contrato v2.0. | Vigente |

**Autor:** Bedrock Abogados S.A.S.
**Clasificación:** Interno — control de calidad documental
