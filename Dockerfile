# Dockerfile
FROM node:lts
RUN mkdir /app && chown root:root /app
RUN mkdir /app/node_modules && chown root:root /app/node_modules
WORKDIR  /app
USER root

RUN npm install -g @angular/cli

EXPOSE 80

