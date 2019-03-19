var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('<html><head> </head><body><h1>Hello World!!!</h1></body></html>');
});
app.get('/api', function (req, res) {
    res.json({'firstName': "Vijaya", 'lastName': "Yeruva"});
});
app.listen(port);
console.log('Server running at http://localhost:3000');
