import React, { useState } from "react";
import iLogo from "../assets/icons/Logo.svg";
import { LogoTextBox, DefaultButton } from "../components/Input.jsx";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      alert("All fields are required");
      return;
    }

    login();

    // navigate("/main/dashboard");
  };
  const login = async () => {
    try {
      const response = await window.electronAPI.login({
        account: { email, password },
      });
      console.log(response);

      if (response?.message) {
        setError(response.message);
      }
    } catch (error) {}
  };

  return (
    <motion.form
      className="LoginForm"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="login-header">
        <img src={iLogo} alt="" />
        <h1>Log in to your Account</h1>
        <p className="subtitle">welcome back</p>
      </div>
      <div className="textbox-container">
        <LogoTextBox
          type="email"
          className="login-textbox"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <LogoTextBox
          className="login-textbox"
          placeholder="Password"
          type="password"
          minLength="8"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {<p className="error-message">{error}</p>}
      <div className="button-container">
        <DefaultButton type="submit" text="Login" />
        <Link to="/login/sign-up" className="">
          Don’t have an account?
        </Link>
      </div>
    </motion.form>
  );
};

export default LoginPanel;
