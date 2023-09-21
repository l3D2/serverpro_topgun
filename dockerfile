FROM node:current-alpine3.17
WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 3000 4500
CMD node index.js