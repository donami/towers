var express  = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json

app.listen(3000);
console.log("Server running on port 3000");
