# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /api

# add `/api/node_modules/.bin` to $PATH
ENV PATH /api/node_modules/.bin:$PATH

# install api dependencies
COPY package.json yarn.lock ./
RUN yarn

# add api
COPY . ./


EXPOSE 80
EXPOSE 8080

# start api
CMD ["node", "./dist/apps/api/main.js"]