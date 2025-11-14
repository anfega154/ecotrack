import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../data/FirebaseConfig";
import type { Habit } from "../../types";

export const habitService = {
  async fetchUserHabits(uid: string): Promise<Habit[]> {
    const q = query(collection(db, "habits"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data()) as Habit[];
  },
};
