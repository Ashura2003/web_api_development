// Importing the express packages
const express = require("express");

// Importing the cors package
const cors = require("cors");

// Importing mongoDB packages
const connectDatabase = require("./database/database");

// Importing dotenv packages
const dotenv = require("dotenv");

// Importing form data
const acceptFormData = require("express-fileupload");

// dotenv configuration
dotenv.config();

// Connecting to database
connectDatabase();

// Defining the port
const PORT = process.env.PORT; //Ports ranges from 3000 - 5000

// Creating express app
const app = express();

// Creating an express application

// Config form data
app.use(acceptFormData());

// Express Json Config
app.use(express.json());

// Configure Cors Policy
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get("/test", (req, res) => {
  res.send(`Test API is Working`);
});

// Configuring routes of User
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/product", require("./routes/productRoutes"));

// Path to user create endpoint
// http://localhost:5000/api/user

// Path to test endpoint
// http://localhost:5000/test

//Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
