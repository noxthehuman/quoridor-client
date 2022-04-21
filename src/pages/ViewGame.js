import { useEffect, useMemo, useState } from "react"
import Board from '../components/Board'
import './ViewGame.css'

const ViewGame = () => {
  const [turn, setTurn] = useState('white')
  const startTime = useMemo(()=> new Date().getTime(), [])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isActive, setIsActive] = useState(true)

  
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
          setTimeElapsed(new Date().getTime() - startTime)
        }
      }, 300)
    if(!isActive) {
      clearTimeout(timeoutId)
    }
  }, [isActive, timeElapsed, startTime])

  return (
    <div>
      <div className="header">
        <div className="time" key={timeElapsed}> {hours}:{minutes}:{seconds} </div>
        <div className="turn"> <h1> {turn}'s turn </h1> </div>
        <div className="walls">  </div>      
      </div>
        
        <div>
          <Board turn={turn} setTurn={setTurn} seconds={seconds} minutes={minutes} 
          hours={hours} setIsActive={setIsActive}/> 
        </div>

    </div>
  )
}

export default ViewGame