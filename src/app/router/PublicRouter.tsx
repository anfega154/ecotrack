import { Navigate } from "react-router-dom";
import { useAuth } from "../../presentation/hooks/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;