const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const logger = require("../../config/logger");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    // Get user info from the database by Id
    const user = await User.findById(req.user.userId);
    //If user doesn't exist, return error
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error in fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Edit Profile
exports.editProfile = async (req, res) => {
  try {
    // Retrieve user's profile information from the request
    const { username, email } = req.body;

    //Update user's profile information in the database
    await User.findByIdAndUpdate(req.user.userId, { username, email });

    //Return success message in the response
    res.status(200).json({ message: " Profile updated successfully" });
  } catch (error) {
    logger.error("Error in updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
