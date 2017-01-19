FROM node:4

MAINTAINER ThingleMe

ENV PORT 5000
COPY . /app
RUN cd /app; npm install -d

WORKDIR /app

EXPOSE ${PORT}

CMD npm start