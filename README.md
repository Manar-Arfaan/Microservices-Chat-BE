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

### Containerization 

- **Docker**: Docker containers are employed to facilitate easy setup and ensure consistency across different environments.
- **Dockerfile**: Each microservice directory contains a Dockerfile with the necessary configurations to build the respective Docker image.

### Docker Setup

To build and run each microservice individually using Docker, follow these steps:

1. Navigate to the directory of the microservice you wish to run.
2. Build the Docker image using the provided Dockerfile:
   ```bash
   docker build -t <image_name>.
3. To run the entire project using Docker Compose, execute the following command:
   ```bash
   docker-compose up

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

Basic unit tests are provided for core functionalities within each microservice.

### Testing with npm test

To run the unit tests for each service, navigate to the respective service directory like user-service/src and execute the following command:

```bash
npm test

### Documentation

1. **API Documentation**: Detailed API documentation is available in each microservice's README file. This documentation provides comprehensive information about the endpoints, request parameters, response formats, and authentication requirements for interacting with the microservice.

2. **Project Overview**: A brief overview of the application architecture is provided in the project's main README file. It outlines the high-level structure of the application, including the role of each microservice and how they interact with each other to deliver the overall functionality.

3. **Swagger Documentation**: Swagger is implemented to provide interactive API documentation for each microservice. You can explore and test the APIs using Swagger UI by navigating to the `/api-docs` endpoint of each service in your web browser.
