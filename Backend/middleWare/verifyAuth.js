const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - invalid token provided",
      });
    }
    console.log(decoded);

    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (error) {
    console.log("Error in verifyToken ", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { verifyToken };
