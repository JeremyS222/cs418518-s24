const express = require("express"); 
const router = express.Router(); 
const database = require('../database'); 
const {comparePassword, verifyToken} = require("../utils/helper"); 
const jwt = require("jsonwebtoken"); 
const {sendEmail} = require("../utils/sendmail"); 



// generates random Email Code 
function randomizeEmailCode (){
    let randomNumVar; 
    let randomNumArray = []; 

    for(let i = 0; i <= 4; i++){
        randomNumVar = Math.floor(Math.random()* 9 + 1);
        randomNumArray.push(randomNumVar)     
    }
    let randomFinalString = randomNumArray.join(""); 

    return randomFinalString; 
}
let randomEmailCode = randomizeEmailCode(); // DELETE LATER 



// get call for debugging 
router.get("/emailTest", (req, res) => {
    try{ 
        database.execute("SELECT * FROM webusers WHERE u_email = ?",
        [req.body.u_email], 
        function(err,result){
            if (result == 0){
                res.status(401).send("Record not found");
            }
            else { 
                // call email sending logic function  
                // MIGHT HAVE TO MOVE SOMEWHERE ELSE LATER!!!!!!!!!!!!!!!!!!! 
                // RANDOMLY GENERATE PASSWORD with Math Library (53:00) 
                let randomCode = randomizeEmailCode(); 
                // console.log(randomCode); 
                sendEmail(result[0].u_email, "Login Verification", "Your one time password is " + randomCode);  


                res.status(200).send(result); 
            }
        }
        );
    } catch (error) {
      console.log(error.message); 
    }
});  






router.get("/", verifyToken, (req, res) => {
    try{ 

        console.log("We're trying to GET IN LOGIN FILE"); 
        database.execute("SELECT * FROM webusers WHERE id = ?",
        [req.userId], 
        function(err,result){
            if (result == 0){
                res.status(401).send("Record not found");
            }
            else { 
                let randomCode = randomizeEmailCode(); 
                // console.log(randomCode); 
                sendEmail(result[0].u_email, "Login Verification", "Your one time password is " + randomCode);  


                res.status(200).send(result); 
            }
        }
        );
    } catch (error) {
      console.log(error.message); 
    }
}); 


router.post("/", (req,res)=>{
    try{   

        console.log("We're trying to POST IN LOGIN FILE"); 


    database.execute(
        "SELECT * FROM webusers WHERE u_email = ?",
    
        // parameters 
        [req.body.u_email], 

        function(err,result){
            if (result.length == 0){
                res.status(401).send("Invalid email and password. Please try again with valid credentials");
            }
            else {

                if (comparePassword (req.body.u_password, result[0].u_password)){
                    
                    // Generates token for user 
                    const token = jwt.sign(
                    {
                        userId: result[0].id,
                        email: req.body.u_email
                    },
                    process.env.TOKEN_SECRET_KEY,
                    {expiresIn: "1h"}
                );

                    res.status(200).send(
                        {
                            data: {
                                toke: token,
                                email: req.body.u_email,
                                userId: result[0].id
                            }
                        }
                    ); 
                }
                else {
                    res.status(401).send("Invalid email and password. Please try again with valid credentials"); 
                }

            }
        } 
    );
    } catch (error) {
        console.log(error.message); 
    }
});

module.exports = router; 

