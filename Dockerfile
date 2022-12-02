FROM node:19.2.0
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 8080