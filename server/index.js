const express = require('express');
const cors = require('cors');
const { todoActions } = require('./store/todo');
const { themeActions } = require('./store/theme');
const { loginActions } = require('./store/login');
const { state, dispatch } = require('./store');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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

//
//
// EXPLANATION: login
var rand = function () {
  return Math.random().toString(36).substr(2);
};

var generateToken = function () {
  return rand() + rand() + rand() + rand();
};

// EXPLANATION: new login
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
// EXPLANATION: listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
