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