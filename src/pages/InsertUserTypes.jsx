import React, { use } from "react";
import { TextBox, BottomBar, Checkbox } from "../components/Input.jsx";
import "./styles/UserTypeManager.css";

const InsertUserTypes = () => {
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
            {entries.map((group, groupIndex) => {
              return (
                <InsertAccountEntry
                  key={groupIndex}
                  index={groupIndex}
                  value={group}
                  onChange={(inputIndex, value) =>
                    handleInputChange(groupIndex, inputIndex, value)
                  }
                />
              );
            })}
          </div>
        </div>
        <BottomBar buttonName={"Insert"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

function InsertAccountEntry(props) {
  return (
    <div className="usertype-form-container">
      <button className="remove-button">Remove</button>
      <div>
        <TextBox
          value={props.value.type}
          onChange={(e) => props.onChange("type", e.target.value)}
          placeholder={"Username"}
        />
      </div>

      <div>
        <Checkbox
          label={"Account"}
          id={`${props.index}-account`}
          value={props.value.account}
          onChange={(e) => props.onChange("account", e.target.checked)}
        />
      </div>

      <div>
        <Checkbox
          label={"Books"}
          id={`${props.index}-books`}
          value={props.value.book}
          onChange={(e) => props.onChange("book", e.target.checked)}
        />
      </div>

      <div>
        <Checkbox
          label={"Categories"}
          id={`${props.index}-categories`}
          value={props.value.category}
          onChange={(e) => props.onChange("category", e.target.checked)}
        />
      </div>

      <div>
        <Checkbox
          label={"User types"}
          id={`${props.index}-usertypes`}
          value={props.value.userTypes}
          onChange={(e) => props.onChange("userTypes", e.target.checked)}
        />
      </div>
    </div>
  );
}

function InsertAccountTableHeader() {
  return (
    <div className="usertype-table-heading">
      <div></div>
      <div className="column">
        <p>NAME</p>
      </div>
      <div className="column">
        <p>ACCOUNT</p>
      </div>
      <div className="column">
        <p>BOOKS</p>
      </div>
      <div className="column">
        <p>CATEGORIES</p>
      </div>
      <div className="column">
        <p>USER TYPE</p>
      </div>
    </div>
  );
}

export default InsertUserTypes;
