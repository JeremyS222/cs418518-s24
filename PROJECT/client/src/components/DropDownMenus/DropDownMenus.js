/* "use client"

import React, {useState, useEffect} from 'react'
import Link from 'next/link' 

const DropDownMenus = () => {
  
    let tempArray = ["test1", "test2", "test3"]; 
    let  [hasPopulatedDropdown, setHasPopulatedDropdown] = useState(false); 


    const populatePcDropdown = (elementId) => {
      let  select = document.getElementById(elementId);
      for (let i = 0; i < tempArray.length; i++) {
        let option = document.createElement("option");
        let text = document.createTextNode(tempArray[i]); 
        option.appendChild(text); 
        option.setAttribute("value", tempArray[i]); 
        select.insertBefore(option, select.lastChild); 
        
      }
    };
  
    
    useEffect(() => {
        if (!hasPopulatedDropdown) {
            populatePcDropdown("left-dropdown");
            populatePcDropdown("right-dropdown");
            setHasPopulatedDropdown(true); ``
          }
        }, [hasPopulatedDropdown]);
  

    return (
        
        <div className="dropdown-container">
            <select id ="left-dropdown">
                <option value="option1">Pick a Course Level</option>  
            </select>
            <select id ="right-dropdown">
                <option value="optionA">Pick a Course</option>
            </select>
        </div>
              
    )
}  
  export default DropDownMenus 

 */ 

  import React, { useState, useEffect } from 'react';

const DropDownMenus = () => {
  const tempArray = ["test1", "test2", "test3"];
  const [hasPopulatedDropdown, setHasPopulatedDropdown] = useState(false);
  let [leftOptions, setLeftOptions] = useState([
    { text: 'Pick a Prerequiste Course Level', value: 'leftOption1' },
  ]);
  let  [rightOptions, setRightOptions] = useState([
    { text: 'Pick a Prerequiste Course', value: 'rightOption1' },
  ]);

  const [selectedLeftValue, setSelectedLeftValue] = useState('leftOption1'); 
  const [selectedRightValue, setSelectedRightValue] = useState('rightOption1'); 

  const [courses, setCourses] = useState([]);

  // let courses; 
  let coursesArray = []; 
  

  

  let populatePcDropdown = async (elementId) => {
    if (hasPopulatedDropdown === false) { //(hasPopulatedDropdown === false) { 


      await getCoursesData(); 
      console.log("IN populatePcDropdown"  + JSON.stringify(coursesArray[0])); 
      setLeftOptions((prevOptions) => [
        ...prevOptions,
        ...coursesArray.map((prerequiste) => ({ key: prerequiste.level, text: prerequiste.level, value: prerequiste.level })),
      ]);
      setRightOptions((prevOptions) => [
        ...prevOptions,
        ...coursesArray.map((prerequiste) => ({ key: prerequiste.course_name, text: prerequiste.course_name, value: prerequiste.course_name })),
      ]);
      setHasPopulatedDropdown(true);
    }
  };


  
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
    coursesArray = await res.json(); 
    
    

    console.log("TESTING THIS " + JSON.stringify(coursesArray[1].level)); 

     return coursesArray; 
}


  useEffect(() => {
    // getCoursesData();   // TEST 
    populatePcDropdown("left-dropdown");
    populatePcDropdown("right-dropdown");
  }, [hasPopulatedDropdown]);

  return (
    <div className="dropdown-container">
      <select 
        id="left-dropdown"
        value={selectedLeftValue}
        onChange={(e) => setSelectedLeftValue(e.target.value)}
      > 
        {leftOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <select 
        id="right-dropdown"
        value={selectedRightValue}
        onChange={(e) => setSelectedRightValue(e.target.value)}
      >
        {rightOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownMenus;