export type BadgeCategory = "transport" | "energy" | "streak" | "general";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  category: BadgeCategory;
  unlocked: boolean;
  progress: number;
}

export interface UserLevel {
  level: number;
  title: string;
  xp: number;
  xpForNext: number;
  percentage: number;
}

export interface Streak {
  current: number;
  longest: number;
  lastDate: string | null;
}
