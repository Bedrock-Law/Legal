# Especificación de Diseño: Dashboard Financiero
## Ingresos y Gastos — Agosto 2026

**Versión:** 1.0  
**Fecha:** 29 de agosto de 2026  
**Plataforma:** Google Sheets  
**Público:** Junta Directiva

---

## 1. Visión General

Dashboard ejecutivo que presenta en una sola vista los KPIs financieros principales, comparativas contra periodo anterior, desglose de gastos y tendencias semanales. Diseño profesional, neutral, apto para presentación ante stakeholders.

---

## 2. Estructura de Layout

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ ENCABEZADO (Merge A:F, 60px alto)                                               │
│ INGRESOS Y GASTOS — AGOSTO 2026                                                 │
│ Fondo azul #1E3A8A, texto blanco, Poppins 24px bold                            │
└──────────────────────────────────────────────────────────────────────────────────┘

[Fila vacía]

┌─────────────────────────────────────────────────────────────────────────────────┐
│ SECCIÓN 1: KPIs EJECUTIVOS (Filas 4-8)                                          │
│                                                                                   │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│ │ Ingresos     │ │ Gastos       │ │ Margen Neto  │ │ Flujo Neto   │            │
│ │ $15,100K     │ │ $8,350K      │ │ 97.68%       │ │ $6,750K      │            │
│ │ +10% vs jul  │ │ +6% vs jul   │ │ +2.1pp       │ │ +16% vs jul  │            │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

[Fila vacía]

┌─────────────────────────────────────────────────────────────────────────────────┐
│ SECCIÓN 2: COMPARATIVAS AGOSTO VS JULIO (Filas 10-24)                          │
│                                                                                   │
│ ┌──────────────────────┐         ┌──────────────────────┐                      │
│ │ Gráfico de Barras    │         │ Gráfico de Barras    │                      │
│ │ Ingresos             │         │ Gastos               │                      │
│ │ (800px x 400px)      │         │ (800px x 400px)      │                      │
│ └──────────────────────┘         └──────────────────────┘                      │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

[Fila vacía]

┌─────────────────────────────────────────────────────────────────────────────────┐
│ SECCIÓN 3: DESGLOSE POR CATEGORÍA (Filas 26-32)                                │
│                                                                                   │
│ ┌────────────┬─────────────┬──────────┬──────────┬──────────────┐              │
│ │ Categoría  │ Monto       │ % Total  │ Cambio   │ Comprobantes │              │
│ ├────────────┼─────────────┼──────────┼──────────┼──────────────┤              │
│ │ Nómina     │ $4,500,000  │ 53.9%    │ +5%      │ [Link]       │              │
│ │ Proveedor. │ $2,000,000  │ 23.9%    │ +8%      │ [Link]       │              │
│ │ Operacion. │ $1,500,000  │ 18.0%    │ +4%      │ [Link]       │              │
│ │ Otros      │ $350,000    │ 4.2%     │ +10%     │ [Link]       │              │
│ │ TOTAL      │ $8,350,000  │ 100.0%   │ +6%      │              │              │
│ └────────────┴─────────────┴──────────┴──────────┴──────────────┘              │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

[Fila vacía]

┌─────────────────────────────────────────────────────────────────────────────────┐
│ SECCIÓN 4: TENDENCIAS Y FLUJOS (Filas 34-48)                                   │
│                                                                                   │
│ Gráfico de Línea: Ingresos por Semana                                           │
│ ┌────────────────────────────────────────────────────────────────┐              │
│ │ Semana 1: 3,775K | Semana 2: 3,775K | Sem 3: 3,775K | Sem 4  │              │
│ │                         [Línea con relleno 20%, verde]         │              │
│ └────────────────────────────────────────────────────────────────┘              │
│                                                                   │              │
│ [Fila vacía]                                                     │              │
│                                                                   │              │
│ Gráfico Circular: Composición de Gastos por Categoría            │              │
│ ┌────────────────────────────────────────────────────────────────┐              │
│ │              [Pie: Nómina 53.9%, Prov 23.9%,                  │              │
│ │               Oper 18.0%, Otros 4.2%]                          │              │
│ └────────────────────────────────────────────────────────────────┘              │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Especificaciones de Formato

