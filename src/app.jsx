import { useState } from "react";

const MATERIAS = ["Inglés", "Portugués", "Ciencias Sociales", "Ciencias Naturales", "Matemática"];

const EXCUSAS = {
  "Inglés": [
    "Seño, anoche mi abuela tuvo un mareo muy fuerte y tuve que quedarme con ella hasta las once porque mis papás no llegaban.",
    "Profe, se me cayó el vaso de agua arriba del cuaderno y todas las hojas quedaron mojadas, no se puede leer nada.",
    "Seño, me olvidé el cuaderno en lo de mi papá y él vive en otro barrio, no puedo ir a buscarlo hasta el finde.",
    "Profe, tuve una reacción alérgica muy fuerte anoche y me tuvieron que llevar a la guardia, llegué a casa tardísimo.",
    "Seño, se fue la luz en todo el barrio desde las seis de la tarde y no tuve con qué ver la tarea.",
    "Profe, mi hermanito chiquito estuvo llorando toda la noche con fiebre y no pude concentrarme para nada.",
    "Seño, se me rompió la mochila en el colectivo y se cayeron todas mis cosas, perdí las hojas con la tarea.",
    "Profe, tuve que ir al dentista de urgencia porque se me rompió un diente y estuve toda la tarde ahí.",
    "Seño, mi mamá tuvo un accidente leve con el auto y tuvimos que esperarla en la calle un montón de horas.",
    "Profe, se me trabó la computadora con la tarea adentro y no la pude abrir más, mi papá tampoco pudo arreglarla.",
    "Seño, mi perro se comió las hojas donde había hecho la tarea, le encanta morder el papel.",
    "Profe, me caí en el recreo del otro día y tengo el brazo lastimado, me duele mucho escribir.",
    "Seño, tuve que ir a buscar a mi hermanita al jardín porque mi mamá tuvo que quedarse trabajando hasta tarde.",
    "Profe, se cortó el agua caliente y mi mamá me mandó a lo de mi abuela a bañarme, llegué recontra tarde.",
    "Seño, mi gato se subió encima del cuaderno y lo empujó detrás del mueble, recién ahora lo encontramos.",
    "Profe, tuve un dolor de panza muy fuerte toda la noche, mi mamá dice que fue algo que comí.",
    "Seño, se me perdió el cuaderno en el colegio y estuve todo el recreo buscándolo.",
    "Profe, mi papá llegó del interior después de dos semanas y quiso que cenáramos todos juntos, me dormí tardísimo.",
    "Seño, tuve práctica de fútbol que duró hasta las nueve porque el profe agregó entrenamiento extra.",
    "Profe, me olvidé el cuaderno en el aula y cuando fui a buscarlo ya habían cerrado el colegio.",
  ],
  "Portugués": [
    "Seño, mi abuela estuvo muy mal anoche y tuvimos que acompañarla al médico, llegamos a casa a las once.",
    "Profe, se me volcó jugo arriba de todas las hojas de la tarea y no se podía leer nada.",
    "Seño, tuve un dolor de cabeza tan fuerte que mi mamá me mandó a dormir apenas llegué del colegio.",
    "Profe, se me cayó el cuaderno en un charco cuando bajé del colectivo y se mojó todo.",
    "Seño, mi hermanito rompió sin querer las hojas donde había hecho la tarea, las hizo pedacitos.",
    "Profe, tuve que quedarme con mi abuela porque se sentía sola y estaba muy asustada, no pude salir.",
    "Seño, se fue la luz justo cuando estaba terminando la tarea y perdí todo lo que había hecho.",
    "Profe, me lastimé la mano jugando en el recreo y me duele mucho agarrar el lápiz.",
    "Seño, mi mamá tuvo que llevar a mi papá al médico de urgencia y yo tuve que cuidar a mis hermanos.",
    "Profe, se me olvidó el cuaderno en lo de mi tía donde hice la tarea y ella vive lejos.",
    "Seño, tuve fiebre toda la tarde, mi mamá dice que es un virus que está dando vueltas.",
    "Profe, el perro de mi vecino se escapó y nos pasamos la tarde ayudando a buscarlo por todo el barrio.",
    "Seño, se me rompió el lápiz y no tenía otro, y los negocios ya estaban cerrados cuando me di cuenta.",
    "Profe, tuve una reunión muy larga en el club de atletismo que no sabía que era obligatoria.",
    "Seño, mi mamá me mandó a la farmacia de urgencia y la cola era larguísima, tardé dos horas.",
    "Profe, tuve que ir al oculista porque me dolían mucho los ojos y el médico dijo que no podía leer.",
    "Seño, se me trabó la mochila con el cierre roto y no pude sacar el cuaderno hasta hoy a la mañana.",
    "Profe, mi abuela vino de visita sorpresa desde Córdoba y mi mamá dijo que tenía que estar con ella.",
    "Seño, se cortó internet en casa y la parte de la tarea que tenía que buscar no la pude encontrar.",
    "Profe, tuve un ensayo de la obra de teatro del colegio que duró hasta tardísimo.",
  ],
  "Ciencias Sociales": [
    "Seño, mi mamá tuvo que trabajar hasta muy tarde y yo tuve que quedarme cuidando a mis hermanos chicos.",
    "Profe, se me cayó el cuaderno en una zanja cuando iba caminando al colegio y se empapó todo.",
    "Seño, tuve que acompañar a mi abuela al hospital porque tenía turno y mi mamá no podía llevarla.",
    "Profe, me quedé dormido sin querer cuando llegué del colegio y me desperté cuando ya era muy tarde.",
    "Seño, se me rompió el cuaderno por la mitad porque tenía las hojas muy llenas y pesaba mucho.",
    "Profe, mi gata tuvo gatitos anoche y tuvimos que estar despiertos toda la familia ayudándola.",
    "Seño, me agarró un ataque de asma y tuve que usar el inhalador y quedarme quieto toda la tarde.",
    "Profe, se inundó un poco la cocina por una canilla rota y tuvimos que limpiar toda la tarde.",
    "Seño, tuve que ir con mi papá a hacer un trámite muy largo que no podía esperar.",
    "Profe, mi hermanita se cayó y se cortó la cabeza, estuvimos horas en el hospital con ella.",
    "Seño, se me borró todo el trabajo de la computadora porque se apagó sola sin guardar.",
    "Profe, tuve que quedarme en el consultorio del médico cuatro horas porque había mucha gente.",
    "Seño, mi papá viajó de urgencia y tuvimos que ayudar a mi mamá con todo, no tuve tiempo.",
    "Profe, se me trabó la mochila con el cuaderno adentro y no lo pude sacar hasta hoy.",
    "Seño, tuve fútbol hasta tarde y después tuve que ducharme y cenar y ya era hora de dormir.",
    "Profe, mi mamá estuvo muy mal del estómago y tuve que hacerle compañía toda la noche.",
    "Seño, se me olvidó el cuaderno en el colectivo y recién hoy lo encontraron en la terminal.",
    "Profe, tuve que cuidar a mi primo chiquito porque mi tía tuvo una emergencia en el trabajo.",
    "Seño, me caí de la bici y me raspé mucho las manos, no podía escribir del dolor.",
    "Profe, hubo un corte de agua en el barrio y estuvimos toda la tarde sin poder hacer nada normal.",
  ],
  "Ciencias Naturales": [
    "Seño, mi papá tuvo que ir al médico de urgencia y yo tuve que acompañarlo porque mi mamá estaba trabajando.",
    "Profe, se me volcó el termo arriba del cuaderno y se borró todo lo que había escrito.",
    "Seño, tuve una reacción alérgica muy fuerte y los ojos me lloraban tanto que no podía ver para escribir.",
    "Profe, mi hermanito chico agarró el cuaderno y le arrancó las hojas sin que yo me diera cuenta.",
    "Seño, tuve que ir a la guardia porque me clavé algo en el pie y tuvieron que sacarme una astilla enorme.",
    "Profe, se cortó la luz justo cuando estaba leyendo el tema para hacer la tarea.",
    "Seño, mi abuela se cayó y tuvimos que llevarla al hospital, llegué a casa casi a medianoche.",
    "Profe, tuve un dolor de muelas horrible toda la tarde, no podía pensar en nada más.",
    "Seño, se me mojó la mochila completa porque me agarró una tormenta y no tenía paraguas.",
    "Profe, tuve que quedarme en el colegio hasta tarde por una reunión del equipo de handball.",
    "Seño, mi mamá me mandó a hacer las compras porque ella estaba muy cansada y tardé muchísimo.",
    "Profe, se me rompió el cuaderno en la mochila, las hojas quedaron todas arrugadas y rotas.",
    "Seño, tuve que llevar a mi perro al veterinario de urgencia porque se había comido algo malo.",
    "Profe, me quedé encerrado en el ascensor del edificio media hora y llegué tardísimo a casa.",
    "Seño, tuve una competencia de natación que duró mucho más de lo esperado y llegué agotado.",
    "Profe, mi papá me pidió que lo ayudara con una mudanza urgente y no pude negarme.",
    "Seño, se me infectó un dedo y el médico dijo que no podía escribir por unos días.",
    "Profe, hubo una alarma de incendio en el edificio y tuvimos que evacuar, llegué muy tarde a casa.",
    "Seño, mi computadora se llenó de virus y perdí todo el trabajo que había hecho.",
    "Profe, tuve que esperar cuatro horas en la guardia por una alergia y cuando llegué a casa era tardísimo.",
  ],
  "Matemática": [
    "Seño, mi mamá tuvo que llevar a mi hermanito a la guardia con fiebre muy alta y yo me quedé solo en casa asustado.",
    "Profe, se me cayó el cuaderno en el desagüe cuando iba caminando y se arruinó todo.",
    "Seño, tuve que acompañar a mi abuela al banco porque ella no puede ir sola y la cola era larguísima.",
    "Profe, me lastimé el dedo índice jugando al básquet y no puedo escribir, me lo vendaron en la enfermería.",
    "Seño, se fue la luz en toda la manzana desde las cinco de la tarde y no pude ver nada.",
    "Profe, mi perro se puso muy mal anoche y estuvimos toda la familia en el veterinario de urgencia.",
    "Seño, tuve un sangrado de nariz que no paraba y mi mamá me tuvo que llevar al médico.",
    "Profe, se me olvidó el cuaderno en el taxi y el taxista no atendió más el teléfono.",
    "Seño, mi papá tuvo una reunión muy importante y me pidió que cuidara a mis hermanos hasta que llegara.",
    "Profe, me agarró un calambre muy fuerte en la mano y no podía moverla para escribir.",
    "Seño, tuve que quedarme hasta tarde en el ensayo del acto del colegio porque faltaban chicos.",
    "Profe, se me perdió el cuaderno en el recreo y estuve todo el día buscándolo sin encontrarlo.",
    "Seño, mi abuela vino de visita con mi abuelo que está muy enfermo y mi mamá dijo que tenía que estar con ellos.",
    "Profe, se inundó mi cuarto por la lluvia y tuve que ayudar a mi mamá a sacar el agua toda la tarde.",
    "Seño, tuve una crisis de asma y el médico me dijo que tenía que descansar y no hacer esfuerzo.",
    "Profe, mi mamá se torció el tobillo y tuve que hacer todas las cosas de la casa para ayudarla.",
    "Seño, me quedé encerrado en casa de mi abuela porque se rompió la llave y tuvieron que llamar a un cerrajero.",
    "Profe, tuve que ir a la farmacia tres veces porque cada vez mi mamá se acordaba de algo más que necesitaba.",
    "Seño, se me rompieron los anteojos y sin ellos no puedo leer ni escribir nada.",
    "Profe, hubo una pelea en el barrio y mi mamá no me dejó salir ni abrir las ventanas hasta que pasó todo.",
  ]
};

