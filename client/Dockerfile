# Use node image to build Vue app
FROM node:latest AS build

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node .env* ./

COPY --chown=node:node . .

ARG REACT_APP_API_BASE=$REACT_APP_API_BASE
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE

USER node

RUN npm i

RUN npm run build

# Copy build to nginx image and start
FROM nginx:latest

ARG PORT=${CLIENT_PORT}

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY deploy/nginx.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
