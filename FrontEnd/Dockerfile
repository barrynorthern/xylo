# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json yarn.lock ./
RUN yarn 
RUN yarn global add react-scripts

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["yarn", "start"]