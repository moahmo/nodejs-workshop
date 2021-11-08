FROM node:14.17.1-alpine

ENV NODE_ENV=production
WORKDIR /var/www/nodejs-workshop

COPY package*.json ./
RUN npm install --production
COPY . .

CMD ["npm", "start"]
