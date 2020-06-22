#Start server in container
FROM node:14.4.0-stretch

WORKDIR /usr/confluence/server

COPY ./server/package.json .

RUN npm install

COPY ./server .

EXPOSE 5000

CMD ["node", "server.js"]
