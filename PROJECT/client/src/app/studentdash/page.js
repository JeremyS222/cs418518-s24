import React from 'react'
import Link from 'next/link'  
import StudentDash from '@/components/StudentDashboard/StudentDash'
import Sidebar from '@/components/Sidebar/Sidebar'



const StudentDashboard = () => {
    
    return (
    <div>
         
        <Sidebar /> 

        <StudentDash /> 
        


        {/* <Link href = "/login"></Link> 
        <Login/> */} 
    </div>
    
    )
}

export default StudentDashboard 
