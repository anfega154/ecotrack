import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRouter";
import LoginPage from "../../presentation/pages/auth/LoginPage";
import RegisterPage from "../../presentation/pages/auth/RegisterPage";
import DashboardPage from "../../presentation/pages/dashboard/DashboardPage";
import HabitsPage from "../../presentation/pages/habits/HabitsPage";
import HistoryPage from "../../presentation/pages/history/HistoryPage";
import NotFoundPage from "../../presentation/pages/notfound/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
