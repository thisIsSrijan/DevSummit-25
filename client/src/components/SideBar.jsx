import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MessageSquare, Upload, BarChart2, LogOut, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';

const Sidebar = ({ logout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/chatbot', name: 'Health Assistant', icon: <MessageSquare size={20} /> },
    { path: '/scan', name: 'Ingredient Scanner', icon: <Upload size={20} /> },
  ];

  return (
    <>
    <motion.div 
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}
      // animate={{ width: collapsed ? 64 : 256 }}
      animate={{ 
        width: collapsed ? (isMobile ? 0 : 64) : 256,
        opacity: collapsed && isMobile ? 0 : 1
      }}

      transition={{ duration: 0.1 }}
    >
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        {!collapsed && (
          // <h2 className="text-xl font-bold text-gradient">HealthScan</h2>
          <motion.h2 
                className="text-xl font-bold text-gradient"
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                exit={{ width: 0 }}
                // animate={{ opacity: 1, x: 0 }}
                // exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8 }}
              >
                HealthScan
              </motion.h2>
        )}

        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg text-gray-500 hover:text-emerald-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 p-2 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${
              location.pathname === link.path ? 'sidebar-link-active' : ''
            }`}
          >
            <span className="mr-3 text-gray-500 dark:text-gray-400">{link.icon}</span>
            {!collapsed && <span>{link.name}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t dark:border-gray-700">
        <button 
          onClick={toggleDarkMode}
          className="sidebar-link mb-2 justify-center"
        >
          {collapsed ? (
            darkMode ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <>
              {darkMode ? <Sun size={20} className="mr-3" /> : <Moon size={20} className="mr-3" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </>
          )}
        </button>
        
        <button 
          onClick={logout}
          className="sidebar-link text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300"
        >
          <LogOut size={20} className="mr-3" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
    
    </>
  );
};

export default Sidebar;

