console.log('MenuControls.js imported')

const { app, BrowserWindow, ipcMain } = require('electron');

ipcMain.on('close-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.close();
});

ipcMain.on('minimize-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.minimize();
});

ipcMain.on('toggle-maximize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win.isMaximized()) {
    console.log("Restoring Window")
    win.restore();
  } else {
    console.log("Maximizing Window")
    win.maximize();
  }
});