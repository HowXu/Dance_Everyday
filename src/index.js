//const {app,BrowserWindow} = require('electron');
let onLoad =  require('./func/onLoad');
//let DataBaseLoad = require("./func/DataBaseLoad.js");

try{
    require('electron-reloader')(module)
}catch(_){

}


onLoad.initializeWindow();
onLoad.remote_process();
//DataBaseLoad.loadNames();
//alert(11)