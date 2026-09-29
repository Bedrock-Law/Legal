---
title: "Contrato de Prestación de Servicios Tecnológicos"
eyebrow: "Factus S.A.S. · Prestación de Servicios de Facturación Electrónica · NIT 901.724.254-1"
lede: "Contrato marco que regula los términos bajo los cuales FACTUS S.A.S. (Facturador Electrónico) presta servicios tecnológicos de facturación electrónica a empresas resellers (reventa de paquetes de servicios a clientes finales)."
doctype: "Contrato de Prestación de Servicios"
docdate: "Septiembre de 2026"
docscope: "Confidencial · Contratante"
docname: "Contrato-Resellers-Factus-v1"
---

# Resumen Ejecutivo

Este Contrato de Prestación de Servicios (en adelante, el **"Contrato"**) regula los términos, obligaciones y responsabilidades entre **FACTUS S.A.S.**, una sociedad anónima simplificada identificada con NIT 901.724.254-1, domiciliada en San Gil, Santander, Colombia (en adelante, **"FACTUS"**), y una empresa que adquiere paquetes de servicios de facturación electrónica para revenderlos a sus clientes finales (en adelante, el **"RESELLER"**).

FACTUS actúa exclusivamente como **proveedor de tecnología**. Su función es mantener disponible una plataforma estable y segura conforme a los acuerdos de nivel de servicio (SLA) descritos en este Contrato. El RESELLER es responsable de la relación comercial con sus clientes finales, de asegurar que sus clientes carguen correctamente la documentación ante la DIAN, y de la prestación de soporte técnico y comercial a dichos clientes.

Protecciones principales:
- Responsabilidad única de FACTUS: disponibilidad plataforma conforme SLA.
- FACTUS no responde por reportes indebidos, incumplimientos ante la DIAN, o inadecuada ejecución de procesos del cliente final.
- Retracto: 5 días desde firma del Contrato, aplicable a cada nueva licencia.
- Vigencia: 1 año, renovable por acuerdo de partes.

---

# Identificación de las Partes y Datos de la Operación

## Bloque A — Datos Institucionales de FACTUS (completados al adoptar plantilla)

| Campo | Valor |
|-------|-------|
| **Empresa** | FACTUS S.A.S. |
| **NIT** | 901.724.254-1 |
| **Domicilio** | San Gil, Santander, Colombia |
| **Representante Legal** | Yolher Camilo Albeiro Hernández Reyes |
| **Servicios** | Facturación electrónica (Facturas, Notas Débito, Notas Crédito, Documentos Soporte, Nómina Electrónica, Eventos Radian) |
| **Horarios de soporte** | Lunes a viernes, 8:00 a.m. a 6:00 p.m., horas Colombia |
| **Canales de soporte** | Correo electrónico, WhatsApp (números directos en comunicación previa) |
| **Moneda** | Pesos Colombianos (COP), salvo pacto expreso |

## Bloque B — Datos del RESELLER y de la Operación (diligenciar por cada vinculación)

| Campo | Valor a Completar |
|-------|-------------------|
| **Nombre comercial del RESELLER** | [NOMBRE EMPRESA] |
| **Razón social** | [RAZÓN SOCIAL COMPLETA] |
| **NIT** | [NIT RESELLER] |
| **Dígito de verificación** | [DV] |
| **Representante legal** | [NOMBRE COMPLETO] |
| **Cédula/Pasaporte** | [IDENTIFICACIÓN] |
| **Correo de contacto** | [EMAIL] |
| **Teléfono de contacto** | [TELÉFONO] |
| **Dirección** | [DIRECCIÓN COMPLETA] |
| **Ciudad** | [CIUDAD] |
| **Fecha de firma** | [FECHA DD/MM/AAAA] |
| **Paquete adquirido** | [Paquete Individual / Bolsa Multifacturador] |
| **Precio mensual/anual** | [VALOR COP] |
| **Fecha de implementación** | [FECHA ESTIMADA] |
| **Número de licencias iniciales** | [CANTIDAD] |

---

# Cláusula Primera — Objeto del Contrato

1.1 **Objeto y Servicios Incluidos:** Por este Contrato, FACTUS, en su calidad de Facturador Electrónico autorizado por la DIAN (Resolución 000165/2023, Oficio DIAN 13246/2025), proporciona acceso a su plataforma tecnológica integral para la emisión y radicación de documentos electrónicos ante la DIAN, permitiendo al RESELLER:

