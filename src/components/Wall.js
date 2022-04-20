const Wall = ({type, handleClick, y, x, walls}) => {
  
    const isWall = Array.isArray(walls) ? walls.find(wall => {
      return wall.x === x && wall.y === y && wall.type === type
    }) : false
    
  return (
    <>
    {isWall ? <div className='wall'> </div> : <div className={type}  onClick={()=> handleClick(x, y, type)}> </div> }
    </>
  )
}

export default Wall