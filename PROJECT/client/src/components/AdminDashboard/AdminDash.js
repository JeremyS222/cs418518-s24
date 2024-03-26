"use client"

import React, { useState, useEffect } from 'react'
import './AdminDash.css' 
import Link from 'next/link' 

const AdminDash = () => {

  const [coursesArray, setCoursesArray] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [prerequisiteCourse, setPrerequisiteCourse] = useState("");

  let courseIdTemp;  
  let foundCourseId = false; 

  const dashBackgroundColor = "#0E021C";  
    
  const getCoursesData = async() => {

    console.log(" GET THE COURSES! "); 
  let JSONdata; 
  let options = {
    method: "GET", 
    headers: {
    "Content-Type" : "application/json"
    }
  }

  let res = await fetch("http://localhost:6002/user/courses", options); 
  let data = await res.json(); 
  console.log("TESTING THIS " + JSON.stringify(data[1].course_id)); 

  setCoursesArray(data); 

  return coursesArray; 
  }

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handlePrerequisiteCourseChange = (event) => {
    setPrerequisiteCourse(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    const newCourse = {
      courseName,
      prerequisiteCourse,
    };
    setCoursesArray([...coursesArray, newCourse]);

    await submitPCourses(); 
  };

  const updateCourseStatus = async() => {

    for (let i = 0; i < coursesArray.length; i++) {
        if(foundCourseId != true){
          console.log("UpdateCourseStatus BEFORE THE IF STATEMENT, FROM ARRAY " + coursesArray[i].course_name)
          console.log("UpdateCourseStatus BEFORE THE IF STATEMENT, FROM VARIABLE" + coursesArray[i].course_name)
          if (courseName.toLowerCase() === coursesArray[i].course_name.toLowerCase()){
              console.log("UpdateCourseStatus  BEFORE CHECK " + courseIdTemp)
            courseIdTemp = coursesArray[i].course_id; 
            foundCourseId = true; 
              console.log("UpdateCourseStatus AFTER CHECK " + courseIdTemp)
          }
        else {
          console.log("UpdateCourseStatus FOUND COURSE ID IS TRUE" + courseIdTemp)
          break;
        }
      }
    }

    console.log("UpdateCourseStatus OUT OF FOR LOOP, COURSE ID TEMP " + courseIdTemp)
    let statusTemp = 1;

    const formBody = JSON.stringify({
      course_id: courseIdTemp,
      pc_name: courseName, 
      course_name: prerequisiteCourse, 
      added_status: statusTemp, 
    }); 
    console.log("UpdateCourseStatus  AFTER FORM BODY " + courseIdTemp, " ", courseIdTemp, " ", courseName, " ", prerequisiteCourse, " ", statusTemp)
    let options = {
      method: "PUT", 
      body: formBody, 
      headers: {
        "Content-Type" : "application/json"
      }
    }

    let url = process.env.API_URL;

    let res = await fetch(`http://localhost:6002/user/UpdateCourseStatus/${courseIdTemp}`, options); 

    const data = await res.json(); 

  };

  const submitPCourses = async() => {

    for (let i = 0; i < coursesArray.length; i++) {
        if(foundCourseId != true){
          console.log("BEFORE THE IF STATEMENT, FROM ARRAY " + coursesArray[i].course_name)
          console.log("BEFORE THE IF STATEMENT, FROM VARIABLE" + coursesArray[i].course_name)
          if (courseName.toLowerCase() === coursesArray[i].course_name.toLowerCase()){
              console.log("BEFORE CHECK " + courseIdTemp)
            courseIdTemp = coursesArray[i].course_id; 
            foundCourseId = true; 
              console.log("AFTER CHECK " + courseIdTemp)
          }
        else {
          console.log("FOUND COURSE ID IS TRUE" + courseIdTemp)
          break;
        }
      }
    }

    if (foundCourseId === false){
      console.log("BREAK OUT OF FUNCTION " + foundCourseId); 
      return; 
    }

    console.log("OUT OF FOR LOOP, COURSE ID TEMP " + courseIdTemp)
    let statusTemp = 1;

    const formBody = JSON.stringify({
      course_id: courseIdTemp,
      pc_name: courseName, 
      course_name: prerequisiteCourse, 
      added_status: statusTemp, 
    }); 
    console.log("AFTER FORM BODY " + courseIdTemp, " ", courseIdTemp, " ", courseName, " ", prerequisiteCourse, " ", statusTemp)
    let options = {
      method: "POST", 
      body: formBody, 
      headers: {
        "Content-Type" : "application/json"
      }
    }

    let url = process.env.API_URL;

    let res = await fetch("http://localhost:6002/user/UpdatePrerequistes", options); 

    const data = await res.json();
    
    await updateCourseStatus(); 


  }; 

  useEffect(() => {
    getCoursesData(); 
  }, []);

  return (
    
    <div id = "BackgroundTest" 
    className = "grid gap-8 items-start justify-center h-screen" 
    style = {{ backgroundColor: dashBackgroundColor }}
    > 
        <div className = "">
              <h1 className = "text-white text-center font-bold text-2x1 ">
              TESTING 
                <ul className = "grid grid-col3 gap-x-8 gap-y-2">
                  {coursesArray.map((course) => (
                    <li key={course.course_id} className = "items-center">
                      <span className = "font-bold text-xl">{course.level}</span>
                      <span className = "font-bold text-xl">{course.course_name}</span> 
                      {course.added_status ? 
                        <span className = "text-green-500 font-bold" style={{ color: "green" }}>Added</span> 
                        : <span className = "text-red-500 font-bold"style={{ color: "red" }}>Not added</span>}
                    </li>
                  ))}
              </ul>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className = "flex justify-center flex-row">
                <input 
                type="text" 
                placeholder="Course Name" 
                value={courseName} 
                onChange={handleCourseNameChange} 
                className = "appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" 
              />
              <input 
                type="text" 
                placeholder="Prerequisite Course" 
                value={prerequisiteCourse} 
                onChange={handlePrerequisiteCourseChange} 
                className = "appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none " 
              />
              </div>
              <button onClick = {submitPCourses} type="submit" className = "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Submit Form
              </button>
            </form>
          
            <div className = "box1 bg-white">
                
            </div> 
        </div>

    </div>); 
    }

  export default AdminDash  

