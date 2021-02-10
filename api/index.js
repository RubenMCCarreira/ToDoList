const express = require('express')
const cors = require('cors');

const app = express()
const port = 4000

const myToDoList = []

app.use(cors())
app.use(express.json());

app.get('/api/', (req, res) => {
  res.send('API')
})

app.get('/api/todo/', (req, res) => {
  res.json(myToDoList.filter(it => !it.removed))
})

app.get('/api/todo/all', (req, res) => {
  res.json(myToDoList)
})

app.post('/api/todo/', (req, res) => {
  const id = myToDoList.length +1
  myToDoList.unshift({ id, ...req.body, done: false, removed: false })
  res.send({id})
})

app.put('/api/todo/', (req, res) => {
  const index = myToDoList.findIndex(it => it.id == req.body.id)
  let updated = false
  if(index > -1){
    myToDoList.splice(index, 1, req.body)
    updated = req.body.id
  }
  res.send({updated})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})