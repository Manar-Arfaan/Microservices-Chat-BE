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
Response:
Status Code: 201 Created
Body:
```json
Copy code
{ "token": "<JWT_TOKEN>" }
Error Responses:
400 Bad Request: Invalid request body or missing required fields.
409 Conflict: Email address already exists.
2. User Login
URL: /signin
Method: POST
Description: Allow users to log in using their credentials.
Request Body:
```json
Copy code
{
  "email": "example@example.com",
  "password": "password123"
}
Response:
Status Code: 200 OK
Body:
```json
Copy code
{ "token": "<JWT_TOKEN>" }
Error Responses:
400 Bad Request: Invalid request body or missing required fields.
401 Unauthorized: Invalid credentials.
3. Get a User Profile
URL: /profile
Method: GET
Description: Retrieve the profile information of the authenticated user.
Authentication: Required (JWT Token)
Response:
Status Code: 200 OK
Body: User profile data
Error Responses:
401 Unauthorized: Missing or invalid JWT token.
4. Update User Profile
URL: /update-profile
Method: PUT
Description: Update the profile information of the authenticated user.
Authentication: Required (JWT Token)
Request Body: Updated user profile data
Response:
Status Code: 200 OK
Body: Updated user profile data
Error Responses:
400 Bad Request: Invalid request body or missing required fields.
401 Unauthorized: Missing or invalid JWT token.
