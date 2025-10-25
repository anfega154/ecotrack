import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Leaf } from "lucide-react";

const HabitsPage = () => {
  const { user } = useAuth();

  const [transport, setTransport] = useState("");
  const [energy, setEnergy] = useState("");
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [duration, setDuration] = useState("");
  const [dayType, setDayType] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const getEcoTip = () => {
    if (transport === "carro")
      return "🚴 Prueba usar bicicleta un día a la semana para reducir emisiones.";
    if (energy === "mucho")
      return "💡 Apagar los dispositivos en espera puede ayudarte a ahorrar energía.";
    if (transport === "bici" || transport === "publico")
      return "🌿 Excelente elección, reduces tu huella de carbono.";
    return "Sigue registrando tus hábitos para obtener recomendaciones personalizadas.";
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, "habits"), {
        uid: user.uid,
        transport,
        energy,
        date,
        duration,
        dayType,
        notes,
        createdAt: Timestamp.now(),
      });

      setMessage("✅ Hábito registrado correctamente");
      setTransport("");
      setEnergy("");
      setDuration("");
      setDayType("");
      setNotes("");
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error("Error al guardar el hábito:", error);
      setMessage("❌ Error al guardar el hábito");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 vw-100 py-3"
      style={{
        backgroundColor: "#1e293b",
        overflow: "hidden",
      }}
    >
      <div
        className="row g-0 w-100 h-100 justify-content-center align-items-center"
        style={{ padding: "1.5 rem 0" }}
      >
        <div
          className="col-lg-5 col-md-6 d-none d-md-block"
          style={{
            height: "85%",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 0 15px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src="https://i.pinimg.com/736x/9a/d0/cc/9ad0cc9f76c0de20c9ee2728e46bbd81.jpg"
            alt="nature background"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover", filter: "brightness(85%)" }}
          />
        </div>


        <div className="col-lg-5 col-md-6 col-12 d-flex align-items-center justify-content-center">
          <div
            className="p-4 rounded-4 shadow-lg mt-4 mb-4"
            style={{
              maxWidth: "480px",
              width: "100%",
              backgroundColor: "#111827",
              border: "1px solid #1f2937",
            }}
          >
            <div className="d-flex align-items-center mb-4">
              <Leaf className="text-success me-2" size={38} />
              <h2 className="fw-bold mb-0 text-white">EcoTrack</h2>
            </div>

            <h5 className="mb-4 fw-semibold text-light">
              Registra tus hábitos sostenibles 🌱
            </h5>

            {message && (
              <div
                className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"
                  } py-2 text-center`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="text-white">
              <div className="mb-3">
                <label className="form-label">📅 Fecha</label>
                <input
                  type="date"
                  className="form-control bg-secondary border-0 text-white"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">🚗 Transporte utilizado</label>
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="form-select bg-secondary border-0 text-white"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="bici">Bicicleta</option>
                  <option value="publico">Transporte público</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">💡 Consumo eléctrico</label>
                <select
                  value={energy}
                  onChange={(e) => setEnergy(e.target.value)}
                  className="form-select bg-secondary border-0 text-white"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="poco">Pocas horas</option>
                  <option value="medio">Horas medias</option>
                  <option value="mucho">Muchas horas</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">📆 Tipo de día</label>
                <select
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value)}
                  className="form-select bg-secondary border-0 text-white"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="laboral">Laboral</option>
                  <option value="finDeSemana">Fin de semana</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">📊 Intensidad del hábito</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="form-select bg-secondary border-0 text-white"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="bajo">Bajo</option>
                  <option value="medio">Medio</option>
                  <option value="alto">Alto</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">📝 Comentarios</label>
                <textarea
                  className="form-control bg-secondary border-0 text-white"
                  rows={3}
                  placeholder="Por ejemplo: trabajé desde casa, apagué las luces..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100 py-2 fw-semibold rounded-3"
              >
                Guardar hábito
              </button>
            </form>


            <div
              className="alert alert-secondary mt-4 text-center small rounded-3"
              style={{
                backgroundColor: "#1e293b",
                color: "#a3e635",
              }}
            >
              {getEcoTip()}
            </div>

            <div className="text-center mt-4">
              <small className="text-secondary">
                <a href="/dashboard" className="text-decoration-none me-2 text-light">
                  Ver mis hábitos
                </a>
                ·
                 <a
                  href="https://www.youtube.com/watch?v=PXwbGfxX0iw"
                  className="text-decoration-none ms-2 text-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consejos ecológicos
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
