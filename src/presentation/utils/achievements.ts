import type { Badge, UserLevel, Streak } from "../../types";

export const ALL_BADGES: Omit<Badge, "unlocked" | "progress">[] = [
  {
    id: "cyclist_beginner",
    name: "Ciclista Novato",
    description: "Usa la bicicleta 5 veces",
    icon: "🚴",
    requirement: 5,
    category: "transport",
  },
  {
    id: "cyclist_pro",
    name: "Ciclista Urbano",
    description: "Usa la bicicleta 15 veces",
    icon: "🚴‍♂️",
    requirement: 15,
    category: "transport",
  },
  {
    id: "cyclist_master",
    name: "Ciclista Master",
    description: "Usa la bicicleta 30 veces",
    icon: "🏆🚴",
    requirement: 30,
    category: "transport",
  },
  {
    id: "public_transport_friend",
    name: "Amigo del Transporte Público",
    description: "Usa transporte público 10 veces",
    icon: "🚌",
    requirement: 10,
    category: "transport",
  },
  {
    id: "public_transport_pro",
    name: "Experto en Transporte Público",
    description: "Usa transporte público 25 veces",
    icon: "🚇",
    requirement: 25,
    category: "transport",
  },
  {
    id: "eco_commuter",
    name: "Viajero Eco-Friendly",
    description: "50 viajes en bici o transporte público",
    icon: "🌱🚲",
    requirement: 50,
    category: "transport",
  },
  {
    id: "energy_saver",
    name: "Ahorrador de Energía",
    description: "10 días con bajo consumo eléctrico",
    icon: "💡",
    requirement: 10,
    category: "energy",
  },
  {
    id: "energy_master",
    name: "Maestro del Ahorro",
    description: "25 días con bajo consumo eléctrico",
    icon: "⚡",
    requirement: 25,
    category: "energy",
  },
  {
    id: "energy_champion",
    name: "Campeón de Energía",
    description: "50 días con bajo consumo eléctrico",
    icon: "🏅⚡",
    requirement: 50,
    category: "energy",
  },
  {
    id: "streak_3",
    name: "Compromiso Inicial",
    description: "3 días consecutivos registrando hábitos",
    icon: "🔥",
    requirement: 3,
    category: "streak",
  },
  {
    id: "streak_7",
    name: "Semana Completa",
    description: "7 días consecutivos registrando hábitos",
    icon: "📅",
    requirement: 7,
    category: "streak",
  },
  {
    id: "streak_14",
    name: "Racha Quincenal",
    description: "14 días consecutivos registrando hábitos",
    icon: "🔥🔥",
    requirement: 14,
    category: "streak",
  },
  {
    id: "streak_30",
    name: "Mes Perfecto",
    description: "30 días consecutivos registrando hábitos",
    icon: "🌟",
    requirement: 30,
    category: "streak",
  },
  {
    id: "first_habit",
    name: "Primer Paso",
    description: "Registra tu primer hábito",
    icon: "🌱",
    requirement: 1,
    category: "general",
  },
  {
    id: "habits_10",
    name: "En Camino",
    description: "Registra 10 hábitos",
    icon: "📝",
    requirement: 10,
    category: "general",
  },
  {
    id: "habits_50",
    name: "Comprometido",
    description: "Registra 50 hábitos",
    icon: "📊",
    requirement: 50,
    category: "general",
  },
  {
    id: "habits_100",
    name: "Guardián del Planeta",
    description: "Registra 100 hábitos",
    icon: "🌍",
    requirement: 100,
    category: "general",
  },
  {
    id: "eco_warrior",
    name: "Eco Warrior",
    description: "30 hábitos eco-friendly (bici/público + baja energía)",
    icon: "⚔️🌿",
    requirement: 30,
    category: "general",
  },
];

const LEVEL_TITLES = [
  "Novato Verde",
  "Aprendiz Sostenible",
  "Consciente Ambiental",
  "Defensor de la Tierra",
  "Eco Comprometido",
  "Líder Sostenible",
  "Maestro Eco",
  "Guardián del Planeta",
  "Leyenda Verde",
  "Eco Master Supremo",
];

const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000];

