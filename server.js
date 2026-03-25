let lstGames = [
    {_id:1, name:"Marvel Rivals", developer:"NetEase Games"},
    {_id:2, name:"Dead Island", developer:"Deep Silver"},
    {_id:3, name:"EA Sports FC 26", developer:"EA (Vancouver & Romania)"}
];

let hostname = "localhost";
let port = 3001;

const express = require('express');
const morgan = require('morgan');

const app = express(); //creates server
app.use(morgan('dev')); //logging

app.use(express.static('public'));

app.get("/games", function(req,res){
    res.status(200);
    res.send(lstGames);
    res.end();
});

app.get("/game/:game_id", function(req,res){
    let game_id = parseInt(req.params.game_id);
    let game = lstGames.find(g => g._id === game_id);
    
    if (game) {
        res.status(200).json(game);
    } else {
        res.status(404).json({ error: "Game not found" });
    }
});
//app.post();

const server = app.listen(port, hostname, function(){
    console.log(`Server running on ${hostname}:${port}`);
});



/*const http = require('http');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname);

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

const server = http.createServer(function(req, res){
    const pathname = new URL(req.url, 'http://localhost').pathname;
    const relPath = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filePath = path.resolve(path.join(rootDir, relPath));

    if (!filePath.startsWith(rootDir + path.sep) && filePath !== rootDir) {
        res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('<h1>403 Forbidden</h1>');
        return;
    }

    console.log('requesting resource:' + filePath);
    fs.readFile(filePath, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<h1>404 Page Not Found.</h1>');
        }else{
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            const isText = contentType.includes('charset=utf-8');
            res.writeHead(200, {'Content-Type': contentType});
            res.end(isText ? data.toString('utf8') : data);
        }
    });
})
server.listen(4000);
console.log('Server running on 4000');*/
