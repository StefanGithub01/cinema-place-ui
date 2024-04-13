// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Set the user context value with user data
    setUser({ 
      userId: userData.userId, 
      username: userData.username,
      isAdmin: userData.isAdmin  // Add isAdmin property
    });
  };
  
  /*
    const login = (userData) => {
    // Set the user context value with user data
    setUser({ userId: userData.userId, username: userData.username });
  };
  */

  const logout = () => {
    // Logic for logging out and resetting the user context value
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
