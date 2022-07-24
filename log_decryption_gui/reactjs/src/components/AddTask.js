import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Uploader</label>
        <input
          type='text'
          placeholder='Uploaders Name'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Clinical Site</label>
        <input
          type='text'
          placeholder='Site Name'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <input type='submit' value='Save' className='btn btn-block' />
    </form>
  )
}

export default AddTask
