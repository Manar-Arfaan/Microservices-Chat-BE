# User Service Microservice

The User Service microservice provides endpoints for managing user accounts within an application. It includes functionalities for user registration, authentication, profile management, and more. This README provides an overview of the service, setup instructions, and comprehensive API documentation.

# Overview

The User Service microservice is built using Node.js and Express.js. It utilizes MongoDB for data storage and WebSocket for real-time communication. The service is designed to handle user management functionalities efficiently and securely.

# Setup and Deployment

To set up and deploy the User Service microservice, follow these steps:
  git clone <repository_url>

# API Documentation
## User Registration
## Base URL

The base URL for all endpoints is `http://localhost:3000/api/users`.

## Authentication

All endpoints require authentication except for user registration and login. Authentication is performed using JSON Web Tokens (JWT). After successful login, the API returns a JWT token which should be included in the `Authorization` header of subsequent requests.

### 1. User Registration

- **URL:** `/signup`
- **Method:** `POST`
- **Description:** Allow users to register by providing basic information such as username, email, and password.
- **Request Body:**
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "password123"
  }
- **Response:**
  Status Code: 201 Created
  ```json
  {
    "token": "<JWT_TOKEN>" 
  }
- **Error Response:**
  -**400 Bad request:**
  -**409 Conflict:** Email already exists
