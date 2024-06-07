// Importing the router package
const router = require("express").Router();

// Importing the product controller
const productcontroller = require("../controllers/productControllers");

// Creating a product route
router.post("/create", productcontroller.createProduct);

// Creating product fetch route
router.get("/get_all_products", productcontroller.getAllProducts);

// Creating a single product fetch route
router.get("/get_single_product/:id", productcontroller.getSingleProduct);

// Creating a product delete route
router.delete("/delete_product/:id", productcontroller.deleteProduct);

// Creating a product update route
router.put("/update_product/:id", productcontroller.updateProduct);

// Exporting the router
module.exports = router;
