FROM node:5.9.0

MAINTAINER zak vyn <zkayvn@yahoo.com>

#Want docker to cache node_modules, unless there is a change to package.json
ADD package.json /tmp/package.json
RUN cd /tmp && npm config set strict-ssl false && npm install

WORKDIR /fixtures/src/app

RUN mkdir -p /usr/src/app/log && cp -ar /tmp/node_modules /fixtures/src/app/node_modules

ADD . /fixtures/src/app

CMD npm start