- **Emisión de Documentos Tributarios:** Facturas Electrónicas, Notas Débito, Notas Crédito y Documentos Soporte Electrónicos conforme Resolución 000019/2012 DIAN, en nombre de sus clientes finales identificados con certificación digital vigente.
- **Emisión de Nómina Electrónica:** Conforme Resolución 1796/2014 DIAN, cuando el paquete contratado lo incluya.
- **Gestión de Eventos Radian:** Consulta, carga y validación de eventos de recepción de facturación ante sistema Radian de la DIAN.
- **Radicación Electrónica:** Transmisión segura de documentos a través de los canales de comunicación designados por la DIAN, con autenticación por certificado digital de titularidad del cliente final.
- **Reportes Técnicos de Transacción:** Consulta en tiempo real del estado de documentos (aceptación DIAN, rechazos técnicos, eventos de rechazo), trazabilidad de transmisiones, y descarga de comprobantes de radicación.
- **Entorno de Validación Previa (Sandbox):** Acceso a ambiente de pruebas con datos de demostración para validación de procesos, integraciones y configuraciones antes de operación en ambiente de producción.

1.2 **Modalidades de Servicio:** El RESELLER elige una de dos modalidades:

- **(a) Paquetes Individuales:** Cada paquete incluye un NIT de facturador, certificado digital (incluido), y acceso a los servicios descritos en 1.1. El RESELLER compra un paquete por cada cliente final que desee activar.
- **(b) Bolsas Multifacturador:** El RESELLER compra una bolsa que le permite registrar múltiples clientes finales. El costo del certificado se cancela por separado con cada nuevo NIT.

1.3 **Qué NO incluye este Contrato:** FACTUS no se obliga a:

- Soporte técnico directo al cliente final del RESELLER. Ese soporte es responsabilidad del RESELLER.
- Validación de la exactitud o legalidad de los documentos que emite el cliente final.
- Cumplimiento de obligaciones tributarias del cliente final ante la DIAN (cargues de rangos, solicitud de habilitaciones, etc.).
- Garantía de que todos los documentos serán aceptados por la DIAN; la aceptación depende de la plataforma DIAN, no de FACTUS.

1.4 **Acceso a la Plataforma:** El FACTUS proporciona:

- Credenciales de acceso único para el RESELLER (usuario + contraseña seguros).
- Panel de administración donde el RESELLER gestiona sus clientes finales.
- API de integración (documentada) si el RESELLER desea integrar la plataforma con sus propios sistemas.
- Entorno de pruebas (sandbox) con datos de demostración.

---

# Cláusula Segunda — Vigencia y Renovación

2.1 **Término Inicial:** Este Contrato entra en vigencia en la fecha de firma y tiene un término inicial de **doce (12) meses calendario**, contado desde la puesta en operación de la primera licencia.

2.2 **Renovación Automática:** Cumplido el término, el Contrato se renovará automáticamente por períodos iguales de doce (12) meses, salvo que cualquiera de las partes notifique por escrito su voluntad de terminación con treinta (30) días de anticipación al vencimiento.

2.3 **Incremento de Precio en Renovación:** Al renovarse, los valores pueden ajustarse conforme al Índice de Precios al Consumidor (IPC) del año anterior, más un 2 %. FACTUS notificará el nuevo valor treinta (30) días antes del vencimiento del término. Si el RESELLER no acepta el ajuste, puede optar por terminación bajo la Cláusula Novena.

---

# Cláusula Tercera — Valor, Forma y Condiciones de Pago

3.1 **Valor del Servicio:** El RESELLER pagará a FACTUS el precio fijo estipulado en la Sección de Identificación de Datos (Bloque B), según el paquete y modalidad elegida. Este precio incluye:

- Acceso a la plataforma por el período de vigencia pactado.
- Primer certificado digital (si aplica).
- Actualizaciones y mantenimiento preventivo de la plataforma.
- Acceso 24/7 a los sistemas (salvo mantenimientos programados notificados con 48 horas de anticipación).

3.2 **Servicios Adicionales No Incluidos:** Gastos no incluidos en el valor básico:

- Certificados digitales adicionales: Se facturan al costo vigente (actualmente 1-3 días hábiles, COP según tarifa FACTUS).
- Soportes especiales (capacitación a medida, integración personalizada): Se negocian por separado y facturan como servicios adicionales.
- Recuperación de datos borrados o incidentes causados por mal uso del RESELLER: A costo operativo.

3.3 **Forma y Fecha de Pago:** El RESELLER pagará:

- **Anticipado:** Dentro de los 15 días calendario siguientes a la firma, si el servicio comienza en el mes de firma.
- **Mensual/Anual:** Conforme lo indique la factura emitida por FACTUS (30 días neto, salvo otro pacto en la factura).
- **Medio de pago:** Transferencia electrónica a la cuenta corriente que FACTUS indique, o cheque certificado.

3.4 **Mora en el Pago:** Si el RESELLER no paga en la fecha vencida:

