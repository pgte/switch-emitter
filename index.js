var EventEmitter = require('events').EventEmitter;

function emit(recipients) {
  var self = this;
  if (!Array.isArray(recipients)) {
    recipients = [recipients];
  }
  var args = Array.prototype.slice.call(arguments, 1);
  
  function distributeTo(recipients) {
    recipients.forEach(function emitToOne(recipient) {
      if (Array.isArray(recipient)) return distributeTo(recipient);
      if (recipient) self._previousEmit.call(self, recipient, args);
    });      
  };

  distributeTo(recipients);
}

function to(recipient) {
  var self = this;
  var recipientEE = new EventEmitter();

  function onMessage(args) {
    recipientEE.emit.apply(recipientEE, args);
  }
  
  this.on(recipient, onMessage);

  // End function
  recipientEE.end = function() {
    self.removeListener(recipient, onMessage);
  };

  return recipientEE;
}

module.exports = function() {
  var ee = new EventEmitter();

  ee._previousEmit = ee.emit;
  ee.emit = emit;
  ee.to = to;

  return ee;
};