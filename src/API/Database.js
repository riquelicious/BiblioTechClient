// import { get_request, post_request } from "./Requests";
const { ipcMain } = require("electron");
const { useRequest } = require("./Requests");
const { URLPaths } = require("../config");

//========================================
// SECTION: Accounts
//========================================
ipcMain.handle("accounts-fetch", async (event, page, filter, search) => {
  let response = await useRequest(URLPaths.ACCOUNTS_FETCH, "POST", {
    page,
    filter,
    search,
  });
  return response;
});

ipcMain.handle("accounts-get", async (event, account) => {
  return await useRequest(URLPaths.ACCOUNTS_GET, "POST", account);
});

ipcMain.handle("accounts-update", async (event, account) => {
  return await useRequest(URLPaths.ACCOUNTS_UPDATE, "POST", { account });
});

ipcMain.handle("accounts-insert", async (event, account) => {
  return await useRequest(URLPaths.ACCOUNTS_INSERT, "POST", { account });
});

ipcMain.handle("accounts-delete", async (event, account) => {
  return await useRequest(URLPaths.ACCOUNTS_DELETE, "POST", { account });
});

ipcMain.handle("usertype-get-get", async (event) => {
  return await useRequest(URLPaths.USERTYPE_GET_GET, "GET");
});

//========================================
// SECTION: User Types
//========================================

ipcMain.handle("usertype-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.USERTYPE_FETCH, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("usertype-get", async (event, account) => {
  return await useRequest(URLPaths.USERTYPE_GET, "POST", account);
});

ipcMain.handle("usertype-update", async (event, account) => {
  return await useRequest(URLPaths.USERTYPE_UPDATE, "POST", { account });
});

ipcMain.handle("usertype-insert", async (event, account) => {
  return await useRequest(URLPaths.USERTYPE_INSERT, "POST", { account });
});

ipcMain.handle("usertype-delete", async (event, account) => {
  return await useRequest(URLPaths.USERTYPE_DELETE, "POST", account);
});

//========================================
// SECTION: Books
//========================================

ipcMain.handle("books-fetch", async (event, pageNumber, filter, search) => {
  return await useRequest(URLPaths.BOOKS_FETCH, "POST", {
    page: pageNumber,
    filter,
    search,
  });
});

ipcMain.handle("books-get", async (event, book) => {
  return await useRequest(URLPaths.BOOKS_GET, "POST", book);
});

ipcMain.handle("books-update", async (event, book) => {
  return await useRequest(URLPaths.BOOKS_UPDATE, "POST", { book });
});

ipcMain.handle("books-insert", async (event, book) => {
  return await useRequest(URLPaths.BOOKS_INSERT, "POST", { book });
});

ipcMain.handle("books-delete", async (event, book) => {
  return await useRequest(URLPaths.BOOKS_DELETE, "POST", book);
});

//========================================
// SECTION: Categories
//========================================
ipcMain.handle("categories-get-get", async (event) => {
  return await useRequest(URLPaths.CATEGORIES_GET_GET, "GET");
});

ipcMain.handle("categories-get", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_GET, "POST", category);
});

ipcMain.handle("categories-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.CATEGORIES_FETCH, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("categories-insert", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_INSERT, "POST", { category });
});

ipcMain.handle("categories-update", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_UPDATE, "POST", { category });
});

ipcMain.handle("categories-delete", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_DELETE, "POST", category);
});

ipcMain.handle("categories-join-get", async (event, category_id) => {
  return await useRequest(URLPaths.CATEGORIES_JOIN_GET, "POST", category_id);
});

ipcMain.handle("categories-join", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_JOIN, "POST", category);
});

ipcMain.handle("categories-unjoin", async (event, category) => {
  return await useRequest(URLPaths.CATEGORIES_UNJOIN, "POST", category);
});

//========================================
// SECTION: Records
//========================================

ipcMain.handle("copies-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.RECORDS_COPIES, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("borrows-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.RECORDS_BORROW, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("user-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.RECORDS_USER, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("assigned-fetch", async (event, page, filter, search) => {
  return await useRequest(URLPaths.RECORDS_ASSIGNED, "POST", {
    page,
    filter,
    search,
  });
});

ipcMain.handle("accounts-login", async (event, account) => {
  return await useRequest(URLPaths.ACCOUNTS_LOGIN, "POST", account);
});

ipcMain.handle("request-accept", async (event, book_id, username, days) => {
  return await useRequest(URLPaths.REQUEST_ACCEPT, "POST", {
    book_id,
    username,
    days,
  });
});
