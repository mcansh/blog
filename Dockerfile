FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
COPY yarn.lock package.json ./
RUN npm install -gs --no-progress yarn && yarn
COPY . .
RUN yarn build
RUN yarn cache clean
EXPOSE 3000
CMD NODE_ENV=production node -r @std/esm ./server.js
