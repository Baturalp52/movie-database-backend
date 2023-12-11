# Install Node.js 20 for Nest.js
FROM node:20

# Set up working directory for Nest.js application
WORKDIR /backend

# Copy Nest.js application files
COPY ./ .

# Install dependencies for Nest.js application
RUN npm install

# Build Nest.js application
RUN npm run build

# Expose ports for Nest.js applications
EXPOSE 3001

# Start Nest.js application
CMD npm run start
