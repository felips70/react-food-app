import React, { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const foodAppToken = localStorage.getItem("foodAppToken");

  useEffect(() => {
    const foodAppUsers = JSON.parse(localStorage.getItem("foodAppUsers"));
    if (foodAppToken && foodAppUsers) {
      const currentUser = foodAppUsers.filter(
        (user) => user.id === foodAppToken
      );
      setUserInfo(currentUser[0]);
    }
    setLoading(false);
  }, [foodAppToken]);
  const updateUserInfo = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };
  return (
    <UserInfoContext.Provider value={{ userInfo, updateUserInfo, loading }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
