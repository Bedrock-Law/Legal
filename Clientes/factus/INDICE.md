# Factus S.A.S. — documentación legal

**NIT:** 901.724.254-1
**Representante legal:** Yolher Camilo Albeiro Hernández Reyes
**Domicilio:** San Gil, Santander
**Inicio del encargo:** 21 de septiembre de 2026

---

## Estructura de carpetas

```
Clientes/factus/
├── INDICE.md (este archivo)
├── documentos-legales/
│   ├── contratos/
│   │   ├── Contrato-Prestacion-Servicios-Tecnologicos-Factus.md   ← fuente
│   │   ├── Contrato-Prestacion-Servicios-Tecnologicos-Factus.docx ← entregable
│   │   └── versiones-anteriores/
│   └── tyc/
│       ├── Terminos-y-Condiciones-Factus.md   ← fuente
│       ├── Terminos-y-Condiciones-Factus.docx ← entregable
│       └── versiones-anteriores/
└── proceso/
    ├── LOOP-VERIFICACION-DOCUMENTOS.md  (control normativo)
    ├── LOOP-VERIFICACION-REDACCION.md   (control de estilo)
    ├── verificar-documentos.sh
    ├── verificar-redaccion.sh
    └── (auditorías y planes de Linear)
```

El entregable no lleva sufijo de versión. La trazabilidad está en la tabla de
control de versiones al final de cada documento y en `versiones-anteriores/`.

---

## Entregables

### Contrato de prestación de servicios tecnológicos

Relación entre Factus y los resellers que compran paquetes para revender.
Veintiún cláusulas con numeración anidada, cuatro anexos (definiciones, nivel de
servicio, catálogo de servicios y política de retracto) y bloque de firmas.

Los datos del reseller van en el bloque de datos generales como campos por
diligenciar. El precio se fija por paquete contratado.

### Términos y condiciones de servicio

Contrato de adhesión para el cliente final, conforme al artículo 5 numeral 4 de
la Ley 1480 de 2011. Treinta y una cláusulas, con revisión completa contra el
listado de cláusulas abusivas del artículo 43. Sirve también para que el reseller
lo entregue a sus propios clientes finales, y por eso define la figura del
reseller.

Distingue entre el cliente que tiene la calidad de consumidor y el que no la
tiene. La mayoría de los clientes de Factus no la tienen, porque contratan el
servicio para su actividad económica.

---

## Delimitación de responsabilidad

Factus responde por la disponibilidad de la plataforma y por la transmisión
técnica de los documentos a la DIAN. La disponibilidad es obligación de medio;
la transmisión es obligación de resultado.

Factus no asume la calidad de contador público, revisor fiscal, abogado ni
auditor. No responde por el contenido de los documentos, que transmite tal como
el cliente los carga y sin verificar su veracidad; ni por las decisiones de
aceptación, rechazo o cambio de estado que adopte la DIAN; ni por el
cumplimiento tributario del cliente; ni por la conservación documental, que la
norma tributaria radica en el obligado a facturar.

---

## Base normativa

| Norma | Alcance |
|---|---|
| Ley 1480 de 2011, art. 5 num. 4 | Definición de contrato de adhesión |
| Ley 1480 de 2011, arts. 37 a 44 | Condiciones negociales generales y cláusulas abusivas |
| Ley 1480 de 2011, art. 47 | Derecho de retracto: cinco días hábiles |
| Ley 2439 de 2024, art. 3 | Modifica el art. 47: devolución en quince días calendario, sin descuentos |
| Ley 527 de 1999 | Mensajes de datos y firma digital |
| Decreto 2364 de 2012 | Firma electrónica, reglamentario del art. 7 de la Ley 527 |
| Ley 1581 de 2012 y Decreto 1377 de 2013 | Protección de datos personales |
| Ley 599 de 2000, arts. 323 y 345 | Lavado de activos y financiación del terrorismo |
| Ley 1564 de 2012 | Código General del Proceso |
| Código de Comercio, art. 884 | Intereses moratorios |
| Resolución DIAN 000165 de 2023 | Sistema de facturación electrónica |
| Resolución DIAN 000013 de 2021 | Documento soporte de pago de nómina electrónica |

### Citas retiradas por verificación

| Cita | Por qué se retiró |
|---|---|
| Ley 1960 de 2019 | Regula carrera administrativa y empleo público, no lavado de activos |
| Ley 1266 de 2008 | Regula bancos de datos de contenido crediticio; Factus no es fuente ni operador |
| Resolución DIAN 000019 de 2012 | No corresponde al régimen vigente de facturación |
| Resolución DIAN 1796 de 2014 | No corresponde al régimen de nómina electrónica |
| Decreto 1116 de 2013 | No es la norma de intereses moratorios |
| Concepto DIAN 13246 de 2025 | Trata los requisitos del software; no sostiene que los resellers estén exentos de re-autorización |
| Código de Procedimiento Civil | Derogado desde el 1 de enero de 2014 |
| Superintendencia Financiera | Factus no es entidad vigilada por esa superintendencia |

---

## Estado y próximos pasos

Los dos documentos están en revisión por Factus, con cierre el viernes 9 de
octubre de 2026 y reunión de seguimiento ese mismo día.

Abierto por parte de Factus:

- Los dos o tres escenarios de conflicto que se le presentan con mayor
  frecuencia con sus clientes, para regularlos expresamente (BEDROCK-78).
- El alcance completo de las operaciones de la API que deben quedar
  enunciadas una a una.
- Confirmación de que puede cumplir los niveles de servicio comprometidos.
- Correo de soporte, correo comercial, WhatsApp y teléfono.
- Si mantiene el descuento del certificado digital en el retracto, que frente a
  un consumidor es ineficaz de pleno derecho.
- La política de tratamiento de datos vigente, para tomarla como base.

Siguiente entregable de Bedrock: política de tratamiento de datos personales
(BEDROCK-67).

---

## Contactos

| Quién | Rol | Correo |
|---|---|---|
| Camilo Hernández Reyes | Factus, contraparte principal | camilo@halltec.co |
| Iván Aparicio | Factus, técnico | — |
| Óscar Aguillón Silva | Factus | — |
| Juan Manuel Correa Muñoz | Bedrock, responsable del encargo | tualiado@bedrock.com.co |

---

## Notas técnicas

El Markdown es la fuente de verdad y es lo que se edita. El `.docx` se regenera
con el skill `estilo-bedrock-docs`.

Los documentos en Word no deben abrirse con el editor de Google Docs: la
conversión destruye la plantilla, infla el archivo y el documento pierde la
composición de portada. Hay que descargarlos y abrirlos en Word.

Antes de entregar una versión se corren los dos controles de `proceso/`: uno
verifica exactitud normativa y cobertura, el otro verifica que la redacción no
reproduzca señales de escritura de máquina.

---

## Control de versiones

| Versión | Fecha | Cambios | Estado |
|---|---|---|---|
| 1.0 | 27 de septiembre de 2026 | Índice inicial | Superada |
| 2.0 | 28 de septiembre de 2026 | Estructura reorganizada con carpeta de proceso y versiones archivadas. Base normativa corregida tras la verificación de citas. Incorporación de los acuerdos de la reunión del 28 de septiembre. | Vigente |

**Preparado por:** Bedrock Abogados S.A.S.
**Clasificación:** Confidencial — Factus S.A.S.
