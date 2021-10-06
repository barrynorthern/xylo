FROM gcr.io/xylo-328123/xylo AS builder

EXPOSE 8080

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app
COPY . .
RUN npx nx build api ${BUILD_FLAG}

FROM gcr.io/xylo-328123/xylo

WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=$NODE_ENV

# start api
CMD ["node", "./dist/apps/api/main.js"]