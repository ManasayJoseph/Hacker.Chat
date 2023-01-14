const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Login.html');
});
app.get('/CmdFont.ttf', (req, res) => {
    res.sendFile(__dirname + '/CmdFont.ttf');
});
app.get('/Chat.com', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('connection','wild user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});