// Importing user model
const userModel = require("../models/userModels");

// Importing bycrypt package
const bcrypt = require("bcrypt");

// Importing jsonwebtoken package
const jwt = require("jsonwebtoken");

// Creating a user
const createUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);

  // 2. Destructure the incoming data
  const { firstName, lastName, email, password } = req.body;

  // 3. Validate the data (if empty, stop the process and send response)
  if (!firstName || !lastName || !email || !password) {
    // res.send("Please enter all fields!")
    return res.json({
      success: false,
      message: "Pleasse enter all fields!",
    });
  }

  // 4.  Error Handling (Try Catch)

  try {
    // 5. Check if the user is already registered
    const existingUser = await userModel.findOne({ email: email });

    // 5.1 if user found: Send response
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists!",
      });
    }

    // Hashing/Encryption of the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // 5.2 if user is new:

    const newUser = new userModel({
      //Database Fields  : Client's Value
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Save to database
    await newUser.save();

    // send the respose
    res.json({
      success: true,
      message: "User Created Successfully!",
    });

    // 5.2.1 Hash the password
    // 5.2.2 Save to the database
    // 5.2.3 Send Successful response
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server Error!",
    });
  }

  // 5.2.4
};

// Login Function

const loginUser = async (req, res) => {
  // Check incomming data
  console.log(req.body);

  // Destructure incoming data
  const { email, password } = req.body;

  // Validate incoming data
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }
  // try catch
  try {
    // Check if the user is already registered
    const user = await userModel.findOne({ email: email });
    // What can be the found data?
    // firstName, lastName, email, password

    // What if the user is not found
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    // Compare the passwords using bcrypt
    const isValidPassword = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isValidPassword) {
      return res.json({
        success: false,
        message: "Invalid Password!",
      });
    }

    // Generate token with user data and key
    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    // Response if password matches (send token and user data)
    res.json({
      success: true,
      message: "User Logged In!",
      token: token,
      userData: user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server Error!",
    });
  }
};

// exporting
module.exports = {
  createUser,
  loginUser,
};
