# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files first
COPY package*.json ./
COPY package-lock.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy all workspace packages
COPY packages/ ./packages/

# Copy the specific app
ARG APP_NAME
COPY apps/${APP_NAME} ./apps/${APP_NAME}

# Clean install dependencies
RUN npm ci

# Build the app
RUN npm run build --filter=${APP_NAME}

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY package-lock.json ./
COPY turbo.json ./

# Copy built app
ARG APP_NAME
COPY --from=builder /app/apps/${APP_NAME}/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production

# Expose port (will be overridden by docker-compose)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"] 