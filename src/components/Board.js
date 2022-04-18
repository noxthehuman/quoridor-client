import './Board.css'
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {API_URL} from "../consts"

const Board = () => {

    const boardSize = 5;
    const nbElements = boardSize * (2 * boardSize - 1);
    const tiles = [...Array(nbElements + 1).keys()].splice(1)
    const [posB, setPosB] = useState(~~(boardSize / 2) + 1);
    const [posW, setPosW] = useState(nbElements - ~~(boardSize / 2));
    const [turn, setTurn] = useState('white');
    const [walls, setWalls] = useState([]);
    const {gameId} = useParams()

    const handleClick = (e) => {
        const type = e.target.classList;
        const idx = +e.target.dataset.index;
        if (idx % boardSize && type.contains("Hspace")) {
            setWalls([...walls, idx]);
        }
        if (idx > boardSize && type.contains("Vspace")) {
            setWalls([...walls, idx]);
        }
        if (turn === 'white') {
            if (type.contains("cell")) {
                setPosW(idx);
            }
            setTurn('black')
        }
        if (turn === 'black') {
            if (type.contains("cell")) {
                setPosB(idx);
            }
            setTurn('white');
        }
        console.log(walls)
        console.log(type)
    }

    useEffect(() => {
        const isValid = async () => {
            const data = await axios.post(`${API_URL}/game/${gameId}`);
            console.log(data);
        }
        isValid();
    }, [])
    
    return (
        <div className='grid' onClick={handleClick} style={{gridTemplateColumns: `repeat(${2*boardSize-1}, 1fr)`}}>
            {tiles.map(x => 
            <>
                {!(~~((x-1) / boardSize) % 2) && <>
                <div className="cell" data-index={x}> {x === posW? <div className="Wpawn">{x} </div> : x === posB? <div className="Bpawn"> {x}</div> : `${x}`}</div>
                {!!(x % boardSize) && (walls.includes(x) || walls.includes(x + 2 * boardSize) ? <div className='wall'> {x}</div> : <div className='Vspace' data-index={x}> {x}</div>)}
                </>}
                {!!(~~((x-1) / boardSize) % 2) && <>
                {walls.includes(x) || walls.includes(x-1) ? <div className='wall'> {x}</div> : <div className='Hspace' data-index={x}>{x} </div>}
                {!!(x % boardSize) && (walls.includes(x) || walls.includes(x + boardSize) ? <div className='wall'> {x}</div> : <div className='space'>{x} </div>)}
                </>}
            </>
            )}        
        </div>
    )
}

export default Board