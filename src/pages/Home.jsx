import React from "react";
import NavigationButton from "../components/NavigationButton";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { foodAppToken } = useAuth();
  return (
    <div className="d-flex flex-column align-items-center m-5 gap-3">
      <img
        className="food-on-table-img"
        src="https://zqafc8es8gka17ux.public.blob.vercel-storage.com/food-on-table-CF9onw0qO3cJxF1Yw7S1SS1UrkTlZN.png"
        alt="food-on-table"
      />
      <h2 className="food-app-question">What is Food App ?</h2>
      <p className="food-app-answer text-center">
        Food App is a technology company that helps people order food from the
        comfort of their home
      </p>
      <div className="d-flex gap-2">
        {foodAppToken ? (
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
  );
};

export default Home;
