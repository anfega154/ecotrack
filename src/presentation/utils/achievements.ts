// Definición de badges/insignias
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  category: "transport" | "energy" | "streak" | "general";
  unlocked: boolean;
  progress: number;
}

// Definición de nivel de usuario
export interface UserLevel {
  level: number;
  title: string;
  xp: number;
  xpForNext: number;
  percentage: number;
}

// Definición de racha
export interface Streak {
  current: number;
  longest: number;
  lastDate: string | null;
}

// Todos los badges disponibles
export const ALL_BADGES: Omit<Badge, "unlocked" | "progress">[] = [
  // Badges de Transporte
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

  // Badges de Energía
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

  // Badges de Rachas
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

  // Badges Generales
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

// Títulos de niveles
const LEVEL_TITLES = [
  "Novato Verde", // 0-100 XP
  "Aprendiz Sostenible", // 100-250
  "Consciente Ambiental", // 250-500
  "Defensor de la Tierra", // 500-1000
  "Eco Comprometido", // 1000-2000
  "Líder Sostenible", // 2000-3500
  "Maestro Eco", // 3500-5500
  "Guardián del Planeta", // 5500-8000
  "Leyenda Verde", // 8000-11000
  "Eco Master Supremo", // 11000+
];

// XP requerido por nivel
const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 11000];

// Calcular nivel basado en XP
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

// Calcular XP basado en hábitos
export const calculateXP = (habits: any[]): number => {
  let xp = 0;

  habits.forEach((habit) => {
    // XP base por registrar
    xp += 5;

    // Bonus por transporte eco-friendly
    if (habit.transport === "bici") {
      xp += 10;
    } else if (habit.transport === "publico") {
      xp += 7;
    }

    // Bonus por bajo consumo energético
    if (habit.energy === "poco") {
      xp += 8;
    } else if (habit.energy === "medio") {
      xp += 3;
    }

    // Bonus por ser completamente eco-friendly
    if (
      (habit.transport === "bici" || habit.transport === "publico") &&
      habit.energy === "poco"
    ) {
      xp += 5; // Bonus extra
    }
  });

  return xp;
};

// Calcular racha actual
export const calculateStreak = (habits: any[]): Streak => {
  if (habits.length === 0) {
    return { current: 0, longest: 0, lastDate: null };
  }

  // Ordenar por fecha descendente
  const sortedHabits = [...habits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Obtener fechas únicas
  const uniqueDates = [...new Set(sortedHabits.map((h) => h.date))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calcular racha actual
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

  // Calcular racha más larga
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

// Calcular badges desbloqueados
export const calculateBadges = (habits: any[]): Badge[] => {
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
      // Transport badges
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

      // Energy badges
      case "energy_saver":
      case "energy_master":
      case "energy_champion":
        progress = lowEnergyCount;
        break;

      // Streak badges
      case "streak_3":
      case "streak_7":
      case "streak_14":
      case "streak_30":
        progress = streak.longest;
        break;

      // General badges
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

// Obtener próximo badge a desbloquear
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
