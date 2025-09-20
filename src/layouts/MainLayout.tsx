import React from "react";
import { Outlet, Link } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex gap-4">
          <Link to="/">Global Ranking</Link>
        </nav>
        <nav className="flex gap-4">
          <Link to="vendor-ranking/:1">Vendor Ranking</Link>
              </nav>
        <nav className="flex gap-4">
          <Link to="vendor/:1">Vendor Detail</Link>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-200 text-center p-2">
        © 2025 Future Connections
      </footer>
    </div>
  );
};

export default MainLayout;
