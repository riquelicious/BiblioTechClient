import React, { useState, useEffect } from "react";
import "./Table.css";
import { TableHeader, TableData } from "./TableRows.jsx";
import { useTable } from "../hooks/useTable.jsx";

export default function Table() {
  const {
    books,
    selectedBooks,
    handleCheckAll,
    handleCheckboxChange,
    nextPage,
    prevPage,
  } = useTable();

  return (
    <div className="TableContainer">
      <TableHeader
        checked={selectedBooks.length === books.length} // All selected check
        onChange={handleCheckAll}
      />
      <div className="TableDataContainer">
        {books.map((book) => (
          <TableData
            checked={selectedBooks.includes(book.unique_key)}
            onChange={() => handleCheckboxChange(book.unique_key)}
            key={book.unique_key}
            unique_key={book.unique_key}
            acc_num={book.access_number}
            author={book.author}
            title={book.title}
            call_num={book.call_number}
            status={book.status}
          />
        ))}
      </div>
      <TableControls nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
}

export function TableControls({ prevPage, nextPage }) {
  return (
    <div className="TableControls">
      <button onClick={prevPage} className="TableControlsButton">
        Previous
      </button>
      <div></div>
      <button onClick={nextPage} className="TableControlsButton">
        Next
      </button>
    </div>
  );
}
