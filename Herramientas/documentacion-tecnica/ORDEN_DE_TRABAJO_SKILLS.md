# Orden de trabajo: Construcción de Skills Bedrock

Instrucciones para la construcción, validación y entrega de skills de generación de documentos. Sigue los siete pasos. Entre cada paso, verifica y reporta antes de continuar.

---

## Paso 0: Decisiones previas (sin escribir una línea de código)

Antes de tocar cualquier archivo, recolecta las seis decisiones que definen el skill. Para cada una, trae una recomendación concreta en lugar de dejar campos en blanco.

### 0.1 Nombre del skill

Decisión: ¿Cuál es el nombre de la herramienta MCP que generará los documentos?

Recomendación propuesta: `bedrock-[tipo]-generator` (ej: bedrock-proposal-generator, bedrock-compliance-generator).

Pregunta antes de continuar: ¿Aprobado?

### 0.2 Paleta de colores

Decisión: ¿Qué colores PANTONE se usan en este skill?

Recomendación propuesta: Usar la paleta corporativa de Bedrock (Azul 4146 C, Terracota 7600 C, Beige 4029 C). Si el skill requiere colores adicionales (ej: rojo para crítico, amarillo para advertencia), justificar y verificar disponibilidad de PANTONE.

Pregunta antes de continuar: ¿Aprobado? ¿Hay colores adicionales?

### 0.3 Tipografía principal (títulos)

Decisión: ¿Qué fuente se usa para títulos?

Recomendación propuesta: Nexa Bold (ya verificada, licencia comercial clara).

Si usar otra: verificar que esté disponible en Google Fonts o con licencia comercial clara. No afirmar "es libre" sin traer la URL de la licencia.

Pregunta antes de continuar: ¿Aprobado?

### 0.4 Tipografía secundaria (body text)

Decisión: ¿Qué fuente se usa para textos largos?

Recomendación propuesta: Tinos (serif, alta legibilidad en imprenta, licencia verificada).

Si usar otra: traer verificación de licencia.

Pregunta antes de continuar: ¿Aprobado?

### 0.5 Textos fijos

Decisión: ¿Qué textos corporativos van en TODOS los documentos?

Recomendación propuesta: 
- Header: "BEDROCK ABOGADOS" + logo + línea dorada
- Footer: teléfono, email, web, redes sociales
- Marca de página: "Documento confidencial | Bedrock Abogados | [fecha]"

Pregunta antes de continuar: ¿Aprobado? ¿Hay variaciones por tipo de documento?

### 0.6 Taxonomía del eyebrow (etiqueta superior)

Decisión: ¿Qué categoría o tipo de documento aparece como etiqueta encima del título?

Recomendación propuesta:
- Propuestas: "PROPUESTA COMERCIAL"
- Reportes: "REPORTE - [TIPO]"
- Contratos: "CONTRATO DE [TIPO]"
- Presentaciones: "[NÚMERO] DIAPOSITIVAS"

Pregunta antes de continuar: ¿Aprobado?

---

## Paso 1: Arquitectura del skill

Crea la estructura de carpetas y archivos que contendrá el skill.

Estructura recomendada:

```
~/.claude/skills/bedrock-[nombre]/
├── INSTALAR.md              # Instrucciones de instalación
├── README.md                # Descripción del skill
├── identidad.json           # Archivo de identidad (paso 2)
├── templates/               # Plantillas de documentos
│   ├── portada.html
│   ├── contenido.html
│   └── footer.html
├── estilos/
│   ├── colores.css
│   ├── tipografia.css
│   └── layout.css
└── prueba/
    └── documento-prueba.md  # Documento de prueba (paso 6)
```

Verifica:
```bash
tree ~/.claude/skills/bedrock-[nombre]/
```

Debe mostrar la estructura completa sin errores.

---

## Paso 2: Archivo de identidad (ANTES de cualquier plantilla)

Crea un único archivo `identidad.json` que centraliza TODOS los valores de marca. Este archivo es la fuente de verdad.

### 2.1 Estructura del identidad.json

