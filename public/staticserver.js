const http = require('http');
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
console.log('Server running on 4000');
