import React from 'react'
import Wall from './Wall'

const HorizontalRow = ({ boardSize, rowNumber}) => {
    const cells = []

    for(let i=0; i<boardSize; i++) {
      const x = rowNumber * boardSize + i
        cells.push( <Wall x={x} type='horizontal' key={'horizontal' + i}/> )
        cells.push(<Wall x={x} type='space' key={'space' + i} />)
    }

    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default HorizontalRow