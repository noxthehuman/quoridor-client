import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import './Homepage.css'

const HomePage = () => {
    const {logOutUser, isLoggedIn} = useContext(AuthContext)

  return (
    <div className='homePage'>
    
        <h1> QUORIDOR </h1>
        <div className='rules'>
            <ul>
                <li> <h3> Rules </h3> </li>
                <li> The goal of the game is to reach the opponent's base first.</li>
                <li> Each player in turn, chooses to move his pawn or to put one of his walls.</li>
                <li> The pawns are moved one square at a time, horizontally or vertically, forwards or backwards </li>
                <li> Each wall takes two horizontal or vertical blocks. However, an acess to the goal line must always be left open.</li>
                <li>You can jump the opponent’s pawn, or go sideways if there is a wall behind.</li>
            </ul>
        </div>

        <div className='buttons-homepage'>
            {isLoggedIn && <>
                <button>
                    <Link to='/profile' className='link'> Profile</Link>
                </button>
                <button>
                    <Link to='/gamecreation' className='link'> Create Game </Link>
                </button>
                <button onClick={logOutUser}>
                 Log Out
                </button> </>}
            
            {!isLoggedIn && <>
                <button>
                    <Link to='/auth/login' className='link'> Log In</Link>
                 </button>
                <button>
                    <Link to='/auth/signup' className='link'> Sign In</Link>
                </button>
            </>}
            
        </div>

    </div>
  )
}

export default HomePage