#!/usr/bin/env python3
"""Construye la propuesta escalonada para ASOVELEÑOS sobre la plantilla Bedrock.

Tres fases con honorarios distintos: dos de monto fijo y una recurrente mensual.
La calculadora de la plantilla se reescribe para mostrar hasta dónde se contrata,
incluido el escenario de costo total del primer año con la fase recurrente dentro.
Se conservan los doce elementos que el script de la plantilla exige y no se usa la
clase de revelado por scroll.
"""
from pathlib import Path

PLANTILLA = Path("/Users/juanma/Documents/Bedrock IA/Herramientas/skills-y-plugins/skills/estilo-bedrock-html/assets/plantilla-web.html")
SALIDA = Path("/private/tmp/claude-501/-Users-juanma-Documents-Bedrock-IA/"
              "0f586fb6-3aad-4848-9b68-76c1717a8495/scratchpad/propuesta-asovelenos.fuente.html")

lineas = PLANTILLA.read_text(encoding="utf-8").split("\n")
cabeza = "\n".join(lineas[:306])
script = "\n".join(lineas[478:])

cabeza = cabeza.replace("[TÍTULO]", "Propuesta ASOVELEÑOS · Estructura jurídica y tributaria")
cabeza = cabeza.replace(
    "[DESCRIPCIÓN BREVE]",
    "Acompañamiento en tres fases para que los asociados de ASOVELEÑOS decidan con "
    "sustento entre mantener la asociación, crear una sociedad o combinar las dos, y para "
    "implementar la alternativa que escojan. Propuesta de servicios de Bedrock Abogados.")
for m in ("[TÍTULO]", "[DESCRIPCIÓN BREVE]"):
    if m in cabeza:
        raise SystemExit(f"Marcador sin reemplazar: {m}")

CALC_ORIGINAL = script[script.find("  var BASE = 50000000"):script.find("  sw.addEventListener")]
if not CALC_ORIGINAL:
    raise SystemExit("No se encontró el bloque de la calculadora en la plantilla.")

CALC_NUEVA = """  var SMLMV = 1750905, IVA = 0.19;
  var ESC = [
    {filas:[["Fase I \\u2014 Diagnóstico y facilitación de decisiones", 5, "Pago único"]], base:5},
    {filas:[["Fase I \\u2014 Diagnóstico y facilitación de decisiones", 5, "Pago único"],
            ["Fase II \\u2014 Estructuración e implementación", 5, "Pago único"]], base:10},
    {filas:[["Fase I \\u2014 Diagnóstico y facilitación de decisiones", 5, "Pago único"],
            ["Fase II \\u2014 Estructuración e implementación", 5, "Pago único"],
            ["Fase III \\u2014 Acompañamiento continuo, doce meses", 24, "2 SMLMV al mes"]], base:34}
  ];
  var escActivo = 1;
  var fmt = new Intl.NumberFormat("es-CO");
  var tbody = document.getElementById("tbody-pagos");
  var sw = document.getElementById("sw-iva");
  var thValor = document.getElementById("th-valor");

  function pintar(){
    var conIva = sw.checked;
    var e = ESC[escActivo];
    var filas = "";
    e.filas.forEach(function(f){
      var pesos = f[1] * SMLMV;
      var v = conIva ? Math.round(pesos * (1 + IVA)) : pesos;
      filas += "<tr><td>" + f[0] + "</td><td>" + f[2] +
               "</td><td class='der'>" + f[1] + " SMLMV" +
               "</td><td class='der'>" + fmt.format(v) + "</td></tr>";
    });
    var base = e.base * SMLMV;
    var total = conIva ? Math.round(base * (1 + IVA)) : base;
    filas += "<tr class='total'><th scope='row'>Total</th><td></td><td class='der'>" + e.base +
             " SMLMV</td><td class='der'>" + fmt.format(total) + "</td></tr>";
    tbody.innerHTML = filas;
    thValor.textContent = conIva ? "Valor con impuesto" : "Valor antes de impuesto";

    var iva = conIva ? Math.round(base * IVA) : 0;
    document.getElementById("v-base").textContent  = fmt.format(base);
    document.getElementById("v-iva").textContent   = fmt.format(iva);
    document.getElementById("v-total").textContent = fmt.format(base + iva);
    document.getElementById("k-iva").textContent   = conIva ? "Impuesto sobre las ventas, 19%" : "Impuesto no liquidado";
    document.getElementById("k-total").textContent = conIva ? "Total con impuesto" : "Total antes de impuesto";
  }

  Array.prototype.forEach.call(document.querySelectorAll(".esc"), function(b){
    b.addEventListener("click", function(){
      escActivo = parseInt(b.getAttribute("data-esc"), 10);
      Array.prototype.forEach.call(document.querySelectorAll(".esc"), function(o){
        var on = o === b;
        o.classList.toggle("activo", on);
        o.setAttribute("aria-pressed", on ? "true" : "false");
      });
      pintar();
    });
  });
"""
script = script.replace(CALC_ORIGINAL, CALC_NUEVA)

