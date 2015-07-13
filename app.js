var express = require('express');

var http = require('http');

var app = express();


var port = '3000';
app.set('port', port);


require('./routes/register')(app);


var server = http.createServer(app);

server.listen(port);
// server.on('error', console.log("error!"));

server.on('listening', onListening);
module.exports = app;


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
