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
    return res.json({
      success: false,
      message: "Please enter all the required fields",
    });
  }

  // Validating if there is a file
  if (!req.files || !req.files.productImage) {
    return res.json({
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

// Validating the incoming data

module.exports = {
  createProduct,
};
