//TODO: remove server and put on renderers

const server = "http://localhost:5000"; //edit if needed


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

export function get_request(address = "") {
	return fetch(`${server}/${address}`, {
		// Pass pageNumber in the query string
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.catch((error) => {
			console.error("There was a problem with the fetch operation:", error);
			return [];
		});
}


export function post_request(address = "", body = {}) {
	fetch(`${server}/${address}`, {
		method: "POST",
		// body: JSON.stringify({ books: books }),
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("There was a problem with the fetch operation:", error);
		})
}
