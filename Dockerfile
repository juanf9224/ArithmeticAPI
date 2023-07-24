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

# Copy the built app from the `build` stage
COPY --from=build /app/build ./build

# Setup the database
CMD ["sh", "-c", "yarn db:setup && yarn start"]
