import React from "react";
import styles from "./styles/Page.module.css";
import { TableHeader, Entry } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import { EntriesTable } from "../../components/ViewDataComponents.jsx";
import { useLocation } from "react-router-dom";
import { URLPaths } from "../../config";

const DeleteCategory = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [EntriesToDelete, setEntriesToDelete] = React.useState([]);
  const [output, setOutput] = React.useState(" ");

  const handleRemoveEntry = (id) => {
    const newInputValues = EntriesToDelete.filter((entry) => entry[0] !== id);
    setEntriesToDelete(newInputValues);
  };

  const handleDelete = () => {
    const deleteBooks = async () => {
      if (EntriesToDelete.length === 0) alert("Please select at least one.");
      const new_account_ids = EntriesToDelete.map((entry) => entry[0]);
      console.log(new_account_ids);
      try {
        const response = await window.electronAPI.deleteCategories(
          new_account_ids
        );
        console.log(response);
        if (response?.message) {
          console.log(response?.message);
          setOutput(response?.message);
        } else if (response?.error) {
          console.log(response?.error);
          setOutput(response?.error);
        }
        setEntriesToDelete([]);
      } catch (error) {
        setOutput("Error deleting entries:", error);
        console.log(error);
      }
    };
    deleteBooks();
  };

  const fetchEntries = async () => {
    try {
      const response = await window.electronAPI.getCategoriesById(account_ids);
      if (response?.data) {
        setEntriesToDelete(response.data);
      }
    } catch (error) {
      setOutput("Error fetching entries:", error);
      setEntriesToDelete([]);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className={styles.PageWrapper}>
      <div className={styles.Page}>
        <TableHeader>
          <p>CATEGORY NAME</p>
        </TableHeader>
        <EntriesTable entriesLength={EntriesToDelete.length}>
          {EntriesToDelete.map((entries) => {
            console.log(entries[4]);
            return (
              <Entry
                value={entries}
                key={entries[0]}
                handleRemoveEntry={() => handleRemoveEntry(entries[0])}
              >
                <p>{entries[1]}</p>
                <div>
                  <img src={URLPaths.API_URL + "/qr/" + entries[5]} alt="" />
                </div>
              </Entry>
            );
          })}
        </EntriesTable>
        <ControlBar message={output} handleDelete={handleDelete} />
      </div>
    </div>
  );
};

export default DeleteCategory;
