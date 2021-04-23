FROM node:14-alpine

WORKDIR /app

COPY ./dist/apps/api .
COPY ./apps/api/.env .env

EXPOSE ${PORT}

RUN npm install --production

CMD node ./main.js