FROM mhart/alpine-node as base
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY . .
RUN yarn build && yarn --production

FROM mhart/alpine-node
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=base /app .
EXPOSE 3000
CMD node -r dotenv/config -r esm server/index.js
