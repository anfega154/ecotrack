export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface StatCard {
  title: string;
  value: number | string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: number;
}
