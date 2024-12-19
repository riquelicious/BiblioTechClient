import React from "react";
import styles from "./styles/Page.module.css";
import {
  TableHeader,
  BookEntry,
} from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import { EntriesTable } from "../../components/ViewDataComponents.jsx";
import { useLocation } from "react-router-dom";

const UpdateBooks = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [entriesToUpdate, setEntriesToUpdate] = React.useState([]);
  const [entryCategories, setEntryCategories] = React.useState([[]]);
  const [output, setOutput] = React.useState(" ");
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleRemoveEntry = (id) => {
    const newInputValues = entriesToUpdate.filter((entry) => entry[0] !== id);
    setEntriesToUpdate(newInputValues);
  };

  React.useEffect(() => {
    getCategories();
    fetchEntries();
    getJoinedCategories();
  }, []);

  React.useEffect(() => {
    console.log(entryCategories);
  }, [entryCategories]);

  //update the changes from the table into the state
  const handleChange = (id, index, value) => {
    const newInputValues = entriesToUpdate.map((entry) => {
      if (entry[0] == id) {
        const newEntry = [...entry];
        newEntry[index] = value;
        return newEntry;
      }
      return entry;
    });
    setEntriesToUpdate(newInputValues);
  };

  const handleChangeCheck = (id, index, value) => {
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

  const getCategories = async () => {
    try {
      const response = await window.electronAPI.getCategories();
      // console.log(response?.data);
      if (response?.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const getJoinedCategories = async () => {
    try {
      const response = await window.electronAPI.getJoinedCategories(
        account_ids
      );
      console.log(response?.data);
      if (response?.data) {
        setEntryCategories(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await window.electronAPI.getBooks(account_ids);
      // console.log("response", response);
      if (response?.data) {
        // console.log(response.data);
        setEntriesToUpdate(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };
  // send the update request
  const updateEntries = async () => {
    if (entriesToUpdate.length === 0) {
      alert("Please select at least one entry to update.");
      return;
    }
    try {
      const response = await window.electronAPI.updateBooks({
        books: entriesToUpdate,
        categories: entryCategories,
      });
      if (response?.message) {
        setEntriesToUpdate([]);
      } else {
        setEntriesToUpdate([]);
      }
    } catch (error) {
      setOutput("Error fetching entries:", error);
      setEntriesToUpdate([]);
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
          <p>STATUS</p>
        </TableHeader>
        <EntriesTable entriesLength={entriesToUpdate.length}>
          {entriesToUpdate.map((entries, entry_id) => {
            console.log(entries[0]);
            return (
              <BookEntry
                value={entries}
                key={entries[0]}
                handleRemoveEntry={() => handleRemoveEntry(entries[0])}
                categories={categories}
                handleChange={handleChangeCheck}
                entry_id={entry_id}
                entryCategories={entryCategories}
                loading={loading}
              >
                <input
                  type="text"
                  onChange={(e) => handleChange(entries[0], 1, e.target.value)}
                  value={entries[1]}
                />
                <input
                  type="text"
                  onChange={(e) => handleChange(entries[0], 2, e.target.value)}
                  value={entries[2]}
                />
                <input
                  type="text"
                  onChange={(e) => handleChange(entries[0], 3, e.target.value)}
                  value={entries[3]}
                />
                <input
                  type="text"
                  onChange={(e) => handleChange(entries[0], 4, e.target.value)}
                  value={entries[4]}
                />
                <select
                  onChange={(e) => handleChange(entries[0], 6, e.target.value)}
                  value={entries[6]}
                >
                  <option value="available">Available</option>
                  <option value="borrowed">Borrowed</option>
                </select>
              </BookEntry>
            );
          })}
        </EntriesTable>
        <ControlBar useUpdateEntries={updateEntries} message={output} />
      </div>
    </div>
  );
};

export default UpdateBooks;
