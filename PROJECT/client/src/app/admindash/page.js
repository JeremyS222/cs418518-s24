import React from 'react'
import Link from 'next/link'  
import AdminDash from '@/components/AdminDashboard/AdminDash'
import Sidebar from '@/components/Sidebar/Sidebar'



const AdminDashboard = () => {
    
    return (
    <div> 

        <Sidebar /> 
        <AdminDash /> 

        {/* <Link href = "/login"></Link> 
        <Login/> */} 
    </div>
    
    )
}

export default AdminDashboard 
