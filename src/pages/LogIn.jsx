import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  validateField,
  validateFieldLength,
  emailRegex,
  emptyFields,
} from "../utility";

const LogIn = () => {
  const { logIn, logInError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [emailContentError, setEmailContentError] = useState(false);
  const [pwEmptyError, setPwEmptyError] = useState(false);

  const handleChange = (e, setState) => setState(e.target.value);

  const handleLogIn = (e) => {
    e.preventDefault();
    const isEmailValid = validateField(
      email,
      setEmailEmptyError,
      setEmailContentError,
      emailRegex
    );
    const isPwValid = validateFieldLength(password, setPwEmptyError);
    if (isEmailValid && isPwValid) {
      logIn({ email, password });
      emptyFields(setEmail, setPassword);
    }
  };
  return (
    <div className="form-container">
      <h2 className="text-center">Log In</h2>
      <form action="">
        <div className="field-container">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e, setEmail)}
            className="input"
            type="email"
            name="email"
            value={email}
          />
          {emailEmptyError && (
            <span className="empty-field">*Please fill this field</span>
          )}
          {emailContentError && (
            <span className="error-msg">Please enter a valid email</span>
          )}
        </div>
        <div className="field-container">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e, setPassword)}
            className="input"
            type="password"
            name="password"
            value={password}
          />
          {pwEmptyError && (
            <span className="empty-field">*Please fill this field</span>
          )}
        </div>
        {logInError && (
          <p className="error-msg text-center my-1">
            The email or password you entered is incorrect
          </p>
        )}
        <button
          onClick={handleLogIn}
          className="btn btn-effects horizontal-center d-block"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
