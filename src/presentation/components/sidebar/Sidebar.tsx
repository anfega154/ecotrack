import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { NavLink } from "react-router-dom";
import {LogOut, User } from "lucide-react";

const SidebarHorizontal = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <a href="#" className="navbar-brand fw-bold text-success d-flex align-items-center gap-2">
            🌿 EcoTrack
          </a>

          <div className="d-none d-lg-flex align-items-center">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `btn btn-link text-decoration-none ${isActive ? "text-success" : "text-secondary"}`
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/habits"
              className={({ isActive }) =>
                `btn btn-link text-decoration-none ${isActive ? "text-success" : "text-secondary"}`
              }
            >
              Registrar hábitos
            </NavLink>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          {user && (
            <div className="d-flex align-items-center gap-2">
              <User size={18} className="text-secondary" />
              <span className="text-secondary small d-none d-md-inline">{user.email}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-success text-white"
          >
            <LogOut size={16} className="me-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SidebarHorizontal;