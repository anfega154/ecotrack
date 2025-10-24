import { Outlet } from "react-router-dom";
import Navbar from "../../presentation/components/navbar/Navbar"
import Sidebar from "../../presentation/components/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
