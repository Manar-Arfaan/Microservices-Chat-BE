const express = require("express");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const http = require("http");
const axios=require('axios')
const jwt=require('jsonwebtoken')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const chatMessageRoutes = require("./routes/chatMessageRoutes");
const extractUserId=require('./middlewares/extractUserId')
const PORT = process.env.PORT || 4000;

// Initailize WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.locals.wss = wss; // To make the websocket server accessible in the routes

wss.on("connection",async  (ws,req) => {
  //Extract userId from the request while userId is passed in the query string

  const token = req.headers.authorization?.split(' ')[1];

  // Decode token to get user ID
  let userId;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  userId = decoded.userId;

  //Associate userId with the WebSocket client
  ws.username=userId;
  //Handle new WebSocket connection
  console.log(`WebSocket connection established for ${userId}`);
  ws.on("message", (message) => {
    console.log("Recieved message:", message);
  });

  ws.on("close", () => {
    //Handle connction closing
    console.log("WebSocket connection closed");
  });
});

//MiddleWare
app.use(bodyParser.json()); // Use it to parse JSON request bodies
app.use(cors()); // Enable Cors

//Routes

app.use("/api/chat", chatMessageRoutes);

//Connect DB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB is connented`))
  .catch();

app.get("/", (req, res) => {
  res.send("Chat Service is up and running");
});

server.listen(PORT, () => {
  console.log(`Websocket server is running on http://localhost:${PORT}`);
});
