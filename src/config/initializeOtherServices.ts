import { app } from "./initializeServer";
import cors from "cors";
import Express from "express";
import morgan from "morgan";

async function initializeOtherServices() {
  app.use(cors({ origin: true, credentials: true }));
  app.use(
    Express.json({
      type: ["json"],
    })
  );
  app.use(morgan(":method - :url :status - :response-time ms"));
}

export default initializeOtherServices;
