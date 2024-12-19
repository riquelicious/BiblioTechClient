import React from "react";
import styles from "./styles/UpdateDataComponents.module.css";
import iRemove from "../assets/icons/Close.svg";
import CheckBox from "./CheckBox";

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

function RecordsEntry(props) {
  return (
    <div className={styles.Entry}>
      <div className={styles.CheckBoxContainer}>
        <div></div>
      </div>
      <div className={styles.EntryColumns}>{props.children}</div>
    </div>
  );
}

function BookEntry(props) {
  const [showCategory, setShowCategory] = React.useState(false);
  const toggleCategory = () => {
    setShowCategory(!showCategory);
    console.log(showCategory);
  };
  const BookEntry = ["Title", "Author", "Call Number"];
  return (
    <div className={styles.BookEntry}>
      <div className="">
        <div className={styles.CheckBoxContainer}>
          <button onClick={props.handleRemoveEntry}>
            <img src={iRemove} alt="" />
          </button>
        </div>
        <div className={styles.EntryColumns}>{props.children}</div>
      </div>
      <div className={styles.CategoryBar}>
        <p onClick={toggleCategory}>{showCategory ? "HIDE ▲" : "SHOW ▼"}</p>
        <div className={showCategory ? "" : styles.Hide}>
          {!props.loading &&
            props.categories &&
            props.categories.length > 0 &&
            (props.categories || []).map((category) => {
              const isChecked = props.entryCategories[props.entry_id]?.includes(
                category[0]
              );
              return (
                <div key={category[0]}>
                  <CheckBox
                    value={category[0]}
                    name={category[1]}
                    id={`category-${props.entry_id}-${category[0]}`}
                    onChange={(e) =>
                      props.handleChange(
                        category[0],
                        props.entry_id,
                        e.target.checked
                      )
                    }
                    checked={isChecked}
                  />
                  <label htmlFor={`category-${props.entry_id}-${category[0]}`}>
                    {category[1]}
                  </label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export { TableHeader, Entry, BookEntry, RecordsEntry };
