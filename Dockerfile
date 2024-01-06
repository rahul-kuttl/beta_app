# Use a Node.js base image with TypeScript installed
FROM node:20.10.0

# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code
COPY . .

# Build the TypeScript files
RUN npm run build

# Your app binds to port 3000, expose this port
EXPOSE 3000

# Define the command to run your app (points to the compiled JavaScript files)
CMD [ "node", "dist/src/app.js" ]
