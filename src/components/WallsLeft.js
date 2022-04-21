import React from 'react'

const WallsLeft = ({walls, boardSize}) => {
    const cells = []
    for(let i=0; i <walls; i++) {
        cells.push(<div className='wall' key={'blackwall' + i}> |  </div> )
        cells.push(<div className='space' key={'blackspace' + i}> </div>)
    }
    for(let i=walls + 1; i <boardSize + 1; i++) {
      cells.push(<div className='space' key={'blackwall' + i}> |  </div> )
      cells.push(<div className='space' key={'blackspace' + i}> </div>)
  }
    cells.pop()

  return ( 
    <>
        {cells}
    </>
  )
}

export default WallsLeft
