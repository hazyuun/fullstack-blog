# Stage 1: Installing dependencies
FROM node:19 AS dependencies

WORKDIR /blog
COPY package.json yarn.lock ./
RUN yarn install --verbose --frozen-lockfile

# Stage 2: Building the app
FROM node:19 AS build

WORKDIR /blog
COPY . .
COPY --from=dependencies /blog/node_modules ./node_modules

RUN yarn next telemetry disable
RUN yarn build

# Stage 3: Running the app
FROM node:19 AS blog_frontend

WORKDIR /blog
COPY --from=build /blog/next.config.js ./
COPY --from=build /blog/public         ./public
COPY --from=build /blog/.next          ./.next
COPY --from=build /blog/node_modules   ./node_modules

ENV NODE_ENV=production

ENTRYPOINT ["node_modules/.bin/next", "start"]
