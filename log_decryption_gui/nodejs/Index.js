const wd = require('./WalkDir')
const express = require('express')
const fs = require('fs')
const app = express()


const cors = require('cors')
app.use(cors())

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})
*/
let tasks = fs.readFileSync('../reactjs/db.json') 

app.get('/tasks', (req, res) => {
  const dir = '/Users/henryvu/Desktop/untitled_folder'
  wd.walkDir(dir).then(dirs => {
    fs.writeFileSync('../reactjs/db.json', JSON.stringify(dirs))
    res.json(dirs)
  })

})

app.get('/tasks/:id', (req, res) => {
  const id = req.params.id
  const found = tasks.find(task => task.id === id)
  if(found) {
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(found)
  } else {
    res.status(404).json({ message: 'ID doesn\'t exist' })
  }
})

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  const deleted = tasks.find(task => task.id === id)
  if(deleted) {
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(deleted)
  } else {
    res.status(404).json({ message: 'Task doesn\'t exist' })
  }
  /*
  let index = tasks.findIndex(task => task.id === req.params.id)
  todos.splice(index, 1)
  res.sendStatus(200)
  */
})


const PORT = process.env.PORT || 8080  
app.listen(PORT, () => {
  console.log('Server Started on http://localhost:' + PORT)
})

