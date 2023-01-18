import { Router } from "express";
import { isAuthenticated } from "../auth/middlewares";
import { authController } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", authController.loginMiddleware, authController.login);
authRouter.post("/logout", isAuthenticated, authController.logout);

export default authRouter;
