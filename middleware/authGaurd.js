const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  // Check incoming data from the headers
  console.log(req.headers); //pass

  // Get the authorization data from the headers
  const authHeader = req.headers.authorization;

  // Cheack or validate the token
  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Auth Header not found!",
    });
  }

  // Split the data (Format: :Bearer token........-sdfg)

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    return res.status(400).json({
      success: false,
      message: "Token not found!",
    });
  }

  // Verify the token
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUserData;
    next();

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid token!",
    });
  }

  // If verified: next (function in controller)
  // If not verified : stop the process (res)
  //
};

module.exports = {
  authGuard,
};
