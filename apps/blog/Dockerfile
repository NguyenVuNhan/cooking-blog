FROM node:14-alpine

WORKDIR /app

COPY ./dist/apps/api .
COPY ./apps/blog/.env .env

ENV PORT=80

EXPOSE ${PORT}

RUN npm install --production

CMD node ./main.js