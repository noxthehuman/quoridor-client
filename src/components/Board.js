import './Board.css'
import axios from 'axios';
import { useState, useEffect} from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { API_URL } from "../consts"
import Row from './Row';
import HorizontalRow from './HorizontalRow';
import WallsLeft from './WallsLeft';

const Board = ({turn, setTurn, setIsActive, seconds, minutes, hours}) => {
    
    const { gameId } = useParams()
    const [boardSize, setBoardSize] = useState(0)
    const [posB, setPosB] = useState({x: null, y:null});
    const [posW, setPosW] = useState({x: null, y:null});
    const [order, setOrder] = useState(1);
    const [walls, setWalls] = useState([]);
    const [wallsW, setWallsW] = useState(0);
    const [wallsB, setWallsB] = useState(0);

    useEffect(()=> {
        const getGame = async () => {
            const {data} = await axios.get(`${API_URL}/game/${gameId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }});  
            setBoardSize(data.boardSize);
            setWallsW(data.walls);
            setWallsB(data.walls);
        }
        getGame()
    }, [gameId])
    
    useEffect(()=> {
        setPosB({y: 0, x: Math.floor(boardSize/2)})
        setPosW({y: (boardSize -1), x: Math.floor(boardSize/2)})
        
    }, [boardSize])

    const handleClick = async (x, y, type) => {

        console.log("walls",wallsW)

        if (type === "space") { return };
       
        const moveData = {
            x: x + 1,
            y: (type === 'vertical' || type ==='move') ? boardSize - y : (boardSize - y) - 1,
            action: type,
            order: order,
            time: `${hours}:${minutes}:${seconds}`,
            player: turn,
            game: gameId
        }

        const makeMoveData = await makeMoveInBack(moveData)

        if(!makeMoveData?.action) {
            console.log('invalid move')
            return
        }

        console.log(type)
        if(type=== 'vertical') {
            setWalls([...walls, {x: x, y: y, type:'vertical'}, {x: x, y: y - 1, type:'vertical'}])
        }
        if(type==='horizontal') {
            setWalls([...walls, {x: x, y: y, type:'horizontal'}, {x: x+1, y: y, type:'horizontal'}])
        }

        if(turn === 'white') {
            if (moveData.action === 'move'){
                setPosW({x, y})
            } else {
                setWallsW(wallsW -1)
            }
            
            if(y === 0){
                setIsActive = false
                await axios.put(`${API_URL}/game/${gameId}`, moveData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
                return <Redirect to='/profile'/>
            }
            setTurn('black')
        }
        if(turn === 'black') {
            if (moveData.action === 'move'){
                setPosB({x, y})
            }  else {
                setWallsB(wallsB -1)
            }
            if(y === boardSize - 1){
                setIsActive = false
                await axios.put(`${API_URL}/game/${gameId}`, moveData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
                return <Redirect to='/profile'/>
            }
            setTurn('white')
        }
        setOrder(order + 1)
    }

    const makeMoveInBack = async (move) => {
        const { data } = await axios.post(`${API_URL}/game/${gameId}`, move,
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }});
        return data
    }

    const rows = []
    for(let i=0; i<boardSize; i++) {
        rows.push(<Row posB={posB} posW={posW} boardSize={boardSize} rowNumber={i} walls={walls} key={`${i}, row`} 
        handleClick={handleClick}/>)
        rows.push(<HorizontalRow boardSize={boardSize} rowNumber={i} walls={walls} key={`${i}, horizontalRow`}
        handleClick={handleClick}/>)
    }

    return (
        <div className='board'>
        <div className='background'>
        <div className='gridandwalls'>
        <div className='wallsleft' 
            style={{gridTemplateColumns: `repeat(${boardSize}, 1fr 4fr) 1fr`}}> 
            <WallsLeft walls={wallsB} boardSize={boardSize}/></div>
        <div className='grid' style={{
            gridTemplateColumns: `repeat(${boardSize - 1}, 4fr 1fr) 4fr`, 
            gridTemplateRows: `repeat(${boardSize - 1}, 4fr 1fr) 4fr`}}>
            {rows}
        </div>
        <div className='wallsleft' 
            style={{gridTemplateColumns: `repeat(${boardSize}, 1fr 4fr) 1fr`}}> 
            <WallsLeft walls={wallsW} boardSize={boardSize}/></div>
        </div>
        </div>
        </div>

    )
}

export default Board