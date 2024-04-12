// Importing the express packages
const express = require("express"); 

//Creating an express application
const app = express();

//Defining the port
const PORT = 5000;  //Ports ranges from 3000 - 5000

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{
    res.send(`Test API is Working`)
})

//Path to test endpoint
// http://localhost:5000/test

//Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    })