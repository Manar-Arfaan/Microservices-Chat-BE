const WebSocket=require('ws');
const axios = require("axios");
const chatMessage = require("../models/chatModel");

//Handle and save the messages in the db
exports.saveMessage = async (req, res) => {
  try {
    //Verify user session by making a Get request to the user service
    const verifySessionResponse = await axios.get(
      "http://localhost:3000/api/users/verify-session",
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
      
    );
  
    if (verifySessionResponse.status === 200) {
      //Extract userId from the middleware
      const userId = verifySessionResponse?.data?.userId;
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
         console.log("Heello")
          client.send(JSON.stringify(newMessage));
        //}
      })
      res.status(200).send('Message sent successfully');
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
    const userId = req.userId;

    const chatHistory = await chatMessage.find({
      $or: [{ sender: userId }, { receiver: userId }],
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
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
