ARG NODE_IMAGE=node:18.16.0-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
COPY .env ./
FROM dependencies AS build
RUN rm -rf ./build && tsc

FROM base AS production
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN yarn install --frozen-lockfile --production
COPY --chown=node:node --from=build /home/node/app/build .
EXPOSE 3333
CMD [ "dumb-init", "node", "server.js" ]