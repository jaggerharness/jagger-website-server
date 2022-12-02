FROM node:19.2.0
WORKDIR /app
COPY . .
RUN npm install
CMD ["nodemon"]
EXPOSE 8080