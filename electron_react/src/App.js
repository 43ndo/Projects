import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const fs = window.require('fs')
const pathModule = window.require('path')

const { app } = window.require('@electron/remote')

const App = () => {
  const [path, setPath] = useState(app.getAppPath())
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
  {
    id: 1,
    folder: 'test',
    date: 'test',
    size: 'test',
  },
  {
    id: 2,
    folder: 'test',
    date: 'test',
    size: 'test',
  },
  {
    id: 3,
    folder: 'test',
    date: 'test',
    size: 'test',
  },
])

const files = useMemo(
    () =>
      fs
        .readdirSync(path)
        .map(file => {
          const stats = fs.statSync(pathModule.join(path, file))
          return {
            name: file,
            size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
            directory: stats.isDirectory()
          }
        })


  // Add Task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.filter((task) => task.id === id))
    console.log(id)
  }
  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? ( <> <h2>Folder(s) With Log(s)</h2> <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> </>) : ( 'No Logs To Decrypt' )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
