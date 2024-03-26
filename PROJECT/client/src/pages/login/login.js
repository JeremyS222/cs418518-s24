import React from 'react'
import Link from 'next/link'  
import Login from '@/components/login/Login'

const LoginPage = () => {
    
    return (
    <div> 
        <Link href = "/login"></Link> 
        <Login/>
    </div>
    
    )
}

export default LoginPage 