### 3.1 Paleta de Colores

| Nombre | Hex | Uso | Notas |
|--------|-----|-----|-------|
| **Azul Corporativo** | `#1E3A8A` | Encabezados, bordes primarios, títulos | Confianza, estabilidad financiera |
| **Teal Ejecutivo** | `#0F766E` | Acentos secundarios, hover, gráficos | Profesional, accesible |
| **Verde Ingresos** | `#15803D` | KPI positivos, variaciones al alza | Semántica: positivo |
| **Rojo Gastos** | `#DC2626` | Números de gastos, variaciones críticas | Semántica: atención |
| **Naranja** | `#EA580C` | Acentos terciarios en gráficos | Diferenciador visual |
| **Gris Claro** | `#F8F9FA` | Fondos de cards, encabezados tabla | Neutralidad, legibilidad |
| **Gris Oscuro** | `#1F2937` | Texto principal, títulos | Máximo contraste |
| **Gris Medio** | `#6B7280` | Etiquetas, subtexto, captions | Jerarquía visual |
| **Borde Sutil** | `#E5E7EB` | Divisores, bordes de cards | Separa sin ruido visual |
| **Blanco** | `#FFFFFF` | Fondo principal de cards, celdas | Limpieza visual |

### 3.2 Tipografía

| Elemento | Familia | Tamaño | Peso | Propiedades Adicionales |
|----------|---------|--------|------|------------------------|
| **H1 - Título Principal** | Poppins | 32px (2rem) | 700 | Uppercase, color azul corporativo |
| **H2 - Títulos Sección** | Poppins | 24px (1.5rem) | 600 | Color azul corporativo, text-wrap: balance |
| **H3 - Subtítulos** | Poppins | 16px (1rem) | 600 | Color gris oscuro |
| **Etiqueta KPI** | Inter | 13.6px (0.85rem) | 500 | Uppercase, letter-spacing: 0.05em, color gris medio |
| **Número KPI** | Roboto Mono | 28px (1.75rem) | 600 | Monoespaciado, color según semántica |
| **Variación %** | Inter | 13.6px (0.85rem) | 400 | Color según dirección (verde/rojo) |
| **Body / Contenido** | Inter | 15.2px (0.95rem) | 400 | Línea height: 1.6, color gris oscuro |
| **Números Tabla** | Roboto Mono | 15.2px (0.95rem) | 400 | Tabular nums, alineación derecha |
| **Encabezado Tabla** | Inter | 14.4px (0.9rem) | 600 | Uppercase, color gris oscuro, fondo claro |
| **Caption** | Inter | 13.6px (0.85rem) | 400 | Color gris medio, italic (si aplica) |

### 3.3 Dimensiones y Espaciado

| Elemento | Ancho Columna | Alto Fila | Notas |
|----------|---------------|----------|-------|
| **Encabezado** | Merge A:F (1200px total) | 60px | Poppins 24px bold, centrado |
| **KPI Card** | 200px (aprox. 1/4 del ancho) | 120px | Borde 1px #E5E7EB, padding: 1.5rem |
| **Divisor** | Merge A:F | 2px | Borde inferior #E5E7EB |
| **Tabla Header** | Var: 200px, Monto: 150px, %: 100px, Cambio: 100px, Link: 120px | 40px | Fondo #F8F9FA |
| **Tabla Datos** | (como header) | 35px | Alternancia blanco / #F8F9FA |
| **Tabla Total** | (como header) | 40px | Bold, fondo #F8F9FA, borde superior 2px azul |
| **Gráfico** | Aprox. 800px (4 cols) | 400px (barras, pie), 300px (línea) | Insertar como objeto flotante |

