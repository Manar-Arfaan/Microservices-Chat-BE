const express=require('express');
const router=express.Router();
const chatMessageController=require('../controllers/chatMessage');
const extractUserId=require('../middlewares/extractUserId');

//Route to retrieve chat history for a user
router.get('/chat-history',extractUserId,chatMessageController.getChatHistory);

//Route to send a message
router.post('/send-message',extractUserId,chatMessageController.sendMessage);

module.exports=router;
