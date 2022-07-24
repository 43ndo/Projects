const wd = require('./WalkDir')
const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const { nextTick } = require('process')

// allows cross-orign resource sharing
app.use(cors())

app.get('/tasks', (req, res) => {
  const dir = '/Users/henryvu/Desktop/untitled_folder'
  const jsonFile = '../reactjs/db.json'
  wd.walkDir(dir).then(result => {
    fs.writeFileSync(jsonFile, JSON.stringify(result))
    res.json(result)
    tasks = result
  })
})


app.get('/tasks/:id', (req, res) => {
  //const tasks = fs.readFileSync('../reactjs/db.json') 
  //console.log(JSON.parse(tasks))
  const id = req.params.id
  console.log(id)
  const found = tasks.find(task => task.id === id)
  console.log(found)
  
  if(found) {
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(found)
  } else {
    res.status(404).json({ message: 'ID Doesn\'t Exist' })
  }
})

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  const deleted = tasks.find(task => task.id === id)
  if(deleted) {
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(deleted)
  } else {
    res.status(404).json({ message: 'ID Doesn\'t Exist' })
  }
})


const PORT = process.env.PORT || 8080  
app.listen(PORT, () => console.log('Server Started on http://localhost:' + PORT))

