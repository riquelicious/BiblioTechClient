import React from "react";
import styles from "./styles/UpdateData.module.css";
import { TableHeader, Entry } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";
import { EntriesTable } from "../../components/ViewDataComponents.jsx";
import { useLocation } from "react-router-dom";

const UpdateAccounts = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [entriesToUpdate, setEntriesToUpdate] = React.useState([]);
  const [output, setOutput] = React.useState(" ");
  const [userTypes, setUserTypes] = React.useState([]);

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
      const response = await window.electronAPI.getAccounts(account_ids);
      if (response?.data) {
        console.log(response.data);
        setEntriesToUpdate(response.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };
  const getUserTypes = async () => {
    const response = await window.electronAPI.getUserTypes();
    console.log(response?.data);
    if (response?.data) {
      setUserTypes(response.data);
    }
  };

  React.useEffect(() => {
    getUserTypes();
    fetchEntries();
    console.log(userTypes);
  }, []);
  // send the update request
  const updateEntries = async () => {
    if (entriesToUpdate.length === 0) {
      alert("Please select at least one entry to update.");
      return;
    }
    try {
      const response = await window.electronAPI.updateAccounts(entriesToUpdate);
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
          <p>USERNAME</p>
          <p>EMAIL</p>
          <p>PASSWORD</p>
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
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    handleChange(entries[0], 4, e.target.value);
                  }}
                  value={entries[4]}
                >
                  {(userTypes || []).map((userType) => {
                    return (
                      <option key={userType[0]} value={userType[0]}>
                        {userType[1]}
                      </option>
                    );
                  })}
                </select>
              </Entry>
            );
          })}
        </EntriesTable>
        <ControlBar
          // error={output}
          useUpdateEntries={updateEntries}
          message={output}
        />
      </div>
    </div>
  );
};

export default UpdateAccounts;
