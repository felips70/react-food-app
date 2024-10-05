import React from "react";
import { Link } from "react-router-dom";

const NavigationButton = ({ to, label }) => {
  return (
    <button className="btn btn-effects">
      <Link className="text-decoration-none" to={to}>
        {label}
      </Link>
    </button>
  );
};

export default NavigationButton;
