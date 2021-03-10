const express = require('express');
const cors = require('cors');
const { todoActions } = require('./store/todo');
const { themeActions } = require('./store/theme');
const { state, dispatch } = require('./store');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/api/', (req, res) => {
  res.send('API');
});

app.get('/api/todo/', (req, res) => {
  res.json(state.toDo.list.filter((it) => !it.removed));
});

app.get('/api/todo/all', (req, res) => {
  res.json(state.toDo.list);
});

app.post('/api/todo/', (req, res) => {
  const id = state.toDo.list.length + 1;

  dispatch({
    type: todoActions.ADD,
    payload: { id, ...req.body, done: false, removed: false },
  });

  res.send({ id });
});

app.put('/api/todo/', (req, res) => {
  const index = state.toDo.list.findIndex((it) => it.id == req.body.id);
  let updated = false;
  if (index > -1) {
    dispatch({ type: todoActions.EDIT, payload: { index, toDo: req.body } });
    updated = req.body.id;
  }
  res.send({ updated });
});

app.get('/api/theme/', (req, res) => {
  res.json(state.theme);
});

app.put('/api/theme/', (req, res) => {
  dispatch({ type: themeActions.EDIT, payload: req.body });
  res.send({ updated: true });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
