// Importing mongoose package
const mongoose = require("mongoose");


// Creating mongoDB Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating mongoDB model
const User = mongoose.model("users", userSchema);

// Expoting User module
module.exports = User;
