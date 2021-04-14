const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getMessagesInRoom,
  addMessage,
} = require('./users');
const { chatActions } = require('./store/chat');
const { dispatch } = require('./store');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connect', (socket) => {
  console.log('new client connected');

  socket.on('join', ({ name, room }, callback) => {
    console.log('join', name, room);
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'Admin', text: `${user.name} has joined!` });

    socket.emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      messages: getMessagesInRoom(user.room),
    });

    socket.emit('welcome', { user: 'Admin', text: `${user.name}, welcome to room ${user.room}.` });

    callback();
  });

  socket.on('sendMessage', (text, callback) => {
    console.log('sendMessage', text);
    const user = getUser(socket.id);

    chatActions.ADD(dispatch, { user: user.name, room: user.room, text });
    addMessage({ user: user.name, room: user.room, text });

    io.to(user.room).emit('message', { user: user.name, text });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    const user = removeUser(socket.id);

    if (user) {
      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'Admin', text: `${user.name} has left.` });
      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(5000, () => console.log(`Server has started.`));
