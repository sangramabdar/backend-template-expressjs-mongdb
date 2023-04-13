import { Request, Response } from "express";

class RootController {
  static async get(req: Request, res: Response) {
    res.send("app");
  }

  static async privateRoute(req: Request, res: Response, next) {
    console.log(req.user);
    res.json({
      private: true,
    });
  }
}

export default RootController;
