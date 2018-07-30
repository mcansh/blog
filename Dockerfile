FROM mhart/alpine-node as base
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY . .
RUN touch env-config.js
RUN echo "module.exports = { 'process.env.NODE_ENV': 'production', 'process.env.TWITTER': '$TWITTER', 'process.env.GITHUB': '$GITHUB', 'process.env.INSTAGRAM': '$INSTAGRAM', 'process.env.EMAIL': '$EMAIL', 'process.env.SENTRY': '$SENTRY', 'process.env.ANALYTICS': '$ANALYTICS', 'process.env.GITHUB_TOKEN': '$GITHUB_TOKEN', }" >> env-config.js
RUN yarn build && yarn --production

FROM mhart/alpine-node
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=base /app .
EXPOSE 3000
CMD node -r esm server/index.js
