import React, { useState } from "react";
import "./styles/TableComponents.css";
const Table = ({
  children,
  books,
  selectedBooks,
  handleCheckAll,
  className,
}) => {
  return (
    <table className="main-table">
      <thead>
        <tr>
          <th className="checkbox-column">
            <div>
              <input
                type="checkbox"
                id="header-checkbox"
                onChange={handleCheckAll}
                checked={selectedBooks.length === books.length}
              />
              <label htmlFor="header-checkbox"></label>
            </div>
          </th>
          <th>Access Number</th>
          <th>Call Number</th>
          <th>Title</th>
          <th>Author</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const BookData = (props) => {
  return (
    <tr className="" onClick={props.onClick}>
      <td className="checkbox-column">
        <div>
          <input
            type="checkbox"
            checked={props.checked}
            id={`data-checkbox-${props.uniqueKey}`}
            onChange={(e) => e.stopPropagation()} // Prevent event bubbling to parent
          />
          <label
            htmlFor={`data-checkbox-${props.uniqueKey}`}
            className="data-checkbox"
          ></label>
        </div>
      </td>
      <td>{props.accNum}</td>
      <td>{props.callNum}</td>
      <td>{props.title}</td>
      <td>{props.author}</td>
      <td>
        <BookStatus status={props.status} />
      </td>
    </tr>
  );
};

const BookStatus = ({ status }) => {
  console.log(status);
  if (status === "available") {
    return (
      <div className="DataStatusAvailable DataStatus">
        <div>
          <p>{status || ""}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="DataStatusBorrowed DataStatus">
        <div>
          <p>{status || ""}</p>
        </div>
      </div>
    );
  }
};

const SearchInput = (props) => {
  return (
    <form className={`search-box ${props.className}`} onSubmit={props.onSubmit}>
      <input
        className="search-input"
        type="search"
        placeholder="Search..."
        value={props.value}
        onChange={props.onChange}
      />
      <button className="search-button">Search</button>
    </form>
  );
};

const SearchFilter = (props) => {
  const handleFilterChange = (e) => {
    props.setSelectedFilter(e.target.value);
  };

  return (
    <div className="search-filter">
      <p className="filter-title">Search by</p>
      <div className="button-container">
        <FilterItem
          value="acc_num"
          label="AccNo."
          checked={props.selectedFilter === "acc_num"}
          onChange={handleFilterChange}
        />
        <FilterItem
          value="call_num"
          label="CallNo."
          checked={props.selectedFilter === "call_num"}
          onChange={handleFilterChange}
        />

        <FilterItem
          value="title"
          label="Title"
          checked={props.selectedFilter === "title"}
          onChange={handleFilterChange}
        />

        <FilterItem
          value="author"
          label="Author"
          checked={props.selectedFilter === "author"}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

const FilterItem = (props) => {
  return (
    <div className="filter-item">
      <input
        type="radio"
        name="filter"
        id={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export { Table, BookData, BookStatus, SearchInput, SearchFilter };
