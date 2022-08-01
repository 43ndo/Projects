import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.folder}{' '}
        <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} />
      </h3>
        <p>Uploader: {task.email}</p>
        <p>Date: {task.date}</p>
        <p>Size: {task.size}</p>
    </div>
  )
}

export default Task
