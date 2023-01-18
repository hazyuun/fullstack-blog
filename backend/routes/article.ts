import { Router } from "express";
import { isAuthenticated } from "../auth/middlewares";
import { articleController } from "../controllers/article";
import { articleValidators } from "../validators/article";

const articleRouter = Router();

articleRouter.get("/", articleController.getAll);
articleRouter.get("/:id", articleController.getById);
articleRouter.post(
  "/",
  isAuthenticated,
  ...articleValidators.create,
  articleController.create
);
articleRouter.patch(
  "/:id",
  isAuthenticated,
  ...articleValidators.update,
  articleController.update
);
articleRouter.delete("/:id", isAuthenticated, articleController.delete);

export default articleRouter;
