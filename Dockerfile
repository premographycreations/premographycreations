# Use official Node.js LTS image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies (only production, skip dev if not needed)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the app port (change if your app uses another)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "server.js"]