### 3.4 Espaciado Vertical

- Entre secciones: 2rem (32px)
- Entre título y contenido: 1.5rem (24px)
- Entre filas de tabla: 0 (sin espacios adicionales)
- Padding interno de cards: 1.5rem
- Margen general de documento: 1.5rem

---

## 4. Posición de Gráficos

### Gráfico 1: Barras — Comparativa de Ingresos

- **Ubicación:** Fila 10, columnas A:C (lado izquierdo)
- **Tipo:** Gráfico de Barras Agrupadas (Clustered Column)
- **Dimensiones:** 800px × 400px (aproximadamente)
- **Eje X:** Meses (Julio, Agosto)
- **Eje Y:** Ingresos (COP)
- **Rango de datos:** 
  - Etiqueta: Julio | Valor: 13,727,273
  - Etiqueta: Agosto | Valor: 15,100,000
- **Color de barras:** Teal `#0F766E`
- **Fuente:** Inter 11px
- **Mostrar:** Valores en la parte superior de cada barra

### Gráfico 2: Barras — Comparativa de Gastos

- **Ubicación:** Fila 10, columnas D:F (lado derecho)
- **Tipo:** Gráfico de Barras Agrupadas (Clustered Column)
- **Dimensiones:** 800px × 400px
- **Eje X:** Meses (Julio, Agosto)
- **Eje Y:** Gastos (COP)
- **Rango de datos:**
  - Etiqueta: Julio | Valor: 7,875,472
  - Etiqueta: Agosto | Valor: 8,350,000
- **Color de barras:** Rojo `#DC2626`
- **Fuente:** Inter 11px
- **Mostrar:** Valores en la parte superior de cada barra

### Gráfico 3: Línea — Ingresos por Semana

- **Ubicación:** Filas 24-34 (full width, A:F)
- **Tipo:** Gráfico de Línea con Marcadores (Smooth Spline)
- **Dimensiones:** 1200px × 300px
- **Eje X:** Semanas (Semana 1, 2, 3, 4)
- **Eje Y:** Ingresos (COP)
- **Rango de datos:**
  - Semana 1 (1-7 Ago): 3,775,000
  - Semana 2 (8-14 Ago): 3,775,000
  - Semana 3 (15-21 Ago): 3,775,000
  - Semana 4 (22-31 Ago): 3,775,000
- **Color de línea:** Verde `#15803D`
- **Relleno bajo la línea:** Sí, con transparencia 20% (RGBA)
- **Marcadores:** Círculos 6px, color verde
- **Eje Y:** Escala 0 a 4,000,000 (redondeado)

### Gráfico 4: Circular — Composición de Gastos

- **Ubicación:** Filas 36-48 (full width, A:F)
- **Tipo:** Gráfico Circular (Pie)
- **Dimensiones:** 1200px × 400px
- **Rango de datos:**
  - Nómina: 4,500,000 (53.9%)
  - Proveedores: 2,000,000 (23.9%)
  - Operacionales: 1,500,000 (18.0%)
  - Otros: 350,000 (4.2%)
- **Colores de segmentos:**
  - Nómina: Azul `#1E3A8A`
  - Proveedores: Teal `#0F766E`
  - Operacionales: Naranja `#EA580C`
  - Otros: Gris `#9CA3AF`
- **Mostrar:** Porcentajes en cada segmento + leyenda externa
- **Leyenda:** Derecha, Inter 11px

---

## 5. Fórmulas Necesarias

### 5.1 Variación Porcentual Ingresos

```
=(Ingresos_Agosto - Ingresos_Julio) / Ingresos_Julio * 100
=(15100000 - 13727273) / 13727273 * 100
= 10.0%
```

**Ubicación:** KPI card "Ingresos", línea de variación

### 5.2 Variación Porcentual Gastos

```
=(Gastos_Agosto - Gastos_Julio) / Gastos_Julio * 100
=(8350000 - 7875472) / 7875472 * 100
= 6.0%
```

