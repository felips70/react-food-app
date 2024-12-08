import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../constants";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [foodAppToken, setFoodAppToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logInError, setLogInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("foodAppToken");
    const user = JSON.parse(localStorage.getItem("foodAppUser"));
    setFoodAppToken(token); // if there is no token this will just be set to null
    setUserInfo(user); // if there is no user this will just be set to null
    setLoading(false);
  }, []);

  const authentication = (endpoint, setError) => async (userObject) => {
    try {
      setLoading(true);
      setError(false);
      const { data } = await axios.post(endpoint, userObject);
      localStorage.setItem("foodAppToken", data.token);
      localStorage.setItem("foodAppUser", JSON.stringify(data.user));
      setFoodAppToken(data.token);
      setUserInfo(data.user);
      setLoading(false);
      setTimeout(() => {
        navigate("/food");
      }, 0);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  const logIn = authentication(
    `${SERVER_ENDPOINT}/api/user/login`,
    setLogInError
  );

  const signUp = authentication(
    `${SERVER_ENDPOINT}/api/user/signup`,
    setSignUpError
  );

  const logOut = () => {
    localStorage.removeItem("foodAppToken");
    localStorage.removeItem("foodAppUser");
    setFoodAppToken(null);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        signUp,
        foodAppToken,
        userInfo,
        loading,
        logInError,
        signUpError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
