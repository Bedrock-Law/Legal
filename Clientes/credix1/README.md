# EHOLDINGS FLORIDA S.A.S. (CREDIX1): índice interno

Cliente: EHOLDINGS FLORIDA S.A.S., sigla CREDIX1 S.A.S. Socios: Lawrence Soto Borja (representante y accionista) y Camilo [apellido por confirmar]. Tarea en Linear: BEDROCK-45.

## Paquete vigente (versión 2.0, 5 de octubre de 2026)

| N.º | Documento | Fuente | Render |
|---|---|---|---|
| 1 | Guía de entrega y puesta en marcha | `conceptos-juridicos/Guia-Entrega-Puesta-en-Marcha-CREDIX1.md` | PDF |
| 2 | Concepto jurídico de viabilidad | `conceptos-juridicos/Concepto-Juridico-CREDIX1.md` | PDF |
| 3 | Contrato del cliente | `documentos-legales/contratos/Contrato-Cliente-CREDIX1.md` | PDF y Word |
| 4 | Política de tratamiento de datos personales | `documentos-legales/compliance-kyc/Politica-Tratamiento-Datos-CREDIX1.md` | PDF y Word |
| 5 | Contratos con aliados | `documentos-legales/contratos/Contrato-Garantia-Control-Coopcentral-CREDIX1.md` y `Contrato-Emision-BIN-Procesamiento-CREDIX1.md` | `Contratos-Aliados-CREDIX1.pdf` (los dos unidos) y un Word por contrato |
| 6 | Manual de operación y cumplimiento | `documentos-legales/compliance-kyc/Manual-Operacion-Cumplimiento-CREDIX1.md` | PDF y Word |

Los diagramas del manual se editan en los `.mmd` de `documentos-legales/compliance-kyc/` y se renderizan con `mmdc` (Mermaid); el PNG es el render.

## Fuera del paquete

- `propuesta-comercial/`: presentación comercial. Tiene contradicciones con el paquete, listadas en la sección 7 de la guía; no se usa ante terceros sin corregirla.
- `investigacion/`: transcripción de la reunión del 26 de junio de 2026.

## Versiones anteriores

- `versiones-anteriores/paquete-2026-09/`: los quince documentos y diagramas del paquete de septiembre, reemplazados por la versión 2.0.
- `versiones-anteriores/consolidado-en-contrato-marco/`: términos y condiciones, contrato de línea de crédito, pagaré y DACA antes de unirse en el Contrato Marco del 14 de septiembre.
- `versiones-anteriores/refocalizacion/`: matriz de riesgos y manual de centrales anteriores a la refocalización del 14 de septiembre.
- `versiones-anteriores/PRESENTACION-COMERCIAL-CREDIX1-v1.pdf` y `ACTUALIZACIONES-LINEAR-CREDIX1.md`.

## Render

PDF con `Herramientas/skills-y-plugins/skills/estilo-bedrock-pdf/assets/build-pdf.sh` y Word con `estilo-bedrock-docs/assets/build-docx.sh`. Cada fuente lleva en su encabezado un bloque `header-includes` que evita títulos al pie de página en el PDF; el Word lo ignora. El PDF de contratos con aliados se arma con `pdfunite` a partir de los PDF de cada contrato.
