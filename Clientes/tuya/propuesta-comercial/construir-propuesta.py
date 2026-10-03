#!/usr/bin/env python3
"""Construye la propuesta para TUYA sobre la plantilla Bedrock.

Dos servicios con tres escenarios de contratación, así que la calculadora de la
plantilla se reescribe entera: en vez de un calendario de pagos fijo, muestra el
desglose del escenario que el lector seleccione. Se conservan los doce elementos
que el script de la plantilla exige y no se usa la clase de revelado por scroll.
"""
from pathlib import Path

PLANTILLA = Path("/Users/juanma/Documents/Bedrock IA/Herramientas/skills-y-plugins/skills/estilo-bedrock-html/assets/plantilla-web.html")
SALIDA = Path("/private/tmp/claude-501/-Users-juanma-Documents-Bedrock-IA/"
              "0f586fb6-3aad-4848-9b68-76c1717a8495/scratchpad/propuesta-tuya.fuente.html")

lineas = PLANTILLA.read_text(encoding="utf-8").split("\n")
cabeza = "\n".join(lineas[:306])
script = "\n".join(lineas[478:])

cabeza = cabeza.replace("[TÍTULO]", "Propuesta TUYA · Mesa de dinero y cuenta de compensación")
cabeza = cabeza.replace(
    "[DESCRIPCIÓN BREVE]",
    "Concepto jurídico sobre las alternativas para operar divisas y acompañamiento en la "
    "apertura de la cuenta de compensación en el exterior. Propuesta de servicios de Bedrock "
    "Abogados para TUYA.")
for m in ("[TÍTULO]", "[DESCRIPCIÓN BREVE]"):
    if m in cabeza:
        raise SystemExit(f"Marcador sin reemplazar: {m}")

CALC_ORIGINAL = script[script.find("  var BASE = 50000000"):script.find("  sw.addEventListener")]
if not CALC_ORIGINAL:
    raise SystemExit("No se encontró el bloque de la calculadora en la plantilla.")

