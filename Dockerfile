# build stage
FROM node:18.16.0 as build-stage 
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build
# production stage
FROM nginx as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html 

COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN apt-get update
RUN apt-get install -y vim