import React from "react";
import { Dropdown, TextBox, BottomBar } from "../components/Input.jsx";
import "./styles/AccountManager.css";
import { useLocation } from "react-router-dom";

const UpdateManageAccounts = () => {
  const location = useLocation();
  const { account_ids } = location.state || { account_ids: [] };
  const [entriesToUpdate, setEntriesToUpdate] = React.useState([]);
  const [output, setOutput] = React.useState("");
  const [userTypes, setUserTypes] = React.useState([]);

  const handleRemoveEntry = (id) => {
    const newInputValues = entriesToUpdate.filter((entry) => entry[0] !== id);
    setEntriesToUpdate(newInputValues);
  };

  const getUserTypes = async () => {
    const response = await window.electronAPI.getUserTypes();
    if (response?.data) {
      console.log(response.data.data);
      setUserTypes(response.data.data);
    }
  };

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
      if (response?.data?.data) {
        setEntriesToUpdate(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  React.useEffect(() => {
    getUserTypes();
    fetchEntries();
  }, [account_ids]);

  const updateEntries = async () => {
    try {
      console.log(entriesToUpdate);
      const response = await window.electronAPI.updateAccounts(entriesToUpdate);
      console.log(response?.data?.message);
      if (response?.data) {
        setOutput(response.data?.message);
      } else {
        setEntriesToUpdate([]);
      }
    } catch (error) {
      setOutput("Error fetching entries:", error);
      setEntriesToUpdate([]);
    }
  };

  return (
    <div className="ManageAccountContainer">
      <div className="ManageAccount">
        <UpdateAccountTableHeader />
        <div className="account-table">
          <div>
            {entriesToUpdate.map((entries, index) => {
              console.log(entries);
              return (
                <UpdateAccountEntry
                  options={userTypes}
                  handleRemoveEntry={handleRemoveEntry}
                  value={entries}
                  key={index}
                  handleChange={handleChange}
                  onChange={(inputIndex, value) => {
                    const newEntries = [...entriesToUpdate];
                    newEntries[inputIndex] = value;
                    setEntriesToUpdate(newEntries);
                  }}
                />
              );
            })}
          </div>
        </div>
        <BottomBar
          error={output}
          buttonName={"Update"}
          onClick={updateEntries}
        />
      </div>
    </div>
  );
};

function UpdateAccountEntry(props) {
  const [accountId, setAccountId] = React.useState(props.value[0]);
  return (
    <div className="account-form-container">
      <button
        onClick={() => props.handleRemoveEntry(accountId)}
        className="remove-button"
      >
        Remove
      </button>
      <div>
        <TextBox
          value={props.value[1]}
          onChange={(e) => props.handleChange(accountId, 1, e.target.value)}
          placeholder={"Username"}
        />
      </div>
      <div>
        <TextBox
          value={props.value[2]}
          onChange={(e) => props.handleChange(accountId, 2, e.target.value)}
          placeholder={"Password"}
        />
      </div>
      <div>
        <TextBox
          value={props.value[3]}
          onChange={(e) => props.handleChange(accountId, 3, e.target.value)}
          placeholder={"Email"}
        />
      </div>
      <div>
        <Dropdown
          options={props.options}
          value={props.value[4]}
          onChange={(e) => props.handleChange(accountId, 4, e.target.value)}
          placeholder={"User Type"}
        />
      </div>
    </div>
  );
}

function UpdateAccountTableHeader() {
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

export default UpdateManageAccounts;
