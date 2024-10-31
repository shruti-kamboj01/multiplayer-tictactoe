import React, { useContext, useEffect, useState } from 'react'

import GameGrid from './GameGrid';
import { socketContext } from '../App';


const GameRoom = () => {
  const name = localStorage.getItem("playerName")
  const roomId = localStorage.getItem("roomId")
  const {connectSocket, socket} = useContext(socketContext)
  
  const renderFrom = [[1,2,3], [4,5,6], [7,8,9]];

  const[gameState, setGameState] = useState(renderFrom)
  const[currentPlayer, setCurrentPlayer] = useState('circle')
  const[finishedState, setFinishedState] = useState(null)
  const [finishedStateArray, setFinishedStateArray] = useState([])
  const [opponentName, setOpponentName] = useState(null)
  const [loading, setLoading] = useState(false)
  const [playerName, setPlayerName] = useState(null)

  

  useEffect(() => {
    if (connectSocket && !opponentName) {
      setLoading(true);
    }
    setPlayerName(name)
  }, [connectSocket, opponentName]);

  socket?.emit("request_to_play", {
    playerName: name,
    roomId: roomId
  })

  socket?.on("OpponentNotFound", function() {
    setOpponentName(false)
  })

  socket?.on("OpponentFound", function(data) {
    setOpponentName(data.opponentName)
    setLoading(false)
  })
  
  
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
    // console.log(winner)
    if(winner) setFinishedState(winner)
  },[gameState])

//  console.log(loading)

  return (
    
    <>
    {loading ? 
    <div className='flex flex-col justify-center items-center h-[89vh] w-[89vw]'>
    <p className='loader'></p>
    <h1 className='text-slate-300 font-semibold text-xl mt-2'> Waiting for oponant...</h1>
    </div>
     : 
      <div className='text-white  flex flex-col mt-12 gap-y-8'>
      <div className='flex flex-row justify-evenly '>
        <div className='bg-violet-200 bg-opacity-40 p-1 px-7 rounded-tr-3xl rounded-bl-3xl text-xl font-semibold'
        > 
        
        {playerName}</div>
        <div className='bg-violet-200 bg-opacity-40 p-1 px-7 rounded-tr-3xl rounded-bl-3xl text-xl font-semibold'>{opponentName} </div>
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
        <p>You are playing against </p>

        
      </div>
      {finishedState && finishedState !== 'draw' &&
        <h1 className='uppercase px-2 py-2 font-bold text-xl mx-auto text-fuchsia-700 '> {finishedState} won the game! </h1>}

        {finishedState && finishedState === 'draw' &&
          <h1 className='uppercase px-2 py-2 font-bold text-xl mx-auto text-fuchsia-700 '> It's a draw, Play again! </h1>}
    </div>
    }
 
    </>
   
  
    
    
   

  
    

  )
}

export default GameRoom