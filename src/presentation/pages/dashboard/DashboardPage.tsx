import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
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
} from "recharts";
import { Leaf, TrendingUp, CalendarDays, Zap } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<any[]>([]);
  const [recommendation, setRecommendation] = useState("");
  const [impactLevel, setImpactLevel] = useState("");

  const COLORS = ["#16a34a", "#86efac", "#15803d", "#bbf7d0"];

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      const q = query(collection(db, "habits"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const habitsData = querySnapshot.docs.map((doc) => doc.data());
      setHabits(habitsData);
      analyzeHabits(habitsData);
    };
    fetchHabits();
  }, [user]);

  const analyzeHabits = (habits: any[]) => {
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

  const transportChart = [
    { name: "Carro", value: habits.filter((h) => h.transport === "carro").length },
    { name: "Moto", value: habits.filter((h) => h.transport === "moto").length },
    { name: "Bici", value: habits.filter((h) => h.transport === "bici").length },
    { name: "Público", value: habits.filter((h) => h.transport === "publico").length },
  ];

  const energyChart = [
    { name: "Pocas horas", value: habits.filter((h) => h.energy === "poco").length },
    { name: "Medias horas", value: habits.filter((h) => h.energy === "medio").length },
    { name: "Muchas horas", value: habits.filter((h) => h.energy === "mucho").length },
  ];

  const daysRegistered = [...new Set(habits.map((h) => h.date))].length;

  return (
    <div
      className="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-start p-5 text-white"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="d-flex align-items-center mb-4">
        <Leaf className="text-success me-2" size={36} />
        <h2 className="fw-bold">EcoTrack Dashboard</h2>
      </div>

      <div className="w-100 d-flex flex-wrap justify-content-center gap-4 mb-5">
        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ width: "280px" }}>
          <TrendingUp className="text-success mb-2" size={28} />
          <h5 className="fw-semibold">Nivel de impacto</h5>
          <p className="fs-5">{impactLevel || "Cargando..."}</p>
        </div>

        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ width: "280px" }}>
          <CalendarDays className="text-success mb-2" size={28} />
          <h5 className="fw-semibold">Días registrados</h5>
          <p className="fs-5">{daysRegistered}</p>
        </div>

        <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ width: "280px" }}>
          <Zap className="text-success mb-2" size={28} />
          <h5 className="fw-semibold">Hábitos totales</h5>
          <p className="fs-5">{habits.length}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row w-100 justify-content-center mb-5">
        <div className="col-md-6 col-12 mb-4">
          <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
            <h5 className="mb-3 text-center text-success">🚗 Transporte utilizado</h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={transportChart}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
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

        <div className="col-md-6 col-12 mb-4">
          <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
            <h5 className="mb-3 text-center text-success">💡 Consumo eléctrico</h5>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={energyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="alert alert-secondary text-center w-75 rounded-4 shadow-sm"
        style={{ backgroundColor: "#1e293b", color: "#a3e635" }}
      >
        {recommendation || "Analizando tus hábitos..."}
      </div>

      <div className="bg-dark rounded-4 p-4 mt-5 w-75 shadow-lg">
        <h5 className="text-success mb-3">📋 Hábitos recientes</h5>
        {habits.length === 0 ? (
          <p className="text-secondary text-center">Aún no has registrado hábitos.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead>
                <tr className="text-success">
                  <th>Fecha</th>
                  <th>Transporte</th>
                  <th>Energía</th>
                  <th>Duración</th>
                  <th>Tipo de día</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {habits
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 7)
                  .map((h, i) => (
                    <tr key={i}>
                      <td>{h.date}</td>
                      <td>{h.transport}</td>
                      <td>{h.energy}</td>
                      <td>{h.duration}</td>
                      <td>{h.dayType}</td>
                      <td>{h.notes || "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
