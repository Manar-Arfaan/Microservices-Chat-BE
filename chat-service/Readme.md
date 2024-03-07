# Chat Service Microservice

The Chat Service microservice provides endpoints for real-time chat functionality within an application. It includes functionalities for sending messages, retrieving chat history, and WebSocket integration for real-time communication. This README provides an overview of the service, setup instructions, and API documentation.

# Overview

The Chat Service microservice is built using Node.js and Express.js. It utilizes user service for verifying the user's session and WebSocket for real-time communication. The service is designed to handle chat functionalities efficiently and securely.

# Setup and Deployment

To set up and deploy the Chat Service microservice, follow these steps:
  git clone <repository_url>

## Environment Variables

This project uses environment variables for configuration. These variables are stored in a `.env` file.

**Note:** The `.env` file should never be pushed to GitHub or any other version control system, as it may contain sensitive information such as API keys, database credentials, etc. The `.env.example` file is included in the repository only for showcasing purposes and should not be used as an actual configuration file.

## WebSocket Integration
WebSocket integration allows real-time communication between clients for the chat functionality. Clients can establish WebSocket connections to receive messages in real-time.

## WebSocket URL
The WebSocket URL for the chat service is ws://localhost:4000.
-**Authentication:**
Authentication is performed using JSON Web Tokens (JWT). After successful login, the API returns a JWT token which should be included in the Authorization header of the WebSocket connection request as a bearer token.

# API Documentation
## Base URL

The base URL for all endpoints is `http://localhost:4000/api/chat`.

## Authentication

All endpoints require authentication except for user registration and login. Authentication is performed using JSON Web Tokens (JWT). After successful login, the API returns a JWT token which should be included in the `Authorization` header of subsequent requests.

### 1. Send Message

- **URL:** `/send-message`
- **Method:** `POST`
- **Description:** Allows users to send messages in the chat.
- **Request Body:**
  ```json
  {
    "receiverId":"65e871c43f3aaa4f047c5ff0",
    "messageContent":"Hello"
  }
- **Response:**
  Status Code: 200 Created
  ```json
  {
    "message": "Message saved successfully" 
  }
- **Error Response:**
  -**400:** Bad request <br>
  -**500:** Internal server error <br>
  -**401 Conflict:** Unauthorized - Invalid credentials.

### 2. Get chat history

- **URL:** `/chat-history`
- **Method:** `GET`
- **Description:** Allow users to retrieve the chat history.
- **Authorization:** Bearer token.
- **Response:**
  Status Code: 200 Created
  ```json
  {
    "token": "<JWT_TOKEN>" 
  }
- **Error Response:**
  -**400:** Invalid request body or missing required fields. <br>
  -**500:** Internal server error. <br>
  -**401:** Unauthorized - Invalid credentials.


