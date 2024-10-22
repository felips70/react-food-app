import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  validateField,
  emptyFields,
  nameRegex,
  emailRegex,
  passwordRegex,
  getIndexOfEmailInLocalStorage,
} from "../utility";
import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const { logIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fnEmptyError, setFnEmptyError] = useState(false);
  const [fnContentError, setFnContentError] = useState(false);

  const [lnEmptyError, setLnEmptyError] = useState(false);
  const [lnContentError, setLnContentError] = useState(false);

  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [emailContentError, setEmailContentError] = useState(false);

  const [pwEmptyError, setPwEmptyError] = useState(false);
  const [pwContentError, setPwContentError] = useState(false);

  const [emailAlreadyUsedError, setEmailAlreadyUsedError] = useState(false);

  const handleChange = (e, setState) => setState(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();

    const isFnValid = validateField(
      firstName,
      setFnEmptyError,
      setFnContentError,
      nameRegex
    );
    const isLnValid = validateField(
      lastName,
      setLnEmptyError,
      setLnContentError,
      nameRegex
    );
    const isEmailValid = validateField(
      email,
      setEmailEmptyError,
      setEmailContentError,
      emailRegex
    );
    const isPwValid = validateField(
      password,
      setPwEmptyError,
      setPwContentError,
      passwordRegex
    );
    if (isFnValid && isLnValid && isEmailValid && isPwValid) {
      const userId = uuidv4();
      const newUser = {
        id: userId,
        firstName,
        lastName,
        email,
        password,
      };

      if (!localStorage.getItem("foodAppUsers")) {
        localStorage.setItem("foodAppUsers", JSON.stringify([newUser]));
        emptyFields(setFirstName, setLastName, setEmail, setPassword);

        logIn(userId);
      } else {
        const foodAppUsers = JSON.parse(localStorage.getItem("foodAppUsers"));
        if (getIndexOfEmailInLocalStorage(foodAppUsers, email) >= 0) {
          setEmailAlreadyUsedError(true);
        } else {
          setEmailAlreadyUsedError(false);

          localStorage.setItem(
            "foodAppUsers",
            JSON.stringify([...foodAppUsers, newUser])
          );

          emptyFields(setFirstName, setLastName, setEmail, setPassword);
          logIn(userId);
        }
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center">Sign Up</h2>
      <form action="">
        <div className="field-container">
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={(e) => handleChange(e, setFirstName)}
            className="input"
            type="text"
            name="firstName"
            value={firstName}
          />
          {fnEmptyError && (
            <span className="empty-field">*Please fill this field</span>
          )}
          {fnContentError && (
            <span className="error-msg">
              First Name must only containt alphabetical characters
            </span>
          )}
        </div>
        <div className="field-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            onChange={(e) => handleChange(e, setLastName)}
            className="input"
            type="text"
            name="lastName"
            value={lastName}
          />
          {lnEmptyError && (
            <span className="empty-field">*Please fill this field</span>
          )}
          {lnContentError && (
            <span className="error-msg">
              Last Name must only containt alphabetical characters
            </span>
          )}
        </div>
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
          {pwContentError && (
            <ul className="error-msg">
              <li className="list-item">
                Password must contain at least 8 characters
              </li>
              <li className="list-item">
                Password must contain at least one lowercase letter
              </li>
              <li className="list-item">
                Password must contain at least one uppercase letter
              </li>
              <li className="list-item">
                Password must contain at least one digit
              </li>
              <li className="list-item">
                Password must contain at least one special character (!@#$%^&*)
              </li>
            </ul>
          )}
        </div>
        {emailAlreadyUsedError && (
          <span className="error-msg">
            User with this email already exists. Please try a different email.
          </span>
        )}
        <button
          onClick={handleSignUp}
          className="btn btn-effects horizontal-center d-block"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
