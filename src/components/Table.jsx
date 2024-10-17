import React, { useState } from "react";
import './Table.css'
import { fetch_values } from "./Database.jsx";

fetch_values();

export default function Table() {
	const [books, setBooks] = useState([]);
	const [page, setPage] = useState(1);

	// Fetches books from the database (simulated here)
	const fetchBooks = async (pageNumber) => {
		// Simulate a database fetch (replace with actual API/database call)
		const fetchedBooks = [
			{ acc_num: "#######", call_num: "#######", title: "Book 1", author: "Author 1", status: "Available" },
			{ acc_num: "#######", call_num: "#######", title: "Book 2", author: "Author 2", status: "Borrowed" }
		];

		// Manually update the state with new data
		setBooks(fetchedBooks);
	};

	// Trigger fetchBooks only when you want to update data (manual)
	const loadNextPage = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		fetchBooks(nextPage); // Manually fetch new page data
	};
	return (
		<div className="TableContainer">
			<table className="BooksTable">
			<tbody>
			<tr id="table-header">
				<th>Access Number</th>
				<th>Call Number</th>
				<th>Title</th>
				<th>Author</th>
				<th>Status</th>
			</tr>
			{books.map((book, index) => (
						<TableData key={index} {...book} />
					))}
			</tbody>
		</table>
		<button onClick={loadNextPage}>Load Next Page</button>
		</div>
	);
}

function TableData({acc_num, call_num, title, author, status, key}) {
	return (
	<tr key={key}>
	<td>{acc_num}</td>
	<td>{call_num}</td>
	<td>{title}</td>
	<td>{author}</td>
	<td>{status}</td>
	</tr>
	);
}