```json
{
  "marca": {
    "nombre": "BEDROCK ABOGADOS",
    "tagline": "Derecho para empresas en movimiento"
  },
  "paleta": {
    "primario": "#1B1D36",
    "primario_pantone": "4146 C",
    "secundario": "#224D6E",
    "secundario_pantone": "3581 C",
    "acento": "#8D5A4C",
    "acento_pantone": "7600 C",
    "fondo": "#E9CDA5",
    "fondo_pantone": "4029 C",
    "texto": "#000000",
    "texto_claro": "#FFFFFF",
    "advertencia": "#FF6B35",
    "exito": "#2ECC71",
    "error": "#E74C3C"
  },
  "tipografia": {
    "principal": "Nexa Bold",
    "principal_url": "https://fonts.google.com/specimen/...",
    "principal_licencia": "SIL Open Font License 1.1",
    "secundaria": "Tinos",
    "secundaria_url": "https://fonts.google.com/specimen/Tinos",
    "secundaria_licencia": "Apache License 2.0"
  },
  "espaciado": {
    "margen_pagina": "40px",
    "espacio_titulo": "60px",
    "espacio_parrafo": "20px",
    "interlineado": "1.6"
  },
  "textos_fijos": {
    "header": "BEDROCK ABOGADOS",
    "footer_telefono": "+57 (1) 1234-5678",
    "footer_email": "contacto@bedrockabogados.com",
    "footer_web": "www.bedrockabogados.com",
    "marca_pagina": "Documento confidencial | Bedrock Abogados"
  }
}
```

### 2.2 Verificación de duplicación

Después de crear `identidad.json`, busca en TODAS las plantillas que no haya códigos hexadecimales duplicados:

```bash
grep -r "#[0-9A-F]\{6\}" ~/.claude/skills/bedrock-[nombre]/templates/ | grep -v identidad.json
```

Debe retornar vacío. Si hay resultados, corrige: los colores deben venir del identidad.json, no estar hardcodeados.

Verifica también que no haya PANTONE duplicados:

```bash
grep -r "PANTONE" ~/.claude/skills/bedrock-[nombre]/ | wc -l
```

Debe contar solo una aparición de cada PANTONE (en identidad.json).

Reporta: ✓ Archivo de identidad creado, cero duplicaciones de hex, cero duplicaciones de PANTONE.

---

## Paso 3: Plantillas base

Crea las plantillas HTML/Markdown que todos los documentos usan.

### 3.1 Portada (portada.html)

```html
<!-- Carga identidad.json y aplica: -->
<!-- - Fondo: color primario (de identidad.json) -->
<!-- - Logo: imagen Bedrock -->
<!-- - Título: Nexa Bold (de identidad.json) -->
<!-- - Línea dorada separadora -->
```

Verifica:
- Los colores vienen de identidad.json, NO hardcodeados
- La tipografía es Nexa Bold con fallback
- La línea dorada usa el color acento de identidad.json

### 3.2 Header (header.html)

```html
<!-- 
- Logo Bedrock pequeño
- Nombre: BEDROCK ABOGADOS (de textos_fijos en identidad.json)
- Línea dorada de 2px
- Datos: teléfono, email (de identidad.json)
-->
```

### 3.3 Footer (footer.html)

```html
<!--
- Línea azul primario
- Teléfono, email, web (de textos_fijos en identidad.json)
- Redes sociales
- Marca de página: "Documento confidencial | Bedrock Abogados" + fecha
-->
```

### 3.4 Contenido (contenido.html)

```html
<!--
- Tipografía secundaria (Tinos, de identidad.json)
- Títulos: Nexa Bold, color primario
- Subtítulos: color acento
- Márgenes: 40px (de identidad.json)
- Interlineado: 1.6 (de identidad.json)
-->
```

Verifica:
```bash
grep -r "color:" ~/.claude/skills/bedrock-[nombre]/templates/ | grep -v identidad.json
```

Debe retornar vacío. Todos los colores deben referenciarse desde identidad.json.

---

## Paso 4: Generador de documentos (MCP Tool)

Crea la herramienta MCP que toma datos + plantillas + identidad y genera el documento.

### 4.1 Lógica

```
Entrada: {
  tipo: "propuesta" | "reporte" | "contrato" | "presentacion",
  titulo: string,
  cliente: string,
  contenido: string,
  formato: "pdf" | "docx" | "pptx"
}

Proceso:
1. Carga identidad.json
2. Inyecta identidad en portada.html
3. Inyecta identidad en header.html
4. Inyecta identidad en footer.html
5. Renderiza contenido con plantilla de contenido.html
6. Exporta a formato solicitado

Salida: documento con identidad aplicada
```

### 4.2 Prohibición 1: No unificar pipelines

