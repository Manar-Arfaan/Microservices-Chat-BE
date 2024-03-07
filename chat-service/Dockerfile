# Use a Node.js base image 
FROM node:20

# Set the working directory in the container 
WORKDIR /chat-service/src

# copy the package.json
COPY package*.json ./

# Install depencies
RUN npm install

# Copr the application 
COPY . .

# Expose the port
EXPOSE 4000

# Command to run the application
CMD ["node", "server.js"]