# Microservice for chat backend 

This project contains two microservices: User Service and Chat Service.

# User Service

The User Service handles user authentication and user-related operations.

## Features

- User authentication (signup, login)
- Profile management (update profile, change password)
- JWT-based authentication
- MongoDB integration for user data storage

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- bcrypt (for password hashing)
- Swagger for API documentation

## Getting Started

Follow these steps to set up and run the project:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
2. Navigate to the root directory of the project:
   cd microservices-project
4. Build and run each service as a Docker container:
   cd user-service
   docker build -t user-service
   docker run -d -p 3000:3000 user-service
   cd ../chat-service
   docker build -t chat-service .
   docker run -d -p 4000:4000 chat-service
  
