import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { 
  Leaf, Car, Zap, Calendar, Clock, 
  MessageSquare, CheckCircle2, Sparkles, TrendingUp,
  Award, Target, Info
} from "lucide-react";

const HabitsPage = () => {
  const { user } = useAuth();

  const [transport, setTransport] = useState<string>("");
  const [energy, setEnergy] = useState<string>("");
  const [date, setDate] = useState<string>(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [duration, setDuration] = useState<string>("");
  const [dayType, setDayType] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEcoTip = () => {
    if (transport === "carro")
      return "🚴 Prueba usar bicicleta un día a la semana para reducir emisiones.";
    if (energy === "mucho")
      return "💡 Apagar los dispositivos en espera puede ayudarte a ahorrar energía.";
    if (transport === "bici" || transport === "publico")
      return "🌿 Excelente elección, reduces tu huella de carbono.";
    return "Sigue registrando tus hábitos para obtener recomendaciones personalizadas.";
  };

  // Calculate completion percentage
  const calculateProgress = () => {
    const fields = [transport, energy, dayType, duration, date];
    const completed = fields.filter(f => f).length;
    return Math.round((completed / fields.length) * 100);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setMessage("");

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

      setMessage("success");
      setTransport("");
      setEnergy("");
      setDuration("");
      setDayType("");
      setNotes("");
      
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error al guardar el hábito:", error);
      setMessage("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 vw-100 py-4"
      style={{
        backgroundColor: "#0f172a",
        overflow: "auto",
        position: "relative"
      }}
    >
      {/* Animated Background */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)",
          animation: "pulse 10s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkmark {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        .card-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
        }
        .card-hover.selected {
          border-color: #10b981 !important;
          background-color: rgba(16, 185, 129, 0.1) !important;
        }
        .progress-bar-animated {
          transition: width 0.5s ease;
        }
        .input-modern {
          transition: all 0.3s ease;
        }
        .input-modern:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
          border-color: #10b981 !important;
          transform: translateY(-2px);
        }
      `}</style>

      <div className="container" style={{ maxWidth: "1400px", position: "relative", zIndex: 1 }}>
        <div className="row g-4 justify-content-center align-items-start">
          
          {/* Left Side - Image & Stats */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="sticky-top" style={{ top: "2rem" }}>
              {/* Hero Image Card */}
              <div 
                className="rounded-4 overflow-hidden mb-4 position-relative animate-fadeIn"
                style={{
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                  height: "400px"
                }}
              >
                <img
                  src="https://i.pinimg.com/736x/9a/d0/cc/9ad0cc9f76c0de20c9ee2728e46bbd81.jpg"
                  alt="nature background"
                  className="w-100 h-100"
                  style={{ objectFit: "cover", filter: "brightness(0.85)" }}
                />
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.4) 100%)"
                }} />
                
                {/* Floating Stats */}
                <div 
                  className="position-absolute bottom-0 start-0 end-0 p-4"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                  }}
                >
                  <div className="text-white">
                    <h4 className="fw-bold mb-2">
                      <Sparkles size={24} className="me-2" />
                      Tu impacto cuenta
                    </h4>
                    <p className="mb-3" style={{ fontSize: "0.9rem", opacity: 0.9 }}>
                      Cada acción sostenible te acerca a un futuro más verde
                    </p>
                    <div className="d-flex gap-3">
                      {[
                        { icon: Target, label: "Metas claras", color: "#3b82f6" },
                        { icon: TrendingUp, label: "Progreso visible", color: "#10b981" },
                        { icon: Award, label: "Recompensas", color: "#f59e0b" }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                          }}
                        >
                          <item.icon size={18} style={{ color: item.color }} />
                          <small className="fw-semibold">{item.label}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div 
                className="p-4 rounded-4 animate-slideUp"
                style={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #334155",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="text-white fw-semibold mb-0">
                    <TrendingUp size={18} className="me-2" />
                    Progreso del formulario
                  </h6>
                  <span className="badge bg-success">{calculateProgress()}%</span>
                </div>
                <div 
                  className="progress" 
                  style={{ 
                    height: "8px", 
                    backgroundColor: "#334155",
                    borderRadius: "4px"
                  }}
                >
                  <div 
                    className="progress-bar bg-success progress-bar-animated"
                    style={{ 
                      width: `${calculateProgress()}%`,
                      borderRadius: "4px"
                    }}
                  />
                </div>
                <p className="mt-3 mb-0" style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>
                  <Info size={14} className="me-1" />
                  Completa todos los campos para registrar tu hábito
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-lg-6 col-12">
            <div
              className="p-4 p-md-5 rounded-4 animate-slideUp"
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)"
              }}
            >
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="d-flex align-items-center">
                  <div className="p-2 rounded-3 me-3" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}>
                    <Leaf className="text-success" size={32} />
                  </div>
                  <div>
                    <h3 className="fw-bold mb-0 text-white">EcoTrack</h3>
                    <small style={{ color: "#94a3b8" }}>Registra tus hábitos</small>
                  </div>
                </div>
              </div>

              <hr style={{ borderColor: "#334155", margin: "1.5rem 0" }} />

              {/* Success/Error Message */}
              {message && (
                <div 
                  className={`alert d-flex align-items-center py-3 mb-4 animate-fadeIn`}
                  style={{ 
                    backgroundColor: message === "success" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    border: `1px solid ${message === "success" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                    borderRadius: "0.75rem",
                    color: message === "success" ? "#86efac" : "#fca5a5"
                  }}
                >
                  {message === "success" ? (
                    <>
                      <CheckCircle2 size={20} className="me-2 flex-shrink-0" style={{ animation: "checkmark 0.5s ease" }} />
                      <div>
                        <div className="fw-semibold mb-1">¡Hábito registrado exitosamente!</div>
                        <small style={{ opacity: 0.9 }}>Tu compromiso con el planeta ha sido guardado</small>
                      </div>
                    </>
                  ) : (
                    <>
                      <Info size={20} className="me-2 flex-shrink-0" />
                      <span>Error al guardar el hábito. Inténtalo de nuevo.</span>
                    </>
                  )}
                </div>
              )}

              <form onSubmit={handleSave} className="text-white">
                
                {/* Step 1: Date & Transport */}
                <div className="mb-4">
                  <h6 className="text-success fw-semibold mb-3 d-flex align-items-center">
                    <span className="badge bg-success me-2" style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>1</span>
                    Información básica
                  </h6>

                  {/* Date */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <Calendar size={16} className="me-2" />
                      Fecha
                    </label>
                    <input
                      type="date"
                      className="form-control input-modern border-0 text-white py-3"
                      style={{ 
                        backgroundColor: "#334155",
                        borderRadius: "0.75rem"
                      }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>

                  {/* Transport Cards */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <Car size={16} className="me-2" />
                      Medio de transporte
                    </label>
                    <div className="row g-3">
                      {[
                        { value: "carro", label: "Carro", icon: "🚗", impact: "Alto" },
                        { value: "moto", label: "Moto", icon: "🏍️", impact: "Medio" },
                        { value: "bici", label: "Bicicleta", icon: "🚴", impact: "Cero" },
                        { value: "publico", label: "Público", icon: "🚌", impact: "Bajo" }
                      ].map((item) => (
                        <div key={item.value} className="col-6">
                          <div
                            onClick={() => setTransport(item.value)}
                            className={`card-hover p-3 rounded-3 text-center ${transport === item.value ? 'selected' : ''}`}
                            style={{
                              backgroundColor: "#334155",
                              border: "2px solid",
                              borderColor: transport === item.value ? "#10b981" : "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <div style={{ fontSize: "2rem" }} className="mb-2">{item.icon}</div>
                            <div className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>{item.label}</div>
                            <small style={{ color: transport === item.value ? "#10b981" : "#94a3b8" }}>
                              CO₂: {item.impact}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: "#334155", opacity: 0.5, margin: "1.5rem 0" }} />

                {/* Step 2: Energy & Day Type */}
                <div className="mb-4">
                  <h6 className="text-success fw-semibold mb-3 d-flex align-items-center">
                    <span className="badge bg-success me-2" style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
                    Consumo y contexto
                  </h6>

                  {/* Energy Cards */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <Zap size={16} className="me-2" />
                      Consumo eléctrico
                    </label>
                    <div className="row g-3">
                      {[
                        { value: "poco", label: "Bajo", icon: "💡", hours: "0-4h" },
                        { value: "medio", label: "Medio", icon: "⚡", hours: "4-8h" },
                        { value: "mucho", label: "Alto", icon: "🔥", hours: "+8h" }
                      ].map((item) => (
                        <div key={item.value} className="col-4">
                          <div
                            onClick={() => setEnergy(item.value)}
                            className={`card-hover p-3 rounded-3 text-center ${energy === item.value ? 'selected' : ''}`}
                            style={{
                              backgroundColor: "#334155",
                              border: "2px solid",
                              borderColor: energy === item.value ? "#10b981" : "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <div style={{ fontSize: "1.8rem" }} className="mb-2">{item.icon}</div>
                            <div className="fw-semibold mb-1" style={{ fontSize: "0.85rem" }}>{item.label}</div>
                            <small style={{ color: "#94a3b8" }}>{item.hours}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Day Type */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <Calendar size={16} className="me-2" />
                      Tipo de día
                    </label>
                    <div className="row g-3">
                      {[
                        { value: "laboral", label: "Laboral", icon: "💼" },
                        { value: "finDeSemana", label: "Fin de semana", icon: "🌴" }
                      ].map((item) => (
                        <div key={item.value} className="col-6">
                          <div
                            onClick={() => setDayType(item.value)}
                            className={`card-hover p-3 rounded-3 text-center ${dayType === item.value ? 'selected' : ''}`}
                            style={{
                              backgroundColor: "#334155",
                              border: "2px solid",
                              borderColor: dayType === item.value ? "#10b981" : "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <div style={{ fontSize: "2rem" }} className="mb-2">{item.icon}</div>
                            <div className="fw-semibold" style={{ fontSize: "0.9rem" }}>{item.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr style={{ borderColor: "#334155", opacity: 0.5, margin: "1.5rem 0" }} />

                {/* Step 3: Intensity & Notes */}
                <div className="mb-4">
                  <h6 className="text-success fw-semibold mb-3 d-flex align-items-center">
                    <span className="badge bg-success me-2" style={{ width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>
                    Detalles adicionales
                  </h6>

                  {/* Intensity */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <Clock size={16} className="me-2" />
                      Intensidad del hábito
                    </label>
                    <div className="row g-3">
                      {[
                        { value: "bajo", label: "Bajo", icon: "🌱", color: "#86efac" },
                        { value: "medio", label: "Medio", icon: "🌿", color: "#10b981" },
                        { value: "alto", label: "Alto", icon: "🌳", color: "#059669" }
                      ].map((item) => (
                        <div key={item.value} className="col-4">
                          <div
                            onClick={() => setDuration(item.value)}
                            className={`card-hover p-3 rounded-3 text-center ${duration === item.value ? 'selected' : ''}`}
                            style={{
                              backgroundColor: "#334155",
                              border: "2px solid",
                              borderColor: duration === item.value ? "#10b981" : "transparent",
                              cursor: "pointer"
                            }}
                          >
                            <div style={{ fontSize: "1.8rem" }} className="mb-2">{item.icon}</div>
                            <div className="fw-semibold" style={{ fontSize: "0.85rem", color: duration === item.value ? item.color : "white" }}>
                              {item.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center" style={{ fontSize: "0.9rem" }}>
                      <MessageSquare size={16} className="me-2" />
                      Notas adicionales <span style={{ color: "#94a3b8" }} className="ms-2">(opcional)</span>
                    </label>
                    <textarea
                      className="form-control input-modern border-0 text-white"
                      style={{ 
                        backgroundColor: "#334155",
                        borderRadius: "0.75rem",
                        minHeight: "100px",
                        resize: "vertical"
                      }}
                      placeholder="Ej: Trabajé desde casa, apagué luces durante el día, recicle..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <small className="mt-2 d-block" style={{ color: "#cbd5e1" }}>
                      Comparte más detalles sobre tus acciones sostenibles del día
                    </small>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-success w-100 py-3 fw-semibold d-flex align-items-center justify-content-center"
                  style={{ 
                    borderRadius: "0.75rem",
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} className="me-2" />
                      Registrar hábito sostenible
                    </>
                  )}
                </button>
              </form>

              {/* Eco Tip Card */}
              <div
                className="mt-4 p-4 rounded-3 animate-fadeIn"
                style={{
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)"
                }}
              >
                <div className="d-flex align-items-start">
                  <Sparkles size={20} className="text-success me-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="fw-semibold text-success mb-1">💚 Consejo eco-amigable</div>
                    <p className="text-light mb-0" style={{ fontSize: "0.9rem" }}>
                      {getEcoTip()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              <div className="text-center mt-4 pt-3" style={{ borderTop: "1px solid #334155" }}>
                <small style={{ color: "#cbd5e1" }}>
                  <Link to="/dashboard" className="text-decoration-none me-3 text-success fw-semibold">
                    📊 Ver mi dashboard
                  </Link>
                  <span style={{ color: "#94a3b8" }}>·</span>
                  <a
                    href="https://www.youtube.com/watch?v=PXwbGfxX0iw"
                    className="text-decoration-none ms-3 text-success fw-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌱 Consejos ecológicos
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitsPage;
