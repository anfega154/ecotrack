import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import type { Habit, ChartData } from "../../../types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { 
  Leaf, 
  TrendingUp, 
  CalendarDays, 
  Zap, 
  Car,
  Bike,
  Bus,
  Clock,
  Activity,
  Calendar,
  Award,
  TreePine,
  FileText,
  Star,
  Flame,
  Trophy
} from "lucide-react";
import { 
  calculateXP, 
  calculateLevel, 
  calculateStreak, 
  getNextBadge, 
  calculateBadges 
} from "../../utils/achievements";

const DashboardPage = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");
  const [impactLevel, setImpactLevel] = useState<string>("");

  const COLORS = ["#16a34a", "#86efac", "#15803d", "#bbf7d0"];

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      const q = query(collection(db, "habits"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const habitsData = querySnapshot.docs.map((doc) => doc.data()) as Habit[];
      setHabits(habitsData);
      analyzeHabits(habitsData);
    };
    fetchHabits();
  }, [user]);

  const analyzeHabits = (habits: Habit[]) => {
    if (!habits.length) return;

    const carCount = habits.filter((h) => h.transport === "carro").length;
    const bikeCount = habits.filter((h) => h.transport === "bici").length;
    const motoCount = habits.filter((h) => h.transport === "moto").length;
    const publicCount = habits.filter((h) => h.transport === "publico").length;

    const energyHigh = habits.filter((h) => h.energy === "mucho").length;
    const energyLow = habits.filter((h) => h.energy === "poco").length;

    const score = carCount * 3 + motoCount * 2 + energyHigh * 2 - (bikeCount + publicCount + energyLow);
    if (score <= 3) setImpactLevel("🌿 Bajo impacto");
    else if (score <= 6) setImpactLevel("⚡ Impacto medio");
    else setImpactLevel("🔥 Alto impacto ambiental");

    if (carCount > bikeCount)
      setRecommendation("🚲 Intenta usar más bicicleta o transporte público para reducir emisiones.");
    else if (energyHigh > energyLow)
      setRecommendation("💡 Reduce tus horas de consumo eléctrico o usa bombillas LED.");
    else
      setRecommendation("🌱 ¡Excelente trabajo! Tus hábitos son sostenibles, sigue así.");
  };

  const transportChart: ChartData[] = [
    { name: "Carro", value: habits.filter((h) => h.transport === "carro").length },
    { name: "Moto", value: habits.filter((h) => h.transport === "moto").length },
    { name: "Bici", value: habits.filter((h) => h.transport === "bici").length },
    { name: "Público", value: habits.filter((h) => h.transport === "publico").length },
  ];

  const energyChart: ChartData[] = [
    { name: "Pocas horas", value: habits.filter((h) => h.energy === "poco").length },
    { name: "Medias horas", value: habits.filter((h) => h.energy === "medio").length },
    { name: "Muchas horas", value: habits.filter((h) => h.energy === "mucho").length },
  ];

  const daysRegistered = [...new Set(habits.map((h) => h.date))].length;

  // Métricas adicionales
  const carDays = habits.filter((h) => h.transport === "carro").length;
  const bikeDays = habits.filter((h) => h.transport === "bici").length;
  const publicTransportDays = habits.filter((h) => h.transport === "publico").length;
  const motoDays = habits.filter((h) => h.transport === "moto").length;
  
  const laboralDays = habits.filter((h) => h.dayType === "laboral").length;
  const weekendDays = habits.filter((h) => h.dayType === "finde").length;
  
  const highEnergyDays = habits.filter((h) => h.energy === "mucho").length;
  const mediumEnergyDays = habits.filter((h) => h.energy === "medio").length;
  const lowEnergyDays = habits.filter((h) => h.energy === "poco").length;

  const ecoScore = Math.max(0, Math.min(100, 
    ((bikeDays + publicTransportDays) * 10) + (lowEnergyDays * 5) - (carDays * 5) - (highEnergyDays * 3)
  ));

  const weeklyTrend = habits
    .reduce((acc: any[], habit) => {
      const existing = acc.find(item => item.date === habit.date);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ date: habit.date, count: 1 });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);

  return (
    <div
      className="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-start p-4 text-white"
      style={{ backgroundColor: "#111827" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-4">
        <Leaf className="text-success me-2" size={36} />
        <h2 className="fw-bold mb-0">EcoTrack Dashboard</h2>
      </div>

      {/* Métricas principales - 4 tarjetas */}
      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ minWidth: "240px", flex: "1 1 240px" }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="text-white-50 small mb-1">Nivel de impacto</div>
              <h5 className="fw-bold mb-0">{impactLevel || "Cargando..."}</h5>
            </div>
            <TrendingUp className="text-success" size={28} />
          </div>
        </div>

        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ minWidth: "240px", flex: "1 1 240px" }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="text-white-50 small mb-1">EcoScore</div>
              <h5 className="fw-bold mb-0 text-success">{ecoScore}/100</h5>
            </div>
            <Award className="text-success" size={28} />
          </div>
        </div>

        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ minWidth: "240px", flex: "1 1 240px" }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="text-white-50 small mb-1">Días registrados</div>
              <h5 className="fw-bold mb-0">{daysRegistered}</h5>
            </div>
            <CalendarDays className="text-success" size={28} />
          </div>
        </div>

        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ minWidth: "240px", flex: "1 1 240px" }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="text-white-50 small mb-1">Hábitos totales</div>
              <h5 className="fw-bold mb-0">{habits.length}</h5>
            </div>
            <Zap className="text-success" size={28} />
          </div>
        </div>
      </div>

      {/* Widget de Gamificación */}
      {(() => {
        const xp = calculateXP(habits);
        const level = calculateLevel(xp);
        const streak = calculateStreak(habits);
        const badges = calculateBadges(habits);
        const nextBadge = getNextBadge(badges);
        const unlockedCount = badges.filter(b => b.unlocked).length;

        return (
          <div 
            className="bg-gradient rounded-4 p-4 mb-4 shadow-lg position-relative overflow-hidden" 
            style={{ 
              maxWidth: "1400px", 
              width: "100%",
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              border: "2px solid #fbbf2430"
            }}
          >
            <div className="row align-items-center">
              {/* Nivel y XP */}
              <div className="col-md-3 col-6 mb-3 mb-md-0">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle bg-warning bg-opacity-25"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Star size={32} className="text-warning" />
                  </div>
                  <div>
                    <div className="text-white-50 small">Nivel {level.level}</div>
                    <div className="fw-bold fs-5">{level.title}</div>
                    <div className="text-warning small">{xp} XP</div>
                  </div>
                </div>
              </div>

              {/* Racha */}
              <div className="col-md-3 col-6 mb-3 mb-md-0">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-25"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Flame size={32} className="text-danger" />
                  </div>
                  <div>
                    <div className="text-white-50 small">Racha actual</div>
                    <div className="fw-bold fs-4 text-danger">{streak.current} días</div>
                    <div className="text-white-50 small">Mejor: {streak.longest}</div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="col-md-3 col-6">
                <div className="d-flex align-items-center gap-3">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-25"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <Trophy size={32} className="text-success" />
                  </div>
                  <div>
                    <div className="text-white-50 small">Insignias</div>
                    <div className="fw-bold fs-4 text-success">{unlockedCount}/{badges.length}</div>
                    <div className="text-white-50 small">{Math.round((unlockedCount/badges.length)*100)}% completado</div>
                  </div>
                </div>
              </div>

              {/* Próximo badge o botón */}
              <div className="col-md-3 col-6">
                {nextBadge ? (
                  <div className="text-center">
                    <div className="text-white-50 small mb-1">Próximo logro</div>
                    <div className="fs-3 mb-1">{nextBadge.icon}</div>
                    <div className="small fw-semibold mb-1">{nextBadge.name}</div>
                    <div className="progress" style={{ height: "6px" }}>
                      <div 
                        className="progress-bar bg-warning" 
                        style={{ width: `${Math.min((nextBadge.progress / nextBadge.requirement) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <small className="text-white-50">{nextBadge.progress}/{nextBadge.requirement}</small>
                  </div>
                ) : (
                  <div className="text-center">
                    <Trophy size={40} className="text-success mb-2" />
                    <div className="small text-success fw-bold">¡Todos los logros desbloqueados!</div>
                  </div>
                )}
              </div>
            </div>

            {/* Botón para ir a logros */}
            <div className="text-center mt-3">
              <a href="/achievements" className="btn btn-warning btn-sm px-4">
                <Trophy size={16} className="me-2" />
                Ver todos los logros
              </a>
            </div>
          </div>
        );
      })()}

      {/* Métricas secundarias - 4 tarjetas más pequeñas */}
      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Car size={20} className="text-danger" />
            <span className="text-white-50 small">Días en carro</span>
          </div>
          <div className="fs-5 fw-semibold">{carDays}</div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Bike size={20} className="text-success" />
            <span className="text-white-50 small">Días en bici</span>
          </div>
          <div className="fs-5 fw-semibold">{bikeDays}</div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Bus size={20} className="text-info" />
            <span className="text-white-50 small">Transporte público</span>
          </div>
          <div className="fs-5 fw-semibold">{publicTransportDays}</div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <TreePine size={20} className="text-success" />
            <span className="text-white-50 small">Días eco-friendly</span>
          </div>
          <div className="fs-5 fw-semibold text-success">{bikeDays + publicTransportDays}</div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Car size={20} className="text-warning" />
            <span className="text-white-50 small">Días en moto</span>
          </div>
          <div className="fs-5 fw-semibold">{motoDays}</div>
        </div>
      </div>

      {/* Gráficos - 3 columnas */}
      <div className="row w-100 justify-content-center mb-4 gx-3" style={{ maxWidth: "1400px" }}>
        <div className="col-lg-4 col-md-6 col-12 mb-3">
          <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
            <h6 className="mb-3 text-center fw-semibold">🚗 Transporte utilizado</h6>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={transportChart}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  label={(entry: any) => entry.value > 0 ? `${entry.name}: ${entry.value}` : ''}
                >
                  {transportChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 col-12 mb-3">
          <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
            <h6 className="mb-3 text-center fw-semibold">💡 Consumo eléctrico</h6>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={energyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-4 col-md-12 col-12 mb-3">
          <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
            <h6 className="mb-3 text-center fw-semibold">📊 Tendencia semanal</h6>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Registros"
                  dot={{ fill: '#22c55e', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recomendación */}
      <div
        className="alert text-center rounded-4 shadow-sm mb-4"
        style={{ 
          backgroundColor: "#1e293b", 
          color: "#a3e635",
          maxWidth: "1400px",
          width: "100%",
          border: "1px solid #22c55e30"
        }}
      >
        <Activity className="d-inline me-2" size={20} />
        {recommendation || "Analizando tus hábitos..."}
      </div>

      {/* Métricas de tipo de día y duración */}
      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "200px", flex: "1" }}>
          <div className="text-center">
            <Calendar size={24} className="text-info mb-2" />
            <div className="text-white-50 small">Días laborales</div>
            <div className="fs-4 fw-bold">{laboralDays}</div>
          </div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "200px", flex: "1" }}>
          <div className="text-center">
            <Calendar size={24} className="text-warning mb-2" />
            <div className="text-white-50 small">Fines de semana</div>
            <div className="fs-4 fw-bold">{weekendDays}</div>
          </div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "150px", flex: "1" }}>
          <div className="text-center">
            <Zap size={24} className="text-danger mb-2" />
            <div className="text-white-50 small">Alta energía</div>
            <div className="fs-4 fw-bold">{highEnergyDays}</div>
          </div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "150px", flex: "1" }}>
          <div className="text-center">
            <Zap size={24} className="text-warning mb-2" />
            <div className="text-white-50 small">Media energía</div>
            <div className="fs-4 fw-bold">{mediumEnergyDays}</div>
          </div>
        </div>

        <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "150px", flex: "1" }}>
          <div className="text-center">
            <Clock size={24} className="text-success mb-2" />
            <div className="text-white-50 small">Baja energía</div>
            <div className="fs-4 fw-bold">{lowEnergyDays}</div>
          </div>
        </div>
      </div>

      {/* Acceso rápido al histórico */}
      <div 
        className="bg-dark rounded-4 p-5 shadow-lg mb-4 text-center position-relative overflow-hidden" 
        style={{ maxWidth: "1400px", width: "100%", border: "2px solid #22c55e30" }}
      >
        <div 
          className="position-absolute top-0 start-0 w-100 h-100" 
          style={{ 
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%)",
            pointerEvents: "none" 
          }}
        />
        <div className="position-relative">
          <FileText size={48} className="text-success mb-3" />
          <h4 className="fw-bold mb-2">Ver Histórico Completo</h4>
          <p className="text-white-50 mb-4">
            Explora todos tus registros con filtros avanzados, búsqueda y vistas personalizadas
          </p>
          <div className="d-flex justify-content-center gap-3 align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success">{habits.length}</span>
              <small className="text-white-50">Total registros</small>
            </div>
            <div className="text-white-50">•</div>
            <div className="d-flex align-items-center gap-2">
              <FileText size={16} className="text-success" />
              <small className="text-white-50">Vista de tabla y tarjetas</small>
            </div>
            <div className="text-white-50">•</div>
            <div className="d-flex align-items-center gap-2">
              <Activity size={16} className="text-success" />
              <small className="text-white-50">Filtros avanzados</small>
            </div>
          </div>
          <a href="/history" className="btn btn-success btn-lg px-5 py-3">
            <FileText size={20} className="me-2" />
            Ir al Histórico
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
