import React from 'react'
import {useNavigate } from 'react-router-dom';


function Navbar() {

const navigate = useNavigate();

   

  const logoutHandler = async ()=>{
        await localStorage.clear()
        navigate('/login')
    
    }

  return (
    <div>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-orange-500 shadow sm:items-baseline w-full">
  <div className="mb-2 sm:mb-0">
    <a href="" className="text-3xl no-underline text-white hover:text-gray-500 font-bold">CUBS-IN</a>
  </div>
  <div>
    <a href="" className="text-lg no-underline  text-white hover:text-blue-dark ml-2 pr-16">Welcome!</a>
    <a onClick={logoutHandler} className="text-lg no-underline  text-white hover:text-blue-dark ml-2 font-bold cursor-pointer">Logout</a>
  </div>
</nav>
    </div>
  )
}

export default Navbar