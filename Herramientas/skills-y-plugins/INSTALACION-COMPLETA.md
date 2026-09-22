# Configuración completa del Claude personal

Guía para dejar montado, en una máquina nueva, el asistente con la identidad de Bedrock y la capacidad de generar PDF, Word y páginas web con esa identidad.

Al final está el **prompt definitivo** para pegárselo al asistente y que lo haga él.

## Antes de empezar: qué NO hay que descargar

No hay repositorios que clonar. Todo lo que hace falta está en dos sitios:

1. **Programas del sistema**, que se instalan con Homebrew, más una librería de Python.
2. **Esta carpeta**, `~/Juan Manuel/configuracion-claude/`, que ya contiene los skills, las plantillas, los logotipos y los scripts.

Si vas a montarlo en otra máquina, lo único que hay que llevar es esta carpeta. Cópiala en una llave USB o en un disco: no la subas a la nube, porque contiene material propio y la carpeta personal tiene la regla de vivir solo en local.

## Paso 1 — Homebrew

Homebrew es el instalador de programas de macOS. Comprueba si ya está:

```
brew --version
```

Si responde con un número de versión, sigue al paso 2. Si dice que no encuentra el comando, instálalo:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Va a pedir la contraseña del equipo y tarda varios minutos. Al terminar imprime dos o tres comandos para añadirlo al PATH: hay que ejecutarlos, o Homebrew no quedará disponible en terminales nuevas.

## Paso 2 — Los programas del sistema

Uno por uno, en este orden. Después de cada uno, el comando de verificación.

**Pandoc.** Convierte Markdown a los demás formatos. Es el motor de todo.

```
brew install pandoc
pandoc -v
```

**BasicTeX.** El compositor que produce el PDF. La versión completa de TeX Live pesa más de cinco gigas; BasicTeX pesa unos trescientos megas y alcanza.

```
brew install --cask basictex
```

Después de instalarlo, **cierra la terminal y abre una nueva**, o el comando siguiente no lo va a encontrar. Luego añade los paquetes que usa la plantilla:

```
sudo tlmgr update --self
sudo tlmgr install fontspec titlesec fancyhdr lastpage booktabs tcolorbox fvextra setspace anyfontsize xcolor geometry colortbl array
xelatex --version
```

**LibreOffice.** Solo para revisar cómo queda el Word antes de enviarlo. Sin esto no se puede verificar el render.

```
brew install --cask libreoffice
soffice --version
```

**Poppler.** Convierte páginas de PDF a imagen, que es cómo se revisa el render.

```
brew install poppler
pdftoppm -v
```

**Node.** Solo si vas a construir páginas web y quieres que el asistente las pruebe en un navegador sin interfaz.

```
brew install node
node --version
```

**Pillow.** Librería de imágenes que usa el script de la página para incrustar el logotipo.

```
python3 -m pip install --user Pillow
python3 -c "import PIL; print('Pillow OK')"
```

Si algún comando falla, no sigas: pásale el error al asistente antes de continuar.

## Paso 3 — Los skills

Los skills son las capacidades que se le añaden al asistente. Van en `~/.claude/skills/`.

```
mkdir -p ~/.claude/skills
cd ~/Juan\ Manuel/configuracion-claude/skills
cp -R humanizar-texto llm-council bedrock-docs ~/.claude/skills/
chmod +x ~/.claude/skills/bedrock-docs/assets/*.sh
ls ~/.claude/skills/
```

Deberías ver las tres carpetas. Qué hace cada una:

| Skill | Función | Se invoca |
|---|---|---|
| `humanizar-texto` | Que ningún texto salga con las señales de escritura de máquina | Solo, en silencio |
| `llm-council` | Consejo de modelos para preguntas complejas | `/llm-council` |
| `bedrock-docs` | PDF, Word y páginas web con la identidad de Bedrock. Trae las plantillas y los tres scripts | Solo, al pedir un documento |

## Paso 4 — Las instrucciones globales

Es el archivo que el asistente lee en cualquier proyecto.

```
mkdir -p ~/.claude
cp ~/Juan\ Manuel/configuracion-claude/CLAUDE-personal.md ~/.claude/CLAUDE.md
```

Si ya existe un `CLAUDE.md` con contenido que quieras conservar, no lo sobrescribas: ábrelo y pega el contenido nuevo al final.

## Paso 5 — Reglas del gestor de tareas

Solo si vas a usar Linear desde el asistente. El archivo `reglas-de-linear.md` de esta carpeta no se instala: se le entrega al asistente cuando vaya a tocar Linear. Tiene dos huecos que solo puedes llenar tú, marcados en el propio archivo: los grupos de etiquetas y las líneas base de carga para estimar tiempo.

## Paso 6 — La prueba que confirma que quedó bien

