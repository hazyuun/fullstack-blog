import { Express } from "express";
import userRouter from "./routes/user";
import authRouter from "./routes/auth";
import cors from "cors";
import bodyParser from "body-parser";
import { setupAuth } from "./auth/auth";
import { logger } from "./util/logging";
import articleRouter from "./routes/article";
import expressWinston from "express-winston";
import expressPrometheus from "express-prometheus-middleware"

export const setup = (app: Express) => {
  app.use(cors({ origin: "*", credentials: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressPrometheus({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  }));

  setupAuth(app);

  app.use(
    expressWinston.logger({
      msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
      colorize: true,
      transports: [logger],
    })
  );

  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/article", articleRouter);
  app.use("/api/v1/auth", authRouter);

  /* Workaround for bigint in JSON */
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
};
