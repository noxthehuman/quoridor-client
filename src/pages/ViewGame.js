import { useEffect, useState } from "react"
import Board from '../components/Board'

const ViewGame = () => {
  const [turn, setTurn] = useState('white')
  const [startTime, setStartTime] = useState( (new Date()).getTime())
  const [timeElapsed, setTimeElapsed] = useState(0)

  const numberToString = (value) => {
    const stringedValue = value.toString()
    return stringedValue.padStart(2, 0)
  }

  const getMinutes = () => {
    const minutes = Math.floor((timeElapsed % 3600000) / 60000 )
    return numberToString(minutes)
  }

  const getHours = () => {
    const hours = Math.floor(timeElapsed / 3600000)
    return numberToString(hours)
  }

  const getSeconds = () => {
    const seconds = Math.floor(timeElapsed % 60000 / 1000)
    return numberToString(seconds)
  }

  useEffect(()=>{
    let timeoutId = setTimeout(() => {
      setTimeElapsed( (new Date).getTime() - startTime)
      }, 300)
  }, [timeElapsed])

  return (
    <div>
      <div> 
        <h1> {turn}'s turn </h1>
        <p key={timeElapsed}> {getHours()}:{getMinutes()}:{getSeconds()} </p>
      </div>
      <Board  turn={turn} setTurn={setTurn} /> 
    </div>
  )
}

export default ViewGame