# Formateador Profesional - Bedrock Finanzas 2026

Este directorio contiene herramientas para aplicar formatos visuales profesionales al Google Sheet "Bedrock Finanzas 2026".

## Opciones disponibles

### Opción 1: Ejecutar script Node.js (Recomendado)

El script `format-bedrock-sheets.js` utiliza la Google Sheets API directamente para aplicar todos los formatos.

**Requisitos:**
- Node.js instalado
- Credenciales de OAuth configuradas en `credentials/oauth_client.json`
- Token de autorización en `credentials/token.json`

**Ejecución:**

```bash
cd /Users/juanma/Documents/Bedrock\ IA/configuracion-claude
node format-bedrock-sheets.js 1ycVoqMLgFs7gsFYJJsp_oowETT7bP2455-B0r724mQQ
```

El script:
- Crea las 8 pestañas necesarias
- Reorganiza los datos en cada pestaña
- Aplica paleta de colores corporativa
- Formatea tipografía según especificaciones
- Aplica bordes y espaciado profesional
- Configura formatos de moneda (COP)
- Crea gráficos automáticos en Dashboard

### Opción 2: Usar Apps Script (Manual)

El archivo `sheets-formatter.gs` es un Apps Script de Google Sheets completo.

**Pasos:**

1. Abre el Google Sheet "Bedrock Finanzas 2026" en tu navegador
2. Ve a **Extensiones → Apps Script**
3. En el editor que se abre, elimina el código por defecto
4. Copia todo el contenido de `sheets-formatter.gs`
5. Pega el código en el editor
6. Presiona **Ctrl + S** (o **Cmd + S** en Mac) para guardar
7. En el desplegable de funciones (arriba a la izquierda), selecciona `formatearBedrockFinanzas`
8. Presiona el botón ▶️ (Ejecutar)
9. Autoriza cuando se pida permiso

El script tardará 1-2 minutos en completar. Verifica el registro de ejecución para confirmar que fue exitoso.

## Especificaciones de formato aplicadas

### Paleta de colores
- **Azul corporativo (#1E3A8A):** Títulos y encabezados principales
- **Verde (#15803D):** Números positivos, ingresos, flujos positivos
- **Rojo (#DC2626):** Números negativos, gastos, flujos negativos
- **Gris claro (#F8F9FA):** Fondos alternados en tablas
- **Gris oscuro (#1F2937):** Texto principal
- **Blanco:** Fondos normales
- **Borde sutil (#E5E7EB):** Divisores y bordes

### Tipografía
- **Títulos (Poppins 16px bold):** Encabezados de pestaña y secciones
- **Encabezados de tabla (Inter 12px bold):** Títulos de columnas
- **Números/Montos (Roboto Mono 11px):** Alineados a derecha, formato COP
- **Texto normal (Inter 11px):** Contenido regular

### Formato de celdas
- Todos los montos: **$#,##0** (Formato moneda COP)
- Porcentajes: **0.00%**
- Fechas: **DD/MM/YYYY**
- Alineación: Texto izquierda, números derecha

### Estructura visual
- Fondos alternados en tablas (blanco / #F8F9FA)
- Grid completo de bordes (#E5E7EB)
- Bordes gruesos para separar secciones
- Márgenes y espaciado uniforme

### Validaciones visuales
- Celdas rojas (#DC2626): Si balance NO cuadra
- Celdas amarillas (#EA580C): Ratios fuera de umbral
- Celdas verdes (#15803D): Todo conforme

## Estructura de pestañas

1. **Configuración:** Datos base (mes, año, empresa, moneda)
2. **Dashboard:** Resumen ejecutivo con gráficos
3. **Diario de Ingresos:** Transacciones de ingresos con categorización
4. **Diario de Gastos:** Transacciones de gastos con análisis por categoría
5. **Balance General:** Activos, pasivos, patrimonio
6. **Estado de Resultados:** Ingresos vs gastos, utilidad/pérdida
7. **Flujo de Caja:** Flujos operacional, inversión, financiero
8. **KPIs y Análisis:** Indicadores de liquidez, rentabilidad, eficiencia

## Gráficos generados

- **Ingresos vs Gastos (Agosto):** Gráfico de barras
- **Composición de gastos:** Gráfico de pastel por categoría
- **Tendencia de flujo de caja:** Gráfico de línea (histórico si disponible)

## Solución de problemas

### "Error: No existe credentials/token.json"
Ejecuta `npm run authorize` en el directorio `mcp-servers/drive-mcp` para generar el token OAuth.

### "Script tardó demasiado"
Es normal que tarde 1-2 minutos. No cierres la ventana. Verifica el registro de ejecución.

### "Algunos formatos no se ven"
Recarga la página (F5) después de que el script termine. Google Sheets a veces requiere recarga.

### "Falta información en algunas celdas"
El script usa fórmulas SUMIF/SUBTOTAL. Verifica que los nombres de categorías coincidan exactamente entre diarios y resúmenes.

## Archivos

- `format-bedrock-sheets.js` - Script Node.js (API directo)
- `sheets-formatter.gs` - Apps Script (copia manual)
- `FORMATTER-README.md` - Este archivo

## Resultado

Después de ejecutar cualquiera de las opciones, tu Sheet "Bedrock Finanzas 2026" tendrá:

✅ 8 pestañas organizadas y bien estructuradas
✅ Paleta de colores corporativa consistente
✅ Tipografía profesional (Poppins, Inter, Roboto Mono)
✅ Formatos de moneda COP con alineación derecha
✅ Validaciones visuales con colores
✅ Gráficos automáticos en Dashboard
✅ Listo para presentar a junta directiva

---

**Última actualización:** 2026-08-29
**Formato versión:** 1.0
