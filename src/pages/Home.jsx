import React from "react";
import NavBar from "../components/NavBar";
import NavigationButton from "../components/NavigationButton";

const Home = () => {
  let isLoggedIn = false;
  return (
    <>
      <NavBar />
      <div className="d-flex flex-column align-items-center m-5 gap-3">
        <img
          className="food-on-table-img"
          src="/src/assets/food-on-table.png"
          alt="food-on-table"
        />
        <h2 className="food-app-question">What is Food App ?</h2>
        <p className="food-app-answer text-center">
          Food App is a technology company that helps people order food from the
          comfort of their home
        </p>
        <div className="d-flex gap-2">
          {isLoggedIn ? (
            <>
              <NavigationButton to="/food" label="Go to Foods" />
              <NavigationButton to="/cart" label="Go to Cart" />
            </>
          ) : (
            <>
              <NavigationButton to="/log-in" label="Log In" />
              <NavigationButton to="/sign-up" label="Sign Up" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
