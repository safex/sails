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

//for rpc
const fp = require("find-free-port");
const child = require('child_process');
const executablePath = path.join(__dirname, "/bin/json_rpc");
const password = crypto.randomBytes(20).toString('hex');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let childWindow;
let json_prc_process = null;
let react_process;
let parameters;

let json_prc_process_clossed = false;

const startUrl = (process.env.NODE_ENV != "development" ? url.format({
  pathname: path.join(__dirname, "/build/index.html"),
  protocol: "file:",
  slashes: true
}) : 'http://localhost:3000/');

const errorUrl = null;


const conf = {
  maximizable: true,
  minimizable: true,
  movable: true,
  fullScreenable: true,
  width: 1024,
  height: 650,
  maxWidth: 1024,
  maxHeight: 650,
  webPreferences: {
    webSecurity: false,
    nodeIntegration: true,
    defaultFontFamily: "serif"
  },
  // useContentSize: true,
  frame: false,
  show: false,
  title: "Sails"
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(conf);

  fp(10000, 11000, 'localhost')
    .then(([port]) => {
      //override port until done testing
      port = 2905;
      /// !!!!!
      parameters = ["-port=" + port, '-password=' + password];

      try {
        let command = executablePath + " -port=" + port + " -password=" + password;
        json_prc_process = child.spawn(executablePath, parameters);
        //json_prc_process.unref();

        if (json_prc_process) {
          json_prc_process.on('closed', (code) => {
            console.log("CLOSED JSON_RPC");
            console.log("CODE", code);
            json_prc_process_clossed = true;
          });

          json_prc_process.on('exit', (code) => {
            console.log("EXITED JSON_RPC");
            console.log("CODE", code);
            json_prc_process_clossed = true;
          });
          if (process.env.NODE_ENV != "development") {
            mainWindow.loadURL(startUrl);
          }
          else {
            react_process = child.exec("BROWSER=none npm start");
            (function (mainWindow, startUrl) {
              setTimeout(() => { mainWindow.loadURL(startUrl); }, 5000);
            })(mainWindow, startUrl);
          }

          electron.ipcMain.once('react-is-ready-to-receive-port', (event, arg) => {
            event.reply('receive-port', port);
          });

        }
      } catch (error) {
        childWindow = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
        childWindow.loadURL(errorUrl);
        childWindow.once('ready-to-show', () => {
          childWindow.show();
        });
      }

    })
    .catch((err) => {
      console.error(err);
      childWindow = new BrowserWindow({ parent: mainWindow, modal: true, show: false })
      childWindow.loadURL(errorUrl);
      childWindow.once('ready-to-show', () => {
        childWindow.show();
      });
    });

  //add dev console
  if (process.env.NODE_ENV === "development")
    mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    if (json_prc_process) json_prc_process.kill();
    if (react_process) react_process.kill();
    mainWindow = null;
    childWindow - null;
    parameters = null;

  });

  //show when loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
}


electron.ipcMain.on('app-close', () => {
  app.quit();
});
electron.ipcMain.on('app-minimize', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) { mainWindow.restore(); }
    else { mainWindow.minimize(); }
  }

});
electron.ipcMain.on('app-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) { mainWindow.unmaximize(); }
    else { mainWindow.maximize(); }
  }
});

electron.ipcMain.on('rpc-crashed', (event) => {

  if (json_prc_process_clossed) {
    console.log("ELECTRON RECEIVED RPC CRASHED");
    if (json_prc_process) json_prc_process.kill();
    try {
      let command = executablePath + " -port=" + port + " -password=" + password;
      json_prc_process = child.spawn(executablePath, parameters);
      // json_prc_process.unref();
      if (json_prc_process) {
        console.log("JOSN_PROCESS");
        console.log(json_prc_process);
        json_prc_process_clossed = false;
        event.reply('rpc-restored');
      }
      else {
        event.reply('rpc-not-restored');
      }
    } catch (error) {
      event.reply('rpc-not-restored');
    }
  }
  else {
    event.reply('rpc-not-closed');
  }

});

app.on("ready", createWindow, () => {
  mainWindow = new BrowserWindow();
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
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