EXTRA = """
<style>
.cita-cliente{border-left:4px solid var(--acento);padding:8px 0 8px 26px;margin:32px 0}
.cita-cliente p{font-family:var(--serif);font-size:clamp(18px,3vw,23px);line-height:1.5;
  color:var(--primario);margin:0;font-style:italic}
.cita-cliente cite{display:block;margin-top:14px;font-family:var(--sans);font-size:12.5px;
  font-style:normal;color:var(--gris)}

.preocup{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0;margin:30px 0;
  border:1px solid var(--linea)}
.preocup > div{padding:24px 22px;border-right:1px solid var(--linea)}
.preocup > div:last-child{border-right:none}
.preocup h3{margin:0 0 9px;font-size:15px;color:var(--primario)}
.preocup p{margin:0;font-size:13.5px;color:var(--gris);line-height:1.65}

.salida{border:2px solid var(--acento);padding:28px;margin:32px 0;background:var(--tenue)}
.salida h3{margin:0 0 12px;font-size:17px;color:var(--primario)}
.salida p{font-size:14.5px;line-height:1.7;margin:0 0 12px}
.salida p:last-child{margin-bottom:0}

.rutas{margin:30px 0;border-top:1px solid var(--linea)}
.ruta{display:grid;grid-template-columns:44px 1fr 210px;gap:20px;padding:22px 4px;
  border-bottom:1px solid var(--linea);align-items:start}
.ruta-n{font-family:var(--sans);font-size:12px;font-weight:700;color:#fff;background:var(--primario);
  width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.ruta h3{margin:0 0 6px;font-size:16px;color:var(--primario)}
.ruta p{margin:0;font-size:14px;color:var(--gris);line-height:1.65}
.ruta-tag{font-family:var(--sans);font-size:11.5px;line-height:1.6;color:var(--gris);
  border-left:2px solid var(--acento);padding-left:14px}
.ruta-tag b{display:block;color:var(--primario);font-size:11px;letter-spacing:.05em;
  text-transform:uppercase;margin-bottom:4px}

.fase{border:1px solid var(--linea);margin:0 0 26px}
.fase-cab{background:var(--primario);color:#fff;padding:26px 28px;display:flex;
  justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap}
.fase-cab h3{margin:0;font-size:20px;color:#fff;max-width:520px}
.fase-cab .et{font-family:var(--sans);font-size:11px;letter-spacing:.1em;color:var(--acento);
  text-transform:uppercase;margin:0 0 8px}
.fase-precio{text-align:right}
.fase-precio .sp-v{font-family:var(--display);font-size:30px;color:#fff;margin:0;line-height:1}
.fase-precio .sp-k{font-family:var(--sans);font-size:11.5px;color:var(--acento);margin:6px 0 0}
.fase-cuerpo{padding:28px}
.fase-cuerpo > p:first-child{margin-top:0}
.fase h4{font-family:var(--sans);font-size:12px;letter-spacing:.08em;text-transform:uppercase;
  color:var(--secundario);margin:26px 0 12px}
.lista-p{margin:0;padding:0;list-style:none}
.lista-p li{position:relative;padding:0 0 10px 22px;font-size:14.5px;line-height:1.65}
.lista-p li::before{content:"";position:absolute;left:0;top:9px;width:8px;height:8px;
  background:var(--acento);border:1px solid var(--secundario)}
.lista-p li:last-child{padding-bottom:0}

.entregable{background:var(--tenue);border-left:3px solid var(--secundario);padding:20px 24px;
  margin:24px 0 0}
.entregable h4{margin:0 0 8px}
.entregable p{margin:0;font-size:14px;line-height:1.7;color:var(--gris)}

.compromisos{margin:28px 0;border-top:1px solid var(--linea)}
.comp{display:grid;grid-template-columns:1fr 150px;gap:20px;padding:16px 4px;
  border-bottom:1px solid var(--linea);align-items:center}
.comp p{margin:0;font-size:14px;line-height:1.6}
.comp span{font-family:var(--sans);font-size:11.5px;color:#fff;background:var(--secundario);
  padding:5px 11px;text-align:center;letter-spacing:.03em}

.jurisd{display:grid;grid-template-columns:1fr auto 1fr;margin:30px 0;border:1px solid var(--linea)}
.jurisd-c{padding:26px}
.jurisd-c h3{margin:0 0 14px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;
  font-family:var(--sans)}
.j-si h3{color:var(--secundario)}
.j-no{background:var(--tenue)}
.j-no h3{color:var(--gris)}
.jurisd-c li{font-size:14px;line-height:1.65}
.jurisd-eje{width:3px;background:var(--acento)}

.linea-t{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;margin:28px 0 10px}
.mes{padding:20px 16px;background:var(--tenue);border:1px solid var(--linea)}
.mes.ini{background:var(--acento);border-color:var(--acento)}
.mes.fin{background:var(--secundario);border-color:var(--secundario)}
.mes.fin .mes-m{color:#fff}
.mes.fin .mes-d{color:rgba(255,255,255,.82)}
.mes-m{font-family:var(--sans);font-size:13px;font-weight:700;color:var(--primario);margin:0}
.mes-d{font-family:var(--sans);font-size:11.5px;color:var(--gris);margin:7px 0 0;line-height:1.55}

.calc{border:1px solid var(--linea);margin:30px 0 0}
.calc-cab{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;
  padding:20px 24px;border-bottom:1px solid var(--linea);background:var(--tenue)}
.calc-cab h3{margin:0;font-size:16px;color:var(--primario)}
.sw-caja{display:flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--sans);
  font-size:13px;color:var(--gris);user-select:none}
.sw-caja input{position:absolute;opacity:0;width:1px;height:1px}
.sw-pista{width:40px;height:22px;border-radius:11px;background:var(--linea);position:relative;
  transition:background .2s;flex:0 0 auto}
.sw-bola{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;
  background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.sw-caja input:checked + .sw-pista{background:var(--secundario)}
.sw-caja input:checked + .sw-pista .sw-bola{transform:translateX(18px)}
.sw-caja input:focus-visible + .sw-pista{outline:2px solid var(--secundario);outline-offset:2px}

.escenarios{display:flex;gap:0;border-bottom:1px solid var(--linea);flex-wrap:wrap}
.esc{flex:1 1 170px;padding:16px 14px;background:#fff;border:none;border-right:1px solid var(--linea);
  font-family:var(--sans);font-size:13px;font-weight:600;color:var(--gris);cursor:pointer;
  transition:background .15s,color .15s}
.esc:last-child{border-right:none}
.esc:hover{background:var(--tenue);color:var(--primario)}
.esc.activo{background:var(--secundario);color:#fff}
.esc:focus-visible{outline:2px solid var(--primario);outline-offset:-3px}

.calc .tabla-envoltura{margin-top:0;border:none;border-radius:0}
.tabla-pagos{width:100%;border-collapse:collapse;font-size:14px}
.tabla-pagos th{text-align:left;padding:13px 18px;font-family:var(--sans);font-size:11.5px;
  letter-spacing:.03em;color:var(--gris);border-bottom:1px solid var(--linea);font-weight:600}
.tabla-pagos td{padding:13px 18px;border-bottom:1px solid var(--linea)}
.tabla-pagos .der{text-align:right;white-space:nowrap}
.tabla-pagos th.der{text-align:right}
.tabla-pagos tr.total th,.tabla-pagos tr.total td{background:var(--tenue);font-weight:700;
  color:var(--primario);border-bottom:none}

.hechos-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));
  border-top:1px solid var(--linea)}
.hechos-3 > div{padding:22px 24px;border-right:1px solid var(--linea)}
.hechos-3 > div:last-child{border-right:none}
.hechos-3 .destaca{background:var(--primario)}
.hechos-3 .destaca .h-v{color:#fff}
.hechos-3 .destaca .h-k{color:var(--acento)}
.h-v{display:block;font-family:var(--display);font-size:23px;color:var(--primario);line-height:1.1}
.h-k{display:block;margin-top:7px;font-family:var(--sans);font-size:11px;color:var(--gris)}

.nota-p{font-size:13.5px;color:var(--gris);line-height:1.7;margin:18px 0 0;
  border-top:1px solid var(--linea);padding-top:18px}

.quien{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:0;margin:30px 0;
  border:1px solid var(--linea)}
.quien > div{padding:26px;border-right:1px solid var(--linea)}
.quien > div:last-child{border-right:none}
.quien h3{margin:0 0 10px;font-size:15.5px;color:var(--primario)}
.quien p{margin:0;font-size:14px;color:var(--gris);line-height:1.65}

.pasos-n{counter-reset:p;margin:30px auto 0;padding:0;list-style:none;max-width:640px;text-align:left}
.pasos-n li{counter-increment:p;position:relative;padding:0 0 24px 52px;
  border-left:2px solid rgba(255,255,255,.22);margin-left:14px}
.pasos-n li:last-child{border-left-color:transparent;padding-bottom:0}
.pasos-n li::before{content:counter(p);position:absolute;left:-15px;top:-2px;width:28px;height:28px;
  border-radius:50%;background:var(--acento);color:var(--primario);font-family:var(--sans);
  font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center}
.pasos-n h3{margin:0 0 5px;font-size:15.5px;color:#fff}
.pasos-n p{margin:0;font-size:14px;color:#C9CEDB}

@media(max-width:760px){
  .tabla-pagos th,.tabla-pagos td{padding:11px 13px}
  .ruta{grid-template-columns:32px 1fr}
  .ruta-tag{grid-column:2;border-left:none;border-top:2px solid var(--acento);padding:12px 0 0}
  .jurisd{grid-template-columns:1fr}
  .jurisd-eje{width:auto;height:3px}
  .linea-t{grid-template-columns:1fr}
  .preocup > div{border-right:none;border-bottom:1px solid var(--linea)}
  .hechos-3 > div{border-right:none;border-bottom:1px solid var(--linea)}
  .quien > div{border-right:none;border-bottom:1px solid var(--linea)}
  .comp{grid-template-columns:1fr}
  .fase-cab{flex-direction:column}
  .fase-precio{text-align:left}
}
@media print{
  .fase-cab,.hechos-3 .destaca{background:#fff!important}
  .fase-cab h3,.fase-precio .sp-v{color:var(--primario)!important}
  .fase-cab .et,.fase-precio .sp-k{color:var(--gris)!important}
  .hechos-3 .destaca .h-v{color:var(--primario)!important}
  .hechos-3 .destaca .h-k{color:var(--gris)!important}
  .pasos-n h3{color:var(--primario)!important}
  .pasos-n p{color:var(--gris)!important}
  .escenarios{display:none}
}
</style>
"""

