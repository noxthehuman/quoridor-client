import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
        <h1> QUORIDOR </h1>
        <p>
            Rules
        </p>

        <div>
            <button>
                <Link to='/auth/login'> Log In</Link>
            </button>
            <button>
                <Link to='/auth/signup'> Sign In</Link>
            </button>
        </div>

    </div>
  )
}

export default HomePage