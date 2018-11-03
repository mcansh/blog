FROM mhart/alpine-node AS base
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build && yarn --production

FROM mhart/alpine-node:11
WORKDIR /app
COPY --from=base /app .
ENV NODE_ENV="production"
EXPOSE 3000
CMD node -r dotenv/config -r esm server
