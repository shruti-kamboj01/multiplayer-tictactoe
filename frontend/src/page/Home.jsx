import React, { useState } from 'react'
import multiplayerImg from '../assets/4330756.png'
import gameimg from '../assets/61oIpZLmHdL.png'
import { Link, useNavigate } from 'react-router-dom'



const Home = () => {
    
    
    const navigate = useNavigate()

    const enterRoom = (type) => {

        if(type == 'new') {
            navigate('/newRoom')
        }
        else {
            navigate('/joinRoom')
        }
    }
 
  return (
    <div className='flex w-11/12 items-center justify-evenly '>
        <div className='flex flex-col w-[50%] ml-6'>
            <img src={multiplayerImg} alt='multiplayerImg' width={400}/>
            <h1 className='text-8xl text-white font-bold'>Mutliplayer TicTacToe</h1>
            <div className='flex flex-row  items-center mt-10 gap-x-6'>
            
            <button 
            >
            <button className='bg-blue-300 w-fit p-1.5 px-4 rounded-lg text-lg font-bold hover:bg-blue-950 hover:text-blue-200 hover:bg-opacity-60'
                  onClick={() => enterRoom('new')}
            >
                Start New 
            </button>
            </button>
            
            <button className='bg-blue-300 w-fit  p-1.5 px-4 rounded-lg text-lg font-bold hover:bg-blue-950 hover:text-blue-200 hover:bg-opacity-60'
              onClick={() => enterRoom('join')}
             >Join Game</button>
            </div>
        </div>
        <div className=''>
            <img src={gameimg} alt='gameimg' width={400} height={300}/>
        </div>
        
    </div>
  )
}

export default Home