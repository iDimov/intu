FROM node:10.9

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

CMD ["npm", "start"]