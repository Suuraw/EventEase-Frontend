import React, { useState, useRef, useEffect } from "react";
import { Home, User, List, Menu, X,Calendar,UserRoundPen } from "lucide-react"; // Import icons
import logo from "../assets/calendar-date.png";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "antd";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    setUser(null);
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: <span onClick={handleLogout}> Logout</span>,
    },
  ];

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 bg-gray-50 rounded-xl shadow-md z-50 flex justify-between items-center p-4 mx-auto max-w-4xl">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-6 w-6 mr-2" />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-gray-600 hover:text-blue-600 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Section (Desktop) */}
      <div className="hidden md:flex items-center space-x-8">
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 transition"
          onClick={() => navigate("/")}
        >
          <Home size={20} />
          <span className="ml-1">Home</span>
        </button>
        {user && (
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
            onClick={() => navigate("/dashboard")}
          >
            <List size={20} />
            <span className="ml-1">Dashboard</span>
          </button>
        )}

        {/* User Icon with Dropdown */}
        <div className="relative flex flex-row gap-6" ref={dropdownRef}>
          {user ? (
            <Dropdown menu={{ items }} placement="bottom" arrow>
              <div className="text-gray-600 cursor-pointer flex items-center">
                <User size={20} />
                <span className="ml-2">
                  {user?.firstName
                    ? `Hello, ${user.firstName} ${user.lastName}`
                    : user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <>
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="text-gray-600 hover:text-blue-600 transition"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu (Slide-In) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col items-start p-6 space-y-6 md:hidden"
          >
            <button
              className="text-gray-600 hover:text-blue-600 transition self-end"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <button
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
            >
              <Home size={20} />
              <span className="ml-2">Home</span>
            </button>

            {user && (
              <button
                className="flex items-center text-gray-600 hover:text-blue-600 transition"
                onClick={() => {
                  navigate("/dashboard");
                  setIsMenuOpen(false);
                }}
              >
                <List size={20} />
                <span className="ml-2">Dashboard</span>
              </button>
              
            )}
            {user&&(
              <button
              className="flex items-center text-gray-600 hover:text-blue-600 transition"
              onClick={() => {
                navigate("/myevent");
                setIsMenuOpen(false);
              }}
            >
              <Calendar size={20} />
              <span className="ml-2">My Events</span>
            </button>
            )}
            {user&&(<button
                className="flex items-center text-gray-600 hover:text-blue-600 transition"
                onClick={() => {
                  navigate("/profile");
                  setIsMenuOpen(false);
                }}
              >
                <UserRoundPen size={20} />
                <span className="ml-2">My Profile</span>
              </button>)}
            {user ? (
              <Dropdown menu={{ items }} placement="bottom" arrow>
                <div className="text-gray-600 cursor-pointer flex items-center">
                  <User size={20} />
                  <span className="ml-2">
                    {user?.firstName
                      ? `Hello, ${user.firstName} ${user.lastName}`
                      : user?.username} Logout
                  </span>
                </div>
              </Dropdown>
            ) : (
              <>
                <button
                  className="text-gray-600 hover:text-blue-600 transition"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="text-gray-600 hover:text-blue-600 transition"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Register
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