- Incurrirá en intereses moratorios conforme la tasa máxima permitida por la ley colombiana (Decreto 1116 de 2013 o normativa vigente), comenzando el día siguiente al vencimiento.
- FACTUS podrá suspender el servicio después de 5 días de incumplimiento, previa notificación. La suspensión se levanta una vez cancelado el valor adeudado más intereses.
- Deudas mayores a 60 días pueden derivarse a cobro judicial a costo del RESELLER.

3.5 **Impuestos:** El valor facturado por FACTUS está sujeto a IVA (19 % actual) y demás impuestos vigentes. El RESELLER es responsable del cumplimiento de sus propias obligaciones tributarias sobre los ingresos que genere con la reventa de estos servicios.

---

# Cláusula Cuarta — Acuerdos de Nivel de Servicio (SLA)

4.1 **Disponibilidad de la Plataforma:** FACTUS se compromete a mantener la plataforma disponible un **99 % del tiempo** durante las horas hábiles de operación (lunes a viernes, 8:00 a.m. a 6:00 p.m. Colombia). Esto quiere decir:

- Máximo una (1) hora de indisponibilidad por mes en horario hábil.
- Indisponibilidad = plataforma no accesible para la emisión o consulta de documentos.

4.2 **Clasificación de Incidentes:**

| Prioridad | Descripción | Tiempo de Respuesta | Tiempo de Resolución |
|-----------|-------------|-------------------|---------------------|
| **Crítica (P1)** | Plataforma completa caída; ningún usuario puede acceder. | 30 minutos | 2 horas (hábiles) |
| **Alta (P2)** | Funcionalidad principal afectada (emisión o radicación lenta). | 2 horas | 4 horas (hábiles) |
| **Media (P3)** | Funcionalidad secundaria afectada (reportes no disponibles). | 4 horas | 8 horas (hábiles) |
| **Baja (P4)** | Dudas, solicitudes de información, optimizaciones. | 24 horas | 2 días (hábiles) |

4.3 **Días y Horas No Hábiles:** Los incidentes reportados fuera de horario hábil (viernes 6:00 p.m. a lunes 8:00 a.m., festivos) se atienden el primer día hábil siguiente. No se computa tiempo de respuesta en días no hábiles.

4.4 **Exclusiones del SLA:** FACTUS no responde por:

- Indisponibilidad causada por mal funcionamiento de la conexión a internet del RESELLER.
- Indisponibilidad de servicios de terceros (RFC de certificación digital, plataforma DIAN, bancos).
- Ataques de denegación de servicio (DDoS) dirigidos a la plataforma.
- Mantenimiento preventivo notificado con 48 horas de anticipación (máximo 4 horas mensuales).

4.5 **Certificados Digitales — Tiempos Garantizados:**

- Compra de nuevo certificado: 1-3 días hábiles (conforme el proveedor de certificados).
- Instalación en plataforma: Misma hora de recepción.
- Renovación de certificado vencido: Aplica el plazo anterior.

Si el certificado se vence por culpa del RESELLER (no renovó a tiempo), FACTUS cobrar un arancel por reinscripción.

---

# Cláusula Quinta — Obligaciones de FACTUS

5.1 FACTUS se obliga a:

- Mantener la plataforma operativa conforme al SLA de la Cláusula Cuarta.
- Ejecutar actualizaciones y parches de seguridad de manera oportuna, notificando mantenimientos programados 48 horas antes.
- Guardar absoluta confidencialidad sobre la información del RESELLER y de sus clientes finales (documentos tributarios, datos de terceros).
- Cumplir con las leyes de protección de datos (Ley 1581 de 2012, Decreto 1377 de 2013) y seguridad de la información.
- Responder consultas técnicas en horarios de soporte (Bloque A, Identificación).
- Proporcionar acceso a reportes técnicos diarios sobre radicación ante DIAN.

5.2 **Lo que NO hace FACTUS:**

- No audita ni valida la exactitud de los documentos emitidos; es responsabilidad del RESELLER y su cliente final.
- No emite comprobantes tributarios en nombre del cliente final; el cliente final debe realizar sus propios trámites ante la DIAN (rangos, habilitaciones, etc.).
- No ofrece asesoría tributaria; recomienda al RESELLER y cliente final consultar con un contador público.
- No realiza soporte directo al cliente final; todo contacto técnico pasa por el RESELLER.

---

# Cláusula Sexta — Obligaciones del RESELLER

6.1 El RESELLER se obliga a:

