import React, { useState, useEffect } from "react";
// import { fetch_books } from "../API/Database.jsx";

export function useTable() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const fetchBooks = async (pageNumber) => {
    window.electronAPI.fetchBooksForTable(pageNumber).then((response) => {
      if (response.books.length > 0) setBooks(response.books);
      else setPage((newPage) => newPage - 1);
    });
  };
  const handleCheckAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]); // Deselect all if all were selected
    } else {
      setSelectedBooks(books.map((book) => book.unique_key)); // Select all
    }
  };

  const handleCheckboxChange = (unique_key) => {
    setSelectedBooks(
      (prev) =>
        prev.includes(unique_key)
          ? prev.filter((key) => key !== unique_key) // Deselect if already selected
          : [...prev, unique_key] // Select if not already selected
    );
  };
  useEffect(() => {
    fetchBooks(page); // Fetch books on mount
  }, [page]); // Empty dependency array ensures it runs once

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  return {
    books,
    page,
    selectedBooks,
    handleCheckAll,
    handleCheckboxChange,
    nextPage,
    prevPage,
  };
}


