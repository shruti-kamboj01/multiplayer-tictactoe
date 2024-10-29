import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { socketContext } from "../App";


const JoinRoom = () => {
  
  const [formData, setFormData] = useState({name:"", id:""});
  const {socket} = useContext(socketContext)
  // console.log(socket)
  const navigate = useNavigate()
  
  // const [opponentName, setOppnentName] = useState(null)



  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData( (prev) => ({...prev, [name]: value}))
  };
  
  socket?.emit("request_to_play", {
    playerName: formData.name,
    roomId: formData.id
  })
    

  const handleJoinRoom = (e) => {
    e.preventDefault()
    localStorage.setItem('playerName', formData.name)
    localStorage.setItem('roomId', formData.id)
    // if(connectSocket && !opponentName) {
    //    navigate('/loading')
    // }
    
      navigate('/gameRoom');
    
   
  }

  return (
    <div className="h-[89vh] w-[100vw] flex flex-col justify-center">
   
      <form onSubmit={handleJoinRoom}>
      <div className="flex flex-col items-center gap-y-3">
      <input
          type="text"
          placeholder="Enter your name..."
          value={formData.name}
          required
          name="name"
          onChange={handleChange}
          className="p-2 px-4 sm:w-[50%] md:w-[40%] rounded-md bg-blue-300 text-black font-medium placeholder:text-black placeholder:font-semibold outline-none"
        />
        <input type="text" placeholder="Enter room Id..." 
             value={formData.id}
             name="id"
             required
             onChange={handleChange}
            className="p-2 px-4 sm:w-[50%] md:w-[40%] rounded-md bg-blue-300 text-black font-medium placeholder:text-black placeholder:font-semibold outline-none"
        />
      </div>

      <div className="flex flex-row justify-center items-center mt-10 gap-x-6">
      <Link to={'/'}>
        <button className="bg-blue-300 w-fit p-1.5 px-4 rounded-lg text-lg font-bold hover:bg-blue-950 hover:text-blue-200 hover:bg-opacity-60">
          Back
        </button>
        </Link>
        
          <button className="bg-blue-300 w-fit p-1.5 px-4 rounded-lg text-lg font-bold hover:bg-blue-950 hover:text-blue-200 hover:bg-opacity-60"
          type="submit"
          >
          Join Room
        </button>
        </div>
      </form>
   
        
      
    </div>
  );
};

export default JoinRoom;
