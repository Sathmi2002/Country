import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dark mode preference is stored
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
          <Globe className="w-6 h-6" />
          <span className="text-xl font-bold">Countries Explorer</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
          {user ? (
            <>
              <Link to="/favorites" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Favorites</Link>
              <button 
                onClick={handleLogout} 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Logout
              </button>
              <span className="text-green-600 dark:text-green-400">Hello, {user.username}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Register</Link>
            </>
          )}
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-4 shadow-md absolute w-full transition-all">
          <nav className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            {user ? (
              <>
                <Link to="/favorites" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Favorites</Link>
                <button 
                  onClick={handleLogout} 
                  className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Logout
                </button>
                <span className="text-green-600 dark:text-green-400">Hello, {user.username}</span>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Login</Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Register</Link>
              </>
            )}
            <button 
              onClick={toggleDarkMode} 
              className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {darkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;