const path = require("path");
const {app,BrowserWindow,ipcMain, webContents} = require('electron');
//const {DataBaseLoad} = require("./onLoad.js")
//const path = require("path");
let mainWindow;
//let loadNamesfinish = false;
//let loadTimefinish = false;


function initializeWindow(){
    
    app.on('ready',() =>{
        mainWindow = new BrowserWindow({
            resizable : false,
            maximizable : false,
            width : 800,
            height : 600,
            frame : false,
            webPreferences : {
                backgroundThrottling : false,
                nodeIntegration : true,
                contextIsolation : false
            },
            icon : "public/icon/icon.ico"
        });
        
        mainWindow.loadFile("./index.html");  
        mainWindow.removeMenu();
        
        mainWindow.on("close", () =>{
        mainWindow = null;
        })
        //document.body.setBackground = "/asserts/background/background" + (Math.random() * 4).toString + ".webp";
        //mainWindow.webContents.openDevTools();
        mainWindow.webContents.send("can-get-path",0);
        //console.log(dir);
        //mainWindow.webContents.send("path",dir);
        //console.log(dir);
        //alert(11)
        
    });

    //loadNames();
}


function remote_process(){
    ipcMain.on('onClose',() => {
        mainWindow.close();
    });
    ipcMain.on('onMiniliaze',() => {
        mainWindow.minimize();
    });
    ipcMain.on('name',() => {
        mainWindow.loadFile('./index.html');
    });
    ipcMain.on('login',() => {
        mainWindow.loadFile('./login/login.html');
    });
    ipcMain.on('about',() => {
        mainWindow.loadFile('./about/about.html');
    });
    ipcMain.on('onMiniliaze',() => {
        mainWindow.minimize();
    });
    //alert(11)
    ipcMain.on("getPath",() => {
        let dir = path.dirname(app.getPath("exe"));
        //console.log("AAA");
        mainWindow.webContents.on("did-finish-load",() => {
            mainWindow.webContents.send("path",dir);
            
        })
    });

    ipcMain.on("ready-to-loadFiles",() => {
        mainWindow.webContents.send("loadFiles",0);
    });

    /*
    ipcMain.on("loadFiles-finish",() => {
        mainWindow.webContents.send("ready-to-process",0);
    });*/

    

    ipcMain.on("loadFiles-finish",() => {
            mainWindow.webContents.send("ready-to-process",0);
        //mainWindow.webContents.send("ready-to-processNames",0);
    });

    /**
     * 
     * ipcMain.on("loadTime-finish",() => {
        mainWindow.webContents.send("ready-to-processTImes",0);
    });
     */
}



exports.initializeWindow = initializeWindow;
exports.remote_process = remote_process;