- Pagar puntualmente los valores establecidos en la Cláusula Tercera.
- Utilizar la plataforma solo para emitir documentos electrónicos conforme a la Resolución 000019 de 2012 DIAN (o normas vigentes) y la Ley 1480 de 2011 en lo que aplique.
- No intentar acceder a sistemas, bases de datos o información de otros usuarios.
- Mantener contraseñas seguras y cambiarlas periódicamente; reportar acceso no autorizado a la mayor brevedad.
- Ser el único responsable de la relación comercial, técnica y legal con sus clientes finales.
- Verificar que sus clientes finales cumplan con los requisitos previos a la emisión de documentos: certificación digital vigente, rangos de numeración autorizados ante la DIAN, datos tributarios exactos, y calidad de información conforme normas vigentes. El RESELLER es responsable de guiar, capacitar y validar que el cliente final cargue información correcta en la plataforma FACTUS o en canales alternativos que la DIAN designe. FACTUS únicamente procesa y transmite la información recibida; no realiza validación de legalidad, exactitud o cumplimiento tributario de los documentos emitidos.
- Cumplir con obligaciones tributarias propias (IVA, retención, renta, beneficiarios finales).
- No revender ni transferir su acceso a terceros sin consentimiento escrito de FACTUS.

6.2 **Prohibiciones Expresas:** El RESELLER se abstendrá de:

- Intentar acceso no autorizado, interferencia o modificación de la infraestructura tecnológica de FACTUS, incluidos servidores, bases de datos, código fuente, aplicaciones, interfaces de programación (API) o cualquier componente del sistema. Se prohiben expresamente técnicas de ingeniería inversa, análisis de vulnerabilidades, ataques de denegación de servicio (DDoS) o pruebas de penetración sin autorización previa por escrito.
- Utilizar la plataforma para emisión, validación o radicación de documentos que, a su conocimiento o del cliente final, adolezcan de falsedad en datos, incumplan normas tributarias, faciliten operaciones de lavado de activos, financiamiento del terrorismo o fraude, conforme Ley 1960/2019 (prevención de lavado de activos) y Código Penal.
- Reproducir, adaptar, traducir, modificar, descompilar, crear trabajos derivados, o distribuir bajo ninguna forma (comercial o no) el software, aplicaciones, metodologías, especificaciones o documentación técnica de FACTUS.
- Usar credenciales de acceso asignadas en nombre de terceros no autorizados, o transferir, ceder, gravar o permitir que terceros accedan a la plataforma sin consentimiento expreso de FACTUS.

---

# Cláusula Séptima — Protección de Datos Personales y Confidencialidad

7.1 **Marco Normativo:** Las partes reconocen que la relación genera intercambio de datos personales (datos tributarios de clientes finales del RESELLER, información contacto, etc.). Ambas se someten a la Ley 1581 de 2012 y Decreto 1377 de 2013.

7.2 **Roles:**

- **FACTUS** actúa como **Responsable del Tratamiento** de los datos que le transmita el RESELLER, y como **Encargado** de los datos del cliente final que radicán documentos (bajo instrucción del RESELLER).
- **El RESELLER** es **Responsable del Tratamiento** de los datos que recolecta de sus clientes finales y transmite a FACTUS; garantiza autorización previa, expresa e informada de los titulares.

7.3 **Finalidades:** Los datos se tratan exclusivamente para:

- Emitir y radicar documentos electrónicos ante DIAN.
- Reportar estado de documentos.
- Gestión contable y tributaria del RESELLER.
- Cumplimiento de obligaciones legales frente a autoridades (DIAN, fiscalía, etc.).

7.4 **Confidencialidad:** Ambas partes guardan absoluta reserva sobre información de la otra:

- FACTUS no revelaría datos del RESELLER a otros resellers.
- El RESELLER no divulgaría credenciales ni información del sistema FACTUS.
- Ambas implementan controles técnicos y administrativos para evitar acceso indebido.

7.5 **Retención y Destrucción:** Al terminar el Contrato, FACTUS retiene la información durante **5 años** (obligación legal DIAN), luego la destruye de forma segura. El RESELLER tiene derecho a solicitar copia de su información; FACTUS la entrega en formato estándar en máximo 10 días hábiles.

---

# Cláusula Octava — Responsabilidad de FACTUS (Limitada)

8.1 **Responsabilidad de FACTUS:** FACTUS asume responsabilidad exclusivamente sobre:

- **Disponibilidad de la Plataforma:** Mantener operativa la infraestructura tecnológica, servidores, canales de comunicación y servicios conforme a los niveles de servicio (SLA) especificados en la Cláusula Cuarta y Anexo I de este Contrato.
- **Integridad de Datos Almacenados:** Preservar la información transmitida por el RESELLER durante la vigencia del Contrato, sin pérdida, corrupción o alteración no autorizada, salvo por causas de fuerza mayor (desastres naturales, actos de terrorismo, conflictos armados, epidemias) documentadas y comunicadas oportunamente.
- **Confidencialidad:** Guardar reserva absoluta sobre datos del RESELLER y del cliente final, cumpliendo Ley 1581/2012 y Decreto 1377/2013 de protección de datos personales.
- **Autenticación Segura:** Mantener mecanismos de autenticación (certificados digitales, credenciales) que cumplan estándares de seguridad vigentes (Decreto 2364/2012 para firma electrónica).

