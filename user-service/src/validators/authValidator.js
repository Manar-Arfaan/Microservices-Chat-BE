const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");

exports.userSignupValidator = [
  check("username").not().isEmpty().withMessage("name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email: value });
      if (existingUser) {
        throw new Error("Email already exists");
      }
    }),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

exports.userSigninValidator = [
  check("email").not().isEmpty().isEmail().withMessage("Invalid email format"),
  check("password").not().isEmpty()
];

exports.validateAuth = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
