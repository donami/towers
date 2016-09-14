var express  = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var apiRoutes = require('./routes/api');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/style", express.static(__dirname + '/public/css'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(3000);
console.log("Server running on port 3000");
