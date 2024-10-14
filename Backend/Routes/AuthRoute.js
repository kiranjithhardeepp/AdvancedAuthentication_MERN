const express = require("express");
const {
  signUp,
  signIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
} = require("../Controllers/AuthController");

const { verifyToken } = require("../middleWare/verifyAuth");
const router = express.Router();

router.get("/verifyAuth", verifyToken, checkAuth);
router.post("/Signup", signUp);
router.post("/SignIn", signIn);
router.post("/logOut", logOut);
router.post("/verifyEmail", verifyEmail);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resetToken", resetPassword);

module.exports = router;
