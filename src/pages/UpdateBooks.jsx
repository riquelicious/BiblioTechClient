import React from "react";
import {
  Dropdown,
  TextBox,
  Checkbox,
  BottomBar,
} from "../components/Input.jsx";
import "./styles/BookManager.css";

const UpdateBookManager = () => {
  const [entries, setEntries] = React.useState([["", "", "", "", ""]]);
  const [categories, setCategories] = React.useState([
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ]);

  const handleInputChange = (groupIndex, inputIndex, value) => {
    const newEntries = [...entries];
    newEntries[groupIndex][inputIndex] = value;
    setEntries(newEntries);

    const lastGroup = newEntries[newEntries.length - 1];
    if (
      lastGroup.every((input) => input !== "") && // All textboxes in the last group are filled
      groupIndex === newEntries.length - 1
    ) {
      setEntries([...newEntries, ["", "", "", "", ""]]); // Add a new group
    }
  };

  return (
    <div className="BookManagerContainer">
      <div className="ManageBooks">
        <UpdateBookTableHeader />

        <UpdateBooksTable
          categories={categories}
          entries={entries}
          handleInputChange={handleInputChange}
        />
        <BottomBar error="" buttonName="Update" />
      </div>
    </div>
  );
};

function UpdateBookEntry(props) {
  const [showCategory, setShowCategory] = React.useState(false);
  const toggleCategory = () => {
    if (!props.categories || props.categories.length === 0) {
      return;
    }
    setShowCategory(!showCategory);
  };
  return (
    <div className="book-entry-container">
      <UpdateEntryMainForm
        value={props.value}
        onChange={(inputIndex, value) => props.onChange(inputIndex, value)}
        toggleCategory={toggleCategory}
      />
      <UpdateEntryCategoryForm
        categories={props.categories}
        showCategory={showCategory}
      />
    </div>
  );
}

function UpdateBookTableHeader() {
  return (
    <div className="table-heading">
      <div></div>
      <div className="column">
        <p>Account Number</p>
      </div>
      <div className="column">
        <p>Call Number</p>
      </div>
      <div className="column">
        <p>Title</p>
      </div>
      <div className="column">
        <p>Author</p>
      </div>
      <div className="column">
        <p>Status</p>
      </div>
    </div>
  );
}

function UpdateBookTableBottom() {
  return (
    <div className="table-heading">
      <div className="column"></div>
    </div>
  );
}

export default UpdateBookManager;

function UpdateEntryMainForm({ value, onChange, toggleCategory }) {
  return (
    <div className="ManagerContainer">
      <button className="remove-button">Remove</button>
      <div>
        <TextBox
          value={value[0]}
          onChange={(e) => onChange(0, e.target.value)}
          placeholder={"Account Number"}
        />
      </div>
      <div>
        <TextBox
          value={value[1]}
          onChange={(e) => onChange(1, e.target.value)}
          placeholder={"Call Number"}
        />
      </div>
      <div>
        <TextBox
          value={value[2]}
          onChange={(e) => onChange(2, e.target.value)}
          placeholder={"Title"}
        />
      </div>
      <div>
        <TextBox
          value={value[3]}
          onChange={(e) => onChange(3, e.target.value)}
          placeholder={"Author"}
        />
      </div>
      <div>
        <Dropdown
          value={value[4]}
          onChange={(e) => onChange(4, e.target.value)}
          placeholder={"Category"}
        />
      </div>
      <button className="show-category" onClick={toggleCategory}>
        show category
      </button>
    </div>
  );
}

function UpdateEntryCategoryForm({ categories, showCategory }) {
  return (
    <div
      className={`category-container ${showCategory ? "" : "hide-category"} `}
    >
      {categories?.map((category) => (
        <Checkbox
          key={category.id}
          value={category.name}
          name={category.name}
          label={category.name}
          id={category.id}
        />
      ))}
    </div>
  );
}

function UpdateBooksTable({ categories, entries, handleInputChange }) {
  return (
    <div className="Book-table">
      <div>
        {entries.map((group, groupIndex) => (
          <UpdateBookEntry
            key={groupIndex}
            value={group}
            onChange={(inputIndex, value) =>
              handleInputChange(groupIndex, inputIndex, value)
            }
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
}