CUERPO = """
<body>

<div id="progreso" aria-hidden="true"></div>

<header>
  <div class="barra">
    <span class="logo logo-oscuro" role="img" aria-label="Bedrock Abogados"></span>
    <button id="menu-movil" aria-label="Abrir menú de secciones" aria-expanded="false" aria-controls="nav">
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true"><path d="M0 1h22M0 8h22M0 15h22" stroke="currentColor" stroke-width="1.8"/></svg>
    </button>
    <nav id="nav" aria-label="Secciones del documento">
      <a href="#punto">El punto</a>
      <a href="#rutas">Las alternativas</a>
      <a href="#fases">Las tres fases</a>
      <a href="#alcance">Alcance</a>
      <a href="#economico">Honorarios</a>
      <a class="btn" href="#cierre">Siguiente paso</a>
    </nav>
  </div>
</header>

<div class="hero" id="inicio">
  <div class="hero-in">
    <p class="eyebrow">Propuesta de servicios profesionales · Bedrock Abogados · 1 de octubre de 2026</p>
    <h1>Decidir primero, estructurar después</h1>
    <div class="regla-hero" aria-hidden="true"></div>
    <p class="lede">Para la Asociación de Empresarios de Bocadillo de la Provincia de Vélez y
      Ricaurte · ASOVELEÑOS</p>
    <p class="lede" style="margin-top:14px">Tres fases que se contratan una a una: la primera
      produce la decisión, la segunda la implementa y la tercera sostiene la estructura. Se puede
      parar al final de cualquiera de ellas.</p>
  </div>
</div>

<section id="punto">
  <div class="in">
    <p class="num">01 · Entendimiento</p>
    <h2>Lo que salió de la sesión del 1 de octubre</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">La conversación dejó claro que la pregunta todavía no está resuelta. Antes de
      escoger entre asociación y sociedad, los asociados necesitan ver qué gana y qué pierde cada
      uno con cada camino.</p>

    <div class="cita-cliente">
      <p>Todavía estamos evaluando las ventajas y las desventajas. Necesitamos compararlas antes
        de decidir.</p>
      <cite>Planteamiento de ASOVELEÑOS · Sesión de trabajo del 1 de octubre de 2026</cite>
    </div>

    <p>Alrededor de esa pregunta aparecieron cuatro preocupaciones que esta propuesta toma como
      criterio de diseño, porque son las que van a decidir el voto de cada asociado.</p>

    <div class="preocup">
      <div>
        <h3>El terreno</h3>
        <p>Es la única propiedad de la asociación. Se adquirió con aportes de los asociados y con
          un crédito cuyas cuotas pagaron ellos, pero quedó registrado a nombre de la asociación.
          Conservarlo es condición de cualquier escenario.</p>
      </div>
      <div>
        <h3>La igualdad entre asociados</h3>
        <p>Participación, voz y voto iguales, y protección frente a que alguien concentre el
          control comprando acciones. Es el punto que más se repitió en la sesión.</p>
      </div>
      <div>
        <h3>La carga tributaria</h3>
        <p>El paso de tributar al veinte por ciento a hacerlo al treinta y cinco, y la doble carga
          que se produce cuando el productor le vende a la asociación y la asociación le vende a la
          gran superficie.</p>
      </div>
      <div>
        <h3>La salida y la competencia</h3>
        <p>Qué pasa cuando un asociado se va, cómo se protege la información comercial, y dónde
          está la línea entre lo que cada fábrica puede vender por su cuenta y lo que constituye
          competencia.</p>
      </div>
    </div>

    <div class="salida">
      <h3>Lo que esta propuesta no hace</h3>
      <p>No da por sentado que convertirse en sociedad sea la respuesta. Puede que lo sea, puede
        que convenga mantener la asociación y crear una sociedad en paralelo repartiendo
        actividades entre las dos, y puede que con formalizar la relación comercial actual se
        resuelva buena parte del problema sin tocar la estructura.</p>
      <p>La primera fase existe para responder esa pregunta con números y con fundamento, no con
        una recomendación de entrada. Si al terminarla la conclusión es que conviene quedarse como
        están, eso es un resultado válido y ahí se puede parar.</p>
    </div>

    <h3 style="margin-top:34px">Lo que Bedrock se comprometió a resolver en la sesión</h3>
    <div class="compromisos">
      <div class="comp">
        <p>Determinar si las obligaciones de suministro y de producción deben ir en los estatutos
          o en un manual interno.</p>
        <span>Fase I</span>
      </div>
      <div class="comp">
        <p>Delimitar qué se entiende por competencia directa y por competencia indirecta, que hoy
          no está definido en ninguna parte.</p>
        <span>Fase I</span>
      </div>
      <div class="comp">
        <p>Analizar las alternativas jurídicas, tributarias y operativas con sus ventajas, sus
          desventajas y su costo.</p>
        <span>Fase I</span>
      </div>
      <div class="comp">
        <p>Acompañar la implementación de la alternativa que escojan los asociados.</p>
        <span>Fase II</span>
      </div>
    </div>
  </div>
</section>

<section class="alt" id="rutas">
  <div class="in">
    <p class="num">02 · El mapa</p>
    <h2>Las alternativas que hay sobre la mesa</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">De la sesión salieron cinco caminos. Cada uno resuelve unas cosas y deja otras
      abiertas, y el costo regulatorio y tributario de cada uno es distinto. La primera fase los
      compara sobre los mismos criterios.</p>

    <div class="rutas">
      <div class="ruta">
        <span class="ruta-n">1</span>
        <div>
          <h3>Mantener la asociación y formalizar lo que ya funciona</h3>
          <p>Hoy no existen contratos de suministro con los asociados, aunque sí hay un manual de
            funcionamiento. Formalizar esa relación y ordenar el retorno del margen puede resolver
            buena parte del problema sin cambiar de figura.</p>
        </div>
        <p class="ruta-tag"><b>Lo que hay que mirar</b>El tratamiento tributario y contable del
          retorno en especie a los asociados.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">2</span>
        <div>
          <h3>Asociación y sociedad en paralelo</h3>
          <p>La asociación conserva el terreno y la función gremial; la sociedad asume la
            comercialización. Las actividades se reparten entre las dos y cada una queda con lo que
            le corresponde por naturaleza.</p>
        </div>
        <p class="ruta-tag"><b>Lo que hay que mirar</b>Cómo se documenta la relación entre las dos
          y qué pasa con el terreno.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">3</span>
        <div>
          <h3>Liquidar la asociación y constituir la sociedad</h3>
          <p>Es la vía que está en el borrador de estatutos que ya circuló entre los asociados.
            Resuelve la estructura de una vez, y es la que más preguntas abre sobre el destino del
            patrimonio.</p>
        </div>
        <p class="ruta-tag"><b>Lo que hay que mirar</b>A dónde puede ir el patrimonio al liquidar,
          y con cuántos votos se decide.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">4</span>
        <div>
          <h3>Contrato de mandato</h3>
          <p>La figura que ya habían considerado. La asociación actúa por cuenta de cada fábrica en
            la venta a la gran superficie, sin comprar y revender, lo que cambia el punto donde se
            causa el impuesto.</p>
        </div>
        <p class="ruta-tag"><b>Lo que hay que mirar</b>Si la operación real encaja en el mandato y
          qué exige la facturación.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">5</span>
        <div>
          <h3>Planta común y venta directa</h3>
          <p>Producir desde una instalación compartida y vender directamente, eliminando un eslabón
            de la cadena. Es la de mayor alcance y la que más inversión exige.</p>
        </div>
        <p class="ruta-tag"><b>Lo que hay que mirar</b>La inversión, los permisos sanitarios y qué
          pasa con las fábricas de cada asociado.</p>
      </div>
    </div>

    <p class="nota-p">Hay un punto del artículo 35 de los estatutos vigentes que condiciona qué se
      puede hacer con el terreno si la asociación llega a liquidarse. Bedrock ya lo detectó al
      revisar los documentos y lo está verificando contra la fuente oficial. Si se confirma, cambia
      el orden de preferencia entre estas alternativas, y por eso conviene resolverlo antes de que
      la asamblea vote.</p>
  </div>
</section>

<section id="fases">
  <div class="in">
    <p class="num">03 · El trabajo</p>
    <h2>Tres fases que se contratan por separado</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Cada fase tiene su propio entregable y su propio precio. Al terminar una, la
      asociación decide si sigue. No hay permanencia ni penalidad por detenerse.</p>

    <div class="fase">
      <div class="fase-cab">
        <div>
          <p class="et">Fase I · Tres meses</p>
          <h3>Diagnóstico y facilitación de decisiones</h3>
        </div>
        <div class="fase-precio">
          <p class="sp-v">5 SMLMV</p>
          <p class="sp-k">$8.754.525 antes de impuesto</p>
        </div>
      </div>
      <div class="fase-cuerpo">
        <p>Produce el documento con el que la asamblea vota. Levanta la información que hoy falta,
          compara las cinco alternativas sobre criterios homogéneos y deja por escrito qué cuesta
          cada una y qué riesgo trae.</p>

        <h4>Qué comprende</h4>
        <ul class="lista-p">
          <li>Diagnóstico de la situación actual: revisión de los estatutos vigentes, del borrador
            de estatutos de la sociedad que ya circuló, de las observaciones que presentaron
            asociados, del registro tributario y de la declaración de renta.</li>
          <li>Análisis del terreno: titularidad, origen de los recursos con que se adquirió, y qué
            se puede hacer con él en cada una de las cinco alternativas.</li>
          <li>Análisis tributario de la cadena: el efecto del cambio de régimen, dónde se produce
            la doble carga, y el tratamiento del retorno de margen a los asociados en ajustes de
            precio y en entregas de materia prima.</li>
          <li>Valoración de la contingencia laboral en curso y de su efecto sobre cada
            alternativa.</li>
          <li>Las dos definiciones que quedaron abiertas en la sesión: dónde deben vivir las
            obligaciones de suministro y de producción, y qué constituye competencia directa e
            indirecta.</li>
          <li>Matriz comparativa de las cinco alternativas sobre los mismos criterios: requisitos,
            aprobaciones de órgano social, tiempos, costo, carga tributaria, efecto sobre el
            terreno y sobre la igualdad entre asociados.</li>
          <li>Recomendación motivada, con el escenario en que esa recomendación cambiaría.</li>
        </ul>

        <div class="entregable">
          <h4>Entregable</h4>
          <p>Documento de decisión firmado, con la matriz comparativa y el listado de requisitos por
            alternativa. Incluye una sesión de presentación a la junta directiva y una sesión de
            presentación a la asamblea de asociados, con una ronda de preguntas y ajustes después
            de cada una.</p>
        </div>
      </div>
    </div>

    <div class="fase">
      <div class="fase-cab">
        <div>
          <p class="et">Fase II · Tres meses propuestos</p>
          <h3>Estructuración e implementación</h3>
        </div>
        <div class="fase-precio">
          <p class="sp-v">5 SMLMV</p>
          <p class="sp-k">$8.754.525 antes de impuesto</p>
        </div>
      </div>
      <div class="fase-cuerpo">
        <p>Ejecuta la alternativa que la asamblea escoja. El contenido exacto depende de esa
          decisión, y por eso se contrata al terminar la primera fase y no antes.</p>

        <h4>Qué comprende, según la alternativa elegida</h4>
        <ul class="lista-p">
          <li>Redacción de los documentos que la decisión exija: reforma de estatutos, estatutos de
            la sociedad nueva, actas de asamblea y de junta, y el reglamento interno que
            corresponda.</li>
          <li>Contratos de suministro con cada asociado, que hoy no existen, con las obligaciones
            de producción y las consecuencias de su incumplimiento, incluidas las excepciones por
            circunstancias extraordinarias que se plantearon en la sesión.</li>
          <li>Acuerdo de confidencialidad para quienes accedan a la información comercial, y la
            cláusula de no competencia con su definición delimitada en tiempo, territorio y
            producto.</li>
          <li>Instrumentación del traslado del terreno si la alternativa elegida lo contempla, con
            el avalúo, la escritura pública que exige la ley cuando el aporte comprende inmuebles, y
            las cláusulas que preservan la neutralidad fiscal de la operación.</li>
          <li>Contrato de mandato y su esquema de facturación, si esa es la vía escogida.</li>
          <li>Acompañamiento en las asambleas donde se adopten las decisiones, con la verificación
            previa de convocatoria, quórum y mayorías.</li>
          <li>Trámites de registro ante la cámara de comercio y, cuando aplique, ante la oficina de
            registro de instrumentos públicos.</li>
        </ul>

        <div class="entregable">
          <h4>Entregable</h4>
          <p>Documentos suscritos y registrados, con el expediente de la operación organizado y
            entregado a la asociación. Incluye el acompañamiento a las asambleas que la
            implementación requiera.</p>
        </div>
      </div>
    </div>

    <div class="fase">
      <div class="fase-cab">
        <div>
          <p class="et">Fase III · Mensual, opcional</p>
          <h3>Acompañamiento estratégico continuo</h3>
        </div>
        <div class="fase-precio">
          <p class="sp-v">2 SMLMV</p>
          <p class="sp-k">$3.501.810 al mes, antes de impuesto</p>
        </div>
      </div>
      <div class="fase-cuerpo">
        <p>Sostiene la estructura después de montada. Una estructura societaria sin mantenimiento
          se degrada: las actas se dejan de llevar, los contratos no se renuevan y las decisiones se
          toman sin el respaldo que después se necesita.</p>

        <h4>Qué comprende</h4>
        <ul class="lista-p">
          <li>Asesoría permanente en materia societaria, tributaria y laboral, con atención a
            consultas durante todo el mes.</li>
          <li>Secretaría de los órganos sociales: convocatorias, actas, libros y el calendario de
            las reuniones que la ley exige.</li>
          <li>Revisión de los contratos con clientes y con proveedores antes de su suscripción.</li>
          <li>Seguimiento de la contingencia laboral y de las que surjan.</li>
          <li>Una sesión mensual de trabajo con la junta directiva.</li>
          <li>Alertas sobre los cambios normativos que afecten a la asociación o a la sociedad.</li>
        </ul>

        <div class="entregable">
          <h4>Condiciones</h4>
          <p>Se contrata por períodos de doce meses y se puede terminar en cualquier momento con
            aviso escrito de treinta días, sin penalidad. Los honorarios se causan por mes vencido.
            La representación en procesos judiciales se cotiza aparte.</p>
        </div>
      </div>
    </div>

    <div class="linea-t">
      <div class="mes ini">
        <p class="mes-m">Meses 1 a 3 · Fase I</p>
        <p class="mes-d">Diagnóstico, matriz de alternativas y presentación a la asamblea. La
          asociación decide.</p>
      </div>
      <div class="mes">
        <p class="mes-m">Meses 4 a 6 · Fase II</p>
        <p class="mes-d">Redacción, suscripción y registro de lo que la decisión exija.</p>
      </div>
      <div class="mes fin">
        <p class="mes-m">Mes 7 en adelante · Fase III</p>
        <p class="mes-d">Acompañamiento mensual, mientras la asociación lo quiera.</p>
      </div>
    </div>

    <p class="nota-p">El plazo de la Fase II es una estimación de Bedrock y depende de la
      alternativa que se escoja. Una reforma de estatutos toma menos que una liquidación con
      traslado de inmueble. El plazo definitivo se fija al cerrar la Fase I, cuando ya se sabe qué
      hay que hacer.</p>
  </div>
</section>

<section class="alt" id="alcance">
  <div class="in">
    <p class="num">04 · Alcance</p>
    <h2>Qué queda dentro y qué no</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Delimitarlo por escrito evita la discusión posterior sobre qué se esperaba y no
      llegó. Lo de la columna derecha se puede contratar aparte con su propia cotización.</p>

    <div class="jurisd">
      <div class="jurisd-c j-si">
        <h3>Incluido en los honorarios</h3>
        <ul class="lista-p">
          <li>El análisis de las cinco alternativas y la recomendación motivada.</li>
          <li>La matriz comparativa y los listados de requisitos.</li>
          <li>Las sesiones de presentación a la junta y a la asamblea, con sus rondas de ajustes.</li>
          <li>La redacción de los documentos que la decisión exija.</li>
          <li>El acompañamiento a las asambleas de la implementación.</li>
          <li>Los trámites de registro ante la cámara de comercio.</li>
          <li>La valoración de la contingencia laboral en curso.</li>
        </ul>
      </div>
      <div class="jurisd-eje" aria-hidden="true"></div>
      <div class="jurisd-c j-no">
        <h3>Fuera del alcance</h3>
        <ul class="lista-p">
          <li>La representación judicial en la demanda laboral en curso o en cualquier otro
            proceso.</li>
          <li>El avalúo comercial del terreno, que lo practica un perito.</li>
          <li>Los derechos notariales, el impuesto de registro y las tarifas de la cámara de
            comercio.</li>
          <li>La contabilidad y la preparación de las declaraciones tributarias.</li>
          <li>La defensa ante un requerimiento de la administración tributaria por hechos
            anteriores.</li>
          <li>Los trámites de registro sanitario y los permisos de una planta nueva.</li>
          <li>La valoración de la empresa o del terreno con fines de negociación.</li>
        </ul>
      </div>
    </div>

    <p class="nota-p">Si del diagnóstico surge una contingencia que exija defensa ante una
      autoridad, Bedrock la cotiza por separado y lo advierte en el momento en que la detecte, no al
      final. La recomendación de la Fase I no depende de que esa defensa se contrate.</p>
  </div>
</section>

<section id="economico">
  <div class="in">
    <p class="num">05 · Honorarios</p>
    <h2>Lo que cuesta</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Los honorarios se expresan en salarios mínimos legales mensuales vigentes, de
      modo que el valor no queda atado al año en que se firma. Para 2026 el salario mínimo es de
      $1.750.905. Las fases I y II son de pago único; la fase III es mensual.</p>

    <div class="calc">
      <div class="calc-cab">
        <h3>Honorarios según hasta dónde se contrate</h3>
        <label class="sw-caja" for="sw-iva">
          <input type="checkbox" id="sw-iva" checked>
          <span class="sw-pista" aria-hidden="true"><span class="sw-bola"></span></span>
          Incluir impuesto sobre las ventas
        </label>
      </div>

      <div class="escenarios" role="group" aria-label="Escenario de contratación">
        <button type="button" class="esc" data-esc="0" aria-pressed="false">Solo Fase I</button>
        <button type="button" class="esc activo" data-esc="1" aria-pressed="true">Fases I y II</button>
        <button type="button" class="esc" data-esc="2" aria-pressed="false">Las tres, primer año</button>
      </div>

      <div class="tabla-envoltura" tabindex="0" role="region" aria-label="Desglose de honorarios">
        <table class="tabla-pagos">
          <thead>
            <tr>
              <th scope="col">Fase</th>
              <th scope="col">Forma</th>
              <th scope="col" class="der">Medida</th>
              <th scope="col" class="der" id="th-valor">Valor con impuesto</th>
            </tr>
          </thead>
          <tbody id="tbody-pagos">
            <tr><td>Fase I — Diagnóstico y facilitación de decisiones</td><td>Pago único</td><td class="der">5 SMLMV</td><td class="der">10.417.885</td></tr>
            <tr><td>Fase II — Estructuración e implementación</td><td>Pago único</td><td class="der">5 SMLMV</td><td class="der">10.417.885</td></tr>
            <tr class="total"><th scope="row">Total</th><td></td><td class="der">10 SMLMV</td><td class="der">20.835.770</td></tr>
          </tbody>
        </table>
      </div>

      <div class="hechos-3">
        <div><span class="h-v" id="v-base">17.509.050</span><span class="h-k">Honorarios antes de impuesto</span></div>
        <div><span class="h-v" id="v-iva">3.326.720</span><span class="h-k" id="k-iva">Impuesto sobre las ventas, 19%</span></div>
        <div class="destaca"><span class="h-v" id="v-total">20.835.770</span><span class="h-k" id="k-total">Total con impuesto</span></div>
      </div>
    </div>

    <p class="nota-p">Forma de pago propuesta: cada fase se paga cincuenta por ciento a la
      suscripción y cincuenta por ciento contra entrega. La Fase III se factura por mes vencido
      dentro de los cinco primeros días del mes siguiente. La contratación de una fase no obliga a
      contratar la siguiente. Los valores no incluyen gastos de desplazamiento a Vélez, Barbosa o
      Moniquirá, que se acuerdan previamente y se facturan al costo. Esta propuesta tiene vigencia
      de treinta días calendario contados desde su fecha.</p>
  </div>
</section>

<section class="alt" id="quien">
  <div class="in">
    <p class="num">06 · Quién responde</p>
    <h2>El equipo</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">El trabajo combina tres materias que en este caso no se pueden separar: la
      societaria, la tributaria y la laboral. La decisión que tomen los asociados depende de las
      tres a la vez.</p>

    <div class="quien">
      <div>
        <h3>Societario y corporativo</h3>
        <p>Diseño de estructuras, reformas estatutarias, acuerdos entre socios y reorganizaciones
          empresariales. Es donde se define cómo se protege la igualdad entre asociados y cómo se
          evita que alguien concentre el control.</p>
      </div>
      <div>
        <h3>Tributario</h3>
        <p>El análisis de la cadena de valor, el efecto del cambio de régimen y el tratamiento del
          retorno de margen a los asociados. Es donde está el ahorro que motiva la consulta, y
          también el riesgo si la operación actual no está bien soportada.</p>
      </div>
      <div>
        <h3>Laboral</h3>
        <p>La valoración de la contingencia en curso y el efecto que una reorganización tiene sobre
          las obligaciones laborales existentes, que es de lo que menos se habla y de lo que más
          sorprende cuando aparece.</p>
      </div>
    </div>

    <p class="nota-p">Bedrock llega a esta propuesta habiendo leído ya los estatutos vigentes, el
      borrador de estatutos de la sociedad, las observaciones que presentaron asociados, el registro
      único tributario y la declaración de renta del año gravable 2025. El trabajo de la Fase I
      parte de ahí, no de cero.</p>
  </div>
</section>

<section class="cierre" id="cierre">
  <div class="in">
    <h2>Tres pasos para empezar</h2>
    <ol class="pasos-n">
      <li><h3>Confirmación del alcance</h3>
        <p>La asociación indica si contrata la Fase I y si quiere incluir desde ahora las
          siguientes.</p></li>
      <li><h3>Suscripción del contrato de prestación de servicios</h3>
        <p>Con el alcance, el plazo y la forma de pago de esta propuesta incorporados, más el
          acuerdo de confidencialidad.</p></li>
      <li><h3>Sesión de arranque y solicitud de información</h3>
        <p>Dentro de los cinco días hábiles siguientes a la suscripción, para recoger los
          documentos que faltan y fijar el calendario de las sesiones con la junta y con la
          asamblea.</p></li>
    </ol>
  </div>
</section>

<footer>
  <div class="in pie">
    <span class="logo logo-oscuro" role="img" aria-label="Bedrock Abogados"></span>
    <p>Propuesta de servicios profesionales · Bedrock Abogados S.A.S. · 1 de octubre de 2026<br>
      Documento dirigido a la Asociación de Empresarios de Bocadillo de la Provincia de Vélez y
      Ricaurte. Su contenido es de uso exclusivo del destinatario.</p>
  </div>
</footer>
"""

SALIDA.write_text(cabeza + EXTRA + CUERPO + script, encoding="utf-8")
print(f"fuente: {SALIDA.stat().st_size/1024:.0f} KB")
