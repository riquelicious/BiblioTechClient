import React from "react";
import { Dropdown, TextBox, BottomBar } from "../../components/Input.jsx";
// import "./styles/AccountManager.css";
// import styles from "./styles/Page.module.css";
import styles from "./styles/Page.module.css";
import { Entry, TableHeader } from "../../components/UpdateDataComponents.jsx";
import { ControlBar } from "../../components/ViewDataComponents.jsx";

const InsertManageAccounts = () => {
  const [entries, setEntries] = React.useState([["", "", "", ""]]);
  const [stringResponse, setResponse] = React.useState(null);
  const [userTypes, setUserTypes] = React.useState([]);

  React.useEffect(() => {
    getUserTypes();
  }, []);

  React.useEffect(() => {
    if (entries.length === 0) {
      setEntries([["", "", "", ""]]);
    }
  }, [entries]);

  const handleRemoveEntry = (id) => {
    const newInputValues = entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  const getUserTypes = async () => {
    const response = await window.electronAPI.getUserTypes();
    console.log(response);
    if (response?.data) {
      setUserTypes(response.data);
    }
  };

  const handleInsert = async () => {
    try {
      const response = await window.electronAPI.insertAccounts(entries);
      if (response?.message) {
        setResponse(response?.message);
        setEntries([["", "", "", ""]]);
      } else {
        setEntries([["", "", "", ""]]);
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
      setEntries([...newEntries, ["", "", "", ""]]);
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
        <div className={styles.MaxHeightContainer}>
          {entries.map((entry, entry_id) => (
            <Entry
              handleRemoveEntry={() => handleRemoveEntry(entry[0])}
              key={entry_id}
            >
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => handleInputChange(entry_id, 0, e.target.value)}
                value={entry[0]}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => handleInputChange(entry_id, 2, e.target.value)}
                value={entry[2]}
              />
              <input
                type="text"
                placeholder="Password"
                onChange={(e) => handleInputChange(entry_id, 1, e.target.value)}
                value={entry[1]}
              />
              <select
                name=""
                id=""
                onChange={(e) => handleInputChange(entry_id, 3, e.target.value)}
                value={entry[3]}
              >
                <option value="">Select User Type</option>
                {/*Change options */}
                {(userTypes || []).map((userType) => {
                  return (
                    <option key={userType[0]} value={userType[0]}>
                      {userType[1]}
                    </option>
                  );
                })}
              </select>
            </Entry>
          ))}
        </div>
        <ControlBar handleInsert={handleInsert} message={stringResponse} />
      </div>
    </div>
  );
};

export default InsertManageAccounts;
