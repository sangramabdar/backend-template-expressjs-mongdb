import { app } from "./init-server";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import {
  handleClientError,
  handleError,
  invalidPathHandler,
} from "../utils/error-middleware";
import { errorLogger } from "../utils/logger";

async function initRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("*", invalidPathHandler);

  //global error handling middleware
  app.use(errorLogger);
  app.use(handleClientError);
  app.use(handleError);
}

export default initRoutes;
