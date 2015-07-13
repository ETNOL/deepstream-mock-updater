var Log = require('./log');
Log.setLevel('debug');

var DeepstreamPoller = function (quoteData, server) { 
  this.quoteData = quoteData; 
  this.ds = server;
};

DeepstreamPoller.prototype.register = function (symbol) {

  this.record = this.ds.record.getRecord(symbol);

  this.record.whenReady(function () {
      this.record.set(this.quoteData); 
      this.startRandomSetter();
      Log.debug(this.quoteData);
  }.bind(this), true);
}

DeepstreamPoller.prototype.startRandomSetter = function () {
  setInterval(function () {
    this.Randomize();
    this.record.set(this.quoteData); 
    Log.debug(this.quoteData);
  }.bind(this), 3000);
}

DeepstreamPoller.prototype.Randomize = function () {
  var changeThisInterval = Math.floor(Math.random() * 10) > 5;

  if (changeThisInterval) {
    var min = 0.9;
    var max = 1.1;
    var random = Math.random();      // random     == 0.52796 (for example)
    var range = max - min;           // range      == 0.2
    var adjustment = range * random; // adjustment == 0.105592
    var result = min + adjustment;   // result     == 1.005592
    var newLastPrice = this.quoteData.LastPrice *= result;	
    var difference = newLastPrice - this.quoteData.Open;
    var differencePercentage = difference / this.quoteData.Open;

    this.quoteData.LastPrice = newLastPrice;
    this.quoteData.Change = difference;
    this.quoteData.ChangePercent = differencePercentage;
  }
}

module.exports = DeepstreamPoller;
