import { Router, Request, Response } from "express";

const yourNameRouter: Router = Router();

yourNameRouter.get("/", (req: Request, res: Response) => {
  res.json({ name: "Neeraj-x0" });
});

export default yourNameRouter;