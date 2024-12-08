import React, { useState, useMemo } from "react";
import useAuth from "../hooks/useAuth";
import { useFoodAppCart } from "../hooks/useFoodAppCart";
import { Link } from "react-router-dom";
import { getTotalProductQuantity } from "../utility";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { foodAppToken, userInfo, logOut } = useAuth();

  const { foodAppCart } = useFoodAppCart();

  const handleLogOut = () => {
    setShowMenu(false);
    logOut();
  };

  const totalProductQuantity = useMemo(() => {
    return getTotalProductQuantity(foodAppCart);
  }, [foodAppCart]);

  return (
    <ul className="nav-bar">
      <li>
        <img
          src="https://zqafc8es8gka17ux.public.blob.vercel-storage.com/food-Y4w0IBJsD1xM6YTrB5wslbenWnQqky.png"
          alt="logo"
          width={30}
        />
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
            <Link to="/cart" className="p-relative">
              {totalProductQuantity > 0 && (
                <span className="cart-counter">{totalProductQuantity}</span>
              )}
              Cart
            </Link>
          </li>
          <li className="profile">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="profile-btn btn-effects"
            >
              {userInfo?.firstName[0].toUpperCase() || "?"}
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
