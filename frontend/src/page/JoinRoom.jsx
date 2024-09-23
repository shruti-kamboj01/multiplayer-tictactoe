import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleJoinRoom = () => {
    navigate('/gameRoom', {state: {playerName: name}});
  }

  return (
    <div className="h-[89vh] w-[100vw] flex flex-col justify-center">
      <div className="flex flex-col items-center gap-y-3">
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={handleChange}
          className="p-2 px-4 sm:w-[50%] md:w-[40%] rounded-md bg-blue-300 text-black font-medium placeholder:text-black placeholder:font-semibold outline-none"
        />
        <input type="text" placeholder="Enter room Id..." 
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
          onClick={handleJoinRoom}
          >
          Join Room
        </button>
        
      </div>
    </div>
  );
};

export default JoinRoom;