**Ubicación:** KPI card "Gastos", línea de variación

### 5.3 Margen Neto

```
=((Ingresos - Gastos) / Ingresos) * 100
=((15100000 - 8350000) / 15100000) * 100
= 97.68%
```

**Ubicación:** KPI card "Margen Neto"

### 5.4 Flujo Neto

```
=Ingresos - Gastos
=15100000 - 8350000
= 6,750,000
```

**Ubicación:** KPI card "Flujo Neto"

### 5.5 Variación de Margen

```
=Margen_Agosto - Margen_Julio
=97.68% - 95.57%
= +2.1pp (puntos porcentuales)
```

**Ubicación:** KPI card "Margen Neto", línea de variación

### 5.6 Porcentaje de Participación por Categoría

Para cada categoría de gasto:

```
=(Gasto_Categoria / Total_Gastos) * 100

Nómina:       (4500000 / 8350000) * 100 = 53.9%
Proveedores:  (2000000 / 8350000) * 100 = 23.9%
Operacionales:(1500000 / 8350000) * 100 = 18.0%
Otros:        (350000 / 8350000) * 100 = 4.2%
```

**Ubicación:** Tabla, columna "% Total"

### 5.7 Variación de Cada Categoría vs Mes Anterior

Para cada categoría:

```
=(Gasto_Actual - Gasto_Anterior) / Gasto_Anterior * 100

Si Julio_Nómina = 4,285,714, Agosto_Nómina = 4,500,000:
=(4500000 - 4285714) / 4285714 * 100 = 5.0%

Si Julio_Proveedores = 1,851,852, Agosto = 2,000,000:
=(2000000 - 1851852) / 1851852 * 100 = 8.0%

Si Julio_Operacionales = 1,442,308, Agosto = 1,500,000:
=(1500000 - 1442308) / 1442308 * 100 = 4.0%

Si Julio_Otros = 318,598, Agosto = 350,000:
=(350000 - 318598) / 318598 * 100 = 10.0%
```

**Ubicación:** Tabla, columna "Cambio vs Julio"

### 5.8 Ingresos por Semana (4 semanas uniformes)

```
=Ingresos_Total / 4
=15,100,000 / 4
=3,775,000 (por semana)
```

**Notas:** Asume ingresos uniformes. Si hay variación real, usar datos históricos semanales.

---

## 6. Formato Condicional

### 6.1 Números Positivos (Ingresos, Variaciones al Alza)

- **Color del número:** Verde `#15803D`
- **Prefijo:** + (para variaciones porcentuales)
- **Formato:** $#,##0 (moneda) o 0.0% (porcentaje)

### 6.2 Números de Gastos

- **Color del número:** Rojo `#DC2626`
- **Formato:** $#,##0 (moneda)
- **Nota:** No aplicar prefijo de signo (gastos son implícitamente negativos)

### 6.3 Variaciones Negativas

- **Color del número:** Rojo `#DC2626`
- **Prefijo:** - (o mostrar con símbolo de flecha ↓)

### 6.4 Filas Alternas en Tabla

- Fila 1 (header): Fondo `#F8F9FA`
- Fila 2: Blanco
- Fila 3: Fondo `#F8F9FA`
- Fila 4: Blanco
- Fila 5 (Total): Fondo `#F8F9FA`, bold, borde superior 2px azul

---

## 7. Formato de Número Específico

### Moneda (COP)

```
Google Sheets: Formato > Número > Moneda personalizada
Patrón: $#,##0
Decimales: 0 (para montos principales)
Ejemplo: $15,100,000
```

### Porcentaje (Margen, Composición)

```
Google Sheets: Formato > Número > Porcentaje
Decimales: 2 (para margen, ej: 97.68%)
          1 (para variaciones, ej: +10.0%)
Ejemplo margen: 97.68%
Ejemplo variación: +10.0%
```

