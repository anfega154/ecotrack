import { Navigate } from "react-router-dom";
import { useAuth } from "../../presentation/hooks/useAuth";
import LoadingSpinner from "../../presentation/components/common/LoadingSpinner";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
