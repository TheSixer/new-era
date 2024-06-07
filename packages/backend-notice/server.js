const http = require('http');
const sockjs = require('sockjs');

const echo = sockjs.createServer({});
echo.on('connection', (conn) => {
  conn.on('data', (message) => {
    conn.write(message);
  });
  conn.on('close', () => { });

  function sendMess() {
    setTimeout(() => {
      conn.write(JSON.stringify({ type: 1, title: '您有一单新的自提订单' }));
      sendMess()
    }, 5000)
  }

  sendMess()
});

const server = http.createServer();
echo.installHandlers(server, { prefix: '/echo' });
server.listen(9999, '0.0.0.0');
