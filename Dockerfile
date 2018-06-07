FROM node:latest@sha256:c00e4cb3acfb2a0c4997ddb0e809cba37f9f6cce43efa9a6e6f7f1a79e094ab5
ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn --ignore-engines --production
RUN yarn build
EXPOSE 3000
CMD node -r esm server/index.js
