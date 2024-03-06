const express=require('express');
const router=express.Router();
const profileController=require('../controllers/profileController');

const authMiddleware=require('../middlewares/authMiddleware')

router.get('/profile',authMiddleware.authenticateUser,profileController.getProfile);
router.put('/profile',authMiddleware.authenticateUser,profileController.editProfile)

module.exports=router;