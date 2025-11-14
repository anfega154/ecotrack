import type { Habit, ChartData } from "../../types";

const TRANSPORT_WEIGHTS = {
  carro: 3,
  moto: 2,
  bici: -1,
  publico: -1,
} as const;

const ENERGY_WEIGHTS = {
  mucho: 2,
  medio: 0,
  poco: -1,
} as const;

export const impactCalculator = {
  calculateImpactLevel(habits: Habit[]): string {
    if (!habits.length) return "Sin datos";

    const score = habits.reduce((acc, habit) => {
      const transportWeight = TRANSPORT_WEIGHTS[habit.transport as keyof typeof TRANSPORT_WEIGHTS] || 0;
      const energyWeight = ENERGY_WEIGHTS[habit.energy as keyof typeof ENERGY_WEIGHTS] || 0;
      return acc + transportWeight + energyWeight;
    }, 0);

    if (score <= 3) return "🌿 Bajo impacto";
    if (score <= 6) return "⚡ Impacto medio";
    return "🔥 Alto impacto ambiental";
  },

  generateRecommendation(habits: Habit[]): string {
    if (!habits.length) return "Registra tus hábitos para obtener recomendaciones personalizadas.";

    const carCount = habits.filter(h => h.transport === "carro").length;
    const bikeCount = habits.filter(h => h.transport === "bici").length;
    const energyHigh = habits.filter(h => h.energy === "mucho").length;
    const energyLow = habits.filter(h => h.energy === "poco").length;

    if (carCount > bikeCount) {
      return "🚲 Intenta usar más bicicleta o transporte público para reducir emisiones.";
    }
    
    if (energyHigh > energyLow) {
      return "💡 Reduce tus horas de consumo eléctrico o usa bombillas LED.";
    }
    
    return "🌱 ¡Excelente trabajo! Tus hábitos son sostenibles, sigue así.";
  },

  calculateEcoScore(habits: Habit[]): number {
    const bikeDays = habits.filter(h => h.transport === "bici").length;
    const publicDays = habits.filter(h => h.transport === "publico").length;
    const carDays = habits.filter(h => h.transport === "carro").length;
    const lowEnergyDays = habits.filter(h => h.energy === "poco").length;
    const highEnergyDays = habits.filter(h => h.energy === "mucho").length;

    const score = (bikeDays + publicDays) * 10 + lowEnergyDays * 5 - carDays * 5 - highEnergyDays * 3;
    return Math.max(0, Math.min(100, score));
  },
};

export const chartDataGenerator = {
  generateTransportChart(habits: Habit[]): ChartData[] {
    return [
      { name: "Carro", value: habits.filter(h => h.transport === "carro").length },
      { name: "Moto", value: habits.filter(h => h.transport === "moto").length },
      { name: "Bici", value: habits.filter(h => h.transport === "bici").length },
      { name: "Público", value: habits.filter(h => h.transport === "publico").length },
    ];
  },

  generateEnergyChart(habits: Habit[]): ChartData[] {
    return [
      { name: "Pocas horas", value: habits.filter(h => h.energy === "poco").length },
      { name: "Medias horas", value: habits.filter(h => h.energy === "medio").length },
      { name: "Muchas horas", value: habits.filter(h => h.energy === "mucho").length },
    ];
  },

  generateWeeklyTrend(habits: Habit[]): Array<{ date: string; count: number }> {
    return habits
      .reduce((acc: Array<{ date: string; count: number }>, habit) => {
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
  },
};

export const habitMetrics = {
  getDaysRegistered(habits: Habit[]): number {
    return [...new Set(habits.map(h => h.date))].length;
  },

  getTransportMetrics(habits: Habit[]) {
    return {
      carDays: habits.filter(h => h.transport === "carro").length,
      bikeDays: habits.filter(h => h.transport === "bici").length,
      publicDays: habits.filter(h => h.transport === "publico").length,
      motoDays: habits.filter(h => h.transport === "moto").length,
      ecoFriendlyDays: habits.filter(h => h.transport === "bici" || h.transport === "publico").length,
    };
  },

  getDayTypeMetrics(habits: Habit[]) {
    return {
      laboralDays: habits.filter(h => h.dayType === "laboral").length,
      weekendDays: habits.filter(h => h.dayType === "finde").length,
    };
  },

  getEnergyMetrics(habits: Habit[]) {
    return {
      highEnergyDays: habits.filter(h => h.energy === "mucho").length,
      mediumEnergyDays: habits.filter(h => h.energy === "medio").length,
      lowEnergyDays: habits.filter(h => h.energy === "poco").length,
    };
  },
};
