FROM node:13.12.0-alpine

WORKDIR /usr/confluence

RUN mkdir client server

#Build react into static html
WORKDIR /usr/confluence/client

COPY ./client/package.json .

RUN npm install

COPY ./client/ .

CMD ["npm", "run", "build"]

#Start server in container

WORKDIR /usr/confluence/server

COPY ./server/package.json .

RUN npm install

COPY ./server .

EXPOSE 5000

CMD ["node", "server.js"]
