
#Develop stage
FROM node:22-alpine AS build
RUN apk update  && apk add openssl

WORKDIR home/app

RUN npm install -g pnpm

COPY package*.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY prisma ./prisma
RUN npx prisma generate
COPY . .
RUN pnpm run build


# production stage

FROM node:20-alpine
RUN apk update  && apk add openssl

LABEL author="D4T"

WORKDIR home/app

COPY package*.json ./
COPY yarn.lock ./
RUN pnpm i --frozen-lockfile --prod
# COPY --from=build home/app/dist .
COPY --from=build home/app/public ./public
COPY --from=build home/app/prisma ./prisma
# RUN npx prisma generate
CMD ["node", "src/main"]
