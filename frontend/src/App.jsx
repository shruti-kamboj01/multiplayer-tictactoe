import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import GameRoom from './components/GameRoom'
import JoinRoom from './page/JoinRoom'
import { createContext, useState } from 'react'
import socketIO from 'socket.io-client'



const socketContext = createContext(null);

function App() {
  const [socket, setSocket] = useState(null)
  const connectSocket = () => {
      if(!socket) {
        const newSocket = socketIO.connect('http://localhost:9000')
        setSocket(newSocket)
      }
    }
  return (
    <>
    <socketContext.Provider value={{socket, connectSocket}} >
      <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/gameRoom' element={<GameRoom />} />
          <Route path='/startGame' element= {<JoinRoom />} />

    
        </Routes>
    </socketContext.Provider>
      
      
    </>
  )
}

export default App
export {socketContext}
