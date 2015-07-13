var deepstream = require('deepstream.io-client-js'),
    DeepstreamPoller = require('../Utils/poller'),
    http = require('http'),
    request = require('request'),
    ds = deepstream('localhost:6021').login(),
    registeredSymbols = [];

module.exports = function (router) {
  router.all("/register/:symbol", function (req, res) {

    var symbol = req.params.symbol;
    var url = "http://dev.markitondemand.com/Api/v2/Quote/json?symbol=" + symbol; 

    request(url, function(error, response, body) {
      if ( noResponseError() && symbolNotRegistered() ) {
        var body = JSON.parse(body); 
        res.send(body);
        var poller = new DeepstreamPoller(body, ds);
        poller.register(symbol);
        registeredSymbols.push(symbol); 
        console.log(registeredSymbols);
      } else if (!symbolNotRegistered()) {
        res.sendStatus(200); 
      } 
       else {
        res.send(error);
      }

      function noResponseError () {
        return !error && response.statusCode == 200;  
      }

      function symbolNotRegistered () {
        return registeredSymbols.indexOf(symbol) == -1;
      }
    });   
  });
};



