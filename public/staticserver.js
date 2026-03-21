const http = require('http');
const fs = require('fs');

http.createServer(function(req, res){
    let path = './public'+res.url;
    console.log("requesting resource:" + path);
    fs.readFile(path, function(err, data){
        if(err){
            console.log(err);
            res.writeHead(404,{'Content-Type':'text/html'});
        }else{
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data.toString());
        }
        res.end();
    });
}).listen(4000);

console.log('Server running in 4000');