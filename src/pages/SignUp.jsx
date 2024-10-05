import React from "react";
import NavBar from "../components/NavBar";

const SignUp = () => {
  return (
    <>
      <NavBar />
      <div className="form-container">
        <h2 className="text-center">Sign Up</h2>
        <form action="">
          <div className="field-container">
            <label htmlFor="firstName">First Name</label>
            <input className="input" type="text" name="firstName" />
          </div>
          <div className="field-container">
            <label htmlFor="lastName">Last Name</label>
            <input className="input" type="text" name="lastName" />
          </div>
          <div className="field-container">
            <label htmlFor="email">Email</label>
            <input className="input" type="email" name="email" />
          </div>
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input className="input" type="password" name="password" />
          </div>
          <button className="btn btn-effects horizontal-center d-block">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
