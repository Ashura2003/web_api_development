const path = require("path");
const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  // Destructuring the incoming body data (json)
  const { productName, productPrice, productCategory, productDescription } =
    req.body;

  // Validating the incoming data
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  // Validating if there is a file
  if (!req.files || !req.files.productImage) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image of the product",
    });
  }

  const { productImage } = req.files;

  // uploading the image
  // 1. Generate a random name for the image (abc.jpg) -> (123456-abc.jpg)

  const imageName = `${Date.now()}-${productImage.name}`;

  // 2. Make a upload path (/path/upload - directory)

  const imageUploadPath = path.join(
    __dirname,
    `../public/products/${imageName}`
  );

  // 3. Move to that directory (await, try-catch)
  try {
    await productImage.mv(imageUploadPath);

    // 4. Save the data to the database
    const newProduct = new productModel({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: imageName,
    });

    const product = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

// Fetch all products
const getAllProducts = async (req, res) => {
  // try catch
  try {
    const allProducts = await productModel.find({});
    res.status(201).json({
      success: true,
      message: "All products fetched successfully!",
      products: allProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
  // Fetch all products from the database
  // Send the response back to the client
};

// Single Product APi
const getSingleProduct = async (req, res) => {
  // Get product id from the URL (params)
  const productId = req.params.id;

  // Fetch the product from the database
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

// update product
// 1. Get the product id from the URL
// 2. if image :
// 3. New Image should be uploaded
// 4. Old Image should be deleted
// 5. Find Product by id from the database
// 6. Find the image in the directory
// 7. Delete the image from the directory
// 8. Update the product with the new image

const updateProduct = async (req, res) => {
  try {
    // 
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
