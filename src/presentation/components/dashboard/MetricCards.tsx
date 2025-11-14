import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
}

export const MetricCard = ({ title, value, icon: Icon, iconColor = "text-success" }: MetricCardProps) => (
  <div className="bg-dark rounded-4 p-4 shadow-lg" style={{ minWidth: "240px", flex: "1 1 240px" }}>
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <div className="text-white-50 small mb-1">{title}</div>
        <h5 className="fw-bold mb-0">{value}</h5>
      </div>
      <Icon className={iconColor} size={28} />
    </div>
  </div>
);

interface CompactMetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
}

export const CompactMetricCard = ({ title, value, icon: Icon, iconColor = "text-success" }: CompactMetricCardProps) => (
  <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "180px", flex: "1 1 180px" }}>
    <div className="d-flex align-items-center gap-2 mb-1">
      <Icon size={20} className={iconColor} />
      <span className="text-white-50 small">{title}</span>
    </div>
    <div className="fs-5 fw-semibold">{value}</div>
  </div>
);

interface CenteredMetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
}

export const CenteredMetricCard = ({ title, value, icon: Icon, iconColor = "text-info" }: CenteredMetricCardProps) => (
  <div className="bg-dark rounded-3 p-3 shadow" style={{ minWidth: "150px", flex: "1" }}>
    <div className="text-center">
      <Icon size={24} className={`${iconColor} mb-2`} />
      <div className="text-white-50 small">{title}</div>
      <div className="fs-4 fw-bold">{value}</div>
    </div>
  </div>
);
