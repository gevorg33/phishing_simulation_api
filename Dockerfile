# ---- Stage 1: Build the app ----
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# ---- Stage 2: Run the app ----
FROM node:18-alpine AS runner

WORKDIR /app

# Copy the compiled dist folder from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the application port (NestJS defaults to 3000)
EXPOSE 3000

# Set the command to run the NestJS app
CMD ["node", "dist/main"]
