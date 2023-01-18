import Express from "express";
import * as dotenv from "dotenv";
import { logger } from "./util/logging";
import { setup } from "./setup";


dotenv.config();

const app = Express();
const port = process.env.BACKEND_PORT ? process.env.BACKEND_PORT : 4000;

setup(app)

app.listen(port, () => {
  logger.info(`⚡️ Listening on port ${port}`);
});
