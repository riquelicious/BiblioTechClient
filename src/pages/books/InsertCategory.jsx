import React from "react";
import styles from "./styles/Page.module.css";
import { TableHeader, Entry } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";

const InsertCategory = () => {
  const [entries, setEntries] = React.useState([[""]]);
  const [entryCategories, setEntryCategories] = React.useState([[]]);
  const [stringResponse, setResponse] = React.useState(null);

  React.useEffect(() => {
    if (entries.length === 0) {
      setEntries([[""]]);
      setEntryCategories([[]]);
    }
  }, [entries]);

  React.useEffect(() => {
    console.log(entryCategories);
  }, [entryCategories]);

  const handleRemoveEntry = (id) => {
    const newInputValues = entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  const handleInsert = async () => {
    try {
      const response = await window.electronAPI.insertCategories(entries);
      if (response?.message) {
        setResponse(response?.message);
        setEntries([]);
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (entry_id, inputIndex, value) => {
    const newEntries = [...entries];
    newEntries[entry_id][inputIndex] = value;
    setEntries(newEntries);
    const lastGroup = newEntries[newEntries.length - 1];
    if (
      lastGroup.every((input) => input !== "") &&
      entry_id === newEntries.length - 1
    ) {
      setEntries([...newEntries, [""]]);
      setEntryCategories([...entryCategories, []]);
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Page}>
        <TableHeader>
          <div>CATEGORY NAME</div>
        </TableHeader>
        <div>
          {entries.map((entry, entry_id) => (
            <Entry
              handleRemoveEntry={() => handleRemoveEntry(entry[0])}
              key={entry_id}
            >
              <input
                type="text"
                placeholder="Category Name"
                onChange={(e) => handleInputChange(entry_id, 0, e.target.value)}
                value={entry[0]}
              />
            </Entry>
          ))}
        </div>
        <ControlBar handleInsert={handleInsert} message={stringResponse} />
      </div>
    </div>
  );
};

export default InsertCategory;
