import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import GameGrid from './GameGrid';

const GameRoom = () => {

  const renderFrom = [[1,2,3], [4,5,6], [7,8,9]];

  const[gameState, setGameState] = useState(renderFrom)
  const[currentPlayer, setCurrentPlayer] = useState('circle')
  const[finishedState, setFinishedState] = useState(null)
  const [finishedStateArray, setFinishedStateArray] = useState([])
  
  const gameWinner = () => {
    for(let row = 0; row < gameState.length; row++) {
      //rowwise winner
      if(gameState[row][0] === gameState[row][1] && 
        gameState[row][1] === gameState[row][2]) {
        setFinishedStateArray([(row*3), (row*3)+1, (row*3)+2])
        return gameState[row][0]
      }
    }
    // columnwise winner
    for(let col = 0; col < gameState.length; col++) {
      if(gameState[0][col] === gameState[1][col] && 
        gameState[1][col] === gameState[2][col]) {
        setFinishedStateArray([(col + 3*0), (col+3*1), (col+3*2)])
        return gameState[0][col]
      }
    }
    // diagonal winner
    if(gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]) {
      setFinishedStateArray([0,4,7])
      return gameState[0][0]
    }
    if(gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]) {
      setFinishedStateArray(2,4,6)
      return gameState[0][2]
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if(e === 'circle' || e ==='cross' ) return true
    })

    if(isDrawMatch) return 'draw'
  }
  

  useEffect(() => {
    const winner = gameWinner()
    console.log(winner)
    if(winner) setFinishedState(winner)
  },[gameState])



  return (
    

   
    <div className='text-white  flex flex-col mt-12 gap-y-8'>
      <div className='flex flex-row justify-evenly '>
        <div className='bg-violet-200 bg-opacity-40 p-1 px-7 rounded-tr-3xl rounded-bl-3xl text-xl font-semibold'
        > 
        
        MySelf</div>
        <div className='bg-violet-200 bg-opacity-40 p-1 px-7 rounded-tr-3xl rounded-bl-3xl text-xl font-semibold'> Opponent </div>
      </div>
      <div className='text-3xl font-semibold mx-auto text-white bg-violet-200 bg-opacity-40
      p-1 px-3 rounded-md w-[33%] text-center'>
        Tic Tac Toe
      </div>
      <div className={`grid grid-cols-3 gap-4 items-center mx-auto -mt-2 ${finishedState != null ? "cursor-not-allowed" : "cursor-pointer"}`}>

      {gameState.map((arr, rowIndex) => 
        arr.map((ele, colIndex) => {
          return (
             <GameGrid id={rowIndex * 3 + colIndex} key={rowIndex * 3 + colIndex} setGameState={setGameState}
                      currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
                       finishedState={finishedState} finishedStateArray={finishedStateArray}
             />
          )
        })
      )}

      </div>

      <div className='text-xl mx-auto font-semibold text-blue-100'>
        <p>You are playing against {finishedState}</p>

        
      </div>
      {finishedState && finishedState !== 'draw' &&
        <h1 className='uppercase px-2 py-2 font-bold text-xl mx-auto text-fuchsia-700 '> {finishedState} won the game! </h1>}

        {finishedState && finishedState === 'draw' &&
          <h1 className='uppercase px-2 py-2 font-bold text-xl mx-auto text-fuchsia-700 '> It's a draw, Play again! </h1>}
    </div>
    
    
   

  
    

  )
}

export default GameRoom