Crea un documento de prueba y genera las dos salidas:

```
mkdir -p ~/Desktop/prueba-bedrock && cd ~/Desktop/prueba-bedrock
cat > demo.md <<'FIN'
---
title: "Documento de prueba de la plantilla"
eyebrow: "Prueba · interna"
lede: "Verifica que el mismo archivo fuente produzca el PDF y el Word con la identidad correcta."
doctype: "Prueba"
docdate: "27 de agosto de 2026"
docscope: "Interno"
docname: "Prueba-plantilla"
resumen:
  - "**Primero.** Un ítem del resumen de portada."
  - "**Segundo.** Otro ítem, para ver el filete lateral."
fineprint: "Este resumen es informativo."
---

# 1. Una sección

Texto de cuerpo con **negrilla** y una tabla.

| Campo | Contenido | Valor |
|---|---|---|
| Uno | Descripción breve | 10.000.000 |
| Dos | Otra descripción algo más larga para ver cómo parte | 15.000.000 |

## 1.1 Una subsección

Otro párrafo.
FIN

bash ~/.claude/skills/bedrock-docs/assets/build-pdf.sh demo.md
bash ~/.claude/skills/bedrock-docs/assets/build-docx.sh demo.md
open demo.pdf demo.docx
```

**Qué tienes que ver.** En el PDF: portada con el logotipo, la línea de acento azul y dorada, el título grande en azul oscuro, y desde la página dos el membrete con el logotipo arriba a la izquierda y la paginación a la derecha. En el Word: portada con el logotipo, el resumen con barra lateral, y el membrete repetido en cada página con «Página X de Y».

Si el PDF falla, casi siempre es que falta un paquete de TeX: el error dice cuál y se instala con `sudo tlmgr install <nombre>`.

## Cómo se usa a partir de ahí

Le pides el documento en lenguaje normal. El asistente escribe el `.md`, lo genera y te da la ruta. No tienes que nombrar el skill ni recordar los comandos.

Regla de flujo que no conviene romper: **el `.md` es la fuente de verdad**. Si hay que corregir algo, se corrige ahí y se regenera. Editar el PDF o el Word y no el fuente es lo que produce versiones que dicen cosas distintas.

---

# El prompt

Pégale esto tal cual al asistente en la máquina nueva, en una sesión nueva, con la carpeta `~/Juan Manuel/configuracion-claude/` ya copiada.

---

Vas a configurarte para trabajar conmigo. Todo lo que necesitas está en `~/Juan Manuel/configuracion-claude/`. No hay que clonar ningún repositorio.

Sigue la guía `INSTALACION-COMPLETA.md` de esa carpeta, en orden, sin adelantarte. Yo no soy ingeniero: para cada paso técnico dame el comando exacto que debo escribir, uno por mensaje cuando haya riesgo de equivocarme, y dime qué debería ver si funcionó. Si algo falla, explícame qué significa el error y dame el siguiente comando; no me pases la salida cruda.

El orden es este:

1. **Diagnostica primero.** Comprueba qué hay ya instalado: pandoc, XeLaTeX, LibreOffice, Poppler, Node y Pillow. Dime qué falta antes de instalar nada, y confírmame el espacio que va a ocupar.
2. **Instala solo lo que falte**, en el orden de la guía. Ojo con BasicTeX: después de instalarlo hay que abrir una terminal nueva antes de correr `tlmgr`, y `tlmgr` pide contraseña.
3. **Instala los tres skills** copiando las carpetas a `~/.claude/skills/`, y dale permiso de ejecución a los scripts de `bedrock-docs/assets/`.
4. **Instala las instrucciones globales** en `~/.claude/CLAUDE.md`. Si ya existe ese archivo con contenido, no lo sobrescribas: muéstrame qué tiene y decidimos.
5. **Corre la prueba del paso 6** de la guía. Genera el PDF y el Word, convierte las dos primeras páginas de cada uno a imagen y **míralas**. Dime qué ves y si algo está mal. No me digas que quedó bien sin haber mirado el render.
6. **Cierra con un resumen** de qué quedó instalado, dónde, y qué comando uso para generar un documento.

Reglas mientras trabajas en esto:

- No instales nada que no esté en la guía sin preguntarme.
- No modifiques las plantillas ni los logotipos. Están verificados.
- Si un paquete de TeX falla al instalarse, dime el nombre exacto y sigue con los demás; los pendientes los resolvemos al final.
- Si al final del paso 5 el render tiene defectos, no los maquilles: enuméralos y propón la corrección.

Cuando termines, lee también `como-construir-mi-skill-de-marca.md` y `reglas-de-linear.md` de esa misma carpeta, para que tengas el contexto de cómo está armado el sistema y cómo manejo las tareas. No hace falta que hagas nada con ellos todavía.
