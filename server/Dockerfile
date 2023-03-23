FROM node:18-alpine

WORKDIR /server

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD yarn start