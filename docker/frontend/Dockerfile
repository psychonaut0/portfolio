# Frontend
FROM node:16-alpine AS frontend

ARG NEXT_PUBLIC_STRAPI_URL
ARG STRAPI_TOKEN
ARG NEXT_PUBLIC_WEBSITE_URL


RUN mkdir -p /app
WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock /app/

RUN yarn install

COPY ./frontend /app/

ENV NODE_ENV=production
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV STRAPI_TOKEN=${STRAPI_TOKEN}
ENV NEXT_PUBLIC_WEBSITE_URL=${NEXT_PUBLIC_WEBSITE_URL}


RUN yarn build


EXPOSE 3000

CMD ["yarn", "start"]
