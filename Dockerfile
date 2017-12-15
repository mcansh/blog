FROM node:latest

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD NODE_ENV=production node -r @std/esm ./server.js
