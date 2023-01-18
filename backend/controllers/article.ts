import { logger } from "../util/logging";
import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { user } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import underscore from "underscore";
import { filterArticles, filterArticle } from "../util/safe";

export const articleController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const articles = await prisma.article.findMany({
        where: {
          deleted_at: null,
        },
        include: {
          author: true,
        },
      });

      const result = filterArticles(articles);

      res.status(200).json(result);
    } catch (e) {
      logger.error(`Failed to get all articles: ${JSON.stringify(e)}`);
      res.status(500).json({ msg: "Failed to get all articles" });
    }
  },

  getById: async (req: Request, res: Response) => {
    let id = undefined;
    try {
      id = BigInt(req.params.id);
    } catch (e) {
      return res.status(400).json({ msg: `Invalid id=${req.params.id}` });
    }

    try {
      const article = await prisma.article.findFirstOrThrow({
        where: {
          article_id: id,
          deleted_at: null,
        },
        include: {
          author: true,
        },
      });
      const result = filterArticle(article);
      res.status(200).json(result);
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        logger.error(
          `Failed to get article with id=${req.params.id}: ${JSON.stringify(e)}`
        );
        res
          .status(500)
          .json({ msg: `Failed to get article with id=${req.params.id}` });
      }

      switch ((e as PrismaClientKnownRequestError).code) {
        case "P2025":
          logger.error(`No article found with id=${req.params.id}`);
          return res
            .status(404)
            .json({ msg: `No article found with id=${id}` });
        default:
          logger.error(
            `Failed to get article with id=${req.params.id}: ${JSON.stringify(
              e
            )}`
          );
          res
            .status(500)
            .json({ msg: `Failed to get article with id=${req.params.id}` });
      }
    }
  },

  create: async (req: Request, res: Response) => {
    const u = req.user as user;
    const newArticle = {
      title: req.body.title,
      content: req.body.content,
    };

    try {
      const result = await prisma.article.create({
        data: {
          ...newArticle,
          author: {
            connect: {
              user_id: u.user_id,
            },
          },
        },
      });

      return res.status(200).json(result);
    } catch (e) {
      logger.error(`Failed to create new article: ${e}`);
      res.status(500).json({ msg: "Failed to create new article" });
    }
  },

  update: async (req: Request, res: Response) => {
    let id = undefined;
    try {
      id = BigInt(req.params.id);
    } catch (e) {
      return res.status(400).json({ msg: `Invalid id=${req.params.id}` });
    }
    const u = req.user as user;

    /* Get the article and verify the owner */
    try {
      const a = await prisma.article.findFirstOrThrow({
        where: {
          article_id: id,
          deleted_at: null,
        },
      });
      if (a.author_id !== u.user_id) {
        return res.status(403).json({ msg: "Access denied" });
      }
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        logger.error(
          `Failed to get article with id=${req.params.id}: ${JSON.stringify(e)}`
        );
        res
          .status(500)
          .json({ msg: `Failed to get article with id=${req.params.id}` });
      }

      switch ((e as PrismaClientKnownRequestError).code) {
        case "P2025":
          logger.error(`No article found with id=${req.params.id}`);
          return res
            .status(404)
            .json({ msg: `No article found with id=${id}` });
        default:
          logger.error(
            `Failed to get user with id=${req.params.id}: ${JSON.stringify(e)}`
          );
          res.status(500).json({ msg: `Failed to get article with id=${id}` });
      }
    }

    /* Update the article */
    try {
      const patch = req.body;
      const safeFields = ["title", "content"];

      const result = await prisma.article.update({
        where: {
          article_id: id,
        },
        data: underscore.pick(patch, ...safeFields),
      });

      return res.status(200).json(result);
    } catch (e) {
      logger.error(`Failed to update article: ${e}`);
      res.status(500).json({ msg: "Failed to update article" });
    }
  },

  delete: async (req: Request, res: Response) => {
    let id = undefined;
    try {
      id = BigInt(req.params.id);
    } catch (e) {
      return res.status(400).json({ msg: `Invalid id=${req.params.id}` });
    }
    const u = req.user as user;

    /* Get the article and verify the owner */
    try {
      const a = await prisma.article.findFirstOrThrow();
      if (a.author_id !== u.user_id) {
        return res.status(403).json({ msg: "Access denied" });
      }
    } catch (e) {
      if (!(e instanceof PrismaClientKnownRequestError)) {
        logger.error(
          `Failed to get article with id=${req.params.id}: ${JSON.stringify(e)}`
        );
        res
          .status(500)
          .json({ msg: `Failed to get article with id=${req.params.id}` });
      }

      switch ((e as PrismaClientKnownRequestError).code) {
        case "P2025":
          logger.error(`No article found with id=${req.params.id}`);
          return res
            .status(404)
            .json({ msg: `No article found with id=${id}` });
        default:
          logger.error(
            `Failed to get user with id=${req.params.id}: ${JSON.stringify(e)}`
          );
          res.status(500).json({ msg: `Failed to get article with id=${id}` });
      }
    }

    /* Delete the article */
    try {
      const result = await prisma.article.update({
        where: {
          article_id: id,
        },
        data: {
          deleted_at: new Date(),
        },
      });

      return res.status(200).json({ msg: "Article deleted" });
    } catch (e) {
      logger.error(`Failed to create delete article: ${e}`);
      res.status(500).json({ msg: "Failed to delete article" });
    }
  },
};
