FROM node:alpine
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV production
COPY yarn.lock package.json /app/
RUN yarn
COPY . /app
RUN yarn build
RUN yarn cache clean
EXPOSE 3000
CMD node -r esm server.js
