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
    
    useEffect(()=> {
        const getGame = async () => {
            const {data} = await axios.get(`${API_URL}/game/${gameId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });  
            setBoardSize(data.boardSize)
        }
        getGame()
    }, [])
    
    useEffect(()=> {
        setPosB({y: 0, x: Math.floor(boardSize/2)})
        setPosW({y: (boardSize -1), x: Math.floor(boardSize/2)})
        
    }, [boardSize])

    const [order, setOrder] = useState(1);
    const [walls, setWalls] = useState([]);

    const handlePlayerClick = async (x, y) => {

       const makeMoveData = await makeMoveInBack({
            x, y,
            action: "move",
            "order": null,
            "time": null,
            player: turn
        
        })

        if (!makeMoveData?.action) {
            console.log("invalid move");
            return;
        }

        if(turn === 'white') {
            setPosW({x, y})
            setTurn('black')
        }
        if(turn === 'black') {
            setPosB({x, y})
            setTurn('white')
        }
        
        setOrder(order + 1)
    }

    const makeMoveInBack = async (move) => {
        const { data } = await axios.post(`${API_URL}/game/${gameId}`, move,
        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
        return data
    }

    const handleClick = async (e) => {
        let type = e.target.className;
        if (type === "space") { return };
        if (type === "white" || type === "black") { type = "move" };
        const idx = +e.target.dataset.index;
        //console.log("idx", idx)
        const move = {
            x: (type === "move" || type === "vertical") ? idx % (2 * boardSize) :
             (idx + boardSize) % (2 * boardSize),
            y: (type === "move" || type === "vertical") ? boardSize - ~~(idx / (2 * boardSize)) :
             boardSize - ~~((idx + boardSize) / (2 * boardSize)),
            action: type,
            order: order,
            time: `${hours}:${minutes}:${seconds}`,
            player: turn,
            game: gameId
        }

        if (turn === 'white') {
            if (type === "move") {
                setPosW(idx);
            }
            if(move.y === boardSize){
                isActive = false
                const {data} = await axios.put(`${API_URL}/game/${gameId}`, move,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
                console.log('win', data)
            }
            setTurn('black')
        }
        if (turn === 'black') {
            if (type === "move") {
                setPosB(idx);
            }
            if(move.y === 1){
                isActive = false
                const {data} = await axios.put(`${API_URL}/game/${gameId}`, move,
                { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
                console.log('win', data)
            }
            setTurn('white');
        }
        ;
    }

    const rows = []

    for(let i=0; i<boardSize; i++) {
        rows.push(<Row posB={posB} posW={posW} boardSize={boardSize} rowNumber={i} key={`${i}, row`} handlePlayerClick={handlePlayerClick}/>)
        rows.push(<HorizontalRow  boardSize={boardSize} key={`${i}, horizontalRow`}/>)
    }

    return (
        <div className='grid' style={{ gridTemplateColumns: 
        `repeat(${boardSize - 1}, 60px 15px) 60px` , gridTemplateRows:
         `repeat(${boardSize - 1}, 60px 15px) 60px` }}>
        {rows}
        </div>
    )
}

export default Board