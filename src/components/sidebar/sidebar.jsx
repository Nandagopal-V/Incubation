import React,{useEffect} from 'react'
import {useNavigate } from 'react-router-dom';

const menu=[
  {
    menuItem:"Application List",
    path:"/admin/applicationlist"
  },
  {
    menuItem:"Approved List",
    path:"/admin/recordedtrack"
  },
  {
    menuItem:"Declined List",
    path:"/admin/declinedlist"
  },
  {
    menuItem:"Booking Slots",
    path:"/admin/bookingslots"
  }

]

function Sidebar() {
const navigate = useNavigate();

useEffect(()=>{
  navigate('/admin/applicationlist');
},[])

const logoutHandler = async ()=>{
 await localStorage.removeItem('admintoken')
  navigate('/adminlogin')

}



  return (
    
    
    <div  className="bg-orange-600 w-[175px] px-5 text-white h-screen pt-5 fixed left-0 top-0 " >
    <h1 className='font-bold  text-2xl '>CUBS-IN</h1>
    <div className='pt-[100px]' >
    <ul>
{
  menu.map((menuitem)=>{
    return(
      <li className={`${window.location.pathname==menuitem.path && "text-black"} pb-7 cursor-pointer  hover:text-black`} onClick={() => { 
        navigate(menuitem.path)
      }}>{menuitem.menuItem}</li>
    )
   
  })
}
<li className='cursor-pointer  hover:text-black' onClick={logoutHandler}>Logout</li>
</ul>
</div>
    </div>
   
  )
}

export default Sidebar
