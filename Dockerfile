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
RUN touch env-config.js
RUN echo "module.exports = {" >> env-config.js
RUN echo "'process.env.NODE_ENV': 'production'" >> env-config.js
RUN echo "'process.env.TWITTER': '$TWITTER'" >> env-config.js
RUN echo "'process.env.GITHUB': '$GITHUB'" >> env-config.js
RUN echo "'process.env.INSTAGRAM': '$INSTAGRAM'" >> env-config.js
RUN echo "'process.env.EMAIL': '$EMAIL'" >> env-config.js
RUN echo "'process.env.SENTRY': '$SENTRY'" >> env-config.js
RUN echo "'process.env.ANALYTICS': '$ANALYTICS'" >> env-config.js
RUN echo "'process.env.GITHUB_TOKEN': '$GITHUB_TOKEN'" >> env-config.js
RUN echo "}" >> env-config.js
EXPOSE 3000
CMD node -r esm server/index.js
