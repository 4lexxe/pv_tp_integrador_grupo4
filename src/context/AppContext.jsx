import React, { createContext, useState, useContext, useEffect } from 'react';
import { getSessionUser, setSessionUser, removeSessionUser, getUsers, saveUser } from '../utils/authUtils';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState(() => getSessionUser());

  
  const register = async (email, password, name = '') => {
    const users = getUsers(); 
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      throw new Error("El correo electrónico ya está registrado."); 
    }
    const newUser = { email, password, name };
    saveUser(newUser); 
    return true; 
  };

 
  const login = async (email, password) => {
    const users = getUsers(); 
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
     
      const sessionUserData = { email: foundUser.email, name: foundUser.name || '' };
      setSessionUser(sessionUserData);
      setUser(sessionUserData); 
      return true; 
    } else {
      throw new Error("Credenciales inválidas."); 
    }
  };

 
  const logout = () => {
    removeSessionUser(); 
    setUser(null); 
  };

  
  const contextValue = {
    user, 
    isAuthenticated: !!user, 
    login,
    register,
    logout, 
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};