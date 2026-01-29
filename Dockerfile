# Test Dockerfile for build-time environment variables
# This simulates a Vite/React app that needs env vars at build time

FROM node:20-alpine AS builder

WORKDIR /app

# Declare build arguments (these will be passed by Kaniko --build-arg)
ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_ENV

# Show build args for debugging (remove in production)
RUN echo "=== Build-time Environment Variables ===" && \
    echo "VITE_API_URL: $VITE_API_URL" && \
    echo "VITE_APP_NAME: $VITE_APP_NAME" && \
    echo "VITE_ENV: $VITE_ENV" && \
    echo "========================================"

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variables for the build process
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_ENV=$VITE_ENV

# Build the application (Vite will use these env vars)
RUN yarn build

EXPOSE 4000

CMD ["yarn", "preview"]
