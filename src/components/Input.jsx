import React from "react";
import "./styles/Input.css";
import iTextBox from "../assets/icons/EmailIcon.svg";

export const LogoTextBox = ({
  src = iTextBox,
  type = "text",
  placeholder,
  className,
  minLength = 0,
  onChange,
}) => {
  return (
    <div className={`logo-text-box ${className}`}>
      <img src={src} alt="" />
      <input
        type={type}
        minLength={minLength}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export const DefaultButton = ({
  text,
  className,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`default-button ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
