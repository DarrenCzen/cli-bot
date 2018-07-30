// 'use strict';

const {app, BrowserWindow, webFrame} = require('electron')

// require('electron-reload')(__dirname);

  function createWindow () {
    // Create the browser window.
    
    var isWin = process.platform === "win32";
    if(!isWin){
      var win = new BrowserWindow({width: 1290, height: 780, frame: false, resizable: true}) 
      webFrame.setZoomFactor(2)
    } else {
      var win = new BrowserWindow({width: 1290, height: 780, frame: false, resizable: true})  
     
    }
    // and load the index.html of the app.
    win.loadFile('index.html')
    win.setMenu(null);
    //win.webContents.openDevTools()
    
  
  }

  app.on('ready', createWindow)


  