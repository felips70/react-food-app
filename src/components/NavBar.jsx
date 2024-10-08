import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUserInfo from "../hooks/useUserInfo";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { foodAppToken, logOut } = useAuth();
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <ul className="nav-bar">
      <li>
        <img src="src/assets/food.png" alt="logo" width={30} />
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about-us">About Us</Link>
      </li>
      {foodAppToken && (
        <>
          <li>
            <Link to="/food">Food</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li className="profile">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="profile-btn btn-effects"
            >
              {userInfo?.firstName[0].toUpperCase() || "F"}
            </button>
            {showMenu && (
              <ul className="menu-container">
                <li>
                  <button className="menu-btn">Profile</button>
                </li>
                <li>
                  <button onClick={handleLogOut} className="menu-btn">
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </li>
        </>
      )}
    </ul>
  );
};

export default NavBar;
