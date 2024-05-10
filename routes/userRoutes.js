// Importing express packages
const router = require('express').Router();

// Importing User Controller
const userController = require('../controllers/usersControllers')

// Creating user registration route
router.post('/create', userController.createUser)

// Logic 
// Controller (Exports createUser module) - Routes (imports the module) - index.js (Uses this)

// Exporting the router
module.exports = router 