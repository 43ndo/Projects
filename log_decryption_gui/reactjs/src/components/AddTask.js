import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [email, setEmail] = useState('')
  const [folder, setFolder] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      alert('Please add email')
      return
    } else if (!folder){
      alert('Please select folder.')
      return
    } 

    onAdd({ email, folder })

    setEmail('')
    setFolder('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Email</label>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='form-control'>
        <label>Select Folder with Logs</label>
        <input type="file" directory="" webkitdirectory="" value={folder} onChange={(e) => setFolder(e.target.value)}/>
      </div>
      <input type='submit' value='Save' className='btn btn-block' />
    </form>
  )
}

export default AddTask