CALC_NUEVA = """  var SMLMV = 1750905, IVA = 0.19;
  var ESC = [
    {filas:[["Concepto jurídico sobre alternativas", 7]], base:7},
    {filas:[["Acompañamiento en la apertura de la cuenta", 5]], base:5},
    {filas:[["Concepto jurídico sobre alternativas", 7],
            ["Acompañamiento en la apertura de la cuenta", 5],
            ["Ajuste por contratación conjunta", -2]], base:10}
  ];
  var escActivo = 2;
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
      var signo = f[1] < 0 ? "\\u2212" : "";
      var abs = Math.abs(v);
      var smlmv = (f[1] < 0 ? "\\u2212" : "") + Math.abs(f[1]) + " SMLMV";
      filas += "<tr><td>" + f[0] + "</td><td class='der'>" + smlmv +
               "</td><td class='der'>" + signo + fmt.format(abs) + "</td></tr>";
    });
    var base = e.base * SMLMV;
    var total = conIva ? Math.round(base * (1 + IVA)) : base;
    filas += "<tr class='total'><th scope='row'>Total</th><td class='der'>" + e.base +
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
.cita-cliente p{font-family:var(--serif);font-size:clamp(19px,3.2vw,25px);line-height:1.5;
  color:var(--primario);margin:0;font-style:italic}
.cita-cliente cite{display:block;margin-top:14px;font-family:var(--sans);font-size:12.5px;
  font-style:normal;color:var(--gris)}

.hechos-4{display:grid;grid-template-columns:repeat(auto-fit,minmax(215px,1fr));gap:0;margin:32px 0;
  border:1px solid var(--linea)}
.hechos-4 > div{padding:24px 22px;border-right:1px solid var(--linea)}
.hechos-4 > div:last-child{border-right:none}
.f-v{font-family:var(--display);font-size:26px;color:var(--secundario);line-height:1.05;margin:0}
.f-k{font-family:var(--sans);font-size:11.5px;letter-spacing:.04em;color:var(--gris);
  margin:10px 0 0;text-transform:uppercase}
.f-d{font-size:13.5px;color:var(--gris);line-height:1.6;margin:10px 0 0}

.salida{border:2px solid var(--acento);padding:28px;margin:32px 0;background:var(--tenue)}
.salida h3{margin:0 0 12px;font-size:17px;color:var(--primario)}
.salida p{font-size:14.5px;line-height:1.7;margin:0 0 12px}
.salida p:last-child{margin-bottom:0}

.rutas{margin:30px 0;border-top:1px solid var(--linea)}
.ruta{display:grid;grid-template-columns:44px 1fr 200px;gap:20px;padding:22px 4px;
  border-bottom:1px solid var(--linea);align-items:start}
.ruta-n{font-family:var(--sans);font-size:12px;font-weight:700;color:#fff;background:var(--primario);
  width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.ruta h3{margin:0 0 6px;font-size:16px;color:var(--primario)}
.ruta p{margin:0;font-size:14px;color:var(--gris);line-height:1.65}
.ruta-tag{font-family:var(--sans);font-size:11.5px;line-height:1.6;color:var(--gris);
  border-left:2px solid var(--acento);padding-left:14px}
.ruta-tag b{display:block;color:var(--primario);font-size:11px;letter-spacing:.05em;
  text-transform:uppercase;margin-bottom:4px}
.ruta.aparte{background:var(--tenue)}
.ruta.aparte .ruta-n{background:var(--gris)}

.servicio{border:1px solid var(--linea);margin:0 0 26px}
.servicio-cab{background:var(--primario);color:#fff;padding:26px 28px;display:flex;
  justify-content:space-between;align-items:flex-start;gap:24px;flex-wrap:wrap}
.servicio-cab h3{margin:0;font-size:20px;color:#fff;max-width:520px}
.servicio-cab .et{font-family:var(--sans);font-size:11px;letter-spacing:.1em;color:var(--acento);
  text-transform:uppercase;margin:0 0 8px}
.servicio-precio{text-align:right}
.servicio-precio .sp-v{font-family:var(--display);font-size:30px;color:#fff;margin:0;line-height:1}
.servicio-precio .sp-k{font-family:var(--sans);font-size:11.5px;color:var(--acento);margin:6px 0 0}
.servicio-cuerpo{padding:28px}
.servicio-cuerpo > p:first-child{margin-top:0}
.servicio h4{font-family:var(--sans);font-size:12px;letter-spacing:.08em;text-transform:uppercase;
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

.jurisd{display:grid;grid-template-columns:1fr auto 1fr;margin:30px 0;border:1px solid var(--linea)}
.jurisd-c{padding:26px}
.jurisd-c h3{margin:0 0 14px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;
  font-family:var(--sans)}
.j-si h3{color:var(--secundario)}
.j-no{background:var(--tenue)}
.j-no h3{color:var(--gris)}
.jurisd-c li{font-size:14px;line-height:1.65}
.jurisd-eje{width:3px;background:var(--acento)}

.linea-t{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin:28px 0 10px}
.mes{padding:18px 14px;background:var(--tenue);border:1px solid var(--linea)}
.mes.ini{background:var(--acento);border-color:var(--acento)}
.mes.fin{background:var(--secundario);border-color:var(--secundario)}
.mes.fin .mes-m{color:#fff}
.mes.fin .mes-d{color:rgba(255,255,255,.8)}
.mes-m{font-family:var(--sans);font-size:12.5px;font-weight:700;color:var(--primario);margin:0}
.mes-d{font-family:var(--sans);font-size:11.5px;color:var(--gris);margin:6px 0 0;line-height:1.5}

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
.esc{flex:1 1 180px;padding:16px 14px;background:#fff;border:none;border-right:1px solid var(--linea);
  font-family:var(--sans);font-size:13px;font-weight:600;color:var(--gris);cursor:pointer;
  transition:background .15s,color .15s}
.esc:last-child{border-right:none}
.esc:hover{background:var(--tenue);color:var(--primario)}
.esc.activo{background:var(--secundario);color:#fff}
.esc:focus-visible{outline:2px solid var(--primario);outline-offset:-3px}

.calc .tabla-envoltura{margin-top:0;border:none;border-radius:0}
.tabla-pagos{width:100%;border-collapse:collapse;font-size:14px}
.tabla-pagos th{text-align:left;padding:13px 20px;font-family:var(--sans);font-size:11.5px;
  letter-spacing:.03em;color:var(--gris);border-bottom:1px solid var(--linea);font-weight:600}
.tabla-pagos td{padding:13px 20px;border-bottom:1px solid var(--linea)}
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
  .ruta{grid-template-columns:32px 1fr}
  .ruta-tag{grid-column:2;border-left:none;border-top:2px solid var(--acento);padding:12px 0 0}
  .jurisd{grid-template-columns:1fr}
  .jurisd-eje{width:auto;height:3px}
  .linea-t{grid-template-columns:repeat(2,1fr)}
  .hechos-4 > div{border-right:none;border-bottom:1px solid var(--linea)}
  .hechos-3 > div{border-right:none;border-bottom:1px solid var(--linea)}
  .quien > div{border-right:none;border-bottom:1px solid var(--linea)}
  .servicio-cab{flex-direction:column}
  .servicio-precio{text-align:left}
}
@media print{
  .servicio-cab,.hechos-3 .destaca{background:#fff!important}
  .servicio-cab h3,.servicio-precio .sp-v{color:var(--primario)!important}
  .servicio-cab .et,.servicio-precio .sp-k{color:var(--gris)!important}
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
      <a href="#pregunta">La pregunta</a>
      <a href="#rutas">Las rutas</a>
      <a href="#servicios">Servicios</a>
      <a href="#alcance">Alcance</a>
      <a href="#economico">Honorarios</a>
      <a class="btn" href="#cierre">Siguiente paso</a>
    </nav>
  </div>
</header>

<div class="hero" id="inicio">
  <div class="hero-in">
    <p class="eyebrow">Propuesta de servicios profesionales · Bedrock Abogados · 30 de septiembre de 2026</p>
    <h1>Mesa de dinero: la decisión antes del montaje</h1>
    <div class="regla-hero" aria-hidden="true"></div>
    <p class="lede">Para Frank Parra Henao · Compañía de Financiamiento Tuya S.A.</p>
    <p class="lede" style="margin-top:14px">Dos servicios que se pueden contratar juntos o por
      separado: el concepto jurídico que compara las alternativas para operar divisas, y el
      acompañamiento en la apertura de la cuenta de compensación en el exterior.</p>
  </div>
</div>

<section id="pregunta">
  <div class="in">
    <p class="num">01 · Entendimiento</p>
    <h2>La pregunta que hay que responder</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">En la sesión del 22 de septiembre, el planteamiento quedó formulado con
      precisión desde TUYA, y lo que pide es una decisión sostenible ante la junta directiva.</p>

    <div class="cita-cliente">
      <p>¿Cuál es mi mejor alternativa si hoy quiero ahorrar dinero en el pago de proveedores?</p>
      <cite>Planteamiento de TUYA · Sesión de trabajo del 22 de septiembre de 2026</cite>
    </div>

    <p>Alrededor de esa pregunta se pusieron sobre la mesa cuatro datos que condicionan la
      respuesta y que esta propuesta toma como punto de partida.</p>

    <div class="hechos-4">
      <div>
        <p class="f-v">USD 1,5 M</p>
        <p class="f-k">Exposición mensual</p>
        <p class="f-d">Pagos a proveedores tecnológicos y de servicios profesionales, la
          operación que hoy queda expuesta al diferencial cambiario.</p>
      </div>
      <div>
        <p class="f-v">USD 100 mil</p>
        <p class="f-k">Ahorro estimado a seis meses</p>
        <p class="f-d">Orden de magnitud estimado en la propia sesión por el diferencial entre
          compra y venta. Es la cifra contra la cual se mide cualquier montaje.</p>
      </div>
      <div>
        <p class="f-v">Licencia IMC</p>
        <p class="f-k">Activo ya obtenido</p>
        <p class="f-d">TUYA tiene licencia vigente de intermediario del mercado cambiario. Hoy
          Obtener una licencia nueva es un trámite largo ante el supervisor, y renunciar a la
          que ya se tiene cierra negocios que todavía no están a la vista.</p>
      </div>
      <div>
        <p class="f-v">Día 2</p>
        <p class="f-k">Primer requerimiento</p>
        <p class="f-d">El primer requerimiento de reportería llegó al segundo día de la
          inscripción. El régimen ya está corriendo sobre TUYA, se opere la mesa o no.</p>
      </div>
    </div>

    <div class="salida">
      <h3>Lo que dijimos en la reunión, antes de cotizar nada</h3>
      <p>Con esas cifras, montar una mesa de dinero propia desde cero difícilmente se paga. El
        costo regulatorio de una mesa es la separación funcional entre trader y comercial con
        ambos perfiles acreditados, el manual de operaciones con límites y autoridades aprobado
        por junta directiva, la integración técnica con el sistema del Banco de la República,
        tres ciclos de reportería, el registro de operadores y un esquema de continuidad con
        tiempos de recuperación definidos y probados. Eso no se recupera con cien mil dólares en
        seis meses.</p>
      <p>Se lo dijimos en la sesión y lo sostenemos aquí. Lo que esta propuesta busca es que TUYA
        tome la decisión con el sustento escrito que hoy no tiene, y que quede lista la
        alternativa que sí se paga con la operación actual.</p>
    </div>
  </div>
</section>

<section class="alt" id="rutas">
  <div class="in">
    <p class="num">02 · El mapa</p>
    <h2>Las cinco rutas sobre la mesa</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">De la sesión salieron cinco caminos que resuelven el mismo problema con
      costos regulatorios muy distintos. Cada uno cambia quién responde ante la Superintendencia
      Financiera, cuánto cuesta el montaje, cuánto tarda y qué parte del margen se conserva.</p>

    <div class="rutas">
      <div class="ruta">
        <span class="ruta-n">1</span>
        <div>
          <h3>Mesa de dinero propia bajo la licencia de TUYA</h3>
          <p>TUYA monta la operación completa y se queda con todo el margen. Asume también todo
            el aparato regulatorio y toda la responsabilidad frente al supervisor.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>Volumen. Un solo cliente concentrado activa
          los límites de exposición y desarma el negocio.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">2</span>
        <div>
          <h3>Contrato de uso de red con otro intermediario</h3>
          <p>TUYA pone el front comercial y la relación con el cliente; el intermediario aliado
            pone la mesa y ejecuta. TUYA participa en el diferencial sin montar la operación.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>Qué porcentaje del diferencial se negocia y
          cómo se reparte la responsabilidad frente al cliente.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">3</span>
        <div>
          <h3>Contrato marco de alianza con un intermediario</h3>
          <p>El aliado aporta el trader acreditado, los esquemas de riesgo y la reportería, y
            TUYA opera bajo esa infraestructura pagando por el servicio.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>Hasta dónde llega la delegación sin que TUYA
          pierda el control que el supervisor le exige conservar.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">4</span>
        <div>
          <h3>Derivados de cobertura</h3>
          <p>La alternativa que no toca la estructura: cubrir el riesgo cambiario del flujo de
            proveedores con forwards o con una estructura de opciones.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>Tratamiento contable y de riesgo de la
          cobertura, y con qué contraparte se constituye.</p>
      </div>
      <div class="ruta">
        <span class="ruta-n">5</span>
        <div>
          <h3>Cobertura natural con divisas en cuenta del exterior</h3>
          <p>Comprar dólares cuando el precio favorece y mantenerlos afuera para atender el
            flujo de pagos. Es la ruta más simple y la que habilita, además, la llegada de
            recursos si mañana TUYA busca endeudamiento internacional.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>El efecto de esa tenencia en el margen de
          solvencia y en el régimen de inversiones, y la reportería que se activa.</p>
      </div>
      <div class="ruta aparte">
        <span class="ruta-n">6</span>
        <div>
          <h3>Instrumentos de valor estable — alternativa con condicionante de grupo</h3>
          <p>Existe y es jurídicamente practicable en Colombia hoy. Lo que la condiciona es el
            gobierno corporativo del grupo al que pertenece TUYA. Se desarrolla en el concepto
            solo si TUYA lo pide expresamente.</p>
        </div>
        <p class="ruta-tag"><b>Variable crítica</b>La aprobación del grupo, antes que cualquier
          análisis regulatorio.</p>
      </div>
    </div>

    <p class="nota-p">La respuesta está en cuál de estas rutas resiste el contraste entre lo que
      TUYA gana y lo que le cuesta sostenerla. Esa comparación es el objeto del primer servicio.</p>
  </div>
</section>

<section id="servicios">
  <div class="in">
    <p class="num">03 · Servicios</p>
    <h2>Lo que Bedrock hace</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Son dos servicios independientes. El primero produce la decisión; el segundo
      ejecuta la vía que hoy ya está disponible con la licencia que TUYA tiene. Se pueden
      contratar por separado, y contratarlos juntos tiene un ajuste en los honorarios.</p>

    <div class="servicio">
      <div class="servicio-cab">
        <div>
          <p class="et">Servicio uno</p>
          <h3>Concepto jurídico sobre las alternativas para operar divisas</h3>
        </div>
        <div class="servicio-precio">
          <p class="sp-v">7 SMLMV</p>
          <p class="sp-k">$12.256.335 antes de impuesto</p>
        </div>
      </div>
      <div class="servicio-cuerpo">
        <p>Un documento de decisión. Responde la pregunta tal como fue formulada y sostiene la respuesta con el fundamento normativo que permite llevarla a
          junta directiva y, si hace falta, exhibirla ante el supervisor.</p>

        <h4>Qué contiene</h4>
        <ul class="lista-p">
          <li>Análisis individual de cada una de las cinco rutas, con su fundamento en el régimen
            cambiario y en el régimen financiero aplicable a TUYA como compañía de financiamiento
            con licencia de intermediario del mercado cambiario.</li>
          <li>Matriz comparativa sobre criterios homogéneos: requisitos previos, aprobaciones de
            órgano social, infraestructura exigida, perfiles y acreditaciones de personal,
            obligaciones de reporte, tiempos de implementación y titularidad de la
            responsabilidad frente a la Superintendencia Financiera.</li>
          <li>Checklist de requisitos por ruta, redactado como lista de verificación operativa:
            qué documento, ante quién, en qué orden y con qué antelación.</li>
          <li>Análisis de los límites que condicionan la ruta de mesa propia: concentración por
            contraparte, exposiciones significativas y régimen de posición propia.</li>
          <li>Tratamiento de las obligaciones de reporte que ya aplican hoy a TUYA por tener la
            licencia, independientemente de la ruta que elija, incluida la que motivó el
            requerimiento recibido.</li>
          <li>Recomendación expresa y motivada, con el escenario en que esa recomendación
            cambiaría.</li>
        </ul>

        <div class="entregable">
          <h4>Entregable</h4>
          <p>Concepto jurídico firmado, en documento editable y en PDF, más la matriz comparativa
            y el checklist en formato de trabajo. Incluye una sesión de presentación del concepto
            al equipo de TUYA y una ronda de preguntas y ajustes posterior a esa sesión.</p>
        </div>
      </div>
    </div>

    <div class="servicio">
      <div class="servicio-cab">
        <div>
          <p class="et">Servicio dos</p>
          <h3>Acompañamiento en la apertura de la cuenta de compensación en el exterior</h3>
        </div>
        <div class="servicio-precio">
          <p class="sp-v">5 SMLMV</p>
          <p class="sp-k">$8.754.525 antes de impuesto</p>
        </div>
      </div>
      <div class="servicio-cuerpo">
        <p>La cuenta de compensación se puede abrir con independencia de lo que se decida sobre la
          mesa. Es la vía que TUYA recorre hoy con la licencia que ya tiene, y la que habilita
          tanto la cobertura natural como la llegada de recursos de un eventual endeudamiento
          internacional.</p>

        <h4>Qué comprende</h4>
        <ul class="lista-p">
          <li>Verificación de que el banco elegido cumple las condiciones del régimen cambiario
            colombiano para ser banco del exterior de una cuenta de compensación. No todas las
            plazas y filiales que un banco ofrece sirven para este propósito, y ese filtro se
            hace antes de iniciar cualquier trámite.</li>
          <li>Preparación del expediente institucional de vinculación ante el banco del exterior:
            documentación societaria, estructura de propiedad y beneficiario final, gobierno
            corporativo, programa de prevención de lavado de activos y financiación del
            terrorismo, y respuestas al cuestionario de banca corresponsal.</li>
          <li>Presentación del caso ante los equipos de banca corresponsal de Citibank y de
            JP&nbsp;Morgan, con quienes Bedrock tiene interlocución directa. Una advertencia
            concreta ya identificada: JP&nbsp;Morgan condiciona la apertura a que el sistema de
            cumplimiento de la entidad no sea manual, y ese punto se trabaja antes de presentar
            el caso.</li>
          <li>Registro y trámite de la cuenta ante el Banco de la República conforme al
            procedimiento vigente, con la documentación que ese trámite exige.</li>
          <li>Mapa de la reportería que se activa con la cuenta, con responsable, periodicidad y
            plazo de cada reporte, y el efecto de un reporte omitido.</li>
          <li>Advertencia técnica sobre el efecto de la tenencia de divisas en el exterior en el
            margen de solvencia y en el régimen de inversiones de TUYA, que es donde esta
            operación pasa de ser un asunto de tesorería a uno de riesgo financiero.</li>
        </ul>

        <div class="entregable">
          <h4>Entregable</h4>
          <p>Expediente de vinculación armado y radicado, solicitud presentada ante el Banco de la
            República, y manual interno de reportería de la cuenta. El acompañamiento se extiende
            hasta la apertura efectiva de la cuenta o hasta seis meses contados desde el inicio,
            lo que ocurra primero.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="alt" id="alcance">
  <div class="in">
    <p class="num">04 · Alcance</p>
    <h2>Qué queda dentro y qué no</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Delimitar el alcance por escrito evita la discusión posterior sobre qué se
      esperaba y no llegó. Lo que está en la columna derecha se puede contratar aparte, con su
      propia cotización.</p>

    <div class="jurisd">
      <div class="jurisd-c j-si">
        <h3>Incluido en los honorarios</h3>
        <ul class="lista-p">
          <li>El análisis jurídico de las cinco rutas y la recomendación motivada.</li>
          <li>La matriz comparativa y los checklists de requisitos.</li>
          <li>La sesión de presentación del concepto y la ronda de ajustes posterior.</li>
          <li>La preparación del expediente de vinculación ante el banco del exterior.</li>
          <li>La presentación del caso ante los equipos de banca corresponsal.</li>
          <li>El trámite de registro de la cuenta ante el Banco de la República.</li>
          <li>El mapa de obligaciones de reporte derivadas de la cuenta.</li>
        </ul>
      </div>
      <div class="jurisd-eje" aria-hidden="true"></div>
      <div class="jurisd-c j-no">
        <h3>Fuera del alcance</h3>
        <ul class="lista-p">
          <li>La decisión de apertura, que es del banco del exterior y no se garantiza.</li>
          <li>La negociación y redacción del contrato de uso de red o del contrato marco de
            alianza, si TUYA elige una de esas rutas.</li>
          <li>El montaje operativo de la mesa: manual de operaciones, integración técnica con el
            sistema del Banco de la República y acreditación de operadores.</li>
          <li>La representación en procesos administrativos sancionatorios.</li>
          <li>Los costos y comisiones que cobre el banco del exterior por la apertura y el
            mantenimiento de la cuenta.</li>
          <li>La asesoría tributaria sobre el tratamiento de la diferencia en cambio.</li>
        </ul>
      </div>
    </div>

    <p class="nota-p">Si al terminar el concepto TUYA decide una ruta que exige instrumentación
      contractual, Bedrock cotiza ese trabajo por separado. Esa cotización no condiciona la
      recomendación del concepto, y se dice aquí para que quede claro que no hay incentivo
      cruzado en la respuesta.</p>
  </div>
</section>

<section id="tiempos">
  <div class="in">
    <p class="num">05 · Ejecución</p>
    <h2>Tiempos</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">El concepto tiene plazo cierto porque depende solo de Bedrock. El
      acompañamiento se mide por hitos, porque una parte del calendario la fijan el banco del
      exterior y el Banco de la República.</p>

    <div class="linea-t">
      <div class="mes ini">
        <p class="mes-m">Semana 1</p>
        <p class="mes-d">Sesión de arranque y solicitud de información. Definición del banco
          objetivo.</p>
      </div>
      <div class="mes">
        <p class="mes-m">Semanas 2 y 3</p>
        <p class="mes-d">Elaboración del concepto. En paralelo, armado del expediente de
          vinculación.</p>
      </div>
      <div class="mes">
        <p class="mes-m">Semana 4</p>
        <p class="mes-d">Entrega y presentación del concepto. Ajustes. Presentación del caso al
          banco corresponsal.</p>
      </div>
      <div class="mes fin">
        <p class="mes-m">En adelante</p>
        <p class="mes-d">Trámite ante el banco del exterior y ante el Banco de la República,
          hasta la apertura o hasta el mes seis.</p>
      </div>
    </div>

    <p class="nota-p">Si se contrata solo el concepto, el plazo es de tres semanas contadas desde
      la sesión de arranque, y la sesión de presentación se realiza dentro de la cuarta.</p>
  </div>
</section>

<section class="alt" id="economico">
  <div class="in">
    <p class="num">06 · Honorarios</p>
    <h2>Lo que cuesta</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">Los honorarios se expresan en salarios mínimos legales mensuales vigentes,
      de modo que el valor no queda atado al año en que se firma. Para 2026 el salario mínimo es
      de $1.750.905. Contratar los dos servicios tiene un ajuste de dos salarios mínimos frente a
      la suma de ambos por separado.</p>

    <div class="calc">
      <div class="calc-cab">
        <h3>Honorarios según lo que se contrate</h3>
        <label class="sw-caja" for="sw-iva">
          <input type="checkbox" id="sw-iva" checked>
          <span class="sw-pista" aria-hidden="true"><span class="sw-bola"></span></span>
          Incluir impuesto sobre las ventas
        </label>
      </div>

      <div class="escenarios" role="group" aria-label="Escenario de contratación">
        <button type="button" class="esc" data-esc="0" aria-pressed="false">Solo el concepto</button>
        <button type="button" class="esc" data-esc="1" aria-pressed="false">Solo el acompañamiento</button>
        <button type="button" class="esc activo" data-esc="2" aria-pressed="true">Los dos servicios</button>
      </div>

      <div class="tabla-envoltura" tabindex="0" role="region" aria-label="Desglose de honorarios">
        <table class="tabla-pagos">
          <thead>
            <tr>
              <th scope="col">Servicio</th>
              <th scope="col" class="der">Medida</th>
              <th scope="col" class="der" id="th-valor">Valor con impuesto</th>
            </tr>
          </thead>
          <tbody id="tbody-pagos">
            <tr><td>Concepto jurídico sobre alternativas</td><td class="der">7 SMLMV</td><td class="der">14.585.039</td></tr>
            <tr><td>Acompañamiento en la apertura de la cuenta</td><td class="der">5 SMLMV</td><td class="der">10.417.885</td></tr>
            <tr><td>Ajuste por contratación conjunta</td><td class="der">−2 SMLMV</td><td class="der">−4.167.154</td></tr>
            <tr class="total"><th scope="row">Total</th><td class="der">10 SMLMV</td><td class="der">20.835.770</td></tr>
          </tbody>
        </table>
      </div>

      <div class="hechos-3">
        <div><span class="h-v" id="v-base">17.509.050</span><span class="h-k">Honorarios antes de impuesto</span></div>
        <div><span class="h-v" id="v-iva">3.326.720</span><span class="h-k" id="k-iva">Impuesto sobre las ventas, 19%</span></div>
        <div class="destaca"><span class="h-v" id="v-total">20.835.770</span><span class="h-k" id="k-total">Total con impuesto</span></div>
      </div>
    </div>

    <p class="nota-p">Forma de pago propuesta: cincuenta por ciento a la suscripción y cincuenta
      por ciento contra entrega del concepto, cuando se contrata solo el primer servicio o los
      dos. Si se contrata solo el acompañamiento, cincuenta por ciento a la suscripción y
      cincuenta por ciento a la radicación de la solicitud ante el Banco de la República. Los
      valores no incluyen gastos de desplazamiento fuera de Bogotá y Medellín, que se acuerdan
      previamente y se facturan al costo. Esta propuesta tiene vigencia de treinta días calendario
      contados desde su fecha.</p>
  </div>
</section>

<section id="quien">
  <div class="in">
    <p class="num">07 · Quién responde</p>
    <h2>La experiencia detrás del concepto</h2>
    <div class="regla" aria-hidden="true"></div>

    <p class="intro">El trabajo lo dirige quien estuvo siete años al frente de la dirección
      jurídica de una entidad que tenía simultáneamente licencia de comisionista de bolsa y de
      intermediario del mercado cambiario.</p>

    <div class="quien">
      <div>
        <h3>Operación cambiaria en entidad vigilada</h3>
        <p>Dirección jurídica de la operación de divisas de una entidad con licencia de
          intermediario del mercado cambiario, incluida la operación de giros internacionales de
          Western Union.</p>
      </div>
      <div>
        <h3>Trámite de una actividad nueva ante el supervisor</h3>
        <p>Conducción del proceso de autorización de negociación electrónica ante la
          Superintendencia Financiera: dos años de requerimientos, visitas y ajustes hasta la
          aprobación. De ahí sale la estimación realista de lo que cuesta montar una vertical
          nueva bajo una licencia existente.</p>
      </div>
      <div>
        <h3>Criterio de negocio además del jurídico</h3>
        <p>La recomendación se construye contra las cifras de TUYA. Por eso en la sesión el
          consejo fue no montar la mesa si el ahorro no la paga, antes de que existiera ninguna
          cotización de por medio.</p>
      </div>
    </div>
  </div>
</section>

<section class="cierre" id="cierre">
  <div class="in">
    <h2>Tres pasos para empezar</h2>
    <ol class="pasos-n">
      <li><h3>Confirmación del alcance</h3>
        <p>TUYA indica cuál de los tres escenarios contrata y si quiere que el concepto desarrolle
          la sexta ruta.</p></li>
      <li><h3>Suscripción del contrato de prestación de servicios</h3>
        <p>Con el alcance, el plazo y la forma de pago de esta propuesta incorporados, más el
          acuerdo de confidencialidad que la operación exige.</p></li>
      <li><h3>Sesión de arranque</h3>
        <p>Dentro de los cinco días hábiles siguientes a la suscripción, para recoger la
          información de la operación y fijar el banco objetivo.</p></li>
    </ol>
  </div>
</section>

<footer>
  <div class="in pie">
    <span class="logo logo-oscuro" role="img" aria-label="Bedrock Abogados"></span>
    <p>Propuesta de servicios profesionales · Bedrock Abogados S.A.S. · 30 de septiembre de 2026<br>
      Documento dirigido a Compañía de Financiamiento Tuya S.A. Su contenido es de uso exclusivo
      del destinatario.</p>
  </div>
</footer>
"""

SALIDA.write_text(cabeza + EXTRA + CUERPO + script, encoding="utf-8")
print(f"fuente: {SALIDA.stat().st_size/1024:.0f} KB")
