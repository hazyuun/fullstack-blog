# Stage 1: Installing dependencies
FROM node:19-alpine3.16 AS dependencies

WORKDIR /blog
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --verbose

# Stage 2: Building the app
FROM node:19-alpine3.16 AS build

WORKDIR /blog
COPY . .
COPY --from=dependencies /blog/node_modules ./node_modules

RUN npx prisma generate
RUN npx tsc

# Stage 3: Running the app
FROM node:19-alpine3.16 AS blog_backend

WORKDIR /blog
COPY --from=build /blog/node_modules          ./node_modules
COPY --from=build /blog/dist                  ./
COPY --from=build /blog/prisma/               ./prisma

COPY start.sh     ./
RUN chmod +x ./start.sh

ENTRYPOINT ["/blog/start.sh"]