---

## 8. Hipervínculos a Comprobantes

### Ubicación

Columna E de la tabla de desglose de gastos (una fila por cada categoría).

### Formato

- **Texto visible:** 📎 Comprobantes
- **Color del texto:** Teal `#0F766E`
- **Subrayado:** Sí
- **Tamaño:** Inter 11px

### Destino del Enlace (Opciones)

1. **Google Drive Folder:** Carpeta específica por categoría  
   `https://drive.google.com/drive/folders/FOLDER_ID`

2. **Sheet de Auditoría:** Otra hoja del mismo documento  
   `=HYPERLINK("#gid=123456", "📎 Comprobantes")`  
   (Reemplazar 123456 con el ID de la hoja)

3. **Sistema Contable Externo:** URL del ERP/sistema contable  
   `https://sistema-contable.com/gastos/nomina/2026-08`

4. **Carpeta Compartida Bedrock:** Ruta interna  
   `https://drive.google.com/drive/folders/[BEDROCK_GASTOS_ID]`

---

## 9. Guía de Implementación Paso a Paso

### Paso 1: Crear Sheet Base

1. Abrir Google Sheets
2. Crear documento nuevo: "Dashboard_Ingresos_Gastos_Agosto_2026"
3. En la primera hoja, establecer ancho de columnas:
   - A: 200px
   - B: 200px
   - C: 200px
   - D: 200px
   - E: 200px
   - F: 200px

### Paso 2: Encabezado

1. Seleccionar A1:F1 y hacer merge
2. Escribir: `INGRESOS Y GASTOS — AGOSTO 2026`
3. Aplicar formato:
   - Fuente: Poppins, 24px, bold
   - Color de fondo: `#1E3A8A` (azul corporativo)
   - Color de texto: Blanco
   - Alineación: Centro + Vertical middle
   - Altura de fila: 60px

### Paso 3: Sección KPIs

Filas 4-6. Crear 4 cards:

**Card 1 (A4:B6):**
- A4: `INGRESOS TOTALES` (etiqueta)
- A5: `$15,100,000` (número, formato moneda)
- A6: `+10% vs julio` (variación, verde)
- Aplicar borde 1px `#E5E7EB`, fondo blanco
- Padding: 1.5rem

**Card 2 (C4:D6):**
- C4: `GASTOS TOTALES`
- C5: `$8,350,000` (rojo)
- C6: `+6% vs julio`
- Igual formato que Card 1

**Card 3 (E4:F6):**
- E4: `MARGEN NETO`
- E5: `97.68%` (formato porcentaje, 2 decimales)
- E6: `+2.1pp vs julio`

**Card 4 (agregar más columnas o nueva fila si es necesario):**
- Título: `FLUJO NETO`
- Valor: `$6,750,000` (verde)
- Cambio: `+16% vs julio`

### Paso 4: Fila Divisora

Fila 8: Aplicar borde inferior 2px `#E5E7EB` a todo el ancho.

### Paso 5: Gráficos de Comparativa

Fila 10 en adelante (aprox. filas 10-24):

1. Insertar > Gráfico
2. Tipo: Barras Agrupadas
3. Rango de datos (lado izquierdo, A:C):
   - Julio: 13,727,273
   - Agosto: 15,100,000
4. Color: Teal `#0F766E`
5. Repetir para gastos (lado derecho, D:F) en rojo `#DC2626`

### Paso 6: Tabla de Desglose de Gastos

Fila 26 en adelante:

1. Crear encabezado en fila 26:
   - A26: `Categoría`
   - B26: `Monto`
   - C26: `% Total`
   - D26: `Cambio vs Julio`
   - E26: `Comprobantes`
2. Aplicar formato a encabezado:
   - Fondo: `#F8F9FA`
   - Bold, uppercase, color gris oscuro
   - Altura: 40px
