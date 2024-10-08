import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [foodAppToken, setFoodAppToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("foodAppToken");
    if (token) {
      setFoodAppToken(token);
    }
    setLoading(false);
  }, []);

  function logIn(token) {
    localStorage.setItem("foodAppToken", token);
    setFoodAppToken(token);
  }

  function logOut() {
    localStorage.removeItem("foodAppToken");
    setFoodAppToken(null);
  }

  return (
    <AuthContext.Provider value={{ foodAppToken, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
