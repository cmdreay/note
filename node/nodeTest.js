const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
const server = new MyEmitter();
const callback = (stream) => {
  console.log('someone connected!');
};
myEmitter.on('connect', (stream) => {
  console.log('someone connected111');
});
myEmitter.on('connect', (stream) => {
  console.log('someone connected!',stream);
});
myEmitter.on('some',callback);

// myEmitter.on('some', (stream) => {
//   console.log('some22',stream);
// });
const newListeners = myEmitter.rawListeners('connect');

newListeners[0]();
myEmitter.emit('connect', 1,2);
myEmitter.removeListener('some',callback);
myEmitter.emit('some', 1,2);

server.on('connection', callback);
// ...
server.removeListener('connection', callback);
server.emit('connection',1)