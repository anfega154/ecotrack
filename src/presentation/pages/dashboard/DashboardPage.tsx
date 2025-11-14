import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Habit } from "../../../types";
import { Leaf, TrendingUp, CalendarDays, Zap, Car, Bike, Bus, Clock, Activity, Calendar, Award, TreePine, FileText } from "lucide-react";
import { calculateXP, calculateLevel, calculateStreak, getNextBadge, calculateBadges } from "../../utils/achievements";
import { habitService } from "../../services/habitService";
import { impactCalculator, chartDataGenerator, habitMetrics } from "../../services/dashboardService";
import { MetricCard, CompactMetricCard, CenteredMetricCard } from "../../components/dashboard/MetricCards";
import { GamificationWidget } from "../../components/dashboard/GamificationWidget";
import { TransportChart, EnergyChart, WeeklyTrendChart } from "../../components/dashboard/Charts";

const DashboardPage = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [recommendation, setRecommendation] = useState<string>("");
  const [impactLevel, setImpactLevel] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    
    const loadHabits = async () => {
      const habitsData = await habitService.fetchUserHabits(user.uid);
      setHabits(habitsData);
      setImpactLevel(impactCalculator.calculateImpactLevel(habitsData));
      setRecommendation(impactCalculator.generateRecommendation(habitsData));
    };
    
    loadHabits();
  }, [user]);

  const ecoScore = impactCalculator.calculateEcoScore(habits);
  const daysRegistered = habitMetrics.getDaysRegistered(habits);
  const transportMetrics = habitMetrics.getTransportMetrics(habits);
  const dayTypeMetrics = habitMetrics.getDayTypeMetrics(habits);
  const energyMetrics = habitMetrics.getEnergyMetrics(habits);
  
  const transportChart = chartDataGenerator.generateTransportChart(habits);
  const energyChart = chartDataGenerator.generateEnergyChart(habits);
  const weeklyTrend = chartDataGenerator.generateWeeklyTrend(habits);

  const xp = calculateXP(habits);
  const level = calculateLevel(xp);
  const streak = calculateStreak(habits);
  const badges = calculateBadges(habits);
  const nextBadge = getNextBadge(badges);

  return (
    <div
      className="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-start p-4 text-white"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="d-flex align-items-center mb-4">
        <Leaf className="text-success me-2" size={36} />
        <h2 className="fw-bold mb-0">EcoTrack Dashboard</h2>
      </div>

      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <MetricCard title="Nivel de impacto" value={impactLevel || "Cargando..."} icon={TrendingUp} />
        <MetricCard title="EcoScore" value={`${ecoScore}/100`} icon={Award} />
        <MetricCard title="Días registrados" value={daysRegistered} icon={CalendarDays} />
        <MetricCard title="Hábitos totales" value={habits.length} icon={Zap} />
      </div>

      <GamificationWidget level={level} xp={xp} streak={streak} badges={badges} nextBadge={nextBadge} />

      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <CompactMetricCard title="Días en carro" value={transportMetrics.carDays} icon={Car} iconColor="text-danger" />
        <CompactMetricCard title="Días en bici" value={transportMetrics.bikeDays} icon={Bike} iconColor="text-success" />
        <CompactMetricCard title="Transporte público" value={transportMetrics.publicDays} icon={Bus} iconColor="text-info" />
        <CompactMetricCard title="Días eco-friendly" value={transportMetrics.ecoFriendlyDays} icon={TreePine} iconColor="text-success" />
        <CompactMetricCard title="Días en moto" value={transportMetrics.motoDays} icon={Car} iconColor="text-warning" />
      </div>

      <div className="row w-100 justify-content-center mb-4 gx-3" style={{ maxWidth: "1400px" }}>
        <TransportChart data={transportChart} />
        <EnergyChart data={energyChart} />
        <WeeklyTrendChart data={weeklyTrend} />
      </div>

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

      <div className="w-100 d-flex flex-wrap justify-content-center gap-3 mb-4" style={{ maxWidth: "1400px" }}>
        <CenteredMetricCard title="Días laborales" value={dayTypeMetrics.laboralDays} icon={Calendar} iconColor="text-info" />
        <CenteredMetricCard title="Fines de semana" value={dayTypeMetrics.weekendDays} icon={Calendar} iconColor="text-warning" />
        <CenteredMetricCard title="Alta energía" value={energyMetrics.highEnergyDays} icon={Zap} iconColor="text-danger" />
        <CenteredMetricCard title="Media energía" value={energyMetrics.mediumEnergyDays} icon={Zap} iconColor="text-warning" />
        <CenteredMetricCard title="Baja energía" value={energyMetrics.lowEnergyDays} icon={Clock} iconColor="text-success" />
      </div>

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
