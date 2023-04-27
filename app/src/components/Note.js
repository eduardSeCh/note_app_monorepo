import { Link } from 'react-router-dom'
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <li className='note'>
      <div>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </div>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note
