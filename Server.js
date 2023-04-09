const http = require('http');
const fs = require('fs');

//creating the server instance
const server = http.createServer((req, res) => {
    console.log("request made from browser to server");
    // console.log(req);
    res.setHeader('Content-Type', 'text/html');
    let path = './views';
    switch (req.url) {
        case '/':
            path += '/index.html'
            break;
        case '/about':
            path += '/about.html'
            break;
        default:
            path += '/404.html'
            break;
    };
    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err);
        }
        else {
            res.write(fileData);
            res.end();
        }
    })
});

//to listen for incoming requests
server.listen(5000, 'localhost', () => {
    console.log("listening to port 5000");
})