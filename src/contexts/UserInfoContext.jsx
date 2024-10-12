import React, { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { foodAppToken, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      const foodAppUsers = JSON.parse(localStorage.getItem("foodAppUsers"));
      const currentUserData = foodAppToken
        ? foodAppUsers.find((user) => user.id === foodAppToken)
        : null;
      setUserInfo(currentUserData); // if currentUserData is null userInfo will just be set to null
      setLoading(false);
    }
  }, [foodAppToken, authLoading]);

  return (
    <UserInfoContext.Provider value={{ userInfo, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
