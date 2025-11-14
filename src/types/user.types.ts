import type { User as FirebaseUser } from "firebase/auth";

export interface User extends FirebaseUser {}

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
}
