# Backend Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code to the working directory
COPY backend/ .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "start"]
