import Togglable from './Togglable'
const NO_OP = () => {}
export default function LoginForm ({
  handleSubmit = NO_OP, username, password,
  handleUsernameChange, handlePasswordChange
}) {
  return (
    <Togglable buttonLabel='Show Login'>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='UserName'
            placeholder='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button id='form-login-button'>
          Login
        </button>
      </form>
    </Togglable>
  )
}
