import connectRedis from "connect-redis";
import session from "express-session";
import passport from "passport";
import { createClient } from "redis";
import { prisma } from "../prisma/client";
import argon2 from "argon2";
import { logger } from "../util/logging";

const LocalStrategy = require("passport-local/lib").Strategy;

export const setupAuth = (app: any) => {
  const redisClient = createClient({
    legacyMode: true,
    url: process.env.REDIS_URL!,
  });

  redisClient.connect().catch(console.error);
  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 3600 * 24 * 7,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username: string, password: string, done: any) => {
        let usr;
        try {
          usr = await prisma.user.findUniqueOrThrow({
            where: {
              username: username,
            },
          });
        } catch (e) {
          return done("User not found", null);
        }

        if (!(await argon2.verify(usr.hash, password))) {
          return done("Invalid password", null);
        }

        return done(null, { id: usr.user_id });
      }
    )
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    let usr;
    try {
      usr = await prisma.user.findUniqueOrThrow({
        where: {
          user_id: JSON.parse(id),
        },
      });
    } catch (e) {
      logger.error(`User id ${id} not found: ${e}`);
      return done("User not found", null);
    }

    done(null, usr);
  });
};
