const WebSocket=require('ws');
const axios = require("axios");
const chatMessage = require("../models/chatModel");
const mongoose = require('mongoose');


//Verify user's session
const verifySession = async (req) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const verifySessionResponse = await axios.get(
      "http://localhost:3000/api/users/verify-session",
      {
        headers: {
          Authorization: authorizationHeader,
        },
      }
    );
    return verifySessionResponse // Return the response data
  } catch (error) {
    throw new Error('Invalid session token'); 
  }
};
//Handle and save the messages in the db
exports.sendMessage = async (req, res) => {
  try {
    //Verify user session by making a Get request to the user service
    const sessionData = await verifySession(req);
    console.log('Session data:', sessionData);
  
    if (sessionData.status === 200) {
      //Extract userId from the middleware
      const userId = sessionData?.data?.userId;
      //console.log("OK",userId)
      const { receiverId, messageContent } = req.body;
      
      //Save the chat message to the db
      const newMessage = new chatMessage({
        sender: userId,
        receiver: receiverId,
        message: messageContent,
      });
      await newMessage.save();
      //Broadcast message to WebSocket
      req.app.locals.wss.clients.forEach((client)=>{
       // if (client.readyState === WebSocket.OPEN && (client.username === userId || client.username === receiverId)) {
          client.send(JSON.stringify(newMessage));
        //}
      })
      res.status(200).send({message:'Message sent successfully'});
    } else {
      res.status(401).json({ error: "User session verification failed" });
    }
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get the chat history
exports.getChatHistory = async (req, res) => {
  try {
    const sessionData = await verifySession(req);
    console.log('Session data:', sessionData);
  
    if (sessionData) {
      const userId = sessionData?.data?.userId
      const userIdObjectId=mongoose.Types.ObjectId.createFromHexString(userId) 
      const chatHistory = await chatMessage.find({
        $or: [{ sender: userIdObjectId }, { receiver: userIdObjectId }],
      });
  
      //Format the chat history data
      const formattedChatHistory = chatHistory.map((message) => {
        return {
          messageId: message._id,
          sender: message.sender,
          receiver: message.receiver,
          message: message.message,
          timestamp: {
            date: new Date(message.timestamps).toLocaleDateString(),
            time: new Date(message.timestamps).toLocaleTimeString(),
          },
        };
      });
      res.status(200).json(formattedChatHistory);
    }
    else{
      res.status(401).json({ error: "User session verification failed" });
    }
   
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
