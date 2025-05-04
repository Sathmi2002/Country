import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const storedFavorites = localStorage.getItem('favorites');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
    
    setLoading(false);
  }, []);

  const login = (userData) => {
    // In a real app, this would make an API call
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Get favorites for this user from localStorage
    const storedFavorites = localStorage.getItem(`favorites_${userData.id}`);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  const register = (userData) => {
    // In a real app, this would make an API call
    // For this demo, we'll simulate a successful registration
    const newUser = { 
      ...userData, 
      id: Date.now().toString()
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    // Initialize empty favorites for the new user
    setFavorites([]);
    localStorage.setItem(`favorites_${newUser.id}`, JSON.stringify([]));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addToFavorites = (country) => {
    if (!user) return;
    
    const updatedFavorites = [...favorites, country];
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (countryCode) => {
    if (!user) return;
    
    const updatedFavorites = favorites.filter(country => country.cca3 !== countryCode);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updatedFavorites));
  };

  const isInFavorites = (countryCode) => {
    return favorites.some(country => country.cca3 === countryCode);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        loading,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isInFavorites
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};