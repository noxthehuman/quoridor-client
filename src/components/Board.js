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
        if (turn === 'white') {
            setPosW(+e.target.dataset.index);
            setTurn('black')
        }
        if (turn === 'black') {
            setPosB(+e.target.dataset.index);
            setTurn('white');
        }
    }

    useEffect(() => {
        const isValid = async () => {
            const data = await axios.post(`${API_URL}/game/${gameId}`);
            console.log(data);
        }
        isValid();
    }, [])
    

    return (
        <div className='grid' onClick={handleClick} style={{gridTemplateColumns: `repeat(${2*boardSize+1}, 1fr)`}}>
            {tiles.map(x => 
            <>
                {!(~~((x-1) / boardSize) % 2) && <>
                <div className='Vspace' data-index={x}> </div>
                <div className="cell" data-index={x}> {x === posW? <div className="Wpawn"> </div> : x === posB? <div className="Bpawn"> </div> : ""}</div>

                {!(x % boardSize) && <div className='Vspace' data-index={x}> </div>}
                </>}
                {!!(~~((x-1) / boardSize) % 2) && <>
                <div className='space'> </div>
                <div className='Hspace' data-index={x}> </div>
                {!(x % boardSize) && <div className='space'> </div>}
                </>}
            </>
            )}        
        </div>
    )
}


export default Board