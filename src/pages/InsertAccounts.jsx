import React from "react";
import { Dropdown, TextBox, BottomBar } from "../components/Input.jsx";
import "./styles/AccountManager.css";
import { data, div } from "framer-motion/client";

const InsertManageAccounts = () => {
  const [entries, setEntries] = React.useState([["", "", "", ""]]);
  const [stringResponse, setResponse] = React.useState(null);
  const [userTypes, setUserTypes] = React.useState([]);

  React.useEffect(() => {
    getUserTypes();
  }, []);

  const handleRemoveEntry = (id) => {
    const newInputValues = entries.filter((entry) => entry[0] !== id);
    setEntries(newInputValues);
  };

  const getUserTypes = async () => {
    const response = await window.electronAPI.getUserTypes();
    if (response?.data) {
      console.log(response.data.data);
      setUserTypes(response.data.data);
    }
  };

  const insertEntries = async () => {
    try {
      const response = await window.electronAPI.insertAccounts(entries);
      if (response?.data?.message) {
        setResponse(response?.data?.message);
        setEntries([""]);
      } else {
        setEntries([""]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (groupIndex, inputIndex, value) => {
    const newEntries = [...entries];
    newEntries[groupIndex][inputIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (
      lastGroup.every((input) => input !== "") &&
      groupIndex === newEntries.length - 1
    ) {
      setEntries([...newEntries, ["", "", "", ""]]);
    }
  };

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
};

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
          options={props.options}
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
