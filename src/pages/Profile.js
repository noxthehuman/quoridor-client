import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../consts'
import { AuthContext } from '../context/auth.context'


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
    <div>
      <div>
        <p> Username: {userInfo.username} </p>
        <p> Email: {userInfo.email} </p>
      </div>
        <Link to='/gamecreation'> Create new game </Link>
        <button onClick={deleteUser}> Delete Account </button>

      <div>
        <h4> Games </h4>
        <div>
          {gamesInfo.map((game) => {
            return (
              <div key={game.index}>
                <p> {game.status} </p>
                <p> Played by {game.white?.username} and {game.black?.username} </p>
                <p> boardsize: {game.boardSize} walls: {game.walls} </p>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Profile