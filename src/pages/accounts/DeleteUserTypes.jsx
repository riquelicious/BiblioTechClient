import React from "react";
import styles from "./styles/UpdateData.module.css";
import { TableHeader, Entry } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import { EntriesTable } from "../../components/ViewDataComponents.jsx";
import { useLocation } from "react-router-dom";
import CheckBox from "../../components/CheckBox.js";

const DeleteUserTypes = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [Entries, setEntries] = React.useState([]);
  const [output, setOutput] = React.useState(" ");

  const handleRemoveEntry = (id) => {
    const newInputValues = Entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  //update the changes from the table into the state
  const fetchEntries = async () => {
    try {
      const response = await window.electronAPI.getUserTypesById(account_ids);
      if (response?.data) {
        console.log(response.data);
        setEntries(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);
  // send the update request

  const handleDelete = () => {
    const deleteAccounts = async () => {
      if (Entries.length === 0) alert("Please select at least one.");
      if (Entries.find((entry) => entry[0] === 1)) {
        alert(
          "Cannot delete Admin.\n\nIt is a default type and cannot be modified."
        );
        return;
      }
      if (Entries.find((entry) => entry[0] === 2)) {
        alert(
          "Cannot delete User.\n\nIt is a default type and cannot be modified."
        );
        return;
      }

      const new_account_ids = Entries.map((entry) => entry[0]);
      console.log(new_account_ids);
      try {
        const response = await window.electronAPI.deleteUserTypes(
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
        setEntries([]);
      } catch (error) {
        setOutput("Error deleting entries:", error);
        console.log(error);
      }
    };
    deleteAccounts();
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
        <EntriesTable entriesLength={Entries.length}>
          {Entries.map((entries) => {
            console.log(entries[4]);
            return (
              <Entry
                value={entries}
                key={entries[0]}
                handleRemoveEntry={() => handleRemoveEntry(entries[0])}
              >
                <p>{entries[1]}</p>
                <CheckBox checked={entries[2]} disabled />
                <CheckBox checked={entries[3]} disabled />
                <CheckBox checked={entries[4]} disabled />
                <CheckBox checked={entries[5]} disabled />
              </Entry>
            );
          })}
        </EntriesTable>
        <ControlBar handleDelete={handleDelete} message={output} />
      </div>
    </div>
  );
};

export default DeleteUserTypes;
