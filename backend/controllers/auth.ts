import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { logger } from "../util/logging";

export const authController = {
  loginMiddleware: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, usr, info) => {
      if (err) {
        return res.status(401).json({ err: err });
      }

      if (info) {
        return res.status(401).json({ err: info.message });
      }

      if (!usr) {
        return res.status(401).json({ err: "Unknown error" });
      }
      req.user = usr;

      req.logIn(usr, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ err: "Internal server error when logging in" });
        }
        return res.status(200).json({ msg: usr });
      });

      next();
    })(req, res, next);
  },
  login: () => {},

  logout: (req: Request, res: Response) => {
    req.logOut((err) => {
      if (err) {
        logger.error(err);
        return res
          .status(500)
          .json({ err: "An error occured while logging out" });
      }
      return res.status(200).json({ msg: "Logged out" });
    });
  },
};
