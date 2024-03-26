"use client"

import React, {PureComponent, useState, useEffect } from 'react' 
import './SubmissionForm.css' 
import Link from 'next/link' 
import DropDownMenus from '../DropDownMenus/DropDownMenus'
import CoursePlanMenus from '../CoursePlanMenus/CoursePlanMenus'

const Submission = () => {
    
    const dashBackgroundColor = "#0E021C";  

    let formArray = []; 
    let [formId, setFormId] = useState(null); 

    const getCurrentFormId = async() => {
        console.log(" GET THE FORMS! "); 
        let JSONdata; 
        let options = {
        method: "GET", 
        headers: {
        "Content-Type" : "application/json"
        }}
    
        let res = await fetch("http://localhost:6002/user/form", options); 
        formArray = await res.json(); 
        console.log("TESTING FORM  " + JSON.stringify(formArray[0].form_id)); 
    
        formId = Object.keys(formArray).length; 
        formId++; 
        console.log(formId); 

        return formId;  
    }    

  const submitForm = async() => {
    
    console.log(" Form Submission Button Pressed! "); 

    const formBody = JSON.stringify({
      u_email: email, 
      u_firstname: firstName, 
      u_lastname: lastName, 
      u_password: password, 
      u_username: username, 
    }); 

    let options = {
      method: "POST", 
      body: formBody, 
      headers: {
        "Content-Type" : "application/json"
      }
    }
    
    let url = process.env.API_URL;

    let res = await fetch("http://localhost:6002/user", options); 

    const data = await res.json(); 
  }; 


    let  [dropdownInstances, setDropdownInstances] = useState([]);
    let  [coursePlanInstances, setCoursePlanInstances] = useState([]);

    const [lastTerm, setLastTerm] = useState("");  
    const [lastGpa, setLastGpa] = useState("");  
    const [currentTerm, setCurrentTerm] = useState("");  
    const [studentId, setStudentId] = useState("");  

    let addDropDownComponent = () => {
        let newInstance = <DropDownMenus key = {dropdownInstances.length} /> 
        setDropdownInstances([dropdownInstances, newInstance]); 
    }

    let addCourseMenuComponent = () => {
        let newCoursePlanInstance = <CoursePlanMenus key = {dropdownInstances.length} /> 
        setCoursePlanInstances([coursePlanInstances, newCoursePlanInstance]); 
    }

    useEffect(() => {
        getCurrentFormId().then((id) => {setFormId(id);
        }); 
      }, []);
    
    return (
    
    <div id = "BackgroundTest" 
    className = "grid gap-8 items-start justify-center h-screen" 
    style = {{ backgroundColor: dashBackgroundColor }}
    > 
        <div>
            <form>
                <h1></h1>
                    <div className = "LastTermBox">
                        <input 
                            type = "text"  
                            placeholder = "Your Last Term" 
                            required 
                            onChange = {(e) => {
                                setLastTerm(e.target.value);
                              }}>
                        </input>
                    </div>
                    <div className = "LastGpaBox">
                        <input 
                            type = "text"  
                            placeholder = "Your Last Term's GPA" 
                            required 
                            onChange = {(e) => {
                                setLastGpa(e.target.value);
                              }}>
                        </input>
                    </div>
                    <div className = "CurrentTermBox">
                        <input 
                            type = "text"  
                            placeholder = "Your Current Term" 
                            required 
                            onChange = {(e) => {
                                setCurrentTerm(e.target.value);
                              }}>
                        </input>
                    </div>
                    <div className = "StudentIdBox">
                        <input 
                            type = "text"  
                            placeholder = "Your Student ID" 
                            required 
                            onChange = {(e) => {
                                setStudentId(e.target.value);
                              }}>
                        </input>
                    </div>
                    <div id = "PrereequistesDropDownContainer"> 
                        <button 
                                id = "DropDownButton" 
                                className ="bg-white" 
                                onClick = {addDropDownComponent}> 
                                    Add another row 
                        </button> 
                        {dropdownInstances.map((instance, index) => (
                            <div key = {index}>{instance}</div> 
                        ))}
                    </div>
                    <div id = "CourePlanDropDownContainer"> 
                        <button 
                                id = "CoursePlanButton"  
                                className ="bg-white" 
                                onClick = {() => addCourseMenuComponent ({formId})}> 
                                    Add another row 
                        </button> 
                        {coursePlanInstances.map((instance, index) => (
                            <div key = {index}>{instance}</div> 
                        ))}
                    </div>
            </form>
        </div>
    </div>)
    
}  
  export default Submission 

