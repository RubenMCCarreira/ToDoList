const express = require('express')
const cors = require('cors');
const {actions, dispatch, state} = require('./store');

const app = express()
const port = 4000

app.use(cors())
app.use(express.json());

app.get('/api/', (req, res) => {
  res.send('API')
})

app.get('/api/todo/', (req, res) => {
  res.json(state.myToDoList.filter(it => !it.removed))
})

app.get('/api/todo/all', (req, res) => {
  res.json(state.myToDoList)
})

app.post('/api/todo/', (req, res) => {
  const id = state.myToDoList.length + 1
  dispatch({type: actions.ADD, payload: { id, ...req.body, done: false, removed: false }})
  res.send({id})
})

app.put('/api/todo/', (req, res) => {
  const index = state.myToDoList.findIndex(it => it.id == req.body.id)
  let updated = false
  if(index > -1){
    dispatch({type: actions.EDIT, payload: {index, toDo: req.body}})
    updated = req.body.id
  }
  res.send({updated})
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})