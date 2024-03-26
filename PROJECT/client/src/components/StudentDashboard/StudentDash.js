"use client"

import React, {useState} from 'react'
import './StudentDash.css' 
import Link from 'next/link' 

const StudentDash = () => {
    
    const dashBackgroundColor = "#0E021C";  

    return (
    
    <div id = "BackgroundTest" 
    className = "grid gap-8 items-start justify-center h-screen" 
    style = {{ backgroundColor: dashBackgroundColor }}
    > 
        <div className = "submissionBox bg-blue-70">
            <div className = "box1 bg-white">
                <div className = "header1">
                    <div className = "box1Text"> 
                        Date
                    </div>
                    <div className = "box1Text2"> 
                        Date
                    </div>
                </div>
            </div>
            <div className = "box2 bg-white">
                <div className = "header1">
                    <div className = "box1Text"> 
                        Term
                    </div>
                    <div className = "box1Text2"> 
                        Date
                    </div> 
                </div>
            </div>
            <div className = "box3 bg-white">
                <div className = "header1">
                    <div className = "box1Text"> 
                        Status
                    </div> 
                    <div className = "box1Text2"> 
                        Date
                    </div> 
                </div>    
            </div> 
        </div>
    </div>)
    
}  
  export default StudentDash 

