#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convierte la referencia por defecto de pandoc en la plantilla de Word de Bedrock."""
import re, pathlib, sys

D = pathlib.Path("desempacado")
W = D / "word"

PRIMARIO   = "1B1D36"
SECUNDARIO = "224D6E"
ACENTO     = "E9CDA5"
GRIS       = "6B6F7A"
LINEA      = "E2E6EB"

# ---------------------------------------------------------------- 1) tipografias
tema = W / "theme" / "theme1.xml"
t = tema.read_text(encoding="utf-8")
t = re.sub(r'(<a:majorFont>\s*<a:latin typeface=")[^"]*"', r'\1Helvetica Neue"', t, count=1)
t = re.sub(r'(<a:minorFont>\s*<a:latin typeface=")[^"]*"', r'\1Georgia"', t, count=1)
tema.write_text(t, encoding="utf-8")
assert 'typeface="Helvetica Neue"' in t and 'typeface="Georgia"' in t, "tipografias no aplicadas"

# ---------------------------------------------------------------- 2) estilos
est = W / "styles.xml"
x = est.read_text(encoding="utf-8")

# cuerpo: 10.5 pt, justificado, interlineado 1.3
x = x.replace(
    '<w:sz w:val="24"/>\n        <w:szCs w:val="24"/>\n        <w:lang',
    '<w:sz w:val="21"/>\n        <w:szCs w:val="21"/>\n        <w:lang', 1)
x = x.replace(
    '<w:pPrDefault>\n      <w:pPr>\n        <w:spacing w:after="200"/>',
    '<w:pPrDefault>\n      <w:pPr>\n        <w:spacing w:after="160" w:line="312" w:lineRule="auto"/>\n        <w:jc w:val="both"/>', 1)

def retocar(sid, sz, color, negrilla=True, mayor=True):
    """Reescribe el rPr de un estilo de encabezado."""
    global x
    m = re.search(r'(<w:style [^>]*w:styleId="%s"[^>]*>.*?)(<w:rPr>.*?</w:rPr>)(\s*</w:style>)' % sid, x, re.S)
    assert m, "no encontre el estilo " + sid
    fuente = ('<w:rFonts w:asciiTheme="majorHAnsi" w:eastAsiaTheme="majorEastAsia" '
              'w:hAnsiTheme="majorHAnsi" w:cstheme="majorBidi"/>') if mayor else ''
    rpr = ("<w:rPr>" + fuente +
           ("<w:b/>" if negrilla else "") +
           '<w:color w:val="%s"/><w:sz w:val="%d"/><w:szCs w:val="%d"/></w:rPr>' % (color, sz, sz))
    x = x[:m.start(2)] + rpr + x[m.end(2):]

retocar("Heading1", 42, PRIMARIO)     # 21 pt
retocar("Heading2", 30, SECUNDARIO)   # 15 pt
retocar("Heading3", 24, SECUNDARIO)   # 12 pt

# los titulos no se justifican. jc va antes de outlineLvl, que cierra la secuencia
for sid in ("Heading1", "Heading2", "Heading3"):
    m = re.search(r'(<w:style [^>]*w:styleId="%s"[^>]*>.*?<w:pPr>)(.*?)(</w:pPr>)' % sid, x, re.S)
    cuerpo = m.group(2)
    if "<w:outlineLvl" in cuerpo:
        cuerpo = cuerpo.replace("<w:outlineLvl", '<w:jc w:val="left"/><w:outlineLvl', 1)
    else:
        cuerpo += '<w:jc w:val="left"/>'
    x = x[:m.end(1)] + cuerpo + x[m.start(3):]

# celdas de tabla: alineadas a la izquierda (heredan el justificado y parten los encabezados)
x = x.replace(
    '<w:style w:type="paragraph" w:customStyle="1" w:styleId="Compact">',
    '<w:style w:type="paragraph" w:customStyle="1" w:styleId="Compact">', 1)
m = re.search(r'(<w:style [^>]*w:styleId="Compact"[^>]*>.*?<w:pPr>)(.*?)(</w:pPr>)', x, re.S)
x = x[:m.end(1)] + m.group(2) + '<w:jc w:val="left"/>' + x[m.start(3):]

NUEVOS = f'''
<w:style w:type="paragraph" w:customStyle="1" w:styleId="Eyebrow"><w:name w:val="Eyebrow"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:spacing w:before="0" w:after="60"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:b/><w:caps/><w:color w:val="{SECUNDARIO}"/><w:spacing w:val="60"/><w:sz w:val="17"/><w:szCs w:val="17"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PortadaTitulo"><w:name w:val="Portada Titulo"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:spacing w:before="120" w:after="200" w:line="288" w:lineRule="auto"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:b/><w:color w:val="{PRIMARIO}"/><w:sz w:val="54"/><w:szCs w:val="54"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="Lede"><w:name w:val="Lede"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:spacing w:before="0" w:after="320"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:color w:val="000000"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="LineaAcento"><w:name w:val="Linea Acento"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:pBdr><w:bottom w:val="single" w:sz="18" w:space="0" w:color="{ACENTO}"/></w:pBdr><w:spacing w:before="0" w:after="200"/><w:ind w:right="7600"/></w:pPr>
 <w:rPr><w:sz w:val="2"/><w:szCs w:val="2"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="ResumenTitulo"><w:name w:val="Resumen Titulo"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:spacing w:before="200" w:after="120"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:b/><w:caps/><w:color w:val="{GRIS}"/><w:spacing w:val="40"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="ResumenItem"><w:name w:val="Resumen Item"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:pBdr><w:left w:val="single" w:sz="18" w:space="8" w:color="{SECUNDARIO}"/></w:pBdr><w:spacing w:before="60" w:after="60"/><w:ind w:left="160"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/></w:rPr></w:style>
<w:style w:type="paragraph" w:customStyle="1" w:styleId="FinePrint"><w:name w:val="Fine Print"/><w:basedOn w:val="Normal"/><w:qFormat/>
 <w:pPr><w:spacing w:before="240" w:after="0"/><w:jc w:val="left"/></w:pPr>
 <w:rPr><w:i/><w:color w:val="{GRIS}"/><w:sz w:val="16"/><w:szCs w:val="16"/></w:rPr></w:style>
<w:style w:type="character" w:customStyle="1" w:styleId="Campo"><w:name w:val="Campo"/><w:qFormat/>
 <w:rPr><w:shd w:val="clear" w:color="auto" w:fill="FFF3D6"/><w:color w:val="6B5218"/></w:rPr></w:style>
'''
x = x.replace("</w:styles>", NUEVOS + "</w:styles>")
est.write_text(x, encoding="utf-8")

