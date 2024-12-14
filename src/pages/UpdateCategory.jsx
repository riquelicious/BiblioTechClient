import React from "react";
import {
  Dropdown,
  TextBox,
  BottomBar,
  Checkbox,
} from "../components/Input.jsx";
import "./styles/CategoryManager.css";
import { div } from "framer-motion/client";

const UpdateCategory = () => {
  const [entries, setEntries] = React.useState([""]);
  const handleInputChange = (groupIndex, value) => {
    const newEntries = [...entries];
    newEntries[groupIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (
      typeof lastGroup === "string" &&
      lastGroup.trim() !== "" &&
      groupIndex === newEntries.length - 1
    ) {
      setEntries([...newEntries, [""]]);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted");
    console.log(entries);
  };

  return (
    <div className="ManageAccountContainer">
      <div className="ManageAccount">
        <UpdateAccountTableHeader />
        <div className="account-table">
          <div>
            {entries.map((group, groupIndex) => (
              <UpdateAccountEntry
                key={groupIndex}
                value={group}
                onChange={(value) => handleInputChange(groupIndex, value)}
              />
            ))}
          </div>
        </div>
        <BottomBar buttonName={"Update"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

function UpdateAccountEntry(props) {
  return (
    <div className="category-form-container">
      <button className="remove-button">Remove</button>
      <div>
        <TextBox
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={"Catergory Name"}
        />
      </div>
    </div>
  );
}

function UpdateAccountTableHeader() {
  return (
    <div className="category-table-heading">
      <div></div>
      <div className="column">
        <p>CATEGORY</p>
      </div>
    </div>
  );
}

export default UpdateCategory;
