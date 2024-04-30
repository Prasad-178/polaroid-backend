FROM node:21-alpine

WORKDIR /backend

COPY "./package.json" .

RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npm", "start" ]