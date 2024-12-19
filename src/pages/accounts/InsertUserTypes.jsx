import React from "react";
import { Dropdown, TextBox, BottomBar } from "../../components/Input.jsx";
// import "./styles/AccountManager.css";
// import styles from "./styles/Page.module.css";
import styles from "./styles/Page.module.css";
import { Entry, TableHeader } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import CheckBox from "../../components/CheckBox.js";

const InsertUserTypes = () => {
  const [entries, setEntries] = React.useState([["", 0, 0, 0, 0]]);
  const [stringResponse, setResponse] = React.useState(null);
  const [userTypes, setUserTypes] = React.useState([]);

  React.useEffect(() => {
    if (entries.length === 0) {
      setEntries([["", 0, 0, 0, 0]]);
    }
    console.log(entries);
  }, [entries]);

  const handleRemoveEntry = (id) => {
    const newInputValues = entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  const handleInsert = async () => {
    try {
      const response = await window.electronAPI.insertUserTypes(entries);
      console.log(response);
      if (response?.message) {
        setResponse(response?.message);
        setEntries([["", 0, 0, 0, 0]]);
      } else {
        setEntries([["", 0, 0, 0, 0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (entry_id, inputIndex, value) => {
    console.log(entry_id, inputIndex, value);
    const newEntries = [...entries];
    newEntries[entry_id][inputIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (lastGroup[0] !== "" && entry_id === newEntries.length - 1) {
      setEntries([...newEntries, ["", 0, 0, 0, 0]]);
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Page}>
        <TableHeader>
          <p>NAME</p>
          <p>ACCOUNT</p>
          <p>BOOKS</p>
          <p>CATEGORIES</p>
          <p>USER TYPE</p>
        </TableHeader>
        <div className={styles.MaxHeightContainer}>
          {entries.map((entry, entry_id) => (
            <Entry
              handleRemoveEntry={() => handleRemoveEntry(entry[0])}
              key={entry_id}
            >
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => handleInputChange(entry_id, 0, e.target.value)}
                value={entry[0]}
              />

              <CheckBox
                value={entry[1]}
                onChange={(e) =>
                  handleInputChange(entry_id, 1, e.target.checked)
                }
                id={`account-${entry_id}`}
              />

              <CheckBox
                value={entry[2]}
                onChange={(e) =>
                  handleInputChange(entry_id, 2, e.target.checked)
                }
                id={`books-${entry_id}`}
              />

              <CheckBox
                value={entry[3]}
                onChange={(e) =>
                  handleInputChange(entry_id, 3, e.target.checked)
                }
                id={`categories-${entry_id}`}
              />

              <CheckBox
                value={entry[4]}
                onChange={(e) =>
                  handleInputChange(entry_id, 4, e.target.checked)
                }
                id={`userType-${entry_id}`}
              />
            </Entry>
          ))}
        </div>
        <ControlBar handleInsert={handleInsert} message={stringResponse} />
      </div>
    </div>
  );
};

export default InsertUserTypes;
