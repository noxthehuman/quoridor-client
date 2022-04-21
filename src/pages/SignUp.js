import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../consts'
import './LogInSignup.css'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)
  const handleEmail = (e) => setEmail(e.target.value)

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    // Create an object representing the request body
    const requestBody = { username, password, email }

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/auth/login')
      })
      .catch((error) => {
        console.log(error)
        const errorDescription = error.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className='form'>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className='go-login'>
        <p>Already have account?</p>
        <Link to={'/auth/login'}> Login</Link>
      </div>
    </div>
  )
}

export default SignUp