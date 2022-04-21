import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { API_URL } from '../consts'
import { AuthContext } from '../context/auth.context'
import './Profile.css'

const Profile = () => {
  const [userInfo, setUserInfo] = useState({})
  const [gamesInfo, setGamesInfo] = useState([])
  const {logOutUser} = useContext(AuthContext)

    useEffect(()=> {
      const getUserInfo = async () => {
      const storedToken = localStorage.getItem('authToken')
      const {data} = await axios.get(`${API_URL}/profile`,
      {headers: { Authorization: `Bearer ${storedToken}`} })
       setUserInfo(data.userInfo)
       setGamesInfo(data.gamesInfo)
      }
      getUserInfo()
    }, [])

    const deleteUser = async () => {
        const storedToken = localStorage.getItem('authToken')
        await axios.delete(`${API_URL}/profile/delete`,
        {headers: { Authorization: `Bearer ${storedToken}`} })
        logOutUser()
    }
    
  return (
    <div className='profile'>
      <button>
        <Link to='/' className='link'> Home </Link>
      </button>
        <h5> Profile </h5>
      <div className='user-info'>
        <p> Username: {userInfo.username} </p>
        <p> Email: {userInfo.email} </p>
        <p> <Link to='/gamecreation' className='link'> Create new game </Link> </p>
        <button onClick={deleteUser}> Delete Account </button>
      </div>
      <Outlet />

      <div >
        <h4> Games </h4>
        <div className='games-display'>
          {gamesInfo.map((game) => {
            return (
              <div key={game.index} className='game-info'>
                <p> Status: {game.status !== 'pending' ? game.status + ' won' : 'pending'}</p>
                <p> Duration: {game.duration} </p>
                <p> White: {game.white?.username || 'user deleted'} Black: {game.black?.username || 'undefined'} </p>
                <p> Boardsize: {game.boardSize} Walls: {game.walls} </p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Profile