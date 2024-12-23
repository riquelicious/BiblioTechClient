import React from "react";
import styles from "./styles/UpdateData.module.css";
import { TableHeader, Entry } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import { EntriesTable } from "../../components/ViewDataComponents.jsx";
import { useLocation } from "react-router-dom";
import CheckBox from "../../components/CheckBox.js";

const UpdateUserTypes = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [entriesToUpdate, setEntriesToUpdate] = React.useState([]);
  const [output, setOutput] = React.useState(" ");

  const handleRemoveEntry = (id) => {
    const newInputValues = entriesToUpdate.filter((entry) => entry[0] !== id);
    setEntriesToUpdate(newInputValues);
  };

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

  const fetchEntries = async () => {
    try {
      const response = await window.electronAPI.getUserTypesById(account_ids);
      if (response?.data) {
        console.log(response.data);
        setEntriesToUpdate(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  React.useEffect(() => {
    fetchEntries();
  }, []);
  // send the update request
  const updateEntries = async () => {
    if (entriesToUpdate.length === 0) {
      alert("Please select at least one entry to update.");
      return;
    }
    if (entriesToUpdate.find((entry) => entry[0] === 1)) {
      alert(
        "Cannot update Admin.\n\nIt is a default type and cannot be modified."
      );
      return;
    }
    if (entriesToUpdate.find((entry) => entry[0] === 2)) {
      alert(
        "Cannot update User.\n\nIt is a default type and cannot be modified."
      );
      return;
    }
    try {
      const response = await window.electronAPI.updateUserTypes(
        entriesToUpdate
      );
      if (response?.message) {
        setOutput(response.message);
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
          <p>NAME</p>
          <p>ACCOUNT</p>
          <p>BOOKS</p>
          <p>CATEGORIES</p>
          <p>USER TYPE</p>
        </TableHeader>
        <EntriesTable entriesLength={entriesToUpdate.length}>
          {entriesToUpdate.map((entries) => {
            console.log(entries[4]);
            return (
              <Entry
                value={entries}
                key={entries[0]}
                handleRemoveEntry={() => handleRemoveEntry(entries[0])}
              >
                <input
                  type="text"
                  onChange={(e) => handleChange(entries[0], 1, e.target.value)}
                  value={entries[1]}
                  disabled={entries[0] === 1}
                />
                <CheckBox
                  id={`${entries[0]}-account`}
                  checked={entries[2]}
                  onChange={(e) =>
                    handleChange(entries[0], 2, e.target.checked)
                  }
                  disabled={entries[0] === 1}
                />
                <CheckBox
                  id={`${entries[0]}-books`}
                  checked={entries[3]}
                  onChange={(e) =>
                    handleChange(entries[0], 3, e.target.checked)
                  }
                  disabled={entries[0] === 1}
                />
                <CheckBox
                  id={`${entries[0]}-categories`}
                  checked={entries[4]}
                  onChange={(e) =>
                    handleChange(entries[0], 4, e.target.checked)
                  }
                  disabled={entries[0] === 1}
                />
                <CheckBox
                  id={`${entries[0]}-userType`}
                  checked={entries[5]}
                  onChange={(e) =>
                    handleChange(entries[0], 5, e.target.checked)
                  }
                  disabled={entries[0] === 1}
                />
              </Entry>
            );
          })}
        </EntriesTable>
        <ControlBar useUpdateEntries={updateEntries} message={output} />
      </div>
    </div>
  );
};

export default UpdateUserTypes;
