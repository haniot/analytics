FROM node:12.13.1

# create and set app directory
RUN mkdir -p /usr/src/analytics
WORKDIR /usr/src/analytics

# install app dependencies
COPY package.json /usr/src/analytics/
RUN npm install

# Bundle app source
COPY . /usr/src/analytics

# Build app
RUN npm run build

EXPOSE 6000
EXPOSE 6001

CMD ["npm", "start"]
