import './Board.css'
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from "../consts"

const Board = ({turn, setTurn}) => {

    const boardSize = 9;
    const nbElements = boardSize * (2 * boardSize - 1);
    const tiles = [...Array(nbElements + 1).keys()].splice(1)
    const [posB, setPosB] = useState(~~(boardSize / 2) + 1);
    const [posW, setPosW] = useState(nbElements - ~~(boardSize / 2));
    const [order, setOrder] = useState(1);
    const [walls, setWalls] = useState([]);
    const { gameId } = useParams()

    const handleClick = async (e) => {
        let type = e.target.className;
        if (type === "space") { return };
        if (type === "white" || type === "black") { type = "move" };
        const idx = +e.target.dataset.index;
        console.log("idx", idx)
        const move = {
            x: (type === "move" || type === "vertical") ? idx % (2 * boardSize) : (idx + boardSize) % (2 * boardSize),
            y: (type === "move" || type === "vertical") ? boardSize - ~~(idx / (2 * boardSize)) : boardSize - ~~((idx + boardSize) / (2 * boardSize)),
            action: type,
            order: order,
            player: turn,
            game: gameId
        }
        console.log("move", move);
        const { data } = await axios.post(`${API_URL}/game/${gameId}`, move, { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } });
        console.log("data", data);
        if (!data?.action) {
            console.log("invalid move");
            return;
        }
        if (type === "horizontal" || type === "vertical")
            setWalls([...walls, idx]);
        if (turn === 'white') {
            if (type === "move") {
                setPosW(idx);
            }
            setTurn('black')
        }
        if (turn === 'black') {
            if (type === "move") {
                setPosB(idx);
            }
            setTurn('white');
        }
        setOrder(order + 1);
    }

    return (
        <div className='board'> 
        <div className='grid' onClick={handleClick} style={{ gridTemplateColumns: `repeat(${boardSize - 1}, 5fr 1fr) 5fr` , gridTemplateRows: `repeat(${boardSize - 1}, 5fr 1fr) 5fr` }}>
            {tiles.map(x =>
                <>
                    {!(~~((x - 1) / boardSize) % 2) && <>
                        <div className="move" data-index={x}> {x === posW ? <div className="white" data-index={x}> </div> : x === posB ? <div className="black" data-index={x}> </div> : ``}</div>
                        {!!(x % boardSize) && (walls.includes(x) || walls.includes(x + 2 * boardSize) ? <div className='wall'> </div> : <div className='vertical' data-index={x}> </div>)}
                    </>}
                    {!!(~~((x - 1) / boardSize) % 2) && <>
                        {walls.includes(x) || walls.includes(x - 1) ? <div className='wall'> </div> : <div className='horizontal' data-index={x}> </div>}
                        {!!(x % boardSize) && (walls.includes(x) || walls.includes(x + boardSize) ? <div className='wall'> </div> : <div className='space'> </div>)}
                    </>}
                </>
            )}
        </div>
        </div>
    )
}

export default Board