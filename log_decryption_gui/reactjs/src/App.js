import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (absolutePath) => {
    const res = await fetch(`http://localhost:5000/tasks/${absolutePath}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (aboslutePath) => {
    const res = await fetch(`http://localhost:5000/tasks/${aboslutePath}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200 ? setTasks(tasks.filter((task) => task.aboslutePath !== aboslutePath)) : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (aboslutePath) => {
    const taskToToggle = await fetchTask(aboslutePath)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${aboslutePath}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.aboslutePath === aboslutePath ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <h2>Folders with Logs</h2>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? ( <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> ) : ( 'No Logs To Decrypt' )}
              </>
            }
          />
        </Routes>
      </div>
      <div className='container'>
        <h2>Logs To Be Decrypted</h2>
      </div>
    </Router>
  )
}

export default App
