FROM node:21-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

ADD . .

CMD ["sh", "-c", "npm run dev -- --host"]