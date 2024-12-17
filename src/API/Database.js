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

ipcMain.handle("add-book", async (event, book) => {
  console.log(book);
});

ipcMain.handle("fetch-accounts", async (event, page, filter, search) => {
  let response = await useRequest(URLPaths.FETCH_ACCOUNTS, "POST", {
    page,
    filter,
    search,
  });
  return response;
});

ipcMain.handle("get-accounts", async (event, account) => {
  return await useRequest(URLPaths.GET_ACCOUNTS, "POST", account);
});

ipcMain.handle("update-accounts", async (event, account) => {
  return await useRequest(URLPaths.UPDATE_ACCOUNTS, "POST", { account });
});

ipcMain.handle("insert-accounts", async (event, account) => {
  return await useRequest(URLPaths.SIGNUP, "POST", { account });
});

ipcMain.handle("delete-accounts", async (event, account) => {
  return await useRequest(URLPaths.DELETE_ACCOUNTS, "POST", { account });
});

ipcMain.handle("get-user-types", async (event) => {
  return await useRequest(URLPaths.GET_USER_TYPES, "GET");
});

ipcMain.handle("fetch-user-types", async (event, page, filter, search) => {
  return await useRequest(URLPaths.FETCH_USER_TYPES, "POST", {
    page,
    filter,
    search,
  });
});
