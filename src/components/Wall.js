const Wall = ({type, handleClick, y, x, walls}) => {
  
  let isWallX = false
  let isWallY = false
  
    // if(Array.isArray(walls)){
    //   for (let wall of walls) {
    //     for (const [key, val] of Object.entries(wall)) {
    //       if(key === 'x' && val === x) {
    //         isWallX = true
    //       }
    //       if(key === 'y' && val === y && isWallX) {
    //         isWallY = true
    //       }
    //     }
    //   }
    // }

  return (
    <>
    {isWallX && isWallY ? <div className='walls'> </div> : <div className={type}  onClick={()=> handleClick(x, y, type)}> </div> }
    </>
    // <div className={walls?.includes(x) ? 'wall' : type} onClick={()=> handleClick(x, y, type)} > </div>
  )
}

export default Wall