# ---------------------------------------------------------------- 3) encabezado y pie
# el encabezado lleva el logotipo incrustado. Sin texto fijo: una plantilla
# reutilizable no puede traer la referencia de un documento concreto.
import shutil
media = W / "media"; media.mkdir(exist_ok=True)
shutil.copy("logo-bedrock.png", media / "logo-bedrock.png")

(W / "_rels" / "header1.xml.rels").write_text(
 '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
 '<Relationship Id="rIdLogo1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo-bedrock.png"/>'
 '</Relationships>', encoding="utf-8")

def imagen(rid, nombre, cx, cy, uid):
    return (f'<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
            f'<wp:extent cx="{cx}" cy="{cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/>'
            f'<wp:docPr id="{uid}" name="{nombre}"/>'
            f'<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>'
            f'<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
            f'<pic:pic><pic:nvPicPr><pic:cNvPr id="{uid}" name="{nombre}"/><pic:cNvPicPr/></pic:nvPicPr>'
            f'<pic:blipFill><a:blip r:embed="{rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>'
            f'<pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="{cx}" cy="{cy}"/></a:xfrm>'
            f'<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>'
            f'</pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>')

NS = ('xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" '
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" '
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" '
      'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
      'xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"')

HDR = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 f'<w:hdr {NS}>'
 f'<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="6" w:color="{LINEA}"/></w:pBdr>'
 f'<w:spacing w:after="0"/><w:jc w:val="left"/></w:pPr>'
 + imagen("rIdLogo1", "Bedrock Abogados", 613410, 118872, 101)
 + '</w:p></w:hdr>')

FTR = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
 <w:p><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="4" w:color="{LINEA}"/></w:pBdr>
  <w:spacing w:before="0" w:after="0"/><w:jc w:val="center"/></w:pPr>
  <w:r><w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:color w:val="{GRIS}"/><w:sz w:val="16"/></w:rPr><w:t xml:space="preserve">Página </w:t></w:r>
  <w:r><w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:color w:val="{GRIS}"/><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r>
  <w:r><w:instrText>PAGE</w:instrText></w:r>
  <w:r><w:fldChar w:fldCharType="end"/></w:r>
  <w:r><w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:color w:val="{GRIS}"/><w:sz w:val="16"/></w:rPr><w:t xml:space="preserve"> de </w:t></w:r>
  <w:r><w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:color w:val="{GRIS}"/><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r>
  <w:r><w:instrText>NUMPAGES</w:instrText></w:r>
  <w:r><w:fldChar w:fldCharType="end"/></w:r>
 </w:p>
</w:ftr>'''

(W / "header1.xml").write_text(HDR, encoding="utf-8")
(W / "footer1.xml").write_text(FTR, encoding="utf-8")

# relaciones
rels = W / "_rels" / "document.xml.rels"
r = rels.read_text(encoding="utf-8")
assert 'Id="rId901"' not in r
nuevas = ('<Relationship Id="rId901" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>'
          '<Relationship Id="rId902" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>')
r = r.replace("</Relationships>", nuevas + "</Relationships>")
rels.write_text(r, encoding="utf-8")

# tipos de contenido
ct = D / "[Content_Types].xml"
c = ct.read_text(encoding="utf-8")
add = ""
if "header+xml" not in c:
    add += '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>'
if "footer+xml" not in c:
    add += '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>'
if 'Extension="png"' not in c:
    add += '<Default Extension="png" ContentType="image/png"/>'
c = c.replace("</Types>", add + "</Types>")
ct.write_text(c, encoding="utf-8")

# ---------------------------------------------------------------- 4) seccion: carta, margenes, primera pagina distinta
doc = W / "document.xml"
d = doc.read_text(encoding="utf-8")
SECT = ('<w:sectPr>'
        '<w:headerReference w:type="default" r:id="rId901"/>'
        '<w:footerReference w:type="default" r:id="rId902"/>'
        '<w:pgSz w:w="12240" w:h="15840"/>'
        '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>'
        '<w:cols w:space="720"/>'
        '<w:titlePg/>'
        '<w:docGrid w:linePitch="360"/>'
        '</w:sectPr>')
d2 = re.sub(r"<w:sectPr>.*?</w:sectPr>", SECT, d, count=1, flags=re.S)
assert d2 != d, "no reemplace el sectPr"
doc.write_text(d2, encoding="utf-8")

print("plantilla parchada: tipografias, paleta, estilos de portada, encabezado, pie y seccion carta")
