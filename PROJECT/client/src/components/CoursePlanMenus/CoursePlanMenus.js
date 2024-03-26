  import React, { useState, useEffect } from 'react';

const CoursePlanMenus = ({formId}) => {

  const [hasPopulatedDropdown, setHasPopulatedDropdown] = useState(false);
  let [leftOptions, setLeftOptions] = useState([
    { text: 'Pick a Course Level', value: 'leftOption' },
  ]);
  let  [rightOptions, setRightOptions] = useState([
    { text: 'Pick a Course', value: 'rightOption' },
  ]);

  const [selectedLeftValue, setSelectedLeftValue] = useState('leftOption'); 
  const [selectedRightValue, setSelectedRightValue] = useState('rightOption'); 

  const [courses, setCourses] = useState([]);

  let coursesArray = []; 
  let formArray = []; 
  

  

  let populatePcDropdown = async (elementId) => {
    if (hasPopulatedDropdown === false) { 


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



const updateStudentCourseData = async() => {
  console.log(" Sign Up Button Pressed! "); 
  const formBody = JSON.stringify({
    form_id: {formId},
    course_name: selectedRightValue,
  }); 

  console.log( {formId}); 
  console.log (selectedRightValue); 

  let options = {
    method: "POST", 
    body: formBody, 
    headers: {
      "Content-Type" : "application/json"
    }
  }
  
  let url = process.env.API_URL;

  let res = await fetch("http://localhost:6002/user/UpdateStudentCourses", options); 

  const data = await res.json(); 
}; 

  const handleDropdownChange = async (e) => {
    const selectedValue = e.target.value;
    await updateStudentCourseData(); 
    if (selectedValue === 'min') {
      console.log('Selected "min"');
    } else if (selectedValue === 'hr') {
      console.log('Selected "hr"');
    }
  };
  


  useEffect(() => {
    populatePcDropdown("left-dropdown");
    populatePcDropdown("right-dropdown");
    console.log(selectedLeftValue); 
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
        value2={selectedRightValue}
        onChange={handleDropdownChange}
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

export default CoursePlanMenus;