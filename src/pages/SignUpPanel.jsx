import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import iLogo from "../assets/icons/Logo.svg";
import { LogoTextBox, DefaultButton } from "../components/Input.jsx";

const SignUpPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  return (
    <motion.form
      className="SignUpForm"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="sign-in-header">
        <img src={iLogo} alt="" />
        <h1>Sign up to your Account</h1>
        <p className="subtitle">Welcome</p>
      </div>
      <div className="textbox-container">
        <LogoTextBox
          type="email"
          className="sign-up-textbox"
          placeholder="Email"
          minLength="1"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <LogoTextBox
          className="sign-up-textbox"
          placeholder="Password"
          type="password"
          minLength="8"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <LogoTextBox
          className="sign-up-textbox"
          placeholder="Confirm Password"
          type="password"
          minLength="8"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {<p className="error-message">{error}</p>}
      <div className="button-container">
        <DefaultButton type="submit" text="Sign Up" />
        <Link to="/login" className="">
          Already have an account?
        </Link>
      </div>
    </motion.form>
  );
};

export default SignUpPanel;
