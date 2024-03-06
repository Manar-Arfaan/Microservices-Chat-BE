const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  userSignupValidator,
  validateAuth,
  userSigninValidator,
} = require("../validators/authValidator");

router.post(
  "/signup",
  userSignupValidator,
  validateAuth,
  authController.signup
);
router.post(
  "/login",
  userSigninValidator,
  validateAuth,
  authController.signin
);

router.get(
  "/verify-session",
  authMiddleware.authenticateUser,
  (req, res) => {
    res.status(200).json(req.user);
  }
);

module.exports = router;
