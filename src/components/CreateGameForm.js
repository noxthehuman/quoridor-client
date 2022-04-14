import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../consts'

const CreateGameForm = () => {
    const [username, setUsername] = useState('')
    const [boardSize, setBoardSize] = useState(9)
    const [walls, setWalls] = useState(10)

    const handleBlack = (e) => setUsername(e.target.value)
    const handleBoard = (e) => setBoardSize(e.target.value)
    const handleWalls = (e) => setWalls(e.target.value)
    let navigate = useNavigate()
    
    const createGame = (e) => {
        e.preventDefault()
        
        const create = async () => {
            try {
                const requestBody = {username, boardSize, walls}
                const storedToken = localStorage.getItem('authToken')
                const response = await axios.post(`${API_URL}/game`, requestBody, {headers: { Authorization: `Bearer ${storedToken}`} })
                console.log(response.data.game)
                navigate(`/game/${response.data.game._id}`)
            } catch (err) {
                console.error(err)            
            }       
        }
        create()
    }

  return (
    <div>
        <form onSubmit={createGame}>
            <label htmlFor='black'>Enter the username of the person that you are playing against</label>
            <input type="text" name='black' value={username.username} onChange={handleBlack}/>

            <label htmlFor='boardSize'> Board Size </label>
            <select onChange={handleBoard}>
                <option value='9'> 9 x 9 </option>
                <option value='7'> 7 x 7 </option>
                <option value='5'> 5 x 5 </option>
            </select>

            <label htmlFor='walls'> Amount of walls </label>
            <input type='text' id='walls' value={walls.walls} onChange={handleWalls}/>

            <button type='submit'> Create </button>
        </form>
    </div>
  )
}

export default CreateGameForm