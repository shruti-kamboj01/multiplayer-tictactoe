import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import GameRoom from './components/GameRoom'
import JoinRoom from './page/JoinRoom'
import NewRoom from './page/NewRoom'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/gameRoom' element={<GameRoom/>} />
        <Route path='/joinRoom' element= {<JoinRoom/>} />
        <Route path='/newRoom' element= {<NewRoom/>} />
      </Routes>
      
    </>
  )
}

export default App
