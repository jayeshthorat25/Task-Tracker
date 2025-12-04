import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Zap } from "lucide-react";
import api from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {

  const [menuOPen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { removeAuthToken } = useContext(AuthContext);

  const handleMenuToggle = () => setMenuOpen(!menuOPen);

  const handleLogout = async () => {
    removeAuthToken();
    try {
      const response = await api.post("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 font-sans">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-500 via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
            <Zap className="text-white w-6 h-6" />
            <div className="absolute -bottom-1 -middle-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping" />
          </div>

          <span className="text-2xl font-extrabold bg-linear-to-br from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-wide">
            Task Manager
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2px-3 py-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors duration-300 border border-transparent hover:border-purple-200"
            >
              <div className="relative">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-linear-to-br from-fuchsia-500 to-purple-500 text-white font-semibold shadow-md">
                  {user && user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>

                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow-md animate-pulse" />
              </div>

              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800">{user && user.name}</p>
                <p className="text-xs font-normal text-gray-800">
                  {user && user.email}
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300
                ${menuOPen ? "rotate-180" : ""}`}
              />
            </button>

            {menuOPen && (
              <ul className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl border border-purple-100 z-50 overflow-hidden animate-fadeIn">
                <li className="p-2">
                  <button
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
