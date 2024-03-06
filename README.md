# Microservices User Management and Chat System

This repository contains a microservices-based user management system with a chat feature. The system allows users to register, login, manage their profiles, and engage in one-to-one text chat conversations in real-time. The application is designed to be scalable, secure, and easy to deploy using Docker containers.

## Core Features

### User Management

1. **Signup**: New users can register with an email and password.
2. **Login**: Users can log in using their credentials.
3. **Profile Management**: Logged-in users can view and edit their profile information, such as username and email.

### Chat Feature

1. **Real-time Communication**: Implement a basic one-to-one text chat feature.
2. **Chat History**: Save and retrieve chat history to ensure continuity across sessions.

## Technical Stack

### Backend Technologies

- **Node.js**: Server-side logic is developed using Node.js.
- **Express.js**: Utilized as the web application framework for Node.js.
- **WebSocket**: WebSocket is used for real-time communication in the chat feature.

### Database

- **MongoDB**: MongoDB is used for storing user data and chat history.
- **Database Indexing**: Proper database indexing is implemented for efficient data retrieval.

### Containerization (Optional)

- **Docker**: Docker containers are utilized for ease of setup and consistency.
- **Dockerfile**: Included in each microservice directory with necessary configurations.

## Setup and Deployment

1. **Clone Repository**: Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
2. Install Dependencies: Navigate to the project directory and install dependencies for each microservice:
      cd microservices-project
      cd user-service
      npm install
      cd ../chat-service
      npm install
3. Build and Run Docker Containers: Use Docker Compose to build and run containers for the entire application:
      docker-compose up --build
4. Access Services: Once the containers are running, you can access the services at the following endpoints:
      User Service: http://localhost:3000
      Chat Service: http://localhost:4000

## Testing

1. Unit Tests: Basic unit tests are provided for core functionalities.
2. Error Handling: The application handles common error scenarios gracefully.

## Documentation

1. API Documentation: Detailed API documentation is provided in each microservice's README file.
2. Project Overview: A brief overview of the application architecture is included in the project's main README file.
