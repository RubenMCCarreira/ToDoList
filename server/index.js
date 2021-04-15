const express = require('express');
const cors = require('cors');
const { todoActions } = require('./store/todo');
const { themeActions } = require('./store/theme');
const { loginActions } = require('./store/login');
const { roomActions } = require('./store/room');
const { state, dispatch } = require('./store');
const http = require('http');
const socketio = require('socket.io');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getMessagesInRoom,
  addMessage,
} = require('./chat');
const { generateToken, generateId } = require('tool');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

//
//
// EXPLANATION: listen
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

//
//
// EXPLANATION: home
app.get('/api/', (req, res) => {
  res.send('API');
});

//
//
// EXPLANATION: state
app.get('/api/state', (req, res) => {
  res.json(state);
});

//
//
// EXPLANATION: get todo not removed
app.get('/api/todo/', (req, res) => {
  res.json(state.toDo.list.filter((it) => !it.removed));
});

// EXPLANATION: get  all todo
app.get('/api/todo/all', (req, res) => {
  res.json(state.toDo.list);
});

// EXPLANATION: create new todo
app.post('/api/todo/', (req, res) => {
  const id = state.toDo.list.length + 1;

  todoActions.ADD(dispatch, {
    id,
    ...req.body,
    done: false,
    removed: false,
    priority: 3,
  });

  res.send({ id });
});

// EXPLANATION: update todo
app.put('/api/todo/', (req, res) => {
  const index = state.toDo.list.findIndex((it) => it.id == req.body.id);
  let updated = false;

  if (index > -1) {
    todoActions.EDIT(dispatch, { index, item: req.body });
    updated = req.body.id;
  }

  res.send({ updated });
});

// EXPLANATION: reset todo state
app.get('/api/todo/reset', (req, res) => {
  todoActions.RESET(dispatch);

  res.send({ reseted: true });
});

// EXPLANATION: get todo not removed applying some operations
app.post('/api/todo/operations', (req, res) => {
  let list = state.toDo.list.filter((it) => !it.removed);

  const { order, filter } = req.body;

  if (filter) {
    const { prop, value } = filter;
    list = list.filter((it) => it[prop] == value);
  }

  if (order) {
    const { prop, value } = order;
    if (value === 'DSC') {
      list = list.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
    } else {
      list = list.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
    }
  }

  res.json(list);
});

//
//
// EXPLANATION: get theme
app.get('/api/theme/', (req, res) => {
  res.json(state.theme.item);
});

// EXPLANATION: update theme
app.put('/api/theme/', (req, res) => {
  themeActions.ITEM(dispatch, req.body);

  res.send({ updated: true });
});

// EXPLANATION: login
app.post('/api/login', (req, res) => {
  const token = generateToken();

  const index = state.login.list.findIndex((it) => it.username == req.body.username);
  const item = { ...req.body, token };

  if (index > -1) {
    loginActions.EDIT(dispatch, { index, item });
  } else {
    loginActions.ADD(dispatch, item);
  }

  res.send(item);
});

// EXPLANATION: get token by username
app.post('/api/login/revalidate', (req, res) => {
  const token = generateToken();

  const index = state.login.list.findIndex((it) => it.username == req.body.username);
  const item = { ...state.login.list[index], token };

  let toSend = null;

  if (index > -1) {
    loginActions.EDIT(dispatch, { index, item });
    toSend = item;
  }

  res.send(toSend);
});

//
//
// EXPLANATION: chat
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    const nextMessage = {
      id: generateId(),
      user: 'Admin',
      room: user.room,
      text: `${user.name} has joined!`,
    };

    socket.broadcast.to(user.room).emit('message', nextMessage);

    socket.emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
      messages: getMessagesInRoom(user.room),
    });

    nextMessage.id = generateId();
    nextMessage.text = `${user.name}, welcome to room ${user.room}.`;

    socket.emit('welcome', nextMessage);

    callback();
  });

  socket.on('sendMessage', (text, callback) => {
    const user = getUser(socket.id);

    const nextMessage = { id: generateId(), user: user.name, room: user.room, text };

    addMessage(nextMessage);

    io.to(user.room).emit('message', nextMessage);

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      const nextMessage = {
        id: generateId(),
        user: 'Admin',
        room: user.room,
        text: `${user.name} has left.`,
      };

      socket.broadcast.to(user.room).emit('message', nextMessage);
      // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

//
//
// EXPLANATION: rooms

// EXPLANATION: get rooms
app.get('/api/room', (req, res) => {
  res.json(state.room.list);
});

// EXPLANATION: create new room
app.post('/api/room/', (req, res) => {
  const id = state.room.list.length + 1;

  roomActions.ADD(dispatch, {
    id,
    ...req.body,
  });

  res.send({ id });
});

// EXPLANATION: update room
app.put('/api/room/', (req, res) => {
  const index = state.room.list.findIndex((it) => it.id == req.body.id);
  let updated = false;

  if (index > -1) {
    roomActions.EDIT(dispatch, { index, item: req.body });
    updated = req.body.id;
  }

  res.send({ updated });
});
