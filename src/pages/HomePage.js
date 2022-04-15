import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const HomePage = () => {

    const {logOutUser, isLoggedIn} = useContext(AuthContext)
  return (
    <div>
        <h1> QUORIDOR </h1>
        <p>
            Rules
        </p>

        <div>
            {isLoggedIn && <>
                <button>
                    <Link to='/profile'> Profile</Link>
                </button>
                <button>
                    <Link to='/gamecreation'> Create Game </Link>
                </button>
                <button onClick={logOutUser}>
                 Log Out
                </button> </>}
            
            {isLoggedIn === false && <>
                <button>
                    <Link to='/auth/login'> Log In</Link>
                 </button>
                <button>
                    <Link to='/auth/signup'> Sign In</Link>
                </button>
            </>}
            
            
        </div>

    </div>
  )
}

export default HomePage