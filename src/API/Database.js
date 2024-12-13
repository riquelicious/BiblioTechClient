// import { get_request, post_request } from "./Requests";
const { ipcMain } = require("electron");
const { useRequest } = require("./Requests");
const { URLPaths } = require("../config");

ipcMain.handle("get-book-count", async (event) => {
  return await useRequest(URLPaths.GET_BOOK_COUNT, "GET");
});

ipcMain.handle("fetch-books", async (event, pageNumber, filter, search) => {
  return await useRequest(URLPaths.FETCH_BOOKS, "POST", {
    page: pageNumber,
    filter,
    search,
  });
});
