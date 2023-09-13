FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run sync

EXPOSE 80

CMD [ "node", "dist/index.js" ]
