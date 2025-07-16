import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'synthwave');
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <span className="text-3xl">🌤️</span>
            <span>WeatherApp</span>
          </NavLink>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              📊 Forecast
            </NavLink>
            <NavLink 
              to="/event" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              💡 Tips
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
          <div className="flex flex-col gap-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              📊 Forecast
            </NavLink>
            <NavLink 
              to="/event" 
              className={({ isActive }) => 
                `px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              💡 Tips
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
