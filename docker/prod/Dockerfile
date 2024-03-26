FROM node:21-alpine as builder

WORKDIR /app

ENV VITE_BACKEND=https://api.utagms.pl
ENV VITE_DEV=false

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

ADD . .
RUN npm run build

FROM caddy:2.7.6-alpine

COPY --from=builder /app/dist /var/www/dist
COPY ./Caddyfile /etc/caddy/Caddyfile
