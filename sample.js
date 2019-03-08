var app = require('express')();
var server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
var io = require('socket.io')(server);

// localhost:3000으로 서버에 접속하면 클라이언트로 index.html을 전송한다
server.listen(3000, () => {
  console.log('connect 3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// NameSpace 1번
const namespace1 = io.of('/namespace1');

// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
namespace1.on('connection', (socket) => {
  namespace1.emit('news', { hello: "Someone connected at namespace1" });
});

// NameSpace 2번
const namespace2 = io.of('/namespace2');
// connection을 받으면, news 이벤트에 hello 객체를 담아 보낸다
namespace2.on('connection', (socket) => {
  namespace2.emit('news', { hello: "Someone connected at Namespace2" });
});
