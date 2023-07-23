# Use the official Node.js image as the base image
FROM node:18.16.1

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install Yarn globally (if not already installed)
RUN npm install -g yarn

# Install app dependencies using Yarn
RUN yarn install --production

# Copy the rest of the app source code
COPY . .

# Build the LoanPro app
RUN yarn build

# Stage 2: Setup SQLite and run the Node.js app
FROM node:18.16.1

# Install build essentials and SQLite dependencies
RUN sudo apt-get -y update
RUN sudo apt-get -y upgrade
RUN apt-get update && apt-get install -y build-essential

# Set the working directory inside the container
WORKDIR /app

# Setup the database
CMD ["yarn", "db:setup"]

# Stage 3: Serve the built app using `serve`
FROM node:18.16.1

# Install `serve` globally
RUN npm install -g serve

# Set the working directory inside the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/build ./build

# Expose the port that `serve` will use (default is 5000)
EXPOSE 5000

# Start the app using `serve`
CMD ["serve", "-s", "build"]
