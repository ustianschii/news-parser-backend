# ---- Build stage ----

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm i ci

COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build/index.js"]
