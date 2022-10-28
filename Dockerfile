FROM node:16-buster-slim
COPY package.json .
ADD . .
RUN npm install

EXPOSE 4000

CMD ["npm", "start"]