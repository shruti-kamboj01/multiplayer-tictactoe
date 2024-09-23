import React, { useState } from 'react'

const Modal = ({modalData}) => {

    const[name, setName] = useState("")

   const changeHandler = (e) => {
        setName(e.target.value)
   }

  return (
    <div>
         <input type='text'
         placeholder='Enter your name' 
         value={name}
         onChange={changeHandler}
         />
          
          <div>
          <button> {modalData.btn1Handler} </button>
          <button> {modalData.btn2Handler} </button>
          </div>
         
    </div>
  )
}

export default Modal