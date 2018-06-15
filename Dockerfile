FROM node:latest@sha256:2cda73dd26369c2ec69130ddda6f83ff4980fd6fc8e73b5e670a7670d4c86ba0
ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn --ignore-engines --production
RUN yarn build
EXPOSE 3000
CMD node -r esm server/index.js
