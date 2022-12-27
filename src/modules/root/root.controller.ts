import { Request, Response } from "express";

class RootController {
  static async get(req: Request, res: Response) {
    res.send("app");
  }
}

export default RootController;
