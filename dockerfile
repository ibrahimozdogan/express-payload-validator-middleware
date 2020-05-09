FROM node:12.16.1-alpine

MAINTAINER halilibrahimozdogan2@gmail.com

WORKDIR /var/example-api

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]


