# Nexa Bold — pendiente de licencia

Nexa Bold es una tipografía comercial de Fontfabric. Esta carpeta no trae el archivo de la fuente porque no se puede redistribuir sin la licencia comprada.

Para activarla en el PDF, el Word y la página web:

1. Compra la licencia y copia aquí el archivo (`Nexa-Bold.otf` o `.ttf`).
2. En `assets/bedrock-doc.latex`, cambia `\bkDisplay` para que apunte a este archivo en lugar de a Montserrat ExtraBold.
3. En `assets/plantilla-web.html`, agrega el `@font-face` de Nexa Bold embebido en base64 (mismo patrón que Montserrat y Tinos) y ajusta `--display` en `:root`.

Mientras tanto, todo el skill usa Montserrat ExtraBold como reemplazo del rol de Nexa Bold — misma paleta y jerarquía, sin bloquear el uso del skill por no tener la licencia todavía.
