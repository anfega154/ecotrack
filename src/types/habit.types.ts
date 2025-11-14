import { Timestamp } from "firebase/firestore";

export type TransportType = "carro" | "moto" | "bici" | "publico";
export type EnergyType = "poco" | "medio" | "mucho";
export type DayType = "laboral" | "finde" | "festivo";

export interface Habit {
  uid: string;
  transport: TransportType;
  energy: EnergyType;
  date: string;
  duration: string;
  dayType: DayType;
  notes: string;
  createdAt: Timestamp;
}

export interface HabitFormData {
  transport: string;
  energy: string;
  date: string;
  duration: string;
  dayType: string;
  notes: string;
}
