const { contextBridge, ipcRenderer } = require("electron");
console.log("App: preload.js");
contextBridge.exposeInMainWorld("electronAPI", {
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
  sendBook: (book) => ipcRenderer.send("send-books", book),

  getUserTypes: () => {
    return ipcRenderer.invoke("get-user-types");
  },

  fetchAccounts: (page, filter, search) => {
    return ipcRenderer.invoke("fetch-accounts", page, filter, search);
  },

  getAccounts: (account_ids) => {
    return ipcRenderer.invoke("get-accounts", account_ids);
  },

  updateAccounts: (account_ids) => {
    return ipcRenderer.invoke("update-accounts", account_ids);
  },

  insertAccounts: (accounts) => {
    return ipcRenderer.invoke("insert-accounts", accounts);
  },

  deleteAccounts: (account_ids) => {
    return ipcRenderer.invoke("delete-accounts", account_ids);
  },

  fetchUserTypes: (page, filter, search) => {
    return ipcRenderer.invoke("fetch-user-types", page, filter, search);
  },
});
