import React from 'react'
import Wall from './Wall'

const HorizontalRow = ({ boardSize, rowNumber, handleClick, walls}) => {
    const cells = []

    for(let i=0; i<boardSize; i++) {
      //const x = rowNumber * boardSize + i
        cells.push( <Wall x={i} y={rowNumber} type='horizontal' walls={walls} key={'horizontal' + i}
        handleClick={handleClick}/> )
        cells.push(<Wall x={i} y={rowNumber} type='space' key={'space' + i} />)
    }

    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default HorizontalRow