8.2 **Exoneración de Responsabilidad — Actos Fuera del Alcance de FACTUS:**

FACTUS **no responde** por:

- **Validación de Documentos:** Análisis de exactitud, completitud, veracidad o legalidad de información contenida en documentos electrónicos antes de su transmisión. El cliente final y el RESELLER son titulares exclusivos de la responsabilidad por la conformidad de datos con normas tributarias vigentes (Resolución 000019/2012 DIAN, Resolución 1796/2014, Estatuto Tributario).
- **Decisiones de Aceptación o Rechazo DIAN:** La aceptación, rechazo, devolución, cambio de estado o cualquier acción de la plataforma DIAN sobre documentos depende de validaciones internas de la DIAN que escapan del control técnico de FACTUS. FACTUS únicamente transmite documentos; no ejerce control sobre criterios de validación DIAN.
- **Incumplimiento Tributario del Cliente Final:** Obligaciones de declaración de impuestos, pago de impuestos, cumplimiento de resoluciones DIAN, cargas de rangos de numeración, habilitaciones de actividades económicas, y cualquier obligación tributaria sustantiva son responsabilidad exclusiva del contribuyente (cliente final) y el RESELLER ante la autoridad fiscal.
- **Daño Emergente, Lucro Cesante y Daños Indirectos:** Pérdidas de ingresos, costos de operación no realizados, multas tributarias impuestas por autoridades, sanciones administrativas, reclamaciones de terceros, o cualquier daño consecuencial derivado de la suspensión temporal del servicio, indisponibilidad de la plataforma, o rechazo de documentos por la DIAN.
- **Terceros Contratistas:** Servicios proporcionados por proveedores terceros de certificación digital, autoridades (DIAN, Superintendencia Financiera), prestadores de servicios de telecomunicaciones, o entidades financieras. FACTUS no responde por su actuación, negligencia o incumplimiento.

8.3 **Límite Cuantitativo de Responsabilidad:** En el evento de incumplimiento demostrado de FACTUS que cause perjuicio material al RESELLER, su obligación de indemnización se limita **estrictamente** a **dos (2) meses del valor mensual contratado**, sin que en ningún caso la indemnidad total pueda exceder esta suma. Esta limitación se aplica a cada evento de incumplimiento y a la suma agregada de todos los eventos durante la vigencia del Contrato.

8.4 **Defensa e Indemnización por Parte del RESELLER:** El RESELLER se obliga a mantener indemne a FACTUS, y a asumir, defender y costear cualquier demanda, reclamación, sanción administrativa o procesal que terceros dirijan contra FACTUS por:

- Errores en datos, falsedad de información o cumplimiento tributario deficiente del cliente final o del RESELLER, aun cuando el tercero reclamante atribuya responsabilidad a FACTUS.
- Incumplimiento de obligaciones tributarias, laborales, comerciales o civiles del RESELLER ante autoridades o terceros.
- Uso prohibido, no autorizado o ilícito de la plataforma FACTUS, incluidos intentos de acceso indebido, alteración de información o difusión de malware.
- Documentos emitidos por clientes finales del RESELLER que contengan información ilegal, fraudulenta o que vulnere derechos de terceros.

---

# Cláusula Novena — Derecho de Retracto

**Referencia:** Anexo III — Política de Retracto

El RESELLER reconoce su derecho de retracto conforme Ley 1480/2011 (Estatuto del Consumidor) y Ley 2439/2024 (reforma comercio electrónico), en los términos y condiciones especificados en Anexo III de este Contrato. Los procedimientos, plazos, excepciones y efectos del retracto se desarrollan íntegramente en ese Anexo, el cual forma parte integral de este Contrato.

---

# Cláusula Décima — Terminación del Contrato

10.1 **Causales de Terminación:** Este Contrato termina por:

- **Mutuo acuerdo:** Cualquier momento, mediante acuerdo escrito de ambas partes.
- **Vencimiento del término:** Cumplido el plazo de la Cláusula Segunda sin renovación.
- **Incumplimiento grave del RESELLER:**
  - No pago de tres (3) meses de servicio.
  - Uso indebido de la plataforma (intentos de piratería, distribución de malware, etc.).
  - Carga de documentos manifiestamente ilegales (fraude tributario comprobado).
  - Violación de confidencialidad.
  
  Cualquiera de estos incumplimientos permite a FACTUS dar por terminado el Contrato con notificación inmediata.

