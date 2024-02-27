const express = require("express"); 
const router = express.Router(); 
const database = require('../database'); 
const {hashPassword} = require("../utils/helper"); 



// user get API 
router.get("/", (req,res)=> {
    
    console.log("We're in the database"); 

    database.execute("SELECT * FROM webusers", function(err, result){
        res.send(result); 
    }); 

    
});




router.post("/", (req,res)=>{
    try{   

        console.log("We're trying to POST"); 

        const hashedPassword = hashPassword(req.body.u_password); 
        
        console.log(hashedPassword); 


    database.execute("INSERT INTO webusers (u_email, u_firstname, u_lastname, u_password, is_approved, is_admin,  u_username) values (?,?,?,?,?,?,?)",
    [
        // parameters 

        req.body.u_email,
        req.body.u_firstname,
        req.body.u_lastname,
        hashedPassword, 
        // req.body.u_password,
        0, //req.body.is_approved, off by default  
        0, // req.body.is_admin, off by default z   
        req.body.u_username,
    ], 
        /* function(err,result){
            if (result.affectedRows == 0){
                res.status(500).send("Record not inserted");
            }
            else {
                res.status(200).send("Record inserted successfully"); 
            }
        } */
    );
    } catch (error) {
        console.log(error.message); 
    }
}); 

router.put("/:id", (req,res)=>{
    try{   // another way of doing the =  ? sql query 
    database.execute("update webusers set u_firstname = ?, u_lastname= ? where id = ?",
    [
        // parameters 
        req.body.u_firstname,
        req.body.u_lastname,  
        req.params.id
    ], 
  /*      function(err,result){
            if (result.affectedRows == 0){
                res.status(401).send("Record not found");
            }
            else {
                res.status(200).send("Record updated successfully"); 
            }
        }*/
    );
    } catch (error) {
        console.log(error.message); 
    }
}); 


router.get("/:id", (req,res)=>{
    try{ 
        database.execute("SELECT * FROM webusers WHERE id = ?", 
        [req.params.id], 
        function(err,result){
            if (result == 0){
                res.status(401).send("Record not found");
            }
            else {
                res.status(200).send(result); 
            }
        }
        );
    } catch (error) {
      console.log(error.message); 
    }
}); 

router.delete("/:id", (req,res)=>{
    try{ 
        database.execute("DELETE FROM webusers WHERE id = ?", 
        [req.params.id], 
        function(err,result){
            if (result.affectedRows == 0){
                res.status(401).send("Record not deleted");
            }
            else {
                res.status(200).send("Record deleted successfully"); 
            } 
        }
        );
    } catch (error) {
      console.log(error.message); 
    }
}); 



module.exports = router; 