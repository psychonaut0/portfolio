# Frontend
FROM node:16-alpine AS frontend

RUN mkdir -p /app
WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock /app/

RUN yarn install

COPY ./frontend /app/

ENV NODE_ENV=production

RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]