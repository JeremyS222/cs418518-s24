"use client"

import React, {useState} from 'react'; 
/* import { useRouter } from 'next/router';  */
import './sign-up.css' 
import Link from 'next/link' 

const Signup = () => {
  
  let [email, setEmail] = useState("");  
  const [firstName, setFirstName] = useState("");  
  const [lastName, setLastName] = useState("");  
  const [password, setPassword] = useState("");  
  const [username, setUsername] = useState("");  

  let emailAlertInput = ""; 
  let emailExistFlag = false;  

  const emailOnChange = (event) => {
    setEmail(event.target.value); 
  }; 

  const checkIfEmailExist = async() => {

      console.log(" CHECK IF EMAIL EXIST! "); 

    let emailArray = []; 
    let JSONdata; 
    
    let options = {
      method: "GET", 
      headers: {
        "Content-Type" : "application/json"
      }
    }

    let res = await fetch("http://localhost:6002/user/AllEmails", options); 
    const data = await res.json(); 
    JSON.stringify(data); 

      for (let i = 0; i < Object.keys(data).length; i++) {
        console.log("Typed-in Email: " + email);
        if (email.toLowerCase() === data[i].u_email.toLowerCase()) {

          alert( "CAN'T REGISTER AN ACCOUNT WITH AN EXISTING EMAIL. \nPRESS OK AND PAGE WILL REFRESH \nPLEASE PICK A DIFFERENT EMAIL."); 
          emailExistFlag = true; 
          return true; 

        } else {
            console.log("NO MATCH: " + data[i].u_email);
            emailExistFlag = false; 
        } 
    }
}

  const userCreation = async() => {

    console.log(" Sign Up Button Pressed! "); 

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


  const onSubmit = async () => {
    
    const emailExists = await checkIfEmailExist();  

    if (emailExists === true){
      console.log("EMAIL EXIST FLAG IS TRUE: " + emailExistFlag); 
      return; 
    }
    else{
      console.log("EMAIL EXIST FLAG IS FALSE: " + emailExistFlag); 
      userCreation(); 
      handleButtonClick(); 
    }
    emailExistFlag = false; 
  }


  /* const onSubmit = () => {
    userCreation(); 
  } */



  /* document.addEventListener('DOMContentLoaded', function () {
    const myForm = document.querySelector('#myForm');
    const myButton = document.querySelector('#Submission Button');

    myButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        console.log('Button clicked! Form submission prevented.');
    });
}); */


    return (
      // <div>index</div>
      <form id = "SignUpForm">
        
        <div className = "container"> 
            <div className = "header">
                <div className = "text"> Sign Up </div>
            </div>
            <div className = "inputs">
              <div className = "input">
                    <input 
                    type = "email" 
                    placeholder = "Email" 
                    onChange = {emailOnChange}/> 
              </div>
              <div className = "input">
                  <input 
                  type = "text" 
                  placeholder = "First Name"
                  required
                  onChange = {(e) => {
                    setFirstName(e.target.value);
                  }}/> 
              </div>
              <div className = "input">
                  <input 
                  type = "text" 
                  placeholder = "Last Name" 
                  required
                  onChange = {(e) => {
                    setLastName(e.target.value);
                  }}/> 
              </div>
              <div className = "input">
                  <input 
                  type = "password" 
                  placeholder = "Password"
                  required
                  onChange = {(e) => {
                    setPassword(e.target.value);
                  }}/> 
              </div>
              <div className = "input">
                  <input 
                  type = "text" 
                  placeholder = "Username"
                  required
                  onChange = {(e) => {
                    setUsername(e.target.value);
                  }}/> 
              </div>
            </div>
            <div className = "forgot-password"> Already have an account? 
            <Link href = "/login">
              <span> Click Here! </span>
            </Link>
            </div> 
            <div className = "submit-container">
            <button id = "Submission Button" type = "submit" className = "submit" onClick={onSubmit}> Sign Up </button> 
            </div>
        </div>
      </form>
    )
  }
  
  export default Signup 

