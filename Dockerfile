FROM node:18.14.0-alpine3.17

WORKDIR /app
COPY . ./
RUN npm i

CMD ["node","index.js"]