import React, { useEffect } from "react";
import "./styles/Books.css";
// import { useTable } from "../hooks/useTable.jsx";
import {
  GetMaxPages,
  FetchBooks,
  SelectAllItems,
  Pagination,
  HandleSearch,
} from "../hooks/useTable.jsx";
import {
  Table,
  BookData,
  SearchInput,
  SearchFilter,
} from "../components/TableComponents.jsx";

function BooksPage() {
  const [maxPages, getBookCount] = GetMaxPages();
  const [page, nextPage, prevPage] = Pagination(maxPages);
  const [
    books,
    fetchBooks,
    searchFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    handleSubmit,
  ] = FetchBooks(page);
  const [selectedBooks, handleCheckAll, handleCheckboxChange] =
    SelectAllItems(books);

  useEffect(() => {
    fetchBooks(page, searchFilter, searchTerm);
    console.log("fetchBooks called with page:", page, searchFilter, searchTerm);
    getBookCount();
  }, [page]);

  return (
    <div className="BooksPage">
      <SearchContainer
        searchFilter={searchFilter}
        setSelectedFilter={setSelectedFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />
      <div>
        <Table
          books={books}
          selectedBooks={selectedBooks}
          handleCheckAll={handleCheckAll}
        >
          {books.map((book) => (
            <BookData
              checked={selectedBooks.includes(book.unique_key)}
              onChange={() => handleCheckboxChange(book.unique_key)}
              key={book.unique_key}
              uniqueKey={book.unique_key}
              accNum={book.access_number}
              callNum={book.call_number}
              title={book.title}
              author={book.author}
              status={book.status}
            />
          ))}
        </Table>
      </div>
      {/* </div> */}
      <TableControls
        nextPage={nextPage}
        prevPage={prevPage}
        page={page}
        maxPages={maxPages}
      />
    </div>
  );
}

const SearchContainer = ({
  searchFilter,
  setSelectedFilter,
  searchTerm,
  setSearchTerm,
  handleSubmit,
}) => {
  return (
    <div className="search-container">
      <SearchInput
        className="search-bar"
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
        searchTerm={searchTerm}
      />
      <SearchFilter
        setSelectedFilter={setSelectedFilter}
        searchFilter={searchFilter}
      />
    </div>
  );
};

const TableControls = ({ nextPage, prevPage, page, maxPages }) => {
  return (
    <div className="controls">
      <button onClick={prevPage}> PREV </button>
      <div>
        {
          // todo: add pagination
        }
      </div>
      <button onClick={nextPage}> NEXT </button>
    </div>
  );
};

export default BooksPage;
