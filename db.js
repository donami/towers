var db = require('mariasql');

var connection = new db({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  db: 'towers',
});

module.exports = connection;
