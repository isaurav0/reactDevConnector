FROM node:14.4.0-stretch

#Build react into static html
WORKDIR /usr/confluence/client

COPY package.json .

RUN npm install

COPY ./client/ .

CMD ["npm", "run", "build"]
