import { useEffect, useState } from "react"
import Board from '../components/Board'

const ViewGame = () => {
  const [turn, setTurn] = useState('white')
  const [startTime, setStartTime] = useState( (new Date()).getTime())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const isActive = true

  
  const numberToString = (value) => {
    const stringedValue = value.toString()
    return stringedValue.padStart(2, 0)
  }
  
  const getMinutes = () => {
    const minutesRaw = Math.floor((timeElapsed % 3600000) / 60000 )
    return numberToString(minutesRaw)
  }

  const getHours = () => {
    const hoursRaw = Math.floor(timeElapsed / 3600000)
    return numberToString(hoursRaw)
  }
  
  const getSeconds = () => {
    const secondsRaw = Math.floor(timeElapsed % 60000 / 1000)
    return numberToString(secondsRaw)
  }
  
  const seconds = getSeconds()
  const minutes = getMinutes()
  const hours = getHours()

  useEffect(()=>{
      let timeoutId = setTimeout(() => {
        if(isActive) {
          setTimeElapsed((new Date).getTime() - startTime)
        }
      }, 300)
    if(!isActive) {
      clearTimeout(timeoutId)
    }
  }, [isActive, timeElapsed])

  return (
    <div>
      <div className="game-specs">
        <h1> {turn}'s turn </h1>
        <p key={timeElapsed}> {hours}:{minutes}:{seconds} </p>
      </div>
        
        <div>
          <Board turn={turn} setTurn={setTurn} seconds={seconds} minutes={minutes} 
          hours={hours} isActive={isActive}/> 
        </div>

    </div>
  )
}

export default ViewGame