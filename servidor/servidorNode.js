var http = require('http'),
    fs = require('fs'),
    server,
    webpage404 = null;

fs.readFile('../404.html', function (err, data) {
    webpage404 = data;
});

server = http.createServer  (function (req, res) {
    let file = req.url === '/' ? '../index.html' : '../' + req.url;
    fs.readFile(file, function (err, data) {
        if (!err) {
            res.write(data);
            res.end();
        }
        if (err && err !== null) {
            if (file !== 'index.htm') {
                    console.log('not found...' + err.path);
                    res.write(webpage404);
                    res.end();
            }
            console.log('erro ao carregar o arquivo');
            console.log(err);
            return;
        }
    });
});
server.listen(8000);