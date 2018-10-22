FROM mhart/alpine-node as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn
COPY . .
RUN yarn build && yarn --production

FROM mhart/alpine-node
WORKDIR /usr/src
ENV NODE_ENV="production"
COPY --from=base /usr/src .
EXPOSE 3000
CMD node -r dotenv/config -r esm server/index.js
