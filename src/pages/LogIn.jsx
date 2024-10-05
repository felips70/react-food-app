import React from "react";
import NavBar from "../components/NavBar";

const LogIn = () => {
  return (
    <>
      <NavBar />
      <div className="form-container">
        <h2 className="text-center">Log In</h2>
        <form action="">
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input className="input" type="email" name="email" />
          </div>
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input className="input" type="password" name="password" />
          </div>
          <button className="btn btn-effects horizontal-center d-block">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
