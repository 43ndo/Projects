const wd = require('./WalkDir')
const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')

// allows cross-orign resource sharing
app.use(cors())

var tasks = {}
const dir = '/Users/henryvu/Desktop/untitled_folder'
const jsonFile = '../reactjs/db.json'


app.get('/tasks', (req, res) => {
  wd.walkDir(dir).then(result => {
    fs.writeFileSync(jsonFile, JSON.stringify(result))
    res.json(result)
    tasks = result
  })
})

/*
app.get('/tasks/:id', (req, res) => {
  const id = req.params.id
  const found = tasks.find(task => task.id === id)
  if(found) {
    tasks = tasks.filter(task => task.id !== id)
    res.status(200).json(found)
  } else {
    res.status(404).json({ message: 'ID Doesn\'t Exist' })
  }
})
*/

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id
  const deleted = tasks.find(task => task.id === id)
  console.log(deleted)
  if(deleted) {
    tasks = tasks.filter(task => task.id !== id)
    fs.writeFileSync(jsonFile, JSON.stringify(tasks))
    res.status(200).json(deleted)
  } else {
    res.status(404).json({ message: 'ID Doesn\'t Exist' })
  }
})


const PORT = process.env.PORT || 8080  
app.listen(PORT, () => console.log('Server Started on http://localhost:' + PORT))

