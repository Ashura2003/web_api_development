// Importing the router package
const router = require("express").Router();

// Importing the product controller
const productcontroller = require("../controllers/productControllers");

// Creating a product route
router.post("/create", productcontroller.createProduct);

// Exporting the router
module.exports = router;