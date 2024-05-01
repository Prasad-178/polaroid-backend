FROM node:16

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3500

CMD [ "npm", "start" ]