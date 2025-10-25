import { Outlet } from "react-router-dom";
import Sidebar from "../../presentation/components/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
