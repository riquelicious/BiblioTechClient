import React from "react";
import { Dropdown, TextBox, BottomBar } from "../../components/Input.jsx";
import "./styles/AccountManager.css";
import styles from "./styles/Page.module.css";
import { div, style } from "framer-motion/client";
import { Entry, TableHeader } from "../../components/UpdateDataComponents.jsx";
import {
  ControlBar,
  EntriesTable,
} from "../../components/ViewDataComponents.jsx";

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
                onChange={(e) => handleInputChange(entry_id, 1, e.target.value)}
                value={entry[1]}
              />
              <input
                type="text"
                placeholder="Password"
                onChange={(e) => handleInputChange(entry_id, 2, e.target.value)}
                value={entry[2]}
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

function oldInsert(
  entries,
  userTypes,
  handleRemoveEntry,
  handleInputChange,
  stringResponse,
  insertEntries
) {
  return (
    <div className="ManageAccountContainer">
      <div className="ManageAccount">
        <InsertAccountTableHeader />
        <div className="account-table">
          <div>
            {entries.map((group, groupIndex) => (
              <InsertAccountEntry
                options={userTypes}
                handleRemoveEntry={handleRemoveEntry}
                key={groupIndex}
                value={group}
                onChange={(inputIndex, value) =>
                  handleInputChange(groupIndex, inputIndex, value)
                }
              />
            ))}
          </div>
        </div>
        <BottomBar
          error={stringResponse}
          onClick={insertEntries}
          buttonName={"Insert"}
        />
      </div>
    </div>
  );
}

function InsertAccountEntry(props) {
  return (
    <div className="account-form-container">
      <button
        onClick={() => props.handleRemoveEntry(props.value[0])}
        className="remove-button"
      >
        Remove
      </button>
      <div>
        <TextBox
          value={props.value[0]}
          onChange={(e) => props.onChange(0, e.target.value)}
          placeholder={"Username"}
        />
      </div>
      <div>
        <TextBox
          value={props.value[1]}
          onChange={(e) => props.onChange(1, e.target.value)}
          placeholder={"Password"}
        />
      </div>
      <div>
        <TextBox
          value={props.value[2]}
          onChange={(e) => props.onChange(2, e.target.value)}
          placeholder={"Email"}
        />
      </div>
      <div>
        <Dropdown
          options={props.options || []}
          value={props.value[3]}
          onChange={(e) => props.onChange(3, e.target.value)}
          placeholder={"User Type"}
        />
      </div>
    </div>
  );
}

function InsertAccountTableHeader() {
  return (
    <div className="account-table-heading">
      <div></div>
      <div className="column">
        <p>USERNAME</p>
      </div>
      <div className="column">
        <p>PASSWORD</p>
      </div>
      <div className="column">
        <p>EMAIL</p>
      </div>
      <div className="column">
        <p>USER TYPE</p>
      </div>
    </div>
  );
}

export default InsertManageAccounts;
