import React, { useState } from "react";
import "./Table.css";
import { fetch_books } from "./Database.jsx";

export default function Table() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  const fetchBooks = async (pageNumber) => {
    try {
      const response = await fetch_books();
      if (response.books) {
        const booksArray = response.books.map(
          ({ access_number, call_number, title, author, status }) => ({
            access_number,
            call_number,
            title,
            author,
            status,
          })
        );
        setBooks(booksArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBooks(nextPage); // Manually fetch new page data
  };

  //   return (
  //     <div className="TableContainer">
  //       <table className="BooksTable">
  //         <tbody>
  //           <TableHeader />
  //           {books.map((book, index) => (
  //             <TableData
  //               key={book.access_number}
  //               acc_num={book.access_number}
  //               author={book.author}
  //               title={book.title}
  //               call_num={book.call_number}
  //               status={book.status}
  //             />
  //           ))}
  //         </tbody>
  //       </table>
  //       <button onClick={loadNextPage}>Load Next Page</button>
  //     </div>
  //   );

  return (
    <div className="TableContainer">
      <TableHeader />
      {books.map((book, index) => (
        <TableData
          key={book.access_number}
          acc_num={book.access_number}
          author={book.author}
          title={book.title}
          call_num={book.call_number}
          status={book.status}
        />
      ))}
      <button onClick={loadNextPage}>Load Next Page</button>
    </div>
  );
}

export function TableHeader() {
  return (
    <div className="TableRow TableHeader">
      <div>
        <input type="checkbox" name="" id="header-checkbox" />
        <label htmlFor="header-checkbox"></label>
      </div>
      <p>Access Number</p>
      <p>Call Number</p>
      <p>Title</p>
      <p>Author</p>
      <p>Status</p>
    </div>
    // <tr id="table-header">
    //   <th className="checkbox-container">
    //     <div>
    //       <input type="checkbox" />
    //     </div>
    //   </th>
    //   <th>
    //     <p>Access Number</p>
    //   </th>
    //   <th>
    //     <p>Call Number</p>
    //   </th>
    //   <th>
    //     <p>Title</p>
    //   </th>
    //   <th>
    //     <p>Author</p>
    //   </th>
    //   <th>
    //     <p>Status</p>
    //   </th>
    // </tr>
  );
}

function TableData({ acc_num, call_num, title, author, status }) {
  return (
    // <tr>
    //   <td className="checkbox-container">
    //     <div>
    //       <input type="checkbox" />
    //     </div>
    //   </td>
    //   <td>
    //     <p>{acc_num}</p>
    //   </td>
    //   <td>
    //     <p>{call_num}</p>
    //   </td>
    //   <td>
    //     <p>{title}</p>
    //   </td>
    //   <td>
    //     <p>{author}</p>
    //   </td>
    //   <td>
    //     <p>{status}</p>
    //   </td>
    // </tr>
    <div className="TableRow TableData">
      <div>
        <input type="checkbox" name="" id={`data-checkbox-${acc_num}`} />
        <label htmlFor={`data-checkbox-${acc_num}`}></label>
      </div>
      <p>{acc_num}</p>
      <p>{call_num}</p>
      <p>{title}</p>
      <p>{author}</p>
      <p>{status.toUpperCase()}</p>
    </div>
  );
}
