const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
import "./hooks/MenuControls.js";
import "./API/Database.js";
import "./API/webhooks.js";
import { URLPaths } from "./config";
import { io } from "socket.io-client";
// Create a new WebSocket instance
const randomNum = Math.floor(Math.random() * 100000) + 1;
const socket = io(URLPaths.API_URL, {
  query: { client_id: `librarian${randomNum}` },
});

// Listen for connection open
socket.on("connect", () => {
  console.log("Connected to server");

  socket.send("Hello Flask Server");
});

let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
app.commandLine.appendSwitch("disable-autofill-keyboard-accessory");
app.commandLine.appendSwitch("disable-component-update");
const createWindow = () => {
  const nonce = Math.random().toString(36).substring(2, 15);
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 680,
    width: 1000,
    height: 680,
    icon: path.join(__dirname, "../../src/assets/Icon.ico"),
    //frame: false,
    titleBarStyle: "hidden",
    hasShadow: true,
    center: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false, // It's recommended to disable this for security
      contextIsolation: true, // Use this for security reasons
      zoomFactor: 1,
    },
  });
  console.log(path.join(__dirname, "../../src/assets/Icon.ico"));
  // mainWindow.webContents.on('did-navigate', (event, url) => {
  // 	console.log('Navigated to:', url);
  // });
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self';",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
            "style-src-elem 'self' 'unsafe-inline';", // Allows dynamic style elements
            `connect-src 'self' ${URLPaths.API_URL};`, // Allow connections to the API URL
            `img-src 'self' data: ${URLPaths.API_URL};`, // Correctly format img-src
          ].join(" "),
        },
      });
    }
  );
  mainWindow.loadURL(`${MAIN_WINDOW_WEBPACK_ENTRY}?nonce=${nonce}`);

  //mainWindow.webContents.openDevTools();
};

socket.on("request_borrow", (data) => {
  console.log("request_borrow", data);
  mainWindow.webContents.send("request_borrow", data);
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
