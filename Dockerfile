FROM mhart/alpine-node:11 as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn install
COPY . .
RUN yarn build
RUN yarn install --production

FROM mhart/alpine-node:11
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD node -r dotenv/config -r esm server/index.js
