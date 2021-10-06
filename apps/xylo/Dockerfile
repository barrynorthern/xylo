FROM xylo-base-image:nx-base AS builder

EXPOSE 4200

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app
COPY . ./
RUN npx nx build xylo ${BUILD_FLAG}

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist/apps/xylo ./
COPY --from=builder /app/apps/xylo/nginx.conf /etc/nginx/nginx.conf