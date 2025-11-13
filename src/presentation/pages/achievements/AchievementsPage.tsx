import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../data/FirebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import {
  Trophy,
  Award,
  TrendingUp,
  Zap,
  Target,
  Star,
  Flame,
  Lock,
} from "lucide-react";
import {
  calculateBadges,
  calculateLevel,
  calculateXP,
  calculateStreak,
  type Badge,
} from "../../utils/achievements";

const AchievementsPage = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userLevel, setUserLevel] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  useEffect(() => {
    if (!user) return;
    const fetchHabits = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "habits"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const habitsData = querySnapshot.docs.map((doc) => doc.data());
        setHabits(habitsData);

        // Calcular logros
        const calculatedBadges = calculateBadges(habitsData);
        setBadges(calculatedBadges);

        const xp = calculateXP(habitsData);
        const level = calculateLevel(xp);
        setUserLevel(level);

        const streakData = calculateStreak(habitsData);
        setStreak(streakData);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, [user]);

  const unlockedBadges = badges.filter((b) => b.unlocked);

  const filteredBadges =
    filterCategory === "all"
      ? badges
      : badges.filter((b) => b.category === filterCategory);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "transport":
        return "primary";
      case "energy":
        return "warning";
      case "streak":
        return "danger";
      case "general":
        return "success";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 vw-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#111827" }}
      >
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-white mt-3">Cargando logros...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 vw-100 p-4 text-white"
      style={{ backgroundColor: "#111827" }}
    >
      <div className="container-fluid" style={{ maxWidth: "1600px" }}>
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div className="d-flex align-items-center">
            <Trophy className="text-warning me-3" size={40} />
            <div>
              <h2 className="fw-bold mb-1">Logros y Recompensas</h2>
              <p className="text-white-50 mb-0">
                Desbloquea insignias y sube de nivel con tus hábitos sostenibles
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          {/* Nivel */}
          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-4 p-4 h-100"
              style={{ border: "2px solid #fbbf2430" }}
            >
              <div className="d-flex align-items-center gap-3 mb-3">
                <Star size={32} className="text-warning" />
                <div>
                  <div className="text-white-50 small">Nivel</div>
                  <h3 className="fw-bold mb-0">{userLevel?.level || 0}</h3>
                </div>
              </div>
              <div className="mb-2">
                <small className="text-white-50">{userLevel?.title}</small>
              </div>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-warning"
                  style={{ width: `${userLevel?.percentage || 0}%` }}
                ></div>
              </div>
              <small className="text-white-50 mt-1 d-block">
                {userLevel?.xp} / {userLevel?.xpForNext} XP
              </small>
            </div>
          </div>

          {/* XP Total */}
          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-4 p-4 h-100 text-center"
              style={{ border: "2px solid #22c55e30" }}
            >
              <Zap size={32} className="text-success mb-2" />
              <div className="text-white-50 small mb-1">Experiencia Total</div>
              <h3 className="fw-bold mb-0 text-success">{userLevel?.xp || 0} XP</h3>
            </div>
          </div>

          {/* Racha Actual */}
          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-4 p-4 h-100 text-center"
              style={{ border: "2px solid #ef444430" }}
            >
              <Flame size={32} className="text-danger mb-2" />
              <div className="text-white-50 small mb-1">Racha Actual</div>
              <h3 className="fw-bold mb-0 text-danger">
                {streak?.current || 0} días
              </h3>
            </div>
          </div>

          {/* Racha Más Larga */}
          <div className="col-md-3 col-6">
            <div
              className="bg-dark rounded-4 p-4 h-100 text-center"
              style={{ border: "2px solid #3b82f630" }}
            >
              <TrendingUp size={32} className="text-info mb-2" />
              <div className="text-white-50 small mb-1">Racha Más Larga</div>
              <h3 className="fw-bold mb-0 text-info">
                {streak?.longest || 0} días
              </h3>
            </div>
          </div>
        </div>

        {/* Progreso General */}
        <div className="bg-dark rounded-4 p-4 mb-4 shadow-lg">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h5 className="fw-bold mb-3">
                <Target className="me-2" size={20} />
                Progreso General
              </h5>
              <div className="row g-3">
                <div className="col-6">
                  <small className="text-white-50">Insignias desbloqueadas</small>
                  <div className="fs-4 fw-bold text-success">
                    {unlockedBadges.length} / {badges.length}
                  </div>
                </div>
                <div className="col-6">
                  <small className="text-white-50">Total de hábitos</small>
                  <div className="fs-4 fw-bold">{habits.length}</div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div
                className="position-relative d-inline-block"
                style={{ width: "120px", height: "120px" }}
              >
                <svg width="120" height="120" className="position-absolute">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeDasharray={`${
                      (unlockedBadges.length / badges.length) * 314
                    } 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                >
                  <div className="fs-3 fw-bold">
                    {Math.round((unlockedBadges.length / badges.length) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="d-flex gap-2 mb-4 flex-wrap">
          <button
            className={`btn ${
              filterCategory === "all" ? "btn-success" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterCategory("all")}
          >
            Todas ({badges.length})
          </button>
          <button
            className={`btn ${
              filterCategory === "transport"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilterCategory("transport")}
          >
            🚲 Transporte ({badges.filter((b) => b.category === "transport").length})
          </button>
          <button
            className={`btn ${
              filterCategory === "energy" ? "btn-warning" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterCategory("energy")}
          >
            ⚡ Energía ({badges.filter((b) => b.category === "energy").length})
          </button>
          <button
            className={`btn ${
              filterCategory === "streak" ? "btn-danger" : "btn-outline-secondary"
            }`}
            onClick={() => setFilterCategory("streak")}
          >
            🔥 Rachas ({badges.filter((b) => b.category === "streak").length})
          </button>
          <button
            className={`btn ${
              filterCategory === "general"
                ? "btn-success"
                : "btn-outline-secondary"
            }`}
            onClick={() => setFilterCategory("general")}
          >
            🌟 General ({badges.filter((b) => b.category === "general").length})
          </button>
        </div>

        {/* Badges Grid */}
        <div className="row g-3">
          {filteredBadges.map((badge) => (
            <div key={badge.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div
                className={`bg-dark rounded-4 p-4 h-100 position-relative ${
                  badge.unlocked ? "border-success" : "border-secondary"
                }`}
                style={{
                  border: badge.unlocked ? "2px solid #22c55e" : "2px solid #374151",
                  opacity: badge.unlocked ? 1 : 0.6,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  if (badge.unlocked) {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 25px rgba(34, 197, 94, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Badge Icon */}
                <div className="text-center mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary bg-opacity-25 position-relative"
                    style={{ width: "80px", height: "80px", fontSize: "2.5rem" }}
                  >
                    {badge.unlocked ? (
                      badge.icon
                    ) : (
                      <Lock size={32} className="text-secondary" />
                    )}
                  </div>
                  {badge.unlocked && (
                    <Award
                      size={24}
                      className="text-success position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    />
                  )}
                </div>

                {/* Badge Info */}
                <h6 className="fw-bold text-center mb-2">
                  {badge.unlocked ? badge.name : "???"}
                </h6>
                <p className="text-white-50 small text-center mb-3">
                  {badge.unlocked ? badge.description : "Insignia bloqueada"}
                </p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-white-50">Progreso</small>
                    <small className="text-white-50">
                      {badge.progress} / {badge.requirement}
                    </small>
                  </div>
                  <div className="progress" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar bg-${getBadgeColor(badge.category)}`}
                      style={{
                        width: `${Math.min(
                          (badge.progress / badge.requirement) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="text-center">
                  <span
                    className={`badge bg-${getBadgeColor(badge.category)}-subtle text-${getBadgeColor(badge.category)} border border-${getBadgeColor(badge.category)}`}
                  >
                    {badge.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBadges.length === 0 && (
          <div className="bg-dark rounded-4 p-5 text-center">
            <Trophy size={64} className="text-white-50 mb-3" />
            <h4 className="text-white">No hay insignias en esta categoría</h4>
            <p className="text-white-50">Prueba con otro filtro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