- **Incumplimiento grave de FACTUS:**
  - Indisponibilidad de la plataforma por más de 20 días hábiles sin causa justificada.
  - Pérdida o corrupción de datos.
  
  El RESELLER puede terminar con 30 días de notificación por escrito.

- **Decisión de autoridad competente:** Si la DIAN, Superintendencia Financiera u otro organismo ordena suspender los servicios.
- **Liquidación de cualquiera de las partes:** Por insolvencia, liquidación voluntaria, etc.

10.2 **Procedimiento de Terminación:**

- La parte que desee terminar notifica por escrito a la otra, indicando fecha de efectividad (mínimo 30 días, salvo termino de contrato por mal funcionamiento de FACTUS).
- En la fecha de efectividad, se suspende el acceso a la plataforma.
- El RESELLER puede solicitar copia de datos hasta 10 días después de la terminación.
- Saldos pendientes de pago se cobran a FACTUS; FACTUS reembolsa saldos a favor del RESELLER.

10.3 **Consecuencias de Terminación:**

- Cesa la obligación de mantener disponibilidad SLA.
- Se destruyen datos del RESELLER conforme a la Cláusula Séptima (retención 5 años, luego destrucción).
- Documentos emitidos antes de terminación permanecen en histórico de DIAN; FACTUS no los borra.

---

# Cláusula Undécima — Garantías y Exenciones de Garantía

11.1 **Garantías Expresas de FACTUS:**

- Posee autorización válida y vigente como Facturador Electrónico ante la DIAN, conforme Resolución 000165/2023 y Oficio 13246/2025, sin restricciones administrativas que afecten la prestación de servicios.
- La plataforma cumple con especificaciones técnicas documentadas, incluyendo cifrado de datos (TLS 1.2 o superior), autenticación segura conforme Decreto 2364/2012, y arquitectura que garantiza disponibilidad conforme SLA de la Cláusula Cuarta.
- Mantendrá disponibilidad operativa conforme indicadores de nivel de servicio especificados en Anexo I.
- Los certificados digitales proporcionados son válidos y emitidos por autoridades de certificación reconocidas por la DIAN.

11.2 **Exclusión de Garantías Implícitas:**

FACTUS **no garantiza:**

- **Aceptación de Documentos por DIAN:** La aceptación, rechazo, cambio de estado o cualquier decisión de la plataforma DIAN sobre un documento depende exclusivamente de validaciones de contenido, formato y cumplimiento tributario que realiza la DIAN. FACTUS transmite documentos conforme especificaciones técnicas; la decisión DIAN es independiente de la calidad técnica de la transmisión.
- **Ausencia Absoluta de Errores:** La plataforma puede contener defectos, incompatibilidades temporales, o limitaciones operativas. FACTUS se compromete a identificar, documentar y corregir defectos conforme a prioridades SLA (Anexo I), pero no garantiza plataforma libre de errores.
- **Conformidad con Expectativas del RESELLER:** El RESELLER debe validar, en ambiente sandbox, que la plataforma satisface sus requerimientos operativos, de integración y de datos antes de puesta en operación. FACTUS proporciona documentación técnica y acceso a sandbox; la responsabilidad de validación es del RESELLER.
- **Cumplimiento Tributario de Clientes Finales:** Uso de la plataforma por un cliente final no implica cumplimiento automático de obligaciones tributarias. FACTUS es un canal tecnológico, no asesor tributario ni auditor interno.
- **Protección Contra Auditoría o Sanciones DIAN:** Ningún uso correcto de la plataforma exime a un cliente final de auditoría, verificación o sanciones que la DIAN determine pertinentes sobre bases tributarias del contribuyente.

11.3 **Entrega "Tal Cual" (As-Is):** La plataforma y servicios se entregan en estado operacional actual ("as-is"), con funcionalidades y limitaciones técnicas existentes al momento de contratación. Mejoras, nuevas funcionalidades, o ampliación de capacidades son iniciativas discrecionales de FACTUS y no constituyen obligación contractual.

---

# Cláusula Duodécima — Solución de Controversias

13.1 **Procedimiento Escalonado de Resolución:**

- **(a) Gestión Directa:** Cualquier controversia, discrepancia o reclamación será comunicada por escrito a la otra parte en máximo 10 días hábiles desde el evento que la origina. Las partes se comprometen a diálogo directo para resolución expedita durante 10 días calendario subsecuentes.

- **(b) Mediación Conciliatoria:** Si el diálogo directo no produce acuerdo, la parte interesada podrá activar proceso de mediación ante Centro de Conciliación de la Cámara de Comercio competente según domicilio del RESELLER. Las partes desiguen mediador dentro de 5 días hábiles e intentan acuerdo en máximo 20 días hábiles.

