FROM node:lts-alpine3.10
ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app
COPY . .
RUN yarn