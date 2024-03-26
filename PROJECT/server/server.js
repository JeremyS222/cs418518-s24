const express = require("express");
const app = express();
const port = 6002;
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');

const myLogger  = function (req, res, next){
    console.log('LOGGED')
    next()
}

app.use(bodyParser.json());
app.use(myLogger);

// Use CORS middleware with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET, POST, PUT, DELETE', // Specify allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authentication)
  allowedHeaders: ['Content-Type', 'Authorization', 'dataGet'], // Specify allowed headers
}));

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.options('/user', cors()); // Handle preflight for /user route
app.options('/login', cors()); // Handle preflight for /user route 

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Calling get api");
});

app.post("/", (req, res) => {
  res.send("Calling post api");
});







/* const express = require("express"); 
const app = express(); 
const port = 6002; 
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv')
const cors = require ('cors'); 


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
app.use (cors({
    origin : "http://localhost:3000",
    method: "GET, POST, PUT, DELETE",
    credentials : true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('/user', cors()); // Handle preflight for /user route

app.listen(port,()=> {
    console.log(`Server is listening at port ${port}`)
}); 

app.get("/",(req,res)=>{
    res.send("Calling get api")
});

app.post("/",(req,res)=>{
    res.send("Calling post api")
});  */

