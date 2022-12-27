import { Router } from "express";
import RootController from "./root.controller";

const RootRouter = Router();

RootRouter.get("/", RootController.get);

export default RootRouter;
