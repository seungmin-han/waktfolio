# build stage
FROM node:18.16.0 as build-stage 
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
RUN npm run build
# production stage
FROM nginx:stable-alpine as production-stage
COPY --from-build-stage /app/dist /usr/share/nginx/html 