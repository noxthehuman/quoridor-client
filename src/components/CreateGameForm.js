import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../consts'

const CreateGameForm = () => {
    const [username, setUsername] = useState('')
    const [boardSize, setBoardSize] = useState(9)
    const [walls, setWalls] = useState(10)

    const handleBlack = (e) => setUsername(e.target.value)
    const handleBoard = (e) => {
        setBoardSize(e.target.value);
        setWalls(+e.target.value + 1); 
    }
    
    let navigate = useNavigate()
    
    const createGame = (e) => {
        e.preventDefault()
        
        const create = async () => {
            try {
                const requestBody = {username, boardSize, walls}
                const storedToken = localStorage.getItem('authToken')
                const response = await axios.post(`${API_URL}/game`, requestBody, {headers: { Authorization: `Bearer ${storedToken}`} })
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
        <label htmlFor='boardSize'> Board Size </label>
            <select onChange={handleBoard}>
                <option value='9'> 9 x 9 </option>
                <option value='7'> 7 x 7 </option>
                <option value='5'> 5 x 5 </option>
            </select>
            <input type="text" name='black' placeholder="Opponent username" value={username.username} onChange={handleBlack}/>
            <button type='submit'> Create </button>
        </form>
    </div>
  )
}

export default CreateGameForm