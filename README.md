# swagger-editor-electron
Swagger Editor Application by Electron

## How to make Swagger Editor Application

Install Electron modules.
```
$ npm install -g install electron-prebuilt
$ npm install -g asar
$ npm install -g electron-packager
```

Download Swagger Editor and Httpd Server.
```
$ git clone https://github.com/swagger-api/swagger-editor.git
$ cd swagger-editor
$ npm start
$ npm install node-web-server
```

Electron Application settings.
package.json
```
"description": "Swagger Editor source",
"license": "Apache-2.0",
"main":"main.js", //Add this line.
"authors": [
　　"Mohsen Azimi <me@azimi.me>"
],
```

Create main.js

main.js
```
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
```

Download jquery.min.js
```
$ cd dist/scripts/
$ curl -o jquery.min.js http://code.jquery.com/jquery-2.1.4.min.js
```

Edit dist/index.html
Add this line before scripts.
```
<script src="scripts/jquery.min.js"></script>
```

Run Electron
```
$ electron .
```

Package
```
electron-packager ./swagger-editor-electron/ swagger-editor --platform=darwin --arch=x64 --version=0.36.1
```
