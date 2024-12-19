import React from "react";
import styles from "./styles/Page.module.css";
import {
  BookEntry,
  TableHeader,
} from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";

const InsertBook = () => {
  const [entries, setEntries] = React.useState([["", "", "", ""]]);
  const [entryCategories, setEntryCategories] = React.useState([[]]);
  const [stringResponse, setResponse] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    if (entries.length === 0) {
      setEntries([["", "", "", ""]]);
      setEntryCategories([[]]);
    }
  }, [entries]);

  React.useEffect(() => {
    getCategories();
  }, []);

  React.useEffect(() => {
    console.log(entryCategories);
  }, [entryCategories]);

  const handleRemoveEntry = (id) => {
    const newInputValues = entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  const getCategories = async () => {
    try {
      const response = await window.electronAPI.getCategories();
      if (response?.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleInsert = async () => {
    try {
      const response = await window.electronAPI.insertBooks({
        books: entries,
        categories: entryCategories,
      });
      // console.log(response);
      if (response?.message) {
        setResponse(response?.message);
        setEntries([]);
        // setEntries([["", "", "", ""]]);
      } else {
        setEntries([]);
        // setEntries([["", "", "", ""]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (id, index, value) => {
    const newInputValues = entryCategories.map((entry, i) => {
      if (i === index) {
        const newEntry = [...entry];
        if (value === true) {
          newEntry.push(id); // Add category ID if checked
        } else {
          const removeIndex = newEntry.indexOf(id);
          if (removeIndex > -1) {
            newEntry.splice(removeIndex, 1); // Remove category ID if unchecked
          }
        }
        return newEntry;
      }
      return entry;
    });
    if (index >= newInputValues.length) {
      newInputValues[index] = [id]; // Create new entry with the category ID
    }
    setEntryCategories(newInputValues);
  };

  const handleInputChange = (entry_id, inputIndex, value) => {
    // console.log(entry_id, inputIndex, value);
    const newEntries = [...entries];
    newEntries[entry_id][inputIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (
      lastGroup.every((input) => input !== "") &&
      entry_id === newEntries.length - 1
    ) {
      setEntries([...newEntries, ["", "", "", ""]]);
      setEntryCategories([...entryCategories, []]);
    }
  };

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Page}>
        <TableHeader>
          <p>ACCESS NO.</p>
          <p>CALL NO.</p>
          <p>TITLE</p>
          <p>AUTHOR</p>
        </TableHeader>
        <div>
          {entries.map((entry, entry_id) => (
            <BookEntry
              handleRemoveEntry={() => handleRemoveEntry(entry[0])}
              key={entry_id}
              categories={categories}
              handleChange={handleChange}
              entry_id={entry_id}
              entryCategories={entryCategories}
            >
              <input
                type="text"
                placeholder="Access No."
                onChange={(e) => handleInputChange(entry_id, 0, e.target.value)}
                value={entry[0]}
              />
              <input
                type="text"
                placeholder="Call No."
                onChange={(e) => handleInputChange(entry_id, 1, e.target.value)}
                value={entry[1]}
              />
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => handleInputChange(entry_id, 2, e.target.value)}
                value={entry[2]}
              />
              <input
                type="text"
                placeholder="Author"
                onChange={(e) => handleInputChange(entry_id, 3, e.target.value)}
                value={entry[3]}
              />
            </BookEntry>
          ))}
        </div>
        <ControlBar handleInsert={handleInsert} message={stringResponse} />
      </div>
    </div>
  );
};

export default InsertBook;
