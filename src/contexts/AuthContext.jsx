import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [foodAppToken, setFoodAppToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("foodAppToken");
    setFoodAppToken(token); // if there is no token this will just be set to null
    setLoading(false);
  }, []);

  function logIn(token) {
    localStorage.setItem("foodAppToken", token);
    setFoodAppToken(token);
    setTimeout(() => {
      navigate("/food");
    }, 0);
  }

  function logOut() {
    localStorage.removeItem("foodAppToken");
    setFoodAppToken(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ foodAppToken, logIn, logOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
