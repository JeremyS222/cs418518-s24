"use client"


import React, {useState} from 'react'
import './Login.css'
import Link from 'next/link'  
import { Tsukimi_Rounded } from 'next/font/google'



const Login = () => {

  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  

  function findTargetedWords () {

  }

  const emailOnChange = (event) => {
    setEmail(event.target.value); 
  }; 

  const getHeaders = new Headers(); 

  const userCreation = async() => {
    // this 

    console.log(" Log in Button Pressed! "); 




    const formBody = JSON.stringify({
      u_email: email, 
      u_password: password,  
    }); 

    let options = {
      method: "POST", 
      body: formBody, 
      headers: {
        "Content-Type" : "application/json"
      }
    }
    
    let url = process.env.API_URL;

    let res = await fetch("http://localhost:6002/login", options); 

    let data = await res.json(); 
    let stringedDataArray = []; 
    let JSONdata; 

    JSONdata= JSON.stringify(data); // turns javascript JSON object (data) "into" "a" "string" "like" "this" 
    stringedDataArray = [JSONdata]; // store in array 

      console.log("Stringed Data :" + stringedDataArray); 
      console.log(Array.isArray(stringedDataArray)); 

    let splitTheDataArray = [];

    splitTheDataArray = stringedDataArray.map(str => str.split(' ')); 

      console.log (splitTheDataArray); 

    let storeWord = stringedDataArray.indexOf("toke:"); 
      
      console.log("Store Word: " + storeWord); 
      console.log("TOKE? " + stringedDataArray[10]); 
      console.log(typeof data); 
    

    let optionsGet = {
      method: "GET", 
      headers: {
        "Content-Type" : "application/json",
        dataGet: data,
        

      }
    }
    
    let urlGet = process.env.API_URL;

    let resGet = await fetch("http://localhost:6002/login", optionsGet); 


  };

  const onSubmit = () => {
    userCreation(); 
  }

  function enterKeyForLogin(){
    let input = document.getElementById("passwordBox");
    input.addEventListener("keypress", function(event){
      if(event.key === "Enter"){
        event.preventDefault(); 
        document.getElementById("loginClick").click(); 
      }
    }); 
  }
    
    return (
              // <div>index</div>

              <form>
                <div className = "container"> 
                
                    <div className = "header">
                        <div className = "text"> Login </div>
                        <div className = "underline"></div>
                    </div>
                    <div className = "inputs">
                      <div className = "input">
                          <input 
                          type = "email" 
                          placeholder = "Email"  
                          required
                          onChange = {emailOnChange}/> 
                      </div>
                      <div className = "input">
                          <input 
                          id = "passwordBox"
                          type = "password" 
                          placeholder = "Password"
                          required
                          onChange = {(e) => {
                            setPassword(e.target.value);
                          }} onKeyUp = {enterKeyForLogin}/>  
                      </div>
                    </div>
                    <div className = "forgot-password"> Lost Password? 
                      <span> Click Here! </span>
                    </div> 
                    <div className = "submit-container">
                      <button id = "loginClick" type = "button" className = "submit" onClick={onSubmit} > Login </button> 
                    </div>
                </div>
              </form>
            )
}

export default Login
