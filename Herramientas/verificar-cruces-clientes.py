#!/usr/bin/env python3
"""Busca documentos de un cliente que contienen material de otro cliente.

Uso:
  python3 Herramientas/verificar-cruces-clientes.py            revisa todo Clientes/
  python3 Herramientas/verificar-cruces-clientes.py <archivo>  revisa un archivo antes de enviarlo
  --incluir-anteriores   en la revisión completa, revisa también versiones-anteriores/

Dos controles:
  1. Proporción: el documento nombra más a otro cliente que al de su carpeta.
  2. Destinatario y reserva: la portada ("Para ...") o el pie ("uso exclusivo de ...")
     nombran a un cliente distinto del de la carpeta. Este segundo control existe porque el
     error de la propuesta de Pulso de septiembre de 2026 pasó el primero: el cuerpo era de
     Pulso, pero la portada y el pie eran de Mississippi.

Las relaciones legítimas (contrapartes de un litigio) se declaran en LEGITIMO.
Requiere pdftotext (poppler) para leer PDF.
"""
import re, html, os, subprocess, zipfile, sys

import pathlib
RAIZ = str(pathlib.Path(__file__).resolve().parent.parent / "Clientes")

# término de búsqueda -> cliente canónico
TERMINOS = {
 r"pulso\s+proyectos|BED-PULSO": "pulso-proyectos",
 r"serlog[ií]sticos|BED-SERLOG": "serlogisticos",
 r"mississippi|misisipi|BED-MISI": "ph-misisipi",
 r"libe\s+legal|BED-LIBE": "libe-legal",
 r"manzanares": "manzanares-de-la-cuenca",
 r"credix": "credix1",
 r"factus": "factus",
 r"ambiente\s+azul": "ambiente-azul",
 r"serp[eé]lvica|be.?pelvic": "be-pelvic-serpelvica",
 r"btg\s+pactual|BED-BTG": "btg-pactual",
 r"jhonatan": "jhonatan-londono",  # el apellido solo es común: da falsos positivos
 r"finup": "finup",
 r"\bminca\b": "minca",
 r"\btuya\b|asobele|asovele": None,  # se resuelve abajo
 r"asovele[nñ]os|asobele[nñ]os": "asovelenos",
}
TERMINOS = {k: v for k, v in TERMINOS.items() if v}
TERMINOS[r"compa[nñ][ií]a de financiamiento tuya|\btuya s\.a\."] = "tuya"

# relaciones legítimas conocidas: carpeta -> clientes que puede nombrar sin ser contaminación
LEGITIMO = {
 "jhonatan-londono": {"serlogisticos"},      # contraparte del litigio laboral
 "serlogisticos":    {"jhonatan-londono"},   # el mismo litigio, visto del otro lado
 "ambiente-azul":    set(),
 "credix1":          set(),
 "minca":            set(),
}

def texto(ruta):
    ext = ruta.lower().rsplit(".", 1)[-1]
    try:
        if ext in ("md", "txt"):
            return open(ruta, encoding="utf-8", errors="ignore").read()
        if ext in ("html", "htm"):
            t = open(ruta, encoding="utf-8", errors="ignore").read()
            t = re.sub(r"<script.*?</script>", " ", t, flags=re.S)
            t = re.sub(r"<style.*?</style>", " ", t, flags=re.S)
            return html.unescape(re.sub(r"<[^>]+>", " ", t))
        if ext == "pdf":
            r = subprocess.run(["pdftotext", "-q", ruta, "-"], capture_output=True, timeout=60)
            return r.stdout.decode("utf-8", "ignore")
        if ext in ("docx", "dotx"):
            with zipfile.ZipFile(ruta) as z:
                x = z.read("word/document.xml").decode("utf-8", "ignore")
            return re.sub(r"<[^>]+>", " ", x)
    except Exception:
        return ""
    return ""

EXT = (".md", ".txt", ".html", ".htm", ".pdf", ".docx")
filas, revisados = [], 0
ARGS = [a for a in sys.argv[1:] if not a.startswith("--")]
INCLUIR_ANTERIORES = "--incluir-anteriores" in sys.argv
OBJETIVO = os.path.abspath(ARGS[0]) if ARGS else None
for dp, dn, fn in os.walk(RAIZ):
    dn[:] = [d for d in dn if d not in ("node_modules", ".git")]
    for f in fn:
        if not f.lower().endswith(EXT): continue
        ruta = os.path.join(dp, f)
        if OBJETIVO and os.path.abspath(ruta) != OBJETIVO: continue
        if not OBJETIVO and not INCLUIR_ANTERIORES and "versiones-anteriores" in ruta.split(os.sep): continue
        rel = os.path.relpath(ruta, RAIZ)
        carpeta = rel.split(os.sep)[0]
        t = texto(ruta)
        if not t or len(t) < 200: continue
        revisados += 1
        t = re.sub(r"\s+", " ", t)
        hits = {}
        for pat, cli in TERMINOS.items():
            n = len(re.findall(pat, t, re.I))
            if n: hits[cli] = hits.get(cli, 0) + n
        for m in re.finditer(r"(uso exclusivo de[l]?\s+[^.]{3,80}|Para (?:los miembros|el consejo)[^·]{0,80})", t, re.I):
            frag = m.group(0)
            for pat, cli in TERMINOS.items():
                if re.search(pat, frag, re.I) and cli != carpeta and cli not in LEGITIMO.get(carpeta, set()):
                    filas.append((rel, carpeta, 0, {f"portada/pie→{cli}": 1}))
        propio = hits.get(carpeta, 0)
        ajenos = {k: v for k, v in hits.items() if k != carpeta and k not in LEGITIMO.get(carpeta, set())}
        if ajenos and sum(ajenos.values()) > propio and not OBJETIVO:
            filas.append((rel, carpeta, propio, ajenos))

print(f"Archivos con texto revisados: {revisados}")
print(f"Posibles cruces entre clientes: {len(filas)}\n")
if not filas:
    print("Sin cruces. El documento solo nombra a su cliente." if OBJETIVO else "Sin cruces en Clientes/.")
if filas:
    print(f"{'archivo':<76}{'propio':>7}  ajenos")
    print("-"*132)
    for rel, carp, pr, aj in sorted(filas, key=lambda x: -sum(x[3].values())):
        a = ", ".join(f"{k}×{v}" for k, v in sorted(aj.items(), key=lambda x: -x[1]))
        print(f"{rel[:74]:<76}{pr:>7}  {a}")
