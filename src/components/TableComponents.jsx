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
          <th className="checkbox">
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

const BookData = ({
  checked,
  onChange,
  uniqueKey,
  accNum,
  callNum,
  title,
  author,
  status,
}) => {
  return (
    <tr className="" onClick={onChange}>
      <td className="checkbox">
        <div>
          <input
            type="checkbox"
            checked={checked}
            id={`data-checkbox-${uniqueKey}`}
            onChange={(e) => e.stopPropagation()} // Prevent event bubbling to parent
          />
          <label
            htmlFor={`data-checkbox-${uniqueKey}`}
            className="data-checkbox"
          ></label>
        </div>
      </td>
      <td>{accNum}</td>
      <td>{callNum}</td>
      <td>{title}</td>
      <td>{author}</td>
      <td>
        <BookStatus status={status} />
      </td>
    </tr>
  );
};

const BookStatus = ({ status }) => {
  if (status === "available") {
    return (
      <div className="DataStatusAvailable DataStatus">
        <div>
          <p>{status.toUpperCase()}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="DataStatusBorrowed DataStatus">
        <div>
          <p>{status.toUpperCase()}</p>
        </div>
      </div>
    );
  }
};

const SearchInput = ({
  className,
  searchTerm,
  setSearchTerm,
  handleSubmit,
}) => {
  return (
    <form className={`search-box ${className}`} onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button className="search-button">Search</button>
    </form>
  );
};

const SearchFilter = ({ setSelectedFilter, selectedFilter }) => {
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };
  return (
    <div className="search-filter">
      <p className="filter-title">Search by</p>
      <div className="button-container">
        <FilterItem
          name="search-filter"
          id="acc_num"
          value="acc_num"
          label="AccNo."
          checked={selectedFilter === "acc_num"}
          onChange={handleFilterChange}
        />
        <FilterItem
          name="search-filter"
          id="call_num"
          value="call_num"
          label="CallNo."
          checked={selectedFilter === "call_num"}
          onChange={handleFilterChange}
        />

        <FilterItem
          name="search-filter"
          id="title"
          value="title"
          label="Title"
          checked={selectedFilter === "title"}
          onChange={handleFilterChange}
        />

        <FilterItem
          name="search-filter"
          id="author"
          value="author"
          label="Author"
          checked={selectedFilter === "author"}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

const FilterItem = ({
  name = "",
  id = "",
  value = "",
  label = "Status",
  checked,
  onChange,
}) => {
  console.log(onChange);
  return (
    <div className="filter-item">
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export { Table, BookData, BookStatus, SearchInput, SearchFilter };
