// File for hashing in the file and verifying tokens 
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken"); 

function hashPassword(password){
const salt = bcrypt.genSaltSync();
return bcrypt.hashSync(password, salt); 
}

function comparePassword(raw, hashPassword){
    return bcrypt.compareSync(raw, hashPassword);  // Compares the raw text typed by user to stored hashed password 
                                                    // returns true or false 
}


function verifyToken(req, res, next){
    const token = req.header("token");
    console.log(token); 
    if (!token) return res.status(401).json({error: "Access denied "}); 
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY); 
        console.log(decoded); 
        req.userId = decoded.userId; 
        next();
    }
    catch(error){
        res.status(401).json({ error: "Invalid token "}); 
    }
}


module.exports = { 
    hashPassword,
    comparePassword,
    verifyToken
}