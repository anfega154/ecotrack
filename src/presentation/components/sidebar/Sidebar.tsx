import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";
import { NavLink } from "react-router-dom";
import { 
  LogOut, 
  User, 
  LayoutDashboard, 
  PenLine, 
  History, 
  Award, 
  Leaf,
  Menu,
  X,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

const SidebarHorizontal = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", color: "#3b82f6" },
    { to: "/habits", icon: PenLine, label: "Registrar", color: "#10b981" },
    { to: "/history", icon: History, label: "Histórico", color: "#f59e0b" },
    { to: "/achievements", icon: Award, label: "Logros", color: "#8b5cf6" }
  ];

  return (
    <>
      <style>{`
        .nav-item-modern {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .nav-item-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: currentColor;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }
        
        .nav-item-modern.active::before {
          transform: scaleY(1);
        }
        
        .nav-item-modern:hover {
          transform: translateY(-2px);
          background: rgba(16, 185, 129, 0.05);
        }
        
        .nav-item-modern.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%);
        }
        
        .user-menu-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 220px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
        }
        
        .user-menu-dropdown.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .mobile-menu.show {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-menu-content {
          background: #1e293b;
          height: 100%;
          width: 85%;
          max-width: 320px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          overflow-y: auto;
        }
        
        .mobile-menu.show .mobile-menu-content {
          transform: translateX(0);
        }
        
        .badge-eco {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 12px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          animation: pulse-badge 2s ease-in-out infinite;
        }
        
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .navbar-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
        }
      `}</style>

      <nav className="navbar navbar-glass shadow-sm sticky-top">
        <div className="container-fluid px-3 px-lg-4 py-2">
          <div className="d-flex justify-content-between align-items-center w-100">
            
            {/* Logo Section */}
            <div className="d-flex align-items-center gap-3">
              <NavLink to="/dashboard" className="text-decoration-none d-flex align-items-center gap-2">
                <div 
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)"
                  }}
                >
                  <Leaf size={24} color="white" />
                </div>
                <div className="d-none d-md-block">
                  <h5 className="mb-0 fw-bold" style={{ color: "#0f172a" }}>EcoTrack</h5>
                  <small style={{ color: "#64748b", fontSize: "0.7rem" }}>Tu huella verde</small>
                </div>
              </NavLink>
              
              {/* Badge de estado */}
              <span className="badge-eco d-none d-lg-flex">
                <span>🌱</span> Activo
              </span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => 
                    `nav-item-modern d-flex align-items-center gap-2 px-3 py-2 text-decoration-none ${
                      isActive ? 'active' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? item.color : "#64748b",
                    fontWeight: isActive ? "600" : "500",
                    fontSize: "0.9rem"
                  })}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Right Section */}
            <div className="d-flex align-items-center gap-3">
              
              {/* User Menu - Desktop */}
              <div className="position-relative d-none d-lg-block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="btn d-flex align-items-center gap-2 border-0"
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "12px",
                    padding: "8px 16px"
                  }}
                >
                  <div 
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase() || <User size={16} />}
                  </div>
                  <div className="text-start d-none d-xl-block">
                    <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0f172a" }}>
                      {user?.email?.split('@')[0] || 'Usuario'}
                    </div>
                    <small style={{ fontSize: "0.7rem", color: "#64748b" }}>
                      Eco-warrior
                    </small>
                  </div>
                  <ChevronDown 
                    size={16} 
                    style={{ 
                      color: "#64748b",
                      transform: isUserMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease"
                    }} 
                  />
                </button>

                {/* Dropdown Menu */}
                <div className={`user-menu-dropdown ${isUserMenuOpen ? 'show' : ''}`}>
                  <div className="p-3 border-bottom">
                    <div className="fw-semibold" style={{ fontSize: "0.9rem", color: "#0f172a" }}>
                      {user?.email}
                    </div>
                    <small style={{ color: "#64748b" }}>Cuenta verificada ✓</small>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="btn btn-light w-100 d-flex align-items-center gap-2 justify-content-center"
                      style={{
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        padding: "10px"
                      }}
                    >
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>

              {/* Logout Button Compact - Desktop */}
              <button
                onClick={handleLogout}
                className="btn d-none d-md-flex d-lg-none align-items-center justify-content-center"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)"
                }}
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="btn d-lg-none"
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#10b981"
                }}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          
          {/* Mobile Header */}
          <div className="p-4 border-bottom" style={{ borderColor: "#334155" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <div 
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Leaf size={20} color="white" />
                </div>
                <h5 className="mb-0 fw-bold text-white">EcoTrack</h5>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-link"
                style={{ color: "#94a3b8" }}
              >
                <X size={24} />
              </button>
            </div>
            
            {/* User Info Mobile */}
            {user && (
              <div 
                className="p-3 rounded-3"
                style={{ background: "rgba(16, 185, 129, 0.1)" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div 
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.2rem",
                      fontWeight: "600"
                    }}
                  >
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="fw-semibold text-white" style={{ fontSize: "0.9rem" }}>
                      {user.email?.split('@')[0]}
                    </div>
                    <small style={{ color: "#94a3b8" }}>{user.email}</small>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="p-3">
            <small className="text-uppercase fw-semibold mb-2 d-block" style={{ color: "#64748b", fontSize: "0.7rem", letterSpacing: "0.5px" }}>
              Navegación
            </small>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `nav-item-modern d-flex align-items-center gap-3 p-3 mb-2 text-decoration-none ${
                    isActive ? 'active' : ''
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? item.color : "#cbd5e1",
                  fontWeight: isActive ? "600" : "500",
                  fontSize: "1rem"
                })}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: `${item.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Logout */}
          <div className="p-3 mt-auto border-top" style={{ borderColor: "#334155" }}>
            <button
              onClick={handleLogout}
              className="btn w-100 d-flex align-items-center justify-content-center gap-2"
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "12px",
                fontSize: "1rem",
                fontWeight: "600"
              }}
            >
              <LogOut size={20} />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarHorizontal;