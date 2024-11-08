// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// preload.js
const { contextBridge, ipcRenderer } = require("electron");
console.log("App: preload.js");
// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
	sendMessage: (message) => ipcRenderer.send("message-from-renderer", message),
	onMessage: (callback) => ipcRenderer.on("message-from-main", callback),
	// testRequest: () => ipcRenderer.invoke("test"),
	// requestBooks: () =>
	// 	ipcRenderer.send("requesting-books-from-renderer"),
	// receiveBooks: (callback) =>
	// 	ipcRenderer.on("sending-books-from-main", callback),
	fetchBooksForTable: (page) => ipcRenderer.invoke("fetch-books", page),
	closeWindow: () => ipcRenderer.send("close-window"),
	minimizeWindow: () => ipcRenderer.send("minimize-window"),
	toggleMaximize: () => ipcRenderer.send("toggle-maximize"),
});
