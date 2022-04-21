import React from 'react'
import Wall from './Wall'

const HorizontalRow = ({ boardSize, rowNumber, handleClick, walls}) => {
    const cells = []

    for(let i=0; i<boardSize; i++) {
      const isWall = Array.isArray(walls) ? walls.find(wall => {
        return wall.x === i && wall.y === rowNumber && (wall.type === 'horizontal' || wall.type === 'vertical')
      }) : false

        cells.push( <Wall x={i} y={rowNumber} type='horizontal' walls={walls} key={'horizontal' + i}
        handleClick={handleClick}/> )
        cells.push( <Wall x={i} y={rowNumber} type={isWall ? 'wall' : 'space'} key={'space' + i} />)
    }

    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default HorizontalRow