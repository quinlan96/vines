FROM node:latest

ARG PORT=${SERVER_PORT}

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node . .

USER node

RUN npm ci

RUN npm run build

CMD npm run start
