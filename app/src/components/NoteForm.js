import { useState, useRef } from 'react'
import Togglable from './Togglable'

export default function NoteForm ({
  addNote, handleLogout
}) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const SubmitNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    addNote(noteObject)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }
  return (
    <Togglable buttonLabel='new note' ref={togglableRef}>
      <h3>Create a new note</h3>

      <form onSubmit={SubmitNote}>
        <input
          placeholder='Write your note content'
          value={newNote}
          onChange={handleChange}
        />
        <button type='submit'>save</button>
      </form>
      <button onClick={handleLogout}>Log out</button>
    </Togglable>
  )
}
