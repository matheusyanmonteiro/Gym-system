FROM node:18-alpine

WORKDIR /usr/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "dev"]