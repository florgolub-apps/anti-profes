import { useState } from "react";

const MATERIAS = ["Inglés", "Portugués", "Ciencias Sociales", "Ciencias Naturales", "Matemática"];

export default function AntiProfes() {
  const [materia, setMateria] = useState("");
  const [excusa, setExcusa] = useState("Elegí una materia y apretá el botón, agente.");
  const [cargando, setCargando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [historial, setHistorial] = useState([]);

  async function generarExcusa() {
    if (!materia) { alert("Primero elegí una materia, agente."); return; }
    setCargando(true);
    setExcusa("GENERANDO EXCUSA CLASIFICADA...");

    const historialTexto = historial.length > 0
      ? `\n\nYA USASTE ESTAS EXCUSAS ANTES. NO REPITAS NINGÚN ELEMENTO (ni la situación, ni los personajes, ni los objetos, ni el lugar):\n${historial.map((h, i) => `${i + 1}. ${h}`).join("\n")}`
      : "";

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `Generá UNA sola excusa dramática y creíble para no haber hecho la tarea de ${materia}. Tiene que sonar como algo que realmente le podría pasar a un chico de 10 años: una emergencia familiar, algo que se rompió, una situación de salud, etc. Corta (2-3 oraciones), en español rioplatense, empezá con "Seño/Profe,", con tono serio y un poco dramático, pero posible. Respondé SOLO la excusa, sin comillas ni explicaciones.${historialTexto}`
          }]
        })
      });
      const data = await res.json();
      const nueva = data.content[0].text.trim();
      setExcusa(nueva);
      setHistorial(prev => [...prev.slice(-9), nueva]);
    } catch {
      setExcusa("Error de conexión. Intentá de nuevo, agente.");
    }
    setCargando(false);
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

        {/* Rayos decorativos */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 420 560" preserveAspectRatio="none">
          <polyline points="0,0 60,0 20,40 55,40 0,110" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.25"/>
          <polyline points="420,560 360,560 400,520 365,520 420,450" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.25"/>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ display: "inline-block", fontSize: 10, letterSpacing: 2, color: "#4ade80", border: "1px solid #4ade80", padding: "3px 10px", borderRadius: 4, marginBottom: 8 }}>
              NIVEL SECRETO MAXIMO
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, color: "#fff", letterSpacing: -0.5 }}>El Anti Profes</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4, letterSpacing: 1 }}>// generador de excusas v1.0 //</div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #2a2a4a", margin: "1.25rem 0" }} />

          {/* Selector */}
          <div style={{ fontSize: 11, color: "#4ade80", letterSpacing: 1.5, marginBottom: 8 }}>SELECCIONAR MATERIA:</div>
          <select
            value={materia}
            onChange={e => setMateria(e.target.value)}
            style={{ background: "#0f0f1f", border: "1px solid #2a2a4a", borderRadius: 8, padding: "12px 16px", color: "#d1d5db", fontSize: 15, width: "100%", appearance: "none", cursor: "pointer", fontFamily: "monospace" }}
          >
            <option value="">Elegí la materia...</option>
            {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>

          {/* Botón */}
          <div
            onClick={!cargando ? generarExcusa : undefined}
            style={{
              width: "100%", boxSizing: "border-box",
              background: cargando ? "#1f4a30" : "#4ade80",
              color: cargando ? "#4a7a5a" : "#0a0a1a",
              borderRadius: 8, padding: 14, fontSize: 15,
              fontWeight: 700, cursor: cargando ? "not-allowed" : "pointer",
              marginTop: "1rem", letterSpacing: 0.5,
              textAlign: "center", fontFamily: "monospace",
              userSelect: "none"
            }}
          >
            {cargando ? "DESCIFRANDO..." : "GENERAR EXCUSA SECRETA"}
          </div>

          {/* Resultado */}
          <div style={{ background: "#0f0f1f", border: "1px solid #2a2a4a", borderRadius: 10, padding: "1.25rem", marginTop: "1.25rem" }}>
            <div style={{ fontSize: 10, color: "#4ade80", letterSpacing: 2, marginBottom: 8 }}>
              EXCUSA GENERADA: {historial.length > 0 && <span style={{ color: "#374151" }}>({historial.length}/10 usadas)</span>}
            </div>
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
