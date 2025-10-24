// src/presentation/components/sidebar/Sidebar.tsx
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/settings", label: "Configuración", icon: "⚙️" },
  ];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 h-screen hidden sm:flex flex-col">
      <div className="p-6 text-green-600 font-bold text-lg">EcoTrack</div>

      <nav className="flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition ${
                isActive ? "bg-green-100 text-green-700 font-semibold" : ""
              }`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <footer className="p-4 text-xs text-gray-400 text-center border-t">
        v0.1 MVP
      </footer>
    </aside>
  );
};

export default Sidebar;
