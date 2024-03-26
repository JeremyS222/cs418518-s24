const express = require("express"); 
const router = express.Router(); 
const database = require('../database'); 
const {hashPassword} = require("../utils/helper"); 






router.get("/courses", (req,res)=> {
    
    console.log("We're in the database TO GET ALL COURSES"); 

    database.execute("SELECT * FROM courses;", function(err, result){
        res.send(result); 
    }); 

    
});

router.get("/prerequistes", (req,res)=> {
    
    console.log("We're in the database TO GET ALL PREREQUISTES"); 

    database.execute("SELECT * FROM prerequistes;", function(err, result){
        res.send(result); 
    }); 

    
});

router.get("/submissions", (req,res)=> {
    
    console.log("We're in the database TO GET ALL SUBMISSION HISTORY"); 

    database.execute("SELECT * FROM submissions_history;", function(err, result){
        res.send(result); 
    }); 

    
}); 

router.get("/adminformreview", (req,res)=> {
    
    console.log("We're in the database TO GET ALL ADMIN FORM REVIEW"); 

    database.execute("SELECT * FROM admin_form_review;", function(err, result){
        res.send(result); 
    }); 

    
}); 

router.get("/form", (req,res)=> {
    
    console.log("We're in the database TO GET ALL FORMS"); 

    database.execute("SELECT * FROM form;", function(err, result){
        res.send(result); 
    }); 

    
}); 

router.get("/student_courses", (req,res)=> {
    
    console.log("We're in the database TO GET ALL STUDENT COURSES"); 

    database.execute("SELECT * FROM student_courses;", function(err, result){
        res.send(result); 
    }); 

    
}); 


router.post("/UpdateStudentCourses", (req,res)=>{
    try{   

        console.log("We're trying to POST IN STUDENT_COURSES"); 

    database.execute("INSERT INTO student_courses (form_id, course_name) values (?,?)",
    [
        // parameters 
        req.body.form_id,
        req.body.course_name,
    ], 

    );
    } catch (error) {
        console.log(error.message); 
    }
}); 

router.post("/UpdatePrerequistes", (req,res)=>{
    try{   

        console.log("We're trying to POST IN PREREQUISTES"); 

    database.execute("INSERT INTO prerequistes (pc_name, course_name) values (?,?)",
    [
        // parameters 
        req.body.pc_name,
        req.body.course_name,
    ], 

    );
    } catch (error) {
        console.log(error.message); 
    }
}); 

router.put("/UpdateCourseStatus/:course_id", (req,res)=>{
    try{   // another way of doing the =  ? sql query 
        
        console.log("We're trying to PUT IN COURSES"); 
        
    database.execute("update courses set added_status = ? where course_id = ?",
    [
        // parameters 
        req.body.added_status,
        req.params.course_id
    ], 

    );
    } catch (error) {
        console.log(error.message); 
    }
}); 


// ----------------------------------------------------------------------------------------------------------------



// user get API 
router.get("/", (req,res)=> {
    
    console.log("We're in the database"); 

    database.execute("SELECT * FROM webusers", function(err, result){
        res.send(result); 
    }); 

    
});

router.get("/AllEmails", (req,res)=> {
    
    console.log("We're in the database TO GET ALL EMAILS"); 

    database.execute("SELECT u_email FROM webusers", function(err, result){
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