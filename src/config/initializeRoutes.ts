import { app } from "./initializeServer";
import RootRouter from "../modules/root/root.router";
import authRouter from "../modules/auth/auth.router";
import {
  handleClientError,
  handleError,
  invalidPathHandler,
} from "../utils/errorMiddleware";
import { errorLogger } from "../utils/logger";
import RootController from "../modules/root/root.controller";
import passport from "passport";

async function initializeRoutes() {
  //routers to handle different routes
  app.use("/", RootRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/private", RootController.privateRoute);

  app.use("*", invalidPathHandler);

  //global error handling middleware
  app.use(errorLogger);
  app.use(handleClientError);
  app.use(handleError);
}

export default initializeRoutes;
