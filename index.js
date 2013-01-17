var EventEmitter = require('events').EventEmitter;

function send(recipients) {
  var self = this;
  if (!Array.isArray(recipients)) {
    recipients = [recipients];
  }
  var args = Array.prototype.slice.call(arguments, 1);
  
  function distributeTo(recipients) {
    recipients.forEach(function emitToOne(recipient) {
      if (Array.isArray(recipient)) return distributeTo(recipient);
      if (recipient) self.emit.call(self, recipient, args);
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

module.exports = function(ee) {
  if (! ee) ee = new EventEmitter();

  ee.send = send;
  ee.to = to;

  return ee;
};