//handle setupevents as quickly as possible
const setupEvents = require("./setups/setupWinEvents");
if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require("electron");
var crypto = require("crypto");
// Module to create native browser window.
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

const os = require("os");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: "#243782",
    maximizable: true,
    // width: 1024,
    // height: 650,
    // minWidth: 1024,
    // minHeight: 650,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    },
    useContentSize: true,
    frame: false
  });

  // and load the index.html of the app.
  let startUrl = (process.env.NODE_ENV != "development" ? url.format({
    pathname: path.join(__dirname, "/build/index.html"),
    protocol: "file:",
    slashes: true
  }) : 'http://localhost:3000/');



  mainWindow.loadURL(startUrl);
  if (process.env.NODE_ENV === "development")
    mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


}

function createChild(port) {
  var child = require('child_process');
  var executablePath = path.join(__dirname, "/bin/json_rpc");
  let password = crypto.randomBytes(20).toString('hex');
  var parameters = ["-port=" + port, '-password=' + password];

  try {
    child.execFile(executablePath, parameters, function (cerr, childProcess) { });
  } catch (error) {
    console.log(error);
  }

}


let win;

function initAll() {
  createWindow();
 // createChild(2905);
}


app.on("ready", initAll, () => {
  win = new BrowserWindow();
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  //if (process.platform !== 'darwin') {
  app.quit();
  //}
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    initAll()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
