import { Outlet, Link, useLocation } from "react-router";
import fcLogo from "../assets/fc_logo.png";

const MainLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };


  return (
    <div className=" min-h-screen flex flex-col">
          <header className="w-full bg-gray-100 text-white shadow-lg">
        <div className="px-4 sm:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center rounded-md p-1"
                aria-label="Future Connections - Go to home page"
              >
                <img
                                  src={fcLogo}
                  alt="Future Connections"
                  className="h-8 w-auto hover:opacity-80 transition-opacity duration-200"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "bg-gray-400"
                    : "hover:!text-pink-600"
                }`}
              >
                Global Ranking
              </Link>
              <Link
                to="/vendor-ranking"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/vendor-ranking")
                    ? "bg-gray-400"
                    : "hover:!text-pink-600"
                }`}
              >
                Vendor Ranking
              </Link>
            </nav>
          </div>
        </div>
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