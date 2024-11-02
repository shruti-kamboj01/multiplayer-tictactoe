import React, { useState } from 'react'

const GameGird = ({socket, currentEle , setGameState, key, id, currentPlayer, setCurrentPlayer,finishedState,finishedStateArray}) => {
 
  const circleSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
  
  const crossSvg = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M19 5L5 19M5.00001 5L19 19"
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
  const [icon, setIcon] = useState(null)
  const  clickOnSquare= () => {
    if(finishedState != null) return;
       if(!icon ) {
           if(currentPlayer === 'circle') {
            setIcon(circleSvg)
           }else {
            setIcon(crossSvg)
           }
           const myCurrentPlayer = currentPlayer;
           socket.emit("PlayerMoveFromClient", {
            state:{
              id,
              sign: myCurrentPlayer
            }
           })
           setCurrentPlayer(currentPlayer === 'circle' ? 'cross' : 'circle')
           setGameState((prevState => {
            let newState = [...prevState]
            let rowIndex = Math.floor(id/3)
            let colIndex = id%3
            newState[rowIndex][colIndex] = myCurrentPlayer
            // console.log(newState)
            return newState
           }))
        }

  }
  // console.log(finishedStateArray)
  return (
    <div className={`bg-violet-300 w-24 h-24 bg-opacity-35 rounded-md ${finishedStateArray.includes(id) ? "bg-pink-600" : ""}`}
    onClick={clickOnSquare}>
         {currentEle === 'circle' ? circleSvg : currentEle === 'cross' ? crossSvg : icon}
    </div>
  )
}

export default GameGird