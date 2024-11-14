
import { get_request, post_request } from "./Requests";
const { ipcMain } = require("electron");
export function send_books(books) {
	return post_request("insert_books", { books: books })
}

export function get_book_count() {
	return get_request("get_book_count")
}

export function fetch_books(pageNumber = 0, filter = "acc_num", search = "") {
	return get_request(`/select_books?page=${pageNumber}&filter=${filter}&search=${encodeURIComponent(search)}`)
}

ipcMain.handle("fetch-books", async (event, pageNumber, filter, search) => {
	return fetch_books(pageNumber, filter, search);
})

ipcMain.handle("get-book-count", async (event) => {
	return get_book_count();
});
