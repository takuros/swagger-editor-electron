'use strict'; 

var app = require('app'); 
var BrowserWindow = require('browser-window'); 
var nws = require('node-web-server'); 
require('crash-reporter').start(); 

var mainWindow = null; 

app.on('window-all-closed', function() { 
　　nws.stop(); 
　　if (process.platform != 'darwin') 
　　　　app.quit(); 
});

app.on('ready', function() { 
　　nws.run({ 
　　　　host: "localhost", 
　　　　port: 8080, 
　　　　docRoot: "dist", 
　　}, __dirname); 

　　var screen = require('screen'); 
　　var size = screen.getPrimaryDisplay().size; 

　　mainWindow = new BrowserWindow({ 
　　　　width : size.width, 
　　　　height : size.height, 
　　　　resizable : true, 
　　　　"web-preferences": { 
　　　　　　"web-security": false 
　　　　} 
　　}); 

　　mainWindow.loadURL('http://localhost:8080/'); 
　　mainWindow.on('closed', function() { 
　　　　mainWindow = null; 
　　}); 
}); 
