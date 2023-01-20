# Backend
FROM node:16 AS backend

RUN apt-get update && apt-get install libvips-dev -y

RUN mkdir -p /app
WORKDIR /app

COPY ./backend/package.json ./backend/yarn.lock /app/

RUN yarn install
COPY ./backend /app
RUN mkdir -p /app/public/uploads

EXPOSE 1337

RUN yarn build

CMD ["yarn", "start"]


# Frontend
FROM node:16-alpine AS frontend

RUN mkdir -p /app
WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock /app/

RUN yarn install

COPY ./frontend /app/

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]


