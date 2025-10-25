import { createContext } from "react";

interface AuthContextProps {
  user: any;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});