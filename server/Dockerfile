FROM node:18-alpine

WORKDIR /server

COPY ./server .

RUN yarn build

EXPOSE 3000

CMD yarn dev