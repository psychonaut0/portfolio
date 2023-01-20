# Backend
FROM node:16 AS backend

RUN apt-get update && apt-get install libvips-dev -y

RUN mkdir -p /app
WORKDIR /app

COPY ./backend/package.json ./backend/yarn.lock /app/

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install
COPY ./backend /app
RUN mkdir -p /app/public/uploads

ENV NODE_ENV=production

EXPOSE 1337

RUN yarn build

CMD ["yarn", "start"]




