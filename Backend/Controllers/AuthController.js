const User = require("../Model/useModel");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../Utils/generateToken");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
} = require("../mailTrap/emails");

const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
const signUp = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log("userName: ", userName);
  console.log("email=", email);
  console.log("pass=", password);

  try {
    // Validate required fields
    if (!email || !password || !userName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the user's password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate a verification token (random 6-digit number)
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user instance
    const user = new User({
      email,
      password: hashedPassword, // Fixed typo from 'passwor'
      name: userName,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token and set it in the response cookie
    const token = generateToken(res, user._id);
    console.log(token);

    await sendVerificationEmail(user.email, verificationToken);

    // Send success response, excluding the password from the user object
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user: user,
    });
  } catch (error) {
    // Log the error and send error response
    console.error("Error during sign-up:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    console.log("user:", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or Expired Verification Code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: false,
      message: "User verified",
      user,
    });
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Username Or  Password" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect Username Or  Password" });
    }

    generateToken(res, user._id);
    user.lalastLogin = new Date();
    await user.save();

    return res
      .status(200)
      .json({ success: false, message: "Login Success", user });
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};

const logOut = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ status: true, message: "logout succesful" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiryDate = Date.now() + 1 * 60 * 60 * 1000;
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = resetTokenExpiryDate;

    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `${process.env.LOCAL_HOST}/resetPassword/${resetToken}`
    );
    return res.status(200).json({ success: true, message: "Email sent", user });
  } catch (error) {
    console.error("Error during forgot password:", error);
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  console.log('resetToken: ', resetToken);
  const { newPassword } = req.body;
  console.log('newPassword: ', newPassword);
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpireAt = null;
    await user.save();

    await sendResetPasswordSuccessEmail(user.email);
    return res
      .status(200)
      .json({ success: true, message: "Password Reset Successfull", user });
  } catch (error) {}
};

module.exports = {
  signUp,
  signIn,
  logOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
};
