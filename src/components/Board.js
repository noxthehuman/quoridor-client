import './Board.css'
import { useRef, useEffect, useState} from 'react';

const Board = () => {

    const board = useRef();
    const boardSize = 5;
    const nbElements = boardSize * (2 * boardSize - 1);
    const tiles = [...Array(nbElements + 1).keys()].splice(1)
    const [posW, setPosW] = useState(~~(boardSize / 2));
    const [posB, setPosB] = useState(nbElements - ~~(boardSize / 2));
    const [walls, setWalls] = useState([]);

    const clg = (e) => {
        console.log(e.target)
    }

    return (
        <div className='grid' onClick={clg} style={{gridTemplateColumns: `repeat(${2*boardSize+1}, 1fr)`}}>
            {tiles.map(x => 
            <>
                {!(~~((x-1) / boardSize) % 2) && <>
                <div className='Vspace'> </div>
                <div className={`cell ${x == posW? "PawnW": x == posB? "PawnB" : ""}`} > </div>
                {!(x % boardSize) && <div className='Vspace'> </div>}
                </>}
                {!!(~~((x-1) / boardSize) % 2) && <>
                <div className='space'> </div>
                <div className='Hspace'> </div>
                {!(x % boardSize) && <div className='space'> </div>}
                </>}
            </>
            )}        
        </div>
    )
}


export default Board