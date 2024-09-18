"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GiToken } from 'react-icons/gi';

interface AuthContextType {
  isAutenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAutenticated, setIsAutenticated] = useState<boolean | string>("");

  useEffect(() => {
    // Verificar si el token está en localStorage al inicializar
    const token = localStorage.getItem('token');
    if (token) {
      setIsAutenticated(true);
    } else {
      setIsAutenticated(false);
    }
  }, []);

  const login = (): void => {
    const tokenValue = localStorage.getItem("token");
    if (tokenValue) {
      setIsAutenticated(true);
      console.log("cambio a true");
    } else {
      setIsAutenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAutenticated(false);
  };

  // Retorna el children envuelto al provider
  return (
    <AuthContext.Provider value={{ isAutenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error con el provider");
  }
  return context;
};

