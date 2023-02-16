FROM --platform=linux/amd64 node:19-alpine3.17 AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:19-alpine3.17 AS prod
WORKDIR /usr/src/app

COPY package.json ./

COPY --from=build /usr/src/app/node_modules ./dist/node_modules
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 3000

CMD npm start
