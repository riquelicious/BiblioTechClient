const { contextBridge, ipcRenderer } = require("electron");
// console.log("App: preload.js");
contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
  sendBook: (book) => ipcRenderer.send("send-books", book),

  //========================================
  // SECTION: Accounts
  //========================================

  login: (account) => {
    return ipcRenderer.invoke("accounts-login", account);
  },

  getUserTypes: () => {
    return ipcRenderer.invoke("usertype-get-get");
  },

  fetchAccounts: (page, filter, search) => {
    return ipcRenderer.invoke("accounts-fetch", page, filter, search);
  },

  getAccounts: (account_ids) => {
    return ipcRenderer.invoke("accounts-get", account_ids);
  },

  updateAccounts: (account_ids) => {
    return ipcRenderer.invoke("accounts-update", account_ids);
  },

  insertAccounts: (accounts) => {
    return ipcRenderer.invoke("accounts-insert", accounts);
  },

  deleteAccounts: (account_ids) => {
    return ipcRenderer.invoke("accounts-delete", account_ids);
  },

  //========================================
  // SECTION: User Types
  //========================================

  fetchUserTypes: (page, filter, search) => {
    return ipcRenderer.invoke("usertype-fetch", page, filter, search);
  },

  getUserTypesById: (usertype_id) => {
    return ipcRenderer.invoke("usertype-get", usertype_id);
  },

  updateUserTypes: (usertype_id) => {
    return ipcRenderer.invoke("usertype-update", usertype_id);
  },

  insertUserTypes: (usertypes) => {
    return ipcRenderer.invoke("usertype-insert", usertypes);
  },

  deleteUserTypes: (usertype_id) => {
    return ipcRenderer.invoke("usertype-delete", usertype_id);
  },

  //========================================
  // SECTION: Books
  //========================================

  fetchBooks: (page, filter, search) => {
    return ipcRenderer.invoke("books-fetch", page, filter, search);
  },

  getBooks: (books_id) => {
    return ipcRenderer.invoke("books-get", books_id);
  },

  updateBooks: (books_id) => {
    return ipcRenderer.invoke("books-update", books_id);
  },

  insertBooks: (books) => {
    return ipcRenderer.invoke("books-insert", books);
  },

  deleteBooks: (books_id) => {
    return ipcRenderer.invoke("books-delete", books_id);
  },

  //========================================
  // SECTION: Categories
  //========================================

  getCategories: () => {
    return ipcRenderer.invoke("categories-get-get");
  },

  getCategoriesById: (categories_id) => {
    return ipcRenderer.invoke("categories-get", categories_id);
  },

  fetchCategories: (page, filter, search) => {
    return ipcRenderer.invoke("categories-fetch", page, filter, search);
  },

  updateCategories: (categories_id) => {
    return ipcRenderer.invoke("categories-update", categories_id);
  },

  insertCategories: (categories) => {
    return ipcRenderer.invoke("categories-insert", categories);
  },

  deleteCategories: (categories_id) => {
    return ipcRenderer.invoke("categories-delete", categories_id);
  },

  getJoinedCategories: (categories_id) => {
    return ipcRenderer.invoke("categories-join-get", categories_id);
  },

  joinCategories: (categories_id) => {
    return ipcRenderer.invoke("categories-join", categories_id);
  },

  unjoinCategories: (categories_id) => {
    return ipcRenderer.invoke("categories-unjoin", categories_id);
  },

  //========================================
  // SECTION: Records
  //========================================

  fetchCopiesRecords: (page, filter, search) => {
    return ipcRenderer.invoke("copies-fetch", page, filter, search);
  },

  fetchBorrowRecords: (page, filter, search) => {
    return ipcRenderer.invoke("borrows-fetch", page, filter, search);
  },

  fetchUserRecords: (page, filter, search) => {
    return ipcRenderer.invoke("user-fetch", page, filter, search);
  },

  fetchAssignedRecords: (page, filter, search) => {
    return ipcRenderer.invoke("assigned-fetch", page, filter, search);
  },
});
