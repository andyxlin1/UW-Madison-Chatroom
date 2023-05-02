import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const login = () => {
      setLoggedIn(true);
    };
  
    const logout = () => {
      setLoggedIn(false);
    };
  
    return (
      <AuthContext.Provider value={{ loggedIn, login, logout, setLoggedIn, user, setUser }}> 
        {children}
      </AuthContext.Provider>
    );
  };
  
  
  
  
  