# Install Node.js 20 for Next.js and Nest.js
FROM node:20

# Set up working directory for Nest.js application
WORKDIR /backend

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies for Nest.js application
RUN npm install

# Copy Nest.js application files
COPY ./ .

# Build Nest.js application
RUN npm run build

# Expose ports for Next.js and Nest.js applications
EXPOSE 3001

# Start PostgreSQL, Next.js, and Nest.js applications
CMD npm run start
