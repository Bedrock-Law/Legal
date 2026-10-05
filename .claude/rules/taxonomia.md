# Taxonomía y cómo decidir dónde va cada cosa

Antes de crear o guardar un archivo, recorre esta decisión en orden. Si después
de recorrerla sigue sin ser obvio, pregunta — no inventes una carpeta nueva.

1. ¿Es de una persona, no de la empresa? → `Personal/<nombre>/`.
2. ¿Es un skill, plugin o herramienta que el equipo usa? → `Herramientas/skills-y-plugins/`.
3. ¿Es sobre un cliente identificable? → `Clientes/<slug-del-cliente>/`, y dentro,
   por tipo de documento (ver 1.2).
4. Si no es ninguna de las anteriores, es interno de la empresa → `Negocio/<área>/`.

## Estructura

```
Negocio/
  estrategia/
  marketing/
  operaciones/
  contabilidad/
  finanzas/
  talento-humano/

Clientes/
  <cliente-slug>/
    propuesta-comercial/
    facturas/
    documentos-legales/
      societario/
      contratos/
      compliance-kyc/
      tributario/
      poderes-y-representacion/
      propiedad-intelectual/
      litigios-y-contingencias/
    conceptos-juridicos/

Herramientas/
  skills-y-plugins/
  mcp-servers/
  documentacion-tecnica/

Personal/
  juan-manuel/
```

## Regla del slug de cliente

`<cliente-slug>` es el nombre comercial en minúsculas, con guiones, sin razón
social ni sufijos (S.A.S., Ltda.). Si el cliente ya tiene carpeta con un slug
distinto, se reutiliza ese — nunca se crean dos carpetas para el mismo cliente.
Antes de crear una carpeta de cliente nueva, buscar si ya existe con otra grafía.

## Ninguna carpeta nueva de primer nivel sin confirmar

Si un documento no encaja en `Negocio/`, `Clientes/`, `Herramientas/` o
`Personal/`, se pregunta antes de inventar una quinta rama.

## Versiones

Una sola convención en todo el repo, adoptada el 5 de octubre de 2026:

- El documento vigente lleva el nombre sin sufijo de versión.
- Las versiones anteriores van en una carpeta `versiones-anteriores/` junto al
  documento, con sufijo `-v1`, `-v2`, en orden cronológico.
- Un documento en revisión con una contraparte lleva una subcarpeta por versión.
- Nada se sobrescribe: antes de reemplazar el vigente, el anterior pasa a
  `versiones-anteriores/`.
- Un archivo que se llame «final» no significa nada; se decide por fecha y por
  contenido, nunca por el nombre.

Antes de entregar o publicar un documento de cliente se corre
`python3 Herramientas/verificar-cruces-clientes.py <archivo>`.
