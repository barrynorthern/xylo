FROM xylo-base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app
COPY . .
RUN npx nx build api ${BUILD_FLAG}

FROM xylo-base-image:nx-base

WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=$NODE_ENV

# start api
CMD ["node", "./dist/apps/api/main.js"]