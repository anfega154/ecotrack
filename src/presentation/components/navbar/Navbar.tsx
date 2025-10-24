// src/presentation/components/navbar/Navbar.tsx
import { useAuth } from "../../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../../data/FirebaseConfig";

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
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-semibold text-green-600">🌿 EcoTrack</h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-gray-700 text-sm hidden sm:inline">
            {user.email}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Navbar;
