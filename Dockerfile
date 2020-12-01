FROM node:14

COPY /src /package.json /package-lock.json /
RUN npm install --production

ENTRYPOINT ["node", "src/index.js"]