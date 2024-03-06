# User Service Microservice

The User Service microservice provides endpoints for managing user accounts within an application. It includes functionalities for user registration, authentication, profile management, and more. This README provides an overview of the service, setup instructions, and comprehensive API documentation.

# Overview

The User Service microservice is built using Node.js and Express.js. It utilizes MongoDB for data storage and WebSocket for real-time communication. The service is designed to handle user management functionalities efficiently and securely.

# Setup and Deployment

To set up and deploy the User Service microservice, follow these steps:
  git clone <repository_url>

# API Documentation
## User Registration
-Endpoint: POST /signup
-Description: Allow users to register by providing basic information such as username, email, and password.
-Request Body:
        -username (string): The username of the user.
        -email (string): The email address of the user.
        -password (string): The password of the user.
