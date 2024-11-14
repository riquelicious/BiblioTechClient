const { contextBridge, ipcRenderer } = require("electron");
console.log("App: preload.js");
// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
	sendMessage: (message) => ipcRenderer.send("message-from-renderer", message),
	onMessage: (callback) => ipcRenderer.on("message-from-main", callback),
	getBookCount: () => ipcRenderer.invoke("get-book-count"),
	fetchBooksForTable: (page, filter, search) => ipcRenderer.invoke("fetch-books", page, filter, search),
	closeWindow: () => ipcRenderer.send("close-window"),
	minimizeWindow: () => ipcRenderer.send("minimize-window"),
	toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
});
