import React from 'react'
import WhiteCounter from './WhiteCounter';
import BlackCounter from './BlackCounter';

const Player = ({x,y,posW, posB, handlePlayerClick}) => {
    let counter
    if(posW.x === x && posW.y === y) {
        counter = <WhiteCounter/>  
    }

    if(posB.x === x && posB.y === y) {
        counter = <BlackCounter/>
    }
  return (
    <div className="move" data-index={x} onClick={() => handlePlayerClick(x, y)}> 
    {counter} 
    </div>
  )
}

export default Player