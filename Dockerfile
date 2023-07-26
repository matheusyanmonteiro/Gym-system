# Use the official Node.js image based on alpine
FROM node:18-alpine

# Set environment variables
ENV DATABASE_URL="postgresql://docker:docker@db:5432/apisolid?schema=public"
ENV NODE_ENV=dev
ENV PORT=3364
ENV HOST="0.0.0.0"

# Set working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json for npm install
COPY package.json package-lock.json ./

# Install npm dependencies
RUN npm install

# Install global dependencies needed for development
RUN npm install -g ts-node typescript ts-node-dev

# Copy the rest of the application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the specified port
EXPOSE $PORT

# Start the application in development mode using ts-node-dev
CMD ["npm", "run", "dev-local"]