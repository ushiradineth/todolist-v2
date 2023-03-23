FROM node:18-alpine

WORKDIR /client

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3001

CMD yarn start