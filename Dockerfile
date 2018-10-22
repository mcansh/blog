FROM mhart/alpine-node as base
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn --ignore-scripts
COPY . .
RUN yarn build

FROM mhart/alpine-node
WORKDIR /usr/src
COPY --from=base /usr/src .
EXPOSE 3000
CMD node -r dotenv/config -r esm server/index.js
