# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on (3001 in your case)
EXPOSE 3001

# Define environment variables (optional)
# ENV NODE_ENV=production

# Command to run the application
CMD ["node", "index.js"]