3. Llenar datos (filas 27-30):
   - Nómina, Proveedores, Operacionales, Otros
   - Aplicar formato moneda a columna B
   - Aplicar formato porcentaje a columnas C y D
   - Datos: Ver tabla en Sección 3 del documento visual
4. Fila 31: TOTAL
   - Bold, fondo `#F8F9FA`, borde superior 2px azul
5. Aplicar alternancia de colores (blanco / `#F8F9FA`) a filas 27-30

### Paso 7: Gráfico de Línea (Ingresos por Semana)

Filas 34-44 (aprox.):

1. Insertar > Gráfico
2. Tipo: Línea Suave (Smooth Spline)
3. Datos:
   - Semana 1: 3,775,000
   - Semana 2: 3,775,000
   - Semana 3: 3,775,000
   - Semana 4: 3,775,000
4. Línea: Verde `#15803D`, grosor 2px
5. Relleno bajo la línea: Verde con 20% transparencia
6. Marcadores: Círculos 6px verde
7. Altura: 300px

### Paso 8: Gráfico Circular (Composición de Gastos)

Filas 46-50 (aprox.):

1. Insertar > Gráfico
2. Tipo: Circular (Pie)
3. Datos:
   - Nómina: 4,500,000 → Azul `#1E3A8A`
   - Proveedores: 2,000,000 → Teal `#0F766E`
   - Operacionales: 1,500,000 → Naranja `#EA580C`
   - Otros: 350,000 → Gris `#9CA3AF`
4. Mostrar porcentajes en segmentos
5. Leyenda: Externa (derecha)
6. Altura: 400px

### Paso 9: Hipervínculos a Comprobantes

En columna E (filas 27-30):

1. Escribir: `📎 Comprobantes`
2. Seleccionar el texto
3. Click derecho > Insertar vínculo
4. Enlazar a carpeta Drive o hoja de auditoría
5. Aplicar formato: Teal `#0F766E`, subrayado

### Paso 10: Verificación Final

- [ ] Todos los números tienen formato correcto (moneda, porcentaje)
- [ ] Los colores coinciden con la paleta especificada
- [ ] Los gráficos están bien ubicados
- [ ] Los hipervínculos funcionan
- [ ] La hoja se ve bien en pantalla completa (1200px+)
- [ ] No hay errores de fórmula (verificar con `=ARRAYFORMULA` si aplica)

---

## 10. Notas Técnicas y Consideraciones

### Responsividad

Google Sheets no es responsive. Este diseño está optimizado para visualización en desktop con resolución mínima de 1200px. En dispositivos móviles, el dashboard será difícil de leer sin scroll horizontal.

**Alternativa:** Exportar el dashboard como PDF para compartición móvil.

### Actualización de Datos

Si los datos son dinámicos, conectar el sheet a una fuente externa mediante:
- `=IMPORTRANGE()` para datos de otros sheets
- `=QUERY()` para filtrar datos de un rango
- Google Sheets API para sincronización automática

### Control de Acceso

- Compartir sheet con miembros de junta directiva
- Permiso: "Visualizador" (lectura solamente)
- Restringir edición a: Administrador (tú)

### Versionado

Mantener copias con nomenclatura:
- `Dashboard_Ingresos_Gastos_Agosto_2026_v1.0` (actual)
- `Dashboard_Ingresos_Gastos_Agosto_2026_v1.1` (borrador)
- Archivar versiones antiguas en carpeta "Histórico"

### Auditoría de Comprobantes

Crear sheet adicional ("Auditoría") con:
- Listado de todas las transacciones
- Enlaces a documentos fuente
- Responsable de cada registro
- Fecha de reconciliación

Hipervincular desde tabla de gastos a esta sheet para trazabilidad.

---

## 11. Control de Versiones

| Versión | Fecha | Cambios | Estado |
|---------|-------|---------|--------|
| 1.0 | 29/08/2026 | Especificación inicial | Activo |

---

**Documento confidencial. Uso restringido a Junta Directiva y Administración de Bedrock.**