export const calculateLevel = (xp: number): UserLevel => {
  let level = 0;
  let xpForNext = XP_THRESHOLDS[1];

  for (let i = 0; i < XP_THRESHOLDS.length; i++) {
    if (xp >= XP_THRESHOLDS[i]) {
      level = i;
      xpForNext = XP_THRESHOLDS[i + 1] || XP_THRESHOLDS[i] + 3000;
    } else {
      break;
    }
  }

  const currentLevelXp = XP_THRESHOLDS[level] || 0;
  const xpInCurrentLevel = xp - currentLevelXp;
  const xpNeededForNext = xpForNext - currentLevelXp;
  const percentage = (xpInCurrentLevel / xpNeededForNext) * 100;

  return {
    level,
    title: LEVEL_TITLES[level] || LEVEL_TITLES[LEVEL_TITLES.length - 1],
    xp,
    xpForNext,
    percentage: Math.min(100, percentage),
  };
};

export const calculateXP = (habits: Array<{ transport: string; energy: string }>): number => {
  const BASE_XP = 5;
  const BIKE_BONUS = 10;
  const PUBLIC_TRANSPORT_BONUS = 7;
  const LOW_ENERGY_BONUS = 8;
  const MEDIUM_ENERGY_BONUS = 3;
  const ECO_COMBO_BONUS = 5;

  return habits.reduce((total, habit) => {
    let habitXP = BASE_XP;

    if (habit.transport === "bici") habitXP += BIKE_BONUS;
    else if (habit.transport === "publico") habitXP += PUBLIC_TRANSPORT_BONUS;

    if (habit.energy === "poco") habitXP += LOW_ENERGY_BONUS;
    else if (habit.energy === "medio") habitXP += MEDIUM_ENERGY_BONUS;

    const isEcoFriendly = (habit.transport === "bici" || habit.transport === "publico") && habit.energy === "poco";
    if (isEcoFriendly) habitXP += ECO_COMBO_BONUS;

    return total + habitXP;
  }, 0);
};

export const calculateStreak = (habits: Array<{ date: string }>): Streak => {
  if (habits.length === 0) {
    return { current: 0, longest: 0, lastDate: null };
  }

  const sortedHabits = [...habits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const uniqueDates = [...new Set(sortedHabits.map((h) => h.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < uniqueDates.length; i++) {
    const habitDate = new Date(uniqueDates[i]);
    habitDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (habitDate.getTime() === expectedDate.getTime()) {
      currentStreak++;
    } else {
      break;
    }
  }

  for (let i = 0; i < uniqueDates.length; i++) {
    if (i === 0) {
      tempStreak = 1;
    } else {
      const currentDate = new Date(uniqueDates[i]);
      const prevDate = new Date(uniqueDates[i - 1]);
      const diffDays = Math.floor(
        (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    current: currentStreak,
    longest: longestStreak,
    lastDate: uniqueDates[0] || null,
  };
};

export const calculateBadges = (habits: Array<{ transport: string; energy: string; date: string }>): Badge[] => {
  const bikeCount = habits.filter((h) => h.transport === "bici").length;
  const publicCount = habits.filter((h) => h.transport === "publico").length;
  const ecoTransportCount = bikeCount + publicCount;
  const lowEnergyCount = habits.filter((h) => h.energy === "poco").length;
  const totalHabits = habits.length;
  const ecoFriendlyCount = habits.filter(
    (h) =>
      (h.transport === "bici" || h.transport === "publico") && h.energy === "poco"
  ).length;

  const streak = calculateStreak(habits);

  return ALL_BADGES.map((badge) => {
    let progress = 0;
    let unlocked = false;

    switch (badge.id) {
      case "cyclist_beginner":
      case "cyclist_pro":
      case "cyclist_master":
        progress = bikeCount;
        break;
      case "public_transport_friend":
      case "public_transport_pro":
        progress = publicCount;
        break;
      case "eco_commuter":
        progress = ecoTransportCount;
        break;
      case "energy_saver":
      case "energy_master":
      case "energy_champion":
        progress = lowEnergyCount;
        break;
      case "streak_3":
      case "streak_7":
      case "streak_14":
      case "streak_30":
        progress = streak.longest;
        break;
      case "first_habit":
      case "habits_10":
      case "habits_50":
      case "habits_100":
        progress = totalHabits;
        break;
      case "eco_warrior":
        progress = ecoFriendlyCount;
        break;
    }

    unlocked = progress >= badge.requirement;

    return {
      ...badge,
      progress,
      unlocked,
    };
  });
};

export const getNextBadge = (badges: Badge[]): Badge | null => {
  const lockedBadges = badges
    .filter((b) => !b.unlocked)
    .sort((a, b) => {
      const aProgress = (a.progress / a.requirement) * 100;
      const bProgress = (b.progress / b.requirement) * 100;
      return bProgress - aProgress;
    });

  return lockedBadges[0] || null;
};
