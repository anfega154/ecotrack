import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
  Calendar,
  Car,
  Bike,
  Bus,
  Zap,
  Clock,
  FileText,
  TrendingUp,
  Filter,
  Download,
  Search,
  Leaf,
  Award,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Habit {
  date: string;
  transport: string;
  energy: string;
  duration: string;
  dayType: string;
  notes: string;
  createdAt: any;
}

const HistoryPage = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTransport, setFilterTransport] = useState("all");
  const [filterEnergy, setFilterEnergy] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "habits"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const habitsData = querySnapshot.docs.map((doc) => doc.data()) as Habit[];
        // Ordenar en el cliente por fecha descendente
        const sortedData = habitsData.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setHabits(sortedData);
        setFilteredHabits(sortedData);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [user]);

  // Filtros y búsqueda
  useEffect(() => {
    let filtered = habits;

    if (searchTerm) {
      filtered = filtered.filter(
        (h) =>
          h.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTransport !== "all") {
      filtered = filtered.filter((h) => h.transport === filterTransport);
    }

    if (filterEnergy !== "all") {
      filtered = filtered.filter((h) => h.energy === filterEnergy);
    }

    setFilteredHabits(filtered);
  }, [searchTerm, filterTransport, filterEnergy, habits]);

  // Estadísticas
  const stats = {
    total: habits.length,
    ecoFriendly: habits.filter((h) => h.transport === "bici" || h.transport === "publico").length,
    highImpact: habits.filter((h) => h.transport === "carro" && h.energy === "mucho").length,
    lowEnergy: habits.filter((h) => h.energy === "poco").length,
  };

  const getTransportIcon = (transport: string) => {
    switch (transport) {
      case "carro":
        return <Car size={18} />;
      case "moto":
        return <Car size={18} />;
      case "bici":
        return <Bike size={18} />;
      case "publico":
        return <Bus size={18} />;
      default:
        return <Car size={18} />;
    }
  };

  const getTransportColor = (transport: string) => {
    switch (transport) {
      case "carro":
        return "bg-danger";
      case "moto":
        return "bg-warning";
      case "bici":
        return "bg-success";
      case "publico":
        return "bg-info";
      default:
        return "bg-secondary";
    }
  };

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case "mucho":
        return "bg-danger";
      case "medio":
        return "bg-warning";
      case "poco":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getHabitStatus = (habit: Habit) => {
    const isEcoTransport = habit.transport === "bici" || habit.transport === "publico";
    const isLowEnergy = habit.energy === "poco";

    if (isEcoTransport && isLowEnergy) {
      return { icon: <Award size={16} />, text: "Excelente", color: "success" };
    } else if (isEcoTransport || isLowEnergy) {
      return { icon: <CheckCircle size={16} />, text: "Bueno", color: "info" };
    } else {
      return { icon: <AlertCircle size={16} />, text: "Mejorar", color: "warning" };
    }
  };

  const exportToCSV = () => {
    const headers = ["Fecha", "Transporte", "Energía", "Duración", "Tipo de día", "Notas"];
    const rows = filteredHabits.map((h) => [
      h.date,
      h.transport,
      h.energy,
      h.duration,
      h.dayType,
      h.notes || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `ecotrack_history_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="min-vh-100 vw-100 p-4 text-white"
      style={{ backgroundColor: "#111827" }}
    >
      {/* Header */}
      <div className="container-fluid" style={{ maxWidth: "1600px" }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div className="d-flex align-items-center">
            <FileText className="text-success me-3" size={40} />
            <div>
              <h2 className="fw-bold mb-1">Histórico de Hábitos</h2>
              <p className="text-white-50 mb-0">
                Revisa y analiza todos tus registros ambientales
              </p>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className={`btn ${viewMode === "list" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setViewMode("list")}
            >
              📋 Lista
            </button>
            <button
              className={`btn ${viewMode === "grid" ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setViewMode("grid")}
            >
              🎴 Tarjetas
            </button>
            <button className="btn btn-outline-light" onClick={exportToCSV}>
              <Download size={18} className="me-2" />
              Exportar
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-3 p-3 h-100"
              style={{ border: "2px solid #22c55e30" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Leaf size={20} className="text-success" />
                <small className="text-white-50">Total registros</small>
              </div>
              <h3 className="fw-bold mb-0">{stats.total}</h3>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-3 p-3 h-100"
              style={{ border: "2px solid #22c55e30" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Award size={20} className="text-success" />
                <small className="text-white-50">Eco-friendly</small>
              </div>
              <h3 className="fw-bold mb-0 text-success">{stats.ecoFriendly}</h3>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-3 p-3 h-100"
              style={{ border: "2px solid #ef444430" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-danger" />
                <small className="text-white-50">Alto impacto</small>
              </div>
              <h3 className="fw-bold mb-0 text-danger">{stats.highImpact}</h3>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-3 p-3 h-100"
              style={{ border: "2px solid #22c55e30" }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Zap size={20} className="text-success" />
                <small className="text-white-50">Baja energía</small>
              </div>
              <h3 className="fw-bold mb-0 text-success">{stats.lowEnergy}</h3>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-dark rounded-4 p-4 mb-4 shadow-lg">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-secondary border-0">
                  <Search size={18} className="text-white-50" />
                </span>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-white"
                  placeholder="Buscar por fecha o notas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text bg-secondary border-0">
                  <Filter size={18} className="text-white-50" />
                </span>
                <select
                  className="form-select bg-secondary border-0 text-white"
                  value={filterTransport}
                  onChange={(e) => setFilterTransport(e.target.value)}
                >
                  <option value="all">Todos los transportes</option>
                  <option value="carro">Carro</option>
                  <option value="moto">Moto</option>
                  <option value="bici">Bicicleta</option>
                  <option value="publico">Público</option>
                </select>
              </div>
            </div>

            <div className="col-md-3">
              <select
                className="form-select bg-secondary border-0 text-white"
                value={filterEnergy}
                onChange={(e) => setFilterEnergy(e.target.value)}
              >
                <option value="all">Toda la energía</option>
                <option value="poco">Poca</option>
                <option value="medio">Media</option>
                <option value="mucho">Mucha</option>
              </select>
            </div>

            <div className="col-md-1">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setFilterTransport("all");
                  setFilterEnergy("all");
                }}
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="mt-3">
            <small className="text-white-50">
              Mostrando {filteredHabits.length} de {habits.length} registros
            </small>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white-50 mt-3">Cargando histórico...</p>
          </div>
        ) : filteredHabits.length === 0 ? (
          <div className="bg-dark rounded-4 p-5 text-center">
            <Leaf size={64} className="text-white-50 mb-3" />
            <h4 className="text-white">No hay registros</h4>
            <p className="text-secondary">
              {habits.length === 0
                ? "Comienza a registrar tus hábitos para ver tu histórico aquí"
                : "No se encontraron registros con los filtros aplicados"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          // Grid View
          <div className="row g-3">
            {filteredHabits.map((habit, index) => {
              const status = getHabitStatus(habit);
              return (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <div
                    className="bg-dark rounded-4 p-4 h-100 position-relative overflow-hidden"
                    style={{
                      border: "1px solid #374151",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(34, 197, 94, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Status Badge */}
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className={`badge bg-${status.color}-subtle text-${status.color} border border-${status.color}`}>
                        {status.icon}
                        <span className="ms-1">{status.text}</span>
                      </span>
                    </div>

                    {/* Date */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Calendar size={20} className="text-success" />
                      <h5 className="mb-0 fw-bold">
                        {new Date(habit.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </h5>
                    </div>

                    {/* Info Grid */}
                    <div className="row g-2 mb-3">
                      <div className="col-6">
                        <div className="bg-secondary bg-opacity-25 rounded-3 p-2">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            {getTransportIcon(habit.transport)}
                            <small className="text-white-50">Transporte</small>
                          </div>
                          <span className={`badge ${getTransportColor(habit.transport)}`}>
                            {habit.transport}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-secondary bg-opacity-25 rounded-3 p-2">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <Zap size={16} />
                            <small className="text-white-50">Energía</small>
                          </div>
                          <span className={`badge ${getEnergyColor(habit.energy)}`}>
                            {habit.energy}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-secondary bg-opacity-25 rounded-3 p-2">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <Clock size={16} />
                            <small className="text-white-50">Duración</small>
                          </div>
                          <div className="text-white small">{habit.duration}</div>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-secondary bg-opacity-25 rounded-3 p-2">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <Calendar size={16} />
                            <small className="text-white-50">Tipo</small>
                          </div>
                          <div className="text-white small">{habit.dayType}</div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {habit.notes && (
                      <div className="bg-secondary bg-opacity-10 rounded-3 p-3">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FileText size={14} className="text-white-50" />
                          <small className="text-white-50">Notas</small>
                        </div>
                        <p className="mb-0 small text-white">{habit.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View - Table
          <div className="bg-dark rounded-4 shadow-lg overflow-hidden">
            <div className="table-responsive" style={{ maxHeight: "700px" }}>
              <table className="table table-dark table-hover mb-0">
                <thead className="sticky-top" style={{ backgroundColor: "#1f2937", top: 0 }}>
                  <tr className="text-success">
                    <th className="border-0 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <Calendar size={16} />
                        Fecha
                      </div>
                    </th>
                    <th className="border-0 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <Car size={16} />
                        Transporte
                      </div>
                    </th>
                    <th className="border-0 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <Zap size={16} />
                        Energía
                      </div>
                    </th>
                    <th className="border-0 py-3">
                      <div className="d-flex align-items-center gap-2">
                        <Clock size={16} />
                        Duración
                      </div>
                    </th>
                    <th className="border-0 py-3">Tipo de día</th>
                    <th className="border-0 py-3">Notas</th>
                    <th className="border-0 py-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHabits.map((habit, index) => {
                    const status = getHabitStatus(habit);
                    return (
                      <tr
                        key={index}
                        className="border-bottom border-secondary"
                        style={{ transition: "all 0.2s" }}
                      >
                        <td className="fw-semibold py-3">
                          {new Date(habit.date).toLocaleDateString("es-ES", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3">
                          <div className="d-flex align-items-center gap-2">
                            {getTransportIcon(habit.transport)}
                            <span className={`badge ${getTransportColor(habit.transport)}`}>
                              {habit.transport}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getEnergyColor(habit.energy)}`}>
                            {habit.energy}
                          </span>
                        </td>
                        <td className="text-white-50 py-3">{habit.duration}</td>
                        <td className="text-white-50 py-3">
                          <span className="badge bg-secondary">{habit.dayType}</span>
                        </td>
                        <td className="py-3" style={{ maxWidth: "250px" }}>
                          {habit.notes ? (
                            <small className="text-white">{habit.notes}</small>
                          ) : (
                            <small className="text-white-50 fst-italic">Sin notas</small>
                          )}
                        </td>
                        <td className="text-center py-3">
                          <span
                            className={`badge bg-${status.color}-subtle text-${status.color} border border-${status.color}`}
                          >
                            {status.icon}
                            <span className="ms-1">{status.text}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
