FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

ENV NODE_ENV=$NODE_ENV
ENV APP_SERVER_HOST=$APP_SERVER_HOST
ENV APP_SERVER_PORT=$APP_SERVER_PORT

EXPOSE 8888

CMD ["node", "server"]
