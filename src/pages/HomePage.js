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
                <li> Reach the first line opposite to yours to win the game</li>
                <li>The pawns are moved one square at a time, horizontally or vertically, forwards or 
                    backwards </li>
                <li> You can either chose to put up a wall to disadventage your opponent or move your pawn.
                    But keep in mind that all the fences will block you as well as your opponent so place them carefuly </li>
                <li> Each wall takes up two blocks at a time horizontaly or verticaly </li>
                <li> If you get stuck in front of your opponent, you can jump over them to get to the the square behind them
                    as well as jump sideways to their side </li>
            </ul>
        </div>

        <div className='buttons-homepage'>
            {isLoggedIn && <>
                <button>
                    <Link to='/profile' className='link'> Profile</Link>
                </button>
                <button>
                    <Link to='/gamecreation'className='link'> Create Game </Link>
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