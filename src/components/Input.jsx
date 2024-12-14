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

export const TextBox = (props) => {
  return (
    <div className={`text-box ${props.className}`}>
      <input
        type={props.type || "text"}
        value={props.value}
        minLength={props.minLength || 0}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
};
// { placeholder, className, onChange }
export const Dropdown = (props) => {
  return (
    <select
      className={`dropdown ${props.className}`}
      onChange={props.onChange}
      value={props.value}
    >
      {props?.options.map((option) => (
        <option key={option[0]} value={option[0]}>
          {option[1]}
        </option>
      ))}
    </select>
  );
};
export const Checkbox = (props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <input type="checkbox" id={props.id} value={props.value} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export function BottomBar(props) {
  return (
    <div className="bottom-bar">
      <p>{props.error}</p>
      <button onClick={props.onClick}>{props.buttonName}</button>
    </div>
  );
}
