import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { NavLink } from "react-router-dom";
import { Bell, ShoppingCart, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="w-full h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-6 z-50">
      {/* Logo y navegación */}
      <div className="flex items-center gap-8 flex-shrink-0">
        <a href="#" className="flex items-center gap-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
            alt="EcoTrack Logo"
            className="h-6"
          />
          <span className="text-xl font-semibold text-green-700">EcoTrack</span>
        </a>

        <ul className="flex items-center gap-6">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/habits"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Hábitos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"
                }`
              }
            >
              Configuración
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Espaciador */}
      <div className="flex-1" />

      {/* Iconos y usuario */}
      <div className="flex items-center gap-4 flex-shrink-0">
        <button className="text-gray-600 hover:text-green-600 transition">
          <ShoppingCart size={18} />
        </button>
        <div className="relative">
          <button className="text-gray-600 hover:text-green-600 transition relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <User size={18} className="text-gray-600" />
            <span className="text-sm text-gray-700">{user.email}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-white bg-green-600 hover:bg-green-500 px-3 py-1.5 rounded-md transition"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
