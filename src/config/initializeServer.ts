import Express from "express";
import initializePassport from "../utils/passport";
import initializeDatabase from "./initializeDatabase";
import initializeRoutes from "./initializeRoutes";
import initializeOtherServices from "./initializeOtherServices";

const PORT = process.env.PORT;
const app = Express();

async function initializeServer() {
  await initializeOtherServices();
  await initializePassport();
  await initializeDatabase();
  await initializeRoutes();

  app.listen(PORT, () => {
    console.log("server is started");
  });
}

export { initializeServer, app };
