import { Star, Flame, Trophy } from "lucide-react";
import type { Badge, UserLevel, Streak } from "../../../types";

interface GamificationWidgetProps {
  level: UserLevel;
  xp: number;
  streak: Streak;
  badges: Badge[];
  nextBadge: Badge | null;
}

export const GamificationWidget = ({ level, xp, streak, badges, nextBadge }: GamificationWidgetProps) => {
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const completionPercentage = Math.round((unlockedCount / badges.length) * 100);
  
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
              <div className="text-white-50 small">{completionPercentage}% completado</div>
            </div>
          </div>
        </div>

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

      <div className="text-center mt-3">
        <a href="/achievements" className="btn btn-warning btn-sm px-4">
          <Trophy size={16} className="me-2" />
          Ver todos los logros
        </a>
      </div>
    </div>
  );
};
