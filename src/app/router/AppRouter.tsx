import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../../presentation/pages/auth/LoginPage";
import RegisterPage from "../../presentation/pages/auth/RegisterPage";
import DashboardPage from "../../presentation/pages/dashboard/DashboardPage";
import HabitsPage from "../../presentation/pages/habits/HabitsPage";
import NotFoundPage from "../../presentation/pages/notfound/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Rutas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
         <Route path="/habits" element={<HabitsPage />} />
               </Route>

      {/* Redirecciones y errores */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
