FROM node:18-alpine

WORKDIR /client

COPY ./client .

RUN yarn build

EXPOSE 3001

CMD yarn dev