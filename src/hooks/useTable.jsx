import { useState, useEffect } from "react";

/**
 * Returns an array containing the maximum number of pages in the
 * database, as well as a function to retrieve the latest count.
 *
 * @returns {[number, function]} An array containing the maximum number
 * of pages, and a function to retrieve the latest count.
 */
function GetMaxPages() {
  const [maxPages, setMaxPages] = useState(0);
  const getBookCount = async () => {
    window.electronAPI.getBookCount().then((response) => {
      setMaxPages(response);
    });
  };
  return [maxPages, getBookCount];
}

/**
 * FetchBooks
 * @param {number} page The page number to fetch books for
 * @returns {[Array, (pageNumber: number, filter: string, search: string) => void, string, (filter: string) => void, string, (searchTerm: string) => void, (e: React.FormEvent<HTMLFormElement>) => void]} An array containing:
 *   - books: The array of currently fetched books.
 *   - fetchBooks: A function to fetch books for a given page, filter, and search term.
 *   - searchFilter: The currently selected filter.
 *   - setSelectedFilter: A function to set the selected filter.
 *   - searchTerm: The currently entered search term.
 *   - setSearchTerm: A function to set the search term.
 *   - handleSubmit: A function to handle form submission.
 * @description This hook provides state and functions to fetch books for a given page, filter by a specific field, and search by a term. It also provides functions to set the selected filter, search term, and handle form submission.
 */
function FetchBooks(page) {
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
    window.electronAPI
      .fetchBooksForTable(pageNumber, filter, search)
      .then((response) => {
        if (response && response.books && response.books.length > 0) {
          console.log(response.books);
          setBooks(response.books);
        } else {
          setBooks([]);
        }
      });
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

/**
 * SelectAllItems
 *
 * This hook manages the selection state of a list of books. It provides functionality
 * to select or deselect all items and to toggle the selection of individual items.
 *
 * @param {Array} books - An array of book objects, each containing a unique_key property.
 * @returns {[Array, () => void, (string) => void]} An array containing:
 *   - selectedBooks: The array of currently selected book unique_keys.
 *   - handleCheckAll: A function to toggle the selection of all books.
 *   - handleCheckboxChange: A function to toggle the selection of a specific book by its unique_key.
 */
function SelectAllItems(books) {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleCheckAll = () => {
    if (selectedBooks == null) return;
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]); // Deselect all if all were selected
    } else {
      setSelectedBooks(books.map((book) => book.unique_key)); // Select all if none were selected
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

/**
 * Pagination
 * @param {number} maxPages The maximum number of pages to cycle through
 * @returns {[number, () => void, () => void]} An array containing the current page number, a function to go to the next page, and a function to go to the previous page
 * @description This hook returns state and functions to cycle through a set of pages, resetting the page to 0 if the maximum number of pages changes.
 */
function Pagination(maxPages) {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    if (page < maxPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  useEffect(() => {
    setPage(0);
  }, [maxPages]);

  return [page, nextPage, prevPage];
}

export { GetMaxPages, FetchBooks, SelectAllItems, Pagination };
