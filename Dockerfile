FROM node:latest

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD node -r @std/esm ./server.js
