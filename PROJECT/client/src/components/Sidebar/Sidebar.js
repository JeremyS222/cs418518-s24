"use client"

import React, {useState} from 'react'
import './Sidebar.css' 
import Link from 'next/link' 

const Sidebar = () => {
  
  

    return (
      
      
      <aside className = "h-screen w-64 absolute">
        <nav className = "h-full flex flex-col bg-BlueGrayColor-20 border-r border-BlueGrayColor-90 shawdow-sm">
            <div className = "p-4 pb-2 flex justify-between items-center"> 
              <h1 className = "Text1 ">
                  
              </h1>
            </div>
        </nav> 
      </aside> 

      

    /* <sidebar 
    >
      <div className = "bg-white h-screen w-48"> 

      </div>

    </sidebar> */

      

    )
    
}  

export default Sidebar 


  /* 
  export function SidebarItem ({icon, text, active, alert}){
    return (

    )
  } */
