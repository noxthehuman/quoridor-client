import './Board.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from "../consts"
import Row from './Row';
import HorizontalRow from './HorizontalRow';

const Board = ({turn, setTurn, isActive, seconds, minutes, hours}) => {
    
    const { gameId } = useParams()
    const [boardSize, setBoardSize] = useState(0)
    const [posB, setPosB] = useState({x: null, y:null});
    const [posW, setPosW] = useState({x: null, y:null});
    const [order, setOrder] = useState(1);
    const [walls, setWalls] = useState([]);
   
    useEffect(()=> {
        const getGame = async () => {
            const {data} = await axios.get(`${API_URL}/game/${gameId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }});  
            setBoardSize(data.boardSize)
        }
        getGame()
    }, [])
    
    useEffect(()=> {
        setPosB({y: 0, x: Math.floor(boardSize/2)})
        setPosW({y: (boardSize -1), x: Math.floor(boardSize/2)})
        
    }, [boardSize])


    const handleClick = async (x, y, type) => {
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
            console.log("i create a wall here ", {x: x, y:y, type:'space'})
            setWalls([...walls, {x: x, y: y, type:'vertical'}, {x: x, y: y - 1, type:'vertical'}])
        }
        if(type==='horizontal') {
            setWalls([...walls, {x: x, y: y, type:'horizontal'}, {x: x+1, y: y, type:'horizontal'}])
        }

        if(turn === 'white') {
            if (moveData.action === 'move'){
                setPosW({x, y})
            }
            
            if(y === 0){
                isActive = false
                await axios.put(`${API_URL}/game/${gameId}`, moveData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
            }
            setTurn('black')
        }
        if(turn === 'black') {
            if (moveData.action === 'move'){
                setPosB({x, y})
            }
            if(y === boardSize - 1){
                isActive = false
                await axios.put(`${API_URL}/game/${gameId}`, moveData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } })
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
        <div className='grid' style={{ gridTemplateColumns: 
        `repeat(${boardSize - 1}, 5fr 11f) 5fr` , gridTemplateRows:
         `repeat(${boardSize - 1}, 5fr 11f) 5fr` }}>
            {rows}
        </div>
    )
}

export default Board