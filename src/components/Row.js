import React from 'react'
import Player from './Player'
import Wall from './Wall'

const Row = ({posB, posW, boardSize, rowNumber, handleClick, walls}) => {
    const cells = []

    for(let i=0; i <boardSize; i++) {
      
        cells.push( <Player x={i} y={rowNumber} posB={posB} posW={posW} 
        handleClick={handleClick} type='move' key={'player' + i}/> )
        cells.push(<Wall x={i}  y={rowNumber} type='vertical' walls={walls} key={'vertical' + i}
        handleClick={handleClick} />)
    }

    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default Row