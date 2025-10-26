FROM node:20-alpine AS development

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]

FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile --production

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]