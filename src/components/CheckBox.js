import React from "react";
import styles from "./styles/CheckBox.module.css";

const CheckBox = (props) => {
  if (props.isHeader) {
    return (
      <div className={`${styles.checkboxContainerHeader} ${props.className} `}>
        <input
          type="checkbox"
          value={props.value}
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          checked={props.checked}
        />
        <label htmlFor={props.id}></label>
      </div>
    );
  }

  return (
    <div className={`${styles.checkboxContainer} ${props.className} `}>
      <input
        type="checkbox"
        value={props.value}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
};

export default CheckBox;
