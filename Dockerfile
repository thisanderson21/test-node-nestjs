FROM node:20 AS builder
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Use a smaller Node.js runtime as the runtime container
FROM node:20-alpine AS runtime
WORKDIR /app

# Copy only the necessary files from the build image
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

RUN mkdir -p /app/logs && chown -R 1000:1000 /app/logs

# Ensure the app runs as a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 4000

# Run the app
CMD ["node", "dist/main"]
