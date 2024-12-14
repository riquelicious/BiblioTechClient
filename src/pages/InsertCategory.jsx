import React from "react";
import {
  Dropdown,
  TextBox,
  BottomBar,
  Checkbox,
} from "../components/Input.jsx";
import "./styles/CategoryManager.css";
import { div } from "framer-motion/client";

const InsertCategory = () => {
  const [entries, setEntries] = React.useState([
    {
      type: "",
      account: false,
      book: false,
      category: false,
      userTypes: false,
    },
  ]);
  const handleInputChange = (groupIndex, inputIndex, value) => {
    const newEntries = [...entries];
    newEntries[groupIndex][inputIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (
      typeof lastGroup.type === "string" &&
      lastGroup.type.trim() !== "" &&
      groupIndex === newEntries.length - 1
    ) {
      setEntries([
        ...newEntries,
        [
          {
            type: "",
            account: false,
            book: false,
            category: false,
            userTypes: false,
          },
        ],
      ]);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted");
    console.log(entries);
  };

  return (
    <div className="ManageAccountContainer">
      <div className="ManageAccount">
        <InsertAccountTableHeader />
        <div className="account-table">
          <div>
            {entries.map((group, groupIndex) => (
              <InsertAccountEntry
                key={groupIndex}
                value={group}
                onChange={(inputIndex, value) =>
                  handleInputChange(groupIndex, inputIndex, value)
                }
              />
            ))}
          </div>
        </div>
        <BottomBar buttonName={"Insert"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

function InsertAccountEntry(props) {
  return (
    <div className="category-form-container">
      <button className="remove-button">Remove</button>
      <div>
        <TextBox
          value={props.value.type}
          onChange={(e) => props.onChange("type", e.target.value)}
          placeholder={"Catergory Name"}
        />
      </div>
    </div>
  );
}

function InsertAccountTableHeader() {
  return (
    <div className="category-table-heading">
      <div></div>
      <div className="column">
        <p>CATEGORY</p>
      </div>
    </div>
  );
}

export default InsertCategory;
