var EventEmitter = require('events').EventEmitter;

function emit(recipient) {
  var args = Array.prototype.slice.call(arguments, 1);
  this._previousEmit.call(this, recipient, args);
}

function to(recipient) {
  var recipientEE = new EventEmitter();
  
  this.on(recipient, function(args) {
    recipientEE.emit.apply(recipientEE, args);
  });

  return recipientEE;
}

module.exports = function() {
  var ee = new EventEmitter();

  ee._previousEmit = ee.emit;
  ee.emit = emit;
  ee.to = to;

  return ee;
};