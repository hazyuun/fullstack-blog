import { Router } from "express";
import { body } from "express-validator";
import { isAuthenticated } from "../auth/middlewares";
import { userController } from "../controllers/user";
import { userValidators } from "../validators/user";

const userRouter = Router();

userRouter.get("/", userController.getAll);
userRouter.get("/me", isAuthenticated, userController.me);
userRouter.get("/:id", userController.getById);
userRouter.post("/", ...userValidators.register, userController.register);
userRouter.patch(
  "/",
  isAuthenticated,
  ...userValidators.update,
  userController.update
);
userRouter.delete("/", isAuthenticated, userController.delete);

export default userRouter;
