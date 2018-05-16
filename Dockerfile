FROM node:latest
ENV NODE_ENV=production
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN yarn --ignore-engines --production
RUN yarn build
EXPOSE 3000
CMD node -r esm server/index.js
