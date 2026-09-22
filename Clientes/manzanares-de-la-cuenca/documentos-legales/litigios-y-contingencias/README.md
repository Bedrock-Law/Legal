# Manzanares de la Cuenca P.H.

Cliente: Conjunto Residencial Manzanares de la Cuenca P.H., NIT 901.458.152-6, Envigado. Abogado a cargo: Juan Manuel Correa Muñoz, T.P. 331.671 del C.S.J.

## denuncia-penal-adriana-guevara

Denuncia penal contra la exadministradora Adriana María Guevara Velásquez (C.C. 43.559.630) por hechos ocurridos entre 2021 y 2025: falsedad en documento privado (art. 289 C.P.), abuso de confianza calificado (arts. 249 y 250 núm. 3), administración desleal (art. 250B) y hurto (art. 239).

- `fuentes-cliente/`: los documentos originales aportados por el cliente (informes del tesorero, comunicaciones, contratos, actas, Gmail de soporte, auditoría contable forense, certificado de existencia de P.H. Al Día S.A.S.).
- `notebook-fuentes-y-chat/`: export completo del cuaderno de NotebookLM usado para estructurar el caso — las mismas 44 fuentes en texto plano más el chat íntegro de 10 turnos donde se construyeron el poder, la matriz de pruebas, la tasación de perjuicios, los hechos jurídicamente relevantes y el listado de consejeros involucrados.
- `poder-firmado/`: poder especial notariado el 2026-08-28 (Notaría Primera de Itagüí / Notaría Primera de Envigado), otorgado por Blanca Muñoz Álvarez (administradora actual) a favor de Juan Manuel Correa Muñoz. Consta que la denuncia ya fue formalizada para radicación.
- `borradores-bedrock/`: el escrito de denuncia y el modelo de poder generados por IA durante la sesión de NotebookLM, más el ejemplo ilustrativo de un tercero (`DENUNCIA_PENAL_V6`) que se usó solo como referencia de formato — no es un documento del caso.
- `notas-reunion/`: notas de la reunión del 2026-08-29.

Pretensión penal directa: $104.339.504. Detrimento patrimonial global (vía civil / incidente de reparación integral): $304.276.306. Consejeros señalados como coadministradores: Margarita Cárdenas, Camilo Giraldo Soto, Carmen Elisa Vargas, Claudia Beatriz Ibarra, John Jairo Torres, y los "consejeros veedores" no elegidos Andrés Roldán y Óscar Sánchez.

Punto abierto sin resolver en el chat: si se redacta el capítulo de coautoría/complicidad para Cárdenas y Giraldo.

Adriana María Guevara Velásquez también administró Propiedad Horizontal Misisipi, donde a partir de 2026-09-02 Bedrock evalúa una segunda denuncia por hechos del mismo tipo — falsificación de facturas y de actas de consejo, pagos por trabajos ya ejecutados por otros proveedores. Ver `Clientes/ph-misisipi/propuesta-comercial/`. Aporta patrón de conducta en más de una copropiedad, útil para la denuncia penal de este caso.

## Consolidado de control de versiones

| Versión | Fecha | Cambios | Estado |
|---|---|---|---|
| v1 | 2026-09-01 | Creación de la carpeta del caso. Consolidación de fuentes desde `NotebookLM_Manzanares_fuentes_y_chat.zip`, `fwddocumentosparaabogadodemandaadministradorayconsej.zip` y sueltos de Descargas. Deduplicación por checksum de archivos repetidos (`documentaciondemandamanzanares/`, `PDF ABOGADO-CXP MANZANA (1).pdf`). | Vigente |
| v2 | 2026-09-02 | Se añade referencia cruzada al prospecto Propiedad Horizontal Misisipi, también administrado por Adriana Guevara. | Vigente |
