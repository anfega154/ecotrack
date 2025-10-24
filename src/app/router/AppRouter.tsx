// import { Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from '../../presentation/pages/LoginPage';
// import RegisterPage from '../../presentation/pages/RegisterPage';
// import DashboardPage from '../../presentation/pages/DashboardPage';
// import HabitsPage from '../../presentation/pages/HabitsPage';
// import NotFoundPage from '../../presentation/pages/NotFoundPage';

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/dashboard" />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//       <Route path="/dashboard" element={<DashboardPage />} />
//       <Route path="/habits" element={<HabitsPage />} />
//       <Route path="*" element={<NotFoundPage />} />
//     </Routes>
//   );
// };

// export default AppRouter;
// src/app/router/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import LoginPage from "../../presentation/pages/auth/LoginPage";
import RegisterPage from "../../presentation/pages/auth/RegisterPage";
import DashboardPage from "../../presentation/pages/dashboard/DashboardPage";
import SettingsPage from "../../presentation/pages/Habists/HabitsPage";
import NotFoundPage from "../../presentation/pages/notfound/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

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
