# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g npm

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .
