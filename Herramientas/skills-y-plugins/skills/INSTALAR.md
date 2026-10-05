# Instalación de los skills

Desde la raíz del repositorio:

```
bash Herramientas/instalar-skills.sh
```

El script compara cada skill de esta carpeta con el instalado en
`~/.claude/skills/`, muestra qué va a cambiar y pide confirmación. Antes de
reemplazar un skill instalado guarda una copia en `~/.claude/_archivo-skills/`.
Con `--dry-run` solo informa; con `--si` instala sin preguntar.

Si funcionó, una segunda corrida dice: «Todo instalado coincide con el repo».

Requisitos de cada skill (pandoc, XeLaTeX, LibreOffice, Python con Pillow) en su
propio `SKILL.md`.
