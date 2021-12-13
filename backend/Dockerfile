FROM node:12-alpine

ENV DIR=/usr/src/app
ENV NODE_ENV=production

RUN mkdir -p $DIR
WORKDIR $DIR
COPY . .

RUN npm install

CMD [ "npm", "start"]
EXPOSE 3001