Cada tipo de documento (propuesta, reporte, contrato, presentación) DEBE tener su propio pipeline. No crear un único pipeline que trate todos. Razón: permite ajustes específicos por tipo sin afectar a otros.

Verifica:
```bash
ls ~/.claude/skills/bedrock-[nombre]/generadores/
```

Debe mostrar: `generador-propuesta.js`, `generador-reporte.js`, `generador-contrato.js`, `generador-presentacion.js`.

No puede haber un único `generador.js`.

### 4.3 Prohibición 2: No poner tipografía de marca en contratos

Excepción: los contratos usan solo Tinos (tipografía secundaria, legible en cuerpo de texto). No usar Nexa Bold en el cuerpo de cláusulas. Nexa Bold solo en título y número de cláusula.

Verifica:
```bash
grep -A 5 "cláusula" ~/.claude/skills/bedrock-[nombre]/templates/contenido-contrato.html | grep -i "nexa"
```

Debe retornar vacío en el contenido de cláusula. Solo en números/títulos.

### 4.4 Prohibición 3: Licencia de tipografía verificada

Si usar una fuente que NO sea Nexa Bold o Tinos:
- Traer URL de la licencia
- Verificar que sea comercialmente libre (GPL, Apache, SIL, etc.)
- Si no se puede verificar, decir "No verificada, propongo usar Tinos en su lugar"

Nunca afirmar "es libre" sin la URL.

---

## Paso 5: Documento de prueba (con lo difícil a propósito)

Crea un documento de prueba que incluya los cinco defectos más probables.

### 5.1 Especificación del documento

```markdown
# Documento de Prueba - [Tipo]

## Tabla de 4 columnas (la última vacía)

| Elemento | Descripción | Cantidad | Notas |
|----------|-------------|----------|-------|
| Item A   | Descripción larga que se extiende en múltiples líneas para probar si la tabla se desbordan en el PDF | 10 | |
| Item B   | Otra descripción | 20 | |

## Texto en 2 columnas

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. [... texto largo de mínimo 200 palabras ...]

## Título de portada largo que debe caber en la página sin partir

"Propuesta de Asesoría Legal Integral para Estructuración de Series A con Análisis de Cumplimiento Normativo y Optimización Tributaria"

## Ruta en monoespaciado

```
/Users/juanma/Documents/Bedrock IA/mcp-servers/bedrock-document-generator/src/index.ts
```

## Colores corporativos

- Primario: #1B1D36 (PANTONE 4146 C)
- Acento: #8D5A4C (PANTONE 7600 C)
```

### 5.2 Los cinco defectos a verificar

Genera el documento y MIRA LAS IMÁGENES. Si no miraste las imágenes, no verificaste.

1. **Tabla desbordada**: ¿La tabla de 4 columnas se desbordan en los márgenes o se escala correctamente?
2. **Texto en 2 columnas**: ¿El texto se distribuye en 2 columnas sin partir palabras incorrectamente?
3. **Título largo**: ¿El título de portada cabe en una línea o se parte correctamente sin huérfanos?
4. **Ruta monoespaciada**: ¿La ruta en código preserva monoespaciado sin convertirse a serif?
5. **Colores corporativos**: ¿Los hexadecimales mostrados coinciden exactamente con los de identidad.json?

Reporte:
```
✓ Tabla: [ESTADO]
✓ 2 columnas: [ESTADO]
✓ Título largo: [ESTADO]
✓ Ruta monoespaciado: [ESTADO]
✓ Colores: [ESTADO]
```

Si alguno dice "FALLA", corrige y repite paso 5.

---

## Paso 6: Seis pruebas de aceptación

Ejecuta todas. Si alguna falla, vuelve al paso que toca y repite.

### 6.1 Prueba: Color en identidad.json se refleja en todos los documentos

Cambio: Edita identidad.json y reemplaza `"primario": "#1B1D36"` por `"primario": "#FF0000"`.

Regenera documento.

Verifica:
- Header debe estar ROJO
- Separadores deben estar ROJO
- Título de portada debe estar ROJO
- Líneas corporativas deben estar ROJO

Si alguno no cambió a rojo, el sistema NO está bien construido. Vuelve al paso 2.

Reporte: ✓ Cambio de color propagado a PDF, DOCX y diagrama.

### 6.2 Prueba: Documento de prueba sin defectos visuales

