const wd = require('./WalkDir')
const express = require('express')
const fs = require('fs')
const app = express()

app.get('/tasks', (req, res) => {
  const dir = '../../001'
  wd.walkDir(dir).then(logs => {
    fs.writeFileSync('../reactjs/db.json', JSON.stringify(logs))
    res.json(logs)
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT '+ PORT)
})

