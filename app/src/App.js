import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom'
import Notes from './Note'
import { NoteDetail } from './components/NoteDetail'
import noteService from './services/notes'
import LoginForm from './components/LoginForm'

const Home = () => <h1>Home page</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('LoggedNoteAppUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  return (
    <div>
      <Router>
        <header>
          <Link to='/'>Home</Link>
          <Link to='/notes'>Notes</Link>
          <Link to='/users'>Users</Link>
          {
            user
              ? <em>Logged as {user.name}</em>
              : <Link to='/login'>Login</Link>
          }
        </header>
        <Routes>
          <Route path='/' element={<Home />}>
            Home
          </Route>
          <Route path='/notes' element={<Notes />}>
            Notes
          </Route>
          <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />}>
            Note
          </Route>
          <Route path='/users' element={<Users />}>
            Users
          </Route>
          <Route
            path='/login' element={user
              ? (
                <Navigate to='/' />
                )
              : (
                <LoginForm />
                )}
          >
            Login
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
