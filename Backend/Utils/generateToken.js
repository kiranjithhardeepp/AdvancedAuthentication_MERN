const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: "7d", // Token expires in 1 hour
  });

  // Set token in the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set secure to true in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;
