import React from "react";
import styles from "./styles/ViewDataComponents.module.css";
import CheckBox from "./CheckBox";
import iEmpty from "../assets/icons/empty.svg";
import { p } from "framer-motion/client";
function SearchContainer(props) {
  return (
    <div className={styles.SearchContainer}>
      <form action="" onSubmit={props.onSubmit}>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <select onChange={props.filterChange} name="" id="">
        {props.children}
      </select>
    </div>
  );
}

function EntriesTable(props) {
  if (props.entriesLength === 0) {
    return (
      <div className={styles.EntriesTable + " " + styles.Empty}>
        <img src={iEmpty} alt="" />
        <div>No {props.tablename} entries found</div>
      </div>
    );
  }
  return (
    <div className={styles.EntriesTable}>
      <div>{props.children}</div>
    </div>
  );
}

function TableHeader(props) {
  return (
    <div className={styles.TableHeader}>
      <div className={styles.CheckBoxContainer}>
        <CheckBox
          isHeader
          id={"check-all"}
          onChange={props.onChange}
          checked={
            (props.selectedItems || []).length === (props.entries || []).length
          }
        />
      </div>
      <div className={styles.TableHeaderColumns}>{props.children}</div>
    </div>
  );
}

function Entry(props) {
  return (
    <div className={styles.Entry}>
      <div className={styles.CheckBoxContainer}>
        <CheckBox
          id={props.value[0]}
          onChange={props.onChange}
          checked={props.checked}
        />
      </div>
      <div className={styles.EntryColumns}>{props.children}</div>
    </div>
  );
}

function ControlBar(props) {
  return (
    <div className={styles.ControlBar}>
      {props.prevPage && <button onClick={props.prevPage}>PREV</button>}
      {props.useUpdateEntries && (
        <button onClick={props.useUpdateEntries}>UPDATE</button>
      )}
      {props.handleDelete && (
        <button onClick={props.handleDelete}>DELETE</button>
      )}
      {props.handleInsert && (
        <button onClick={props.handleInsert}>INSERT</button>
      )}
      {props.nextPage && <button onClick={props.nextPage}>NEXT</button>}
      {props.message && (
        <p>
          {"Message: "} {props.message || " No message"}
        </p>
      )}
    </div>
  );
}
export { SearchContainer, EntriesTable, TableHeader, Entry, ControlBar };
