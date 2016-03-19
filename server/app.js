var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");

    res.send('Hello World!');
});

app.listen(9000, function() {
    console.log('Example app listening on port 3000!');
});
