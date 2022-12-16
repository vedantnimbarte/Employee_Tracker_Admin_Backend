import { Express, Request, Response } from "express";
import leavesController from "./controllers/leaves.controller";
import timerController from "./controllers/timer.controller";
import userController from "./controllers/user.controller";

export default function Router(app: Express) {
  // HEALTHCHECK ROUTE
  app.get("/healthcheck", (_req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // TIMER ROUTES
  app.get("/timer", timerController.getAllRecords);
  app.post("/timer", timerController.createTimeSheetEntry);
  app.get("/timer/:id", timerController.getAllRecordsByUserId);

  // USERS ROUTES
  app.get("/user", userController.get);
  app.post("/user", userController.create);
  app.delete("/user/:id", userController.delete);
  app.put("/user/:id", userController.update);

  // LEAVE ROUTES
  app.get("/leave", leavesController.list);
  app.post("/leave", leavesController.create);
}
