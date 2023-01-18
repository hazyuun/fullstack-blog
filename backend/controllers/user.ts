import argon2 from "argon2";
import { logger } from "../util/logging";
import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { validationResult } from "express-validator";
import { user } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import underscore from "underscore";
import { filterUsers, filterUser } from "../util/safe";

export const userController = {
  getAll: async (req: Request, res: Response) => {
    const includeArticles = req.query.include_articles == "true";

    try {
      const users = await prisma.user.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          articles: includeArticles && {
            where: {
              deleted_at: null,
            },
          },
        },
      });

      const result = filterUsers(users);
      res.status(200).json(result);
    } catch (e) {
      logger.error(`Failed to get all users: ${JSON.stringify(e)}`);
      res.status(500).json({ msg: "Failed to get all users" });
    }
  },

  getById: async (req: Request, res: Response) => {
    let id = undefined;
    try {
      id = BigInt(req.params.id);
    } catch (e) {
      return res.status(400).json({ msg: `Invalid id=${req.params.id}` });
    }

    const includeArticles = req.query.include_articles == "true";

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          user_id: id,
          deleted_at: null,
        },
        include: {
          articles: includeArticles && {
            where: {
              deleted_at: null,
            },
          },
        },
      });

      const result = filterUser(user);
      res.status(200).json(result);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        logger.error(
          `Failed to get user with id=${req.params.id}: ${JSON.stringify(e)}`
        );
        res
          .status(500)
          .json({ msg: `Failed to get user with id=${req.params.id}` });
      }

      switch ((e as PrismaClientKnownRequestError).code) {
        case "P2025":
          logger.error(`No user found with id=${req.params.id}`);
          return res.status(404).json({ msg: `No user found with id=${id}` });
        default:
          logger.error(
            `Failed to get user with id=${req.params.id}: ${JSON.stringify(e)}`
          );
          res
            .status(500)
            .json({ msg: `Failed to get user with id=${req.params.id}` });
      }
    }
  },

  me: async (req: Request, res: Response) => {
    const result = filterUser(req.user! as user);
    res.status(200).json(result);
  },

  register: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const r = req.body;

      const hash = await argon2.hash(r.password);
      const user = {
        username: r.username,
        email: r.email,
        hash: hash,
      };

      const createdUser = await prisma.user.create({ data: user });
      const result = filterUser(createdUser);

      res.status(200).json(result);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        switch (e.code) {
          case "P2002":
            logger.error(
              `Failed to register user : ${e.meta!.target!} already taken`
            );
            return res
              .status(400)
              .json({ msg: `${e.meta!.target!} already taken` });
        }
      }

      logger.error(`Failed to register user ${JSON.stringify(e)}`);
      res.status(500).json({ msg: `Failed to register user` });
    }
  },

  update: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const r = req.user! as user;
      const patch = req.body;
      const safeFields = ["username", "bio"];
      const updatedUser = await prisma.user.update({
        where: { user_id: JSON.parse(`${r.user_id}`) as bigint },
        data: underscore.pick(patch, ...safeFields),
      });
      const result = filterUser(updatedUser);

      res.status(200).json(result);
    } catch (e) {
      logger.error(`Failed to update user: ${JSON.stringify(e)}`);
      res.status(500).json({ msg: `Failed to update user` });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const r = req.user! as user;

      await prisma.user.update({
        where: { user_id: JSON.parse(`${r.user_id}`) as bigint },
        data: { deleted_at: new Date() },
      });

      req.logOut((err) => {
        if (err) {
          logger.error(err);
          return res
            .status(500)
            .json({ msg: "An error occured while logging out" });
        }
      });

      res.status(200).json({ msg: "User deleted" });
    } catch (e) {
      logger.error(e);
      res.status(500).json({ msg: `Failed to delete user` });
    }
  },
};
