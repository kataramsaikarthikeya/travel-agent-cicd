# Use Node 18 LTS as the base image
FROM node:18

# Create and set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "app.js"]
