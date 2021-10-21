FROM node:latest

ARG PORT=${SERVER_PORT}

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node . .

USER node

RUN npm ci

RUN npm run build

EXPOSE ${PORT}

CMD npm run start
