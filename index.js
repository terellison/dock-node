'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
    if(process.platform === "darwin") { app.quit();}
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {nodeIntegration: true}
    });
    mainWindow.loadURL(`file://${app.getAppPath()}/web/index.html`);
    mainWindow.on('close', () => { mainWindow = null;});
})