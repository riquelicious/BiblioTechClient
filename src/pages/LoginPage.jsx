import { Outlet } from "react-router-dom";
import React from "react";
import "./styles/LoginPage.css";

import LoginIconDisplay from "../assets/img/LoginDisplay.svg";

function LoginPage() {
  return (
    <div className="LoginPage">
      <Outlet />
      <DisplayPanel />
    </div>
  );
}

const DisplayPanel = () => {
  return (
    <div className="DisplayPanel">
      <img src={LoginIconDisplay} alt="" className="" />
      <div>
        <h3>Your library solution awaits.</h3>
        <p>Simplifying Library Management, One Book at a Time.</p>
      </div>
    </div>
  );
};

export default LoginPage;
