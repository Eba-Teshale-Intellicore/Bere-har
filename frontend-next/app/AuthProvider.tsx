"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  loading: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
      setLoading(false);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
