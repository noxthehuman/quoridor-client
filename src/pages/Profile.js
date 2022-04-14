import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateGameForm from '../components/CreateGameForm'
import { API_URL } from '../consts'


const Profile = () => {
  const [userInfo, setUserInfo] = useState({})
  const [gamesInfo, setGamesInfo] = useState([])

    useEffect(()=> {
      const getUserInfo = async () => {
      console.log('hey')
      const storedToken = localStorage.getItem('authToken')
      const {data} = await axios.get(`${API_URL}/profile`,
      {headers: { Authorization: `Bearer ${storedToken}`} })
       setUserInfo(data.userInfo)
       setGamesInfo(data.gamesInfo)
      }
      getUserInfo()
      console.log('games:', gamesInfo, 'user:', userInfo)
    }, [])
    
  return (
    <div>
      <div>
        <p> Username: {userInfo.username} </p>
        <p> Email: {userInfo.email} </p>
      </div>

      <div>
        <h4> Games </h4>
        <div>
          {gamesInfo.map((game) => {
            return (
              <div key={game.index}>
                <p> {game.status} </p>
                <p> Played by {game.white.username} and {game.black.username} </p>
                <p> boardsize: {game.boardSize} walls: {game.walls} </p>
              </div>
            )
          })}
        </div>
      </div>

      <Link to='/profile/newgame'> Create new game </Link>
    </div>
  )
}

export default Profile