const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET } = require("../../config/config");
const logger = require("../../config/logger");

//User Signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Create a new user document
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    //Generate JWT
    const token = jwt.sign({ usserId: newUser._id }, "wswweuwyewyei");
    res.status(201).json({ token });
  } catch (error) {
    logger.error("Error in user signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//User Login
exports.signin= async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
    }
    //Compare provided password with hashed one in database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
    }
    //Generate token
    const token = jwt.sign({ userId: user._id },"wswweuwyewyei", {
        expiresIn: "3d",
      });
    //Send JWT token in response
    res.status(200).json({ token });
  } catch (error) {
    logger.error("Error in user login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

