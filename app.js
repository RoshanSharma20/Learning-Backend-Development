const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.send('Hello World');
});

//to send an html file as response we use res.sendFile(relativePath,directoryName)
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

//for all the non-valid requests
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
    // res.render('views/404.html');
});