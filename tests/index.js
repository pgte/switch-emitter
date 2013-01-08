var test = require('tap').test;
var switchEmitter = require('..');

test('addressed recipient gets event', function(t) {
  t.plan(3);
  var se = switchEmitter();
  var recipient = se.to('recipient-a');
  
  recipient.on('event', function(a, b, c) {
    t.equal(a, 'a');
    t.equal(b, 'b');
    t.equal(c, undefined);
  });
  
  se.emit('recipient-a', 'event', 'a', 'b');
});

test('non-addressed recipient doesnt get event', function(t) {
  t.plan(1);
  var se = switchEmitter();
  var recipient = se.to('recipient-a');
  recipient.on('event', function() {
    t.ok(false, 'should not reach here');
  });
  se.emit('recipient-b', 'event', 'a', 'b');
  t.ok(true, 'done');
});

test('accepts array as recipients', function(t) {  
  t.plan(2);
  var se = switchEmitter();
  
  var recipientA = se.to('recipient-a');
  recipientA.on('event', function() {
    t.ok(true, 'reached recipient a');
  });

  var recipientB = se.to('recipient-b');
  recipientB.on('event', function() {
    t.ok(true, 'reached recipient b');
  });

  se.emit(['recipient-a', 'recipient-b', 'recipient-c'], 'event', 'a', 'b');

});

test('accepts array inside arrays as recipients', function(t) {  
  t.plan(2);
  var se = switchEmitter();
  
  var recipientA = se.to('recipient-a');
  recipientA.on('event', function() {
    t.ok(true, 'reached recipient a');
  });

  var recipientB = se.to('recipient-b');
  recipientB.on('event', function() {
    t.ok(true, 'reached recipient b');
  });

  se.emit(['recipient-a', ['recipient-b', 'recipient-z'], 'recipient-c'], 'event', 'a', 'b');

});

test('accepts undefined recipients', function(t) {  
  t.plan(2);
  var se = switchEmitter();
  
  var recipientA = se.to('recipient-a');
  recipientA.on('event', function() {
    t.ok(true, 'reached recipient a');
  });

  var recipientB = se.to('recipient-b');
  recipientB.on('event', function() {
    t.ok(true, 'reached recipient b');
  });

  se.emit(['recipient-a', ['recipient-b', 'recipient-z', undefined], 'recipient-c'], 'event', 'a', 'b');

});

test('a recipient ends so it doesnt emit more events', function(t) {
  t.plan(1);

  var se = switchEmitter();
  var recipient = se.to('recipientA');
  recipient.on('event', function() {
    t.ok(true, 'got event');
  });
  se.emit('recipientA', 'event');
  recipient.end();
  se.emit('recipientA', 'event');
});
