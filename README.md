# switch-emitter

Events with recipient address.

## Install

```bash
$ npm install switch-emitter
```

## Listen and emit to addressed events

```javascript
var switchEmitter = require('switch-emitter');
var emitter = switchEmitter();

var recipientA = emitter.to('recipient-a');
var recipientB = emitter.to('recipient-b');

// recipientA and recipientB are event emitters

recipientA.on('event', function(a, b) {  
  console.log('recipient A got event', arguments);
  assert.equal(a, 'a');
  assert.equal(b, 'b');
});

// Send event to recipient-a
emitter.emit('recipient-a', 'event', 'a', 'b')
```

## Licence

MIT