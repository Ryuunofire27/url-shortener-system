FROM node:20.18.0-alpine3.20
ARG ENV=dev
ARG PORT=3000

WORKDIR /app

RUN apk add --no-cache git
RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

EXPOSE $PORT
CMD ["pnpm", "run", "start"]