Genera el documento de prueba y REVISA LAS IMÁGENES.

Verifica los cinco defectos del paso 5. Todos deben estar OK.

Reporte: ✓ Los 5 defectos verificados OK.

### 6.3 Prueba: No hay duplicación de valores de marca

Busca:
```bash
grep -r "#[0-9A-F]\{6\}" ~/.claude/skills/bedrock-[nombre]/ --exclude-dir=identidad | wc -l
```

Debe retornar 0 (cero). Si retorna > 0, hay hardcoding. Vuelve al paso 2.

Reporte: ✓ Cero duplicaciones de hexadecimales.

### 6.4 Prueba: Cada tipo de documento tiene su propio pipeline

Verifica:
```bash
ls ~/.claude/skills/bedrock-[nombre]/generadores/ | wc -l
```

Debe ser >= 4 (propuesta, reporte, contrato, presentación).

Verifica que NO haya un único `generador.js`:
```bash
[ -f ~/.claude/skills/bedrock-[nombre]/generadores/generador.js ] && echo "FALLA" || echo "OK"
```

Debe decir OK.

Reporte: ✓ Cuatro pipelines independientes.

### 6.5 Prueba: Contrato solo usa Tinos en cuerpo de cláusulas

Genera un contrato.

Mira la imagen: el cuerpo de las cláusulas debe estar en Tinos (serif).
Los números de cláusula y títulos pueden estar en Nexa Bold.

Si el cuerpo está en Nexa Bold, vuelve al paso 4.3.

Reporte: ✓ Contrato usa Tinos en cuerpo.

### 6.6 Prueba: Licencia de tipografía verificada

Para cada tipografía usada, verifica que está en identidad.json con URL de licencia:

```bash
grep -A 2 "tipografia" ~/.claude/skills/bedrock-[nombre]/identidad.json | grep "licencia"
```

Debe mostrar licencias verificables (Apache, SIL, GPL, etc.).

Reporte: ✓ Licencias verificadas: [lista].

---

## Paso 7: Documentación y entrega

Crea los archivos finales de documentación.

### 7.1 INSTALAR.md

```markdown
# Instalación de [Skill Bedrock]

## Requisitos

- [Listar requisitos específicos]

## Instalación

1. Comando a ejecutar
2. Verificación

## Uso

/[skill-name] [parámetros]

## Prueba

[Comando de prueba exacto]
```

### 7.2 README.md

```markdown
# [Skill Bedrock]

Breve descripción.

## Características

- 
- 

## Ejemplos

[3-5 ejemplos de uso]

## Notas

- Usa identidad corporativa de Bedrock
- Todos los valores de marca en identidad.json
- Tipografía verificada con licencia comercial
```

### 7.3 Verificación final

```bash
find ~/.claude/skills/bedrock-[nombre]/ -type f -name "*.json" -o -name "*.md" -o -name "*.html"
```

Debe listar todos los archivos necesarios sin errores.

Verifica que NO haya:
- Archivos temporales
- Valores hardcodeados
- Tipografías sin licencia

Reporte: ✓ Documentación completa, cero archivos temporales.

---

## Resumen de prohibiciones explícitas

1. **No unificar pipelines**: Cada tipo de documento debe tener su propio generador.
2. **No poner Nexa Bold en cuerpo de contratos**: Solo Tinos en cláusulas.
3. **No usar tipografía sin verificar licencia**: Si no tienes URL de licencia comercial, propone alternativa libre.

---

## Checklist de entrega

- [ ] Paso 0: Las 6 decisiones aprobadas
- [ ] Paso 1: Arquitectura completa
- [ ] Paso 2: identidad.json centralizado, cero duplicaciones
- [ ] Paso 3: Plantillas base sin hardcoding de colores
- [ ] Paso 4: Generadores específicos por tipo, prohibiciones cumplidas
- [ ] Paso 5: Documento de prueba con los 5 defectos verificados
- [ ] Paso 6: Las 6 pruebas de aceptación pasadas
- [ ] Paso 7: Documentación completa

---

## Notas

- Si en cualquier paso tienes una pregunta, detente y reporta antes de continuar.
- Si una prueba falla, vuelve al paso indicado. No saltes.
- La verificación de imágenes en paso 5 y 6.2 es CRÍTICA. No afirmes OK sin mirar.
- El paso 2 (identidad.json) es la base. Si falla, todo lo demás falla.

