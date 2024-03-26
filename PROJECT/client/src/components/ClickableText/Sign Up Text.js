import React from 'react' 

function SignUpText()  {

    const handleClick = () => {
        console.log("Clicked"); 
    }

    return (
      // <div>index</div>
      <button onClick = {handleClick}>    
        New? Click here to Sign Up 
      </button>
    )
  };
  
  export default SignUpText  