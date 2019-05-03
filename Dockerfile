FROM node:10.15.3

# create and set app directory
RUN mkdir -p /usr/src/analytics
WORKDIR /usr/src/analytics

# install app dependencies
COPY package.json /usr/src/analytics/
RUN npm install
COPY . /usr/src/analytics

EXPOSE 6000
EXPOSE 6001

ENTRYPOINT  npm run build && npm start