export default function AntiProfes() {
  const [materia, setMateria] = useState("");
  const [excusa, setExcusa] = useState("Elegí una materia y apretá el botón, agente.");
  const [copiado, setCopiado] = useState(false);
  const [usadas, setUsadas] = useState([]);

  function generarExcusa() {
    if (!materia) { alert("Primero elegí una materia, agente."); return; }

    const disponibles = EXCUSAS[materia].filter((_, i) => !usadas.includes(materia + i));

    let idx, excusaElegida, idxOriginal;
    if (disponibles.length === 0) {
      setUsadas([]);
      idx = Math.floor(Math.random() * EXCUSAS[materia].length);
      excusaElegida = EXCUSAS[materia][idx];
      setUsadas([materia + idx]);
    } else {
      idx = Math.floor(Math.random() * disponibles.length);
      excusaElegida = disponibles[idx];
      idxOriginal = EXCUSAS[materia].indexOf(excusaElegida);
      setUsadas(prev => [...prev, materia + idxOriginal]);
    }
    setExcusa(excusaElegida);
  }

  function copiarExcusa() {
    navigator.clipboard.writeText(excusa).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  return (
    <div style={{ background: "#0d0d1f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "'Courier New', monospace" }}>
      <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 420, border: "1px solid #2a2a4a", position: "relative", overflow: "hidden" }}>

        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 420 560" preserveAspectRatio="none">
          <polyline points="0,0 60,0 20,40 55,40 0,110" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.25"/>
          <polyline points="420,560 360,560 400,520 365,520 420,450" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.25"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 2, color: "#4ade80", border: "1px solid #4ade80", padding: "3px 10px", borderRadius: 4, marginBottom: 8 }}>
              NIVEL SECRETO MAXIMO
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, color: "#fff", letterSpacing: -0.5 }}>El Anti Profes</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, letterSpacing: 1 }}>// generador de excusas v2.0 //</div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #2a2a4a", margin: "1.25rem 0" }} />

          <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 1.5, marginBottom: 8 }}>SELECCIONAR MATERIA:</div>
          <select
            value={materia}
            onChange={e => setMateria(e.target.value)}
            style={{ background: "#0f0f1f", border: "1px solid #2a2a4a", borderRadius: 8, padding: "12px 16px", color: "#d1d5db", fontSize: 15, width: "100%", appearance: "none", cursor: "pointer", fontFamily: "monospace" }}
          >
            <option value="">Elegí la materia...</option>
            {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          <div
            onClick={generarExcusa}
            style={{
              width: "100%", boxSizing: "border-box",
              background: "#4ade80", color: "#0a0a1a",
              borderRadius: 8, padding: 14, fontSize: 15,
              fontWeight: 700, cursor: "pointer",
              marginTop: "1rem", letterSpacing: 0.5,
              textAlign: "center", fontFamily: "monospace",
              userSelect: "none"
            }}
          >
            GENERAR EXCUSA SECRETA
          </div>

          <div style={{ background: "#0f0f1f", border: "1px solid #2a2a4a", borderRadius: 10, padding: "1.25rem", marginTop: "1.25rem" }}>
            <div style={{ fontSize: 10, color: "#4ade80", letterSpacing: 2, marginBottom: 8 }}>EXCUSA GENERADA:</div>
            <p style={{ color: "#d1d5db", fontSize: 14, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>{excusa}</p>
            <div
              onClick={copiarExcusa}
              style={{ display: "inline-block", marginTop: 10, fontSize: 11, color: copiado ? "#4ade80" : "#4b5563", border: `1px solid ${copiado ? "#4ade80" : "#2a2a4a"}`, padding: "4px 12px", borderRadius: 20, cursor: "pointer", fontFamily: "monospace" }}
            >
              {copiado ? "COPIADO!" : "COPIAR EXCUSA"}
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: 10, color: "#374151", letterSpacing: 1 }}>
            INFORMACION CLASIFICADA — SOLO PARA AGENTES
          </div>
        </div>
      </div>
    </div>
  );
}
