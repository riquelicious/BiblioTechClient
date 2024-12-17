import React from "react";
import styles from "./styles/UpdateDataComponents.module.css";
import iRemove from "../assets/icons/Close.svg";

function TableHeader(props) {
  return (
    <div className={styles.TableHeader}>
      <div className={styles.CheckBoxContainer} />
      <div className={styles.TableHeaderColumns}>{props.children}</div>
    </div>
  );
}

function Entry(props) {
  return (
    <div className={styles.Entry}>
      <div className={styles.CheckBoxContainer}>
        <button onClick={props.handleRemoveEntry}>
          <img src={iRemove} alt="" />
        </button>
      </div>
      <div className={styles.EntryColumns}>{props.children}</div>
    </div>
  );
}

// function ControlBar(props) {
//   let show = false;
//   let showall = useUpdateEntries
//   return (
//     <div className={styles.ControlBar}>
//       {show === false && <button onClick={props.prevPage}>PREV</button>}
//     </div>
//   );
// }

export { TableHeader, Entry };
