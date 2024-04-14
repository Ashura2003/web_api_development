// Importing the express packages
const express = require("express");

// Importing mongoDB packages
const connectDatabase = require("./database/database");

// Importing dotenv packages
const dotenv = require("dotenv");

// dotenv configuration
dotenv.config();

// Connecting to database
connectDatabase();

//Creating an express application
const app = express();

// Defining the port
const PORT = process.env.PORT; //Ports ranges from 3000 - 5000

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get("/test", (req, res) => {
  res.send(`Test API is Working`);
});

// Configuring routes of User
app.use("/api/user", require("./routes/userRoutes"));

// Path to user create endpoint
// http://localhost:5000/api/user

// Path to test endpoint
// http://localhost:5000/test

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
