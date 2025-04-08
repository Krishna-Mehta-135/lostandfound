import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ React Router navigation
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnMyItemsPage = location.pathname === "/my-items";

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // ✅ Redirect to login page
  };

  return (
    <nav className="bg-[#1E293B] text-white p-2 flex justify-between relative">
      <h1 className="text-xl font-bold">Lost & Found</h1>

      <div className="flex items-center space-x-4 relative">
        {isLoggedIn && (
          <Link
            to={isOnMyItemsPage ? "/" : "/my-items"}
            className="bg-orange-500 px-4 py-2 rounded-lg text-black hover:bg-orange-600 tracking-wide"
          >
            {isOnMyItemsPage ? "Home" : "My Items"}
          </Link>
        )}

        {isLoggedIn ? (
        <button
        onClick={handleLogout}
        className="bg-orange-500 px-4 py-2 rounded-lg text-black hover:bg-orange-600 tracking-wide transition-all duration-200"
      >
        Logout
      </button>
      
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 px-4 py-2 rounded-lg text-black hover:bg-orange-600 tracking-wide"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

