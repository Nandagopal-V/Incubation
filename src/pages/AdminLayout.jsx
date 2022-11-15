import React from 'react'
import { Outlet } from 'react-router-dom'
import Content from '../components/content/content'
import Sidebar from '../components/sidebar/sidebar'

const AdminLayout = () => {
  return (
    
    <div className='flex'>
      <div>
        <Sidebar/>
      </div>
      <div className='w-full ml-[175px] px-2 ' >
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout
