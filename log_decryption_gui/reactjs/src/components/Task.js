import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.absolutePath}{' '}
        <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} />
      </h3>
      <ul>
        <li>ID: {task.id}</li>
        <li>File: {task.fileName}</li>
        <li>Date: {task.date}</li>
        <li>Size: {task.size}</li>
      </ul>
    </div>
  )
}

export default Task
