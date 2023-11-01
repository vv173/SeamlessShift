FROM node:16.20.2

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

COPY . .

RUN yarn install

ENV NODE_ENV=development

# RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
