import React, { useEffect } from "react";
import "./styles/Books.css";
// import { useTable } from "../hooks/useTable.jsx";
import {
  useFetchBooks,
  useSelectAllItems,
  usePagination,
} from "../hooks/useTable.jsx";
import {
  Table,
  BookData,
  SearchInput,
  SearchFilter,
} from "../components/TableComponents.jsx";

function BooksPage() {
  const [page,maxPages, nextPage, prevPage] = usePagination();
  const [
    books,
    fetchBooks,
    searchFilter,
    setSelectedFilter,
    searchTerm,
    setSearchTerm,
    handleSubmit,
  ] = useFetchBooks(page);
  const [selectedBooks, handleCheckAll, handleCheckboxChange] =
    useSelectAllItems(books);

  useEffect(() => {
    fetchBooks(page, searchFilter, searchTerm);
  }, [page]);

  return (
    <div className="BooksPage">
      <SearchContainer
        setSelectedFilter={setSelectedFilter}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onSubmit={handleSubmit}
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

const SearchContainer = (props) => {
  return (
    <div className="search-container">
      <SearchInput
        className="search-bar"
        onChange={props.onChange}
        onSubmit={props.onSubmit}
        value={props.value}
      />
      <SearchFilter
        setSelectedFilter={props.setSelectedFilter}
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
