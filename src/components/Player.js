import React from 'react'
import WhiteCounter from './WhiteCounter';
import BlackCounter from './BlackCounter';

const Player = ({x,y,posW, posB, handleClick, type}) => {
    let counter
    if(posW.x === x && posW.y === y) {
        counter = <WhiteCounter/>  
    }

    if(posB.x === x && posB.y === y) {
        counter = <BlackCounter/>
    }
  return (
    <div type='move' className='move' data-index={x} onClick={() => handleClick(x, y, type)}> 
    {counter} 
    </div>
  )
}

export default Player