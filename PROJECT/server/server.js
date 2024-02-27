const express = require("express"); 
const app = express(); 
const port = 6000; 
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv')


const userRoute = require('./routes/user');
const loginRoute = require('./routes/login'); 



const myLogger  = function (req, res, next){
    console.log('LOGGED')
    next()
}
app.use(myLogger); 

app.use(bodyParser.json());  
// Including body parser here to be able to edit body of api calls 






// Including file path to routes file 
// app.use('/user', require('./routes/user')) 

app.use('/user', userRoute); 
app.use('/login', loginRoute); 


app.listen(port,()=> {
    console.log('Server is listening at port ${port}')
}); 

app.get("/",(req,res)=>{
    res.send("Calling get api")
});

app.post("/",(req,res)=>{
    res.send("Calling post api")
}); 

