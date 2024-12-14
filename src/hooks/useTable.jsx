import { useState, useEffect } from "react";

function usePagination() {
  const [page, setPage] = useState(0);
  const [maxPages, setMaxPages] = useState(0);
  const fetchMaxPages = async () => {
    const response = await window.electronAPI.getBookCount();
    setMaxPages(response);
  };
  useEffect(() => {
    fetchMaxPages();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [maxPages]);

  const nextPage = () => {
    if (page < maxPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return [page, maxPages, nextPage, prevPage];
}

function useFetchBooks(page) {
  const [books, setBooks] = useState([]);
  const [searchFilter, setSelectedFilter] = useState("acc_num");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchBooks(page, searchFilter, searchTerm);
    }
  };
  const fetchBooks = async (pageNumber, filter, search) => {
    const response = await window.electronAPI.fetchBooks(
      pageNumber,
      filter,
      search
    );
    if (response?.data) {
      setBooks(response.data?.books);
    } else {
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks(page, searchFilter, searchTerm);
  }, [page, searchFilter, searchTerm]);

  return [
    books,
    fetchBooks,
    searchFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    handleSubmit,
  ];
}

function useSelectAllItems(books) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleCheckAll = () => {
    console.log(selectedBooks);
    if (selectedBooks == null) return;
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]); // Deselect all if all were selected
    } else {
      setSelectedBooks(books.map((book) => book[0])); // Select all if none were selected
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
  return [selectedBooks, handleCheckAll, handleCheckboxChange];
}

export { useFetchBooks, useSelectAllItems, usePagination };
