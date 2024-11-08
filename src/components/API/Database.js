
import { get_request, post_request } from "./Requests";
const { ipcMain } = require("electron");
// export function send_books(books) {
// 	fetch(`${server}/insert_books`, {
// 		method: "POST",
// 		body: JSON.stringify({ books: books }),
// 		headers: { "Content-Type": "application/json" },
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error("Network response was not ok");
// 			}
// 			return response.json();
// 		})
// 		.then((data) => {
// 			console.log(data);
// 		})
// 		.catch((error) => {
// 			console.error("There was a problem with the fetch operation:", error);
// 		})
// 		.catch((error) => {
// 			console.error("There was a problem with the fetch operation:", error);
// 		});
// }


// export function fetch_books(pageNumber = 0) {
// 	return fetch(`${server}/select_books?page=${pageNumber}`, {
// 		// Pass pageNumber in the query string
// 		method: "GET",
// 		headers: { "Content-Type": "application/json" },
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error("Network response was not ok");
// 			}
// 			return response.json();
// 		})
// 		.catch((error) => {
// 			console.error("There was a problem with the fetch operation:", error);
// 			return [];
// 		});
// }

// ipcMain.handle("fetch-books", async (event, pageNumber) => {
// 	console.log(typeof pageNumber);

// 	return fetch_books(pageNumber);
// });

export function send_books(books) {
	return post_request("insert_books", { books: books })
}


//? Getting Regular Contents
export function fetch_books(pageNumber = 0) {
	return get_request(`select_books?page=${pageNumber}`)
}

ipcMain.handle("fetch-books", async (event, pageNumber) => {
	return fetch_books(pageNumber)
})
