
# Frontend Dockerfile

# Use an official Node.js runtime as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code to the working directory
COPY frontend/ .

# Build the frontend app
RUN npm run build

# Use Nginx for serving the built frontend
FROM nginx:alpine

# Copy the built frontend files to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
