#!/bin/sh
npx prisma migrate deploy
node -r ./opentelemetry/init.js index.js