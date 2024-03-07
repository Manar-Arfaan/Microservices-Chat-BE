const express=require('express');
const router=express.Router();
const {getProfile,editProfile}=require('../controllers/profileController');
const {authenticateUser}=require('../middlewares/authMiddleware')
const {
    userSignupValidator,
    validateAuth,
    userSigninValidator,
  } = require("../validators/authValidator");

router.get('/profile',authenticateUser,getProfile);
router.put('/update-profile',authenticateUser,userSignupValidator,validateAuth,editProfile)

module.exports=router;