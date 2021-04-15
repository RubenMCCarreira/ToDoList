FROM node:alpine

ADD package*.json ./
RUN npm i --force

ADD . .

CMD npm start