//import { useParams } from "react-router-dom"
import Board from '../components/Board'

const ViewGame = () => {

  //const {id} = useParams()

  return (
    <div>
        <h1> Game </h1>
        
        <div>
        <Board /> 
        </div>

    </div>
  )
}

export default ViewGame