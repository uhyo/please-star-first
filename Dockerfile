FROM node:14

COPY /package.json /package-lock.json /
RUN npm install --production
COPY /src /src

ENTRYPOINT ["node", "/src/index.js"]