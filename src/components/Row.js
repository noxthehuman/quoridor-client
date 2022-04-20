import React from 'react'
import Player from './Player'
import Wall from './Wall'

const Row = ({posB, posW, boardSize, rowNumber, handlePlayerClick}) => {
    const cells = []

    
    for(let i=0; i <boardSize; i++) {
        const x = rowNumber * boardSize + i
        cells.push( <Player x={i} y={rowNumber} posB={posB} posW={posW} handlePlayerClick={handlePlayerClick} key={'player' + i}/> )
        cells.push(<Wall x={x} type='vertical' key={'vertical' + i}/>)
    }

    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default Row