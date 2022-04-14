import { useState } from 'react'
import CreateGameForm from '../components/CreateGameForm'

const Game = () => {
    const [username, setUsername] = useState('')
    const [boardSize, setBoardSize] = useState(9)
    const [walls, setWalls] = useState(10)
    const [form, setForm] = useState(true)

  return (
    <div>
        <h1> Game </h1>
        {form &&  <CreateGameForm username= {username} setUsername={setUsername}
        boardSize= {boardSize} setBoardSize={setBoardSize} walls={walls} 
        setWalls={setWalls} setForm={setForm}/> 
        }
        
        <div>
            <div className='grid'>
                <div className='cell'>

                </div>

            </div>

        </div>

    </div>
  )
}

export default Game