- **(c) Jurisdicción Ordinaria:** Si mediación no produce resultado, las partes consienten en que la controversia sea conocida y resuelta por juzgados civiles del circuito donde domicilia el RESELLER, renunciando a cualquier otra jurisdicción. Se excluye expresamente arbitraje.

13.2 **Ley Aplicable y Normas Interpretativas:** Este Contrato se interpreta, ejecuta y resuelve conforme a las leyes sustantivas y procedimentales de la República de Colombia, en especial:

- Código Civil (obligaciones y contratos)
- Código de Procedimiento Civil (acciones y recursos)
- Resoluciones DIAN y normativa tributaria vigente
- Ley 1480/2011 (Estatuto del Consumidor, en lo aplicable)
- Ley 1581/2012 y Decreto 1377/2013 (protección datos personales)
- Ley 1960/2019 (prevención lavado de activos)

13.3 **Cálculo de Términos:** Todos los plazos mencionados en este Contrato se cuentan en días calendario, excepto cuando se especifique "días hábiles" (excluyendo sábados, domingos y festivos colombianos). El término vencido sobre festivo se traslada al siguiente día hábil.

---

# Cláusula Décima Tercera — Cláusula Penal Pactada

14.1 **Incumplimiento en Pago por Parte del RESELLER:**

Si el RESELLER incumple la obligación de pago de la factura emitida por FACTUS por período superior a sesenta (60) días calendario:

- Genera automáticamente el derecho de FACTUS a exigir intereses moratorios conforme tasa máxima permitida por Decreto 1116/2013 o normativa vigente, desde el día siguiente al vencimiento.
- Genera, además, penalidad convencional equivalente a **uno (1) mes completo del valor mensual contratado**, como liquidación convencional de perjuicios derivados de la mora (costo de gestión de cobro, costo de oportunidad, detrimento crediticio).
- La penalidad se cobra junto con el capital adeudado e intereses, sin necesidad de acción judicial previa ni comprobación adicional de daño.

14.2 **Incumplimiento Grave de FACTUS:**

Si FACTUS incumple obligaciones críticas definidas como tal en este Contrato —específicamente: (i) mantener disponibilidad SLA por período superior a 20 días hábiles sin causa justificada; (ii) divulgación no autorizada de información confidencial del RESELLER; o (iii) pérdida o corrupción de datos del RESELLER sin restauración viable—:

- El RESELLER tiene derecho a reclamar penalidad convencional equivalente a **uno (1) mes completo del valor mensual contratado**, como liquidación anticipada de daños.
- Esta penalidad se compensa contra pagos adeudados por FACTUS o por el RESELLER en siguiente ciclo de facturación, o se reembolsa en efectivo en máximo 10 días hábiles si la relación contractual termina.
- La reclamación requiere notificación escrita detallando el incumplimiento; FACTUS tiene 5 días hábiles para presentar descargos.

14.3 **Naturaleza y Ejecución de la Cláusula Penal:**

- La cláusula penal tiene carácter de liquidación convencional de perjuicios (cláusula penal resarcitoria), no sancionatoria.
- Es exigible de pleno derecho sin necesidad de acción judicial previa, reconocimiento de deuda o comprobación adicional de daños efectivos.
- El incumplidor puede oponerse si prueba que no hubo daño o que fue insignificante; la carga probatoria recae en quien se opone.
- El cobro de la penalidad convencional no impide reclamación posterior de daños y perjuicios adicionales si se prueban en juicio y exceden la suma de la cláusula.

---

# Cláusula Décima Cuarta — Confidencialidad y Propiedad Intelectual

15.1 **Información Confidencial:**

- FACTUS no revela términos comerciales de este Contrato a otros resellers sin consentimiento del RESELLER.
- El RESELLER no revela credenciales de plataforma, ni términos técnicos internos de FACTUS.
- Vigencia: 2 años después de terminación del Contrato.

15.2 **Propiedad Intelectual:**

- La plataforma, código fuente, documentación y modelos de FACTUS son propiedad exclusiva de FACTUS.
- El RESELLER tiene solo licencia de uso no exclusiva durante vigencia del Contrato.
- Tras terminación, no puede usar ni reproducir nada.

15.3 **Documentos del Cliente Final:**

- Los documentos electrónicos emitidos (facturas, nóminas, etc.) pertenecen al cliente final, no a FACTUS ni al RESELLER. El cliente final es quien decide qué hacer con esos documentos.
- FACTUS conserva copias en servidor conforme ley (5 años mínimo para DIAN).

---

# Firmas

En prueba de conformidad con todo lo anterior, las partes firman este Contrato en el lugar y fecha indicados en la Sección de Identificación de Datos.

**POR FACTUS S.A.S.:**

[NOMBRE REPRESENTANTE LEGAL FACTUS]  
Identificación: [CÉDULA]  
Cargo: [CARGO]  
Firma: ________________________  
Fecha: ________________________

**POR EL RESELLER:**

[NOMBRE REPRESENTANTE LEGAL RESELLER]  
Identificación: [CÉDULA]  
Cargo: [CARGO]  
Firma: ________________________  
Fecha: ________________________

---

# Anexo I: Acuerdo de Nivel de Servicio (SLA) Detallado

*Referencia: Cláusula Cuarta de este Contrato*

## Disponibilidad Mensual Garantizada

FACTUS se compromete a 99 % de disponibilidad en horario hábil (lunes a viernes, 8:00 a.m. a 6:00 p.m. Colombia).

- 1 mes = 21 días hábiles × 10 horas/día = 210 horas hábiles mensuales.
- 99 % = máximo 2.1 horas de indisponibilidad/mes.
- Por simplicidad operativa: máximo 1 incidente crítico por mes de no más de 1 hora.

## Tiempos de Respuesta

| Nivel | Primera Respuesta | Resolución Objetivo | Horario |
|-------|-------------------|-------------------|---------|
| Crítica | 30 minutos | 2 horas | Hábil |
| Alta | 2 horas | 4 horas | Hábil |
| Media | 4 horas | 8 horas | Hábil |
| Baja | 24 horas | 48 horas | Hábil |

**Nota:** Fuera de horario hábil, los tiempos comienzan el siguiente día hábil.

## Mantenimiento Programado

- Máximo 4 horas mensuales.
- Notificación mínima: 48 horas de anticipación.
- No entra en cómputo del SLA.

## Certificados Digitales

- Gestión: 1-3 días hábiles (depende proveedor).
- FACTUS: responsable de activación misma hora de recepción.

---

# Anexo II: Catálogo de Servicios Incluidos

## Paquete Facturación Estándar (Incluido)

- Emisión de Facturas Electrónicas (ilimitadas).
- Emisión de Notas Débito/Crédito (ilimitadas).
- Emisión de Documentos Soporte (ilimitados).
- Acceso a reportes técnicos de radicación.
- Consulta de eventos DIAN.

## Paquete Nómina (Según Modalidad Contratada)

- Emisión de Nómina Electrónica (ilimitadas).
- Notas de Ajuste a Nómina.
- Reportes de radicación.

## Paquete Radian (Según Modalidad Contratada)

- Consulta de eventos de recepción Radian.
- Carga de eventos de cliente (aceptación, rechazo, etc.).

## Servicios No Incluidos (Facturables Adicionales)

- Certificados digitales adicionales: Tarifa vigente por certificado.
- Capacitación personalizada: A costo de horas profesionales.
- Integración API customizada: A costo de desarrollo.
- Recuperación de datos: A costo operativo.
- Reportes personalizados: A costo operativo.

---

# Anexo III: Política de Retracto

**Aplicable a:** Cláusula Novena y Cláusula Duodécima

## Derecho de Retracto del RESELLER

1. El RESELLER tiene derecho a retractarse del Contrato dentro de **5 días hábiles** contados desde la firma.
2. Para ejercer retracto, el RESELLER envía comunicación escrita a FACTUS indicando:
   - "Declaro mi voluntad de retractarme conforme Cláusula Novena."
   - Información de cuenta bancaria para reembolso.

3. FACTUS reembolsa en máximo 10 días hábiles, descontando:
   - Certificado digital ya emitido (costo no recuperable).
   - Cualquier costo real incurrido.

4. **Condición sine qua non:** No se puede retractar si ya ha emitido documentos electrónicos. La prestación del servicio (acceso, emisión) lo hace consumido.

## Retracto por Licencia Individual

Si el RESELLER compra una licencia (cliente final) adicional después de firma del Contrato principal:
- Retracto disponible por esa licencia en 5 días hábiles desde su activación.
- Condición: Cliente final no debe haber emitido documentos.
- Reembolso: Costo de esa licencia menos certificado (si aplica).

## Procedimiento Operativo

| Paso | Plazo | Responsable |
|------|-------|-------------|
| RESELLER envía comunicación de retracto | Hasta día 5 hábil | RESELLER |
| FACTUS confirma recepción y valida condiciones | 1 día hábil | FACTUS |
| FACTUS verifica sin emisiones en plataforma | 1 día hábil | FACTUS |
| FACTUS procesa reembolso | 10 días hábiles | FACTUS |

---

**Fin del Contrato**

Este Contrato de Prestación de Servicios Tecnológicos constituye el acuerdo integral entre FACTUS y el RESELLER. Cualquier modificación requiere consentimiento escrito de ambas partes.

Versión: 1.0  
Fecha preparación: Septiembre de 2026  
Autor: Bedrock Abogados S.A.S.  
Clasificación: Confidencial — Contratante
