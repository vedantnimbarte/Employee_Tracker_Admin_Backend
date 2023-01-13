import { Express, Request, Response } from "express";
import passport from "passport";
import AuthController from "./controllers/auth.controller";
import leavesController from "./controllers/leaves.controller";
import timerController from "./controllers/timer.controller";
import userController from "./controllers/user.controller";
import "./common/passport";

export default function Router(app: Express) {
  // HEALTHCHECK ROUTE
  app.get("/healthcheck", (_req: Request, res: Response) =>
    res.sendStatus(200)
  );

  // AUTH ROUTES
  app.post("/login", AuthController.login);

  // TIMER ROUTES
  app.get(
    "/timer",
    passport.authenticate("jwt", { session: false }),
    timerController.getAllRecords
  );
  app.post(
    "/timer",
    passport.authenticate("jwt", { session: false }),
    timerController.createTimeSheetEntry
  );
  app.get(
    "/timer/:id",
    passport.authenticate("jwt", { session: false }),
    timerController.getAllRecordsByUserId
  );

  // USERS ROUTES
  app.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    userController.get
  );
  app.post(
    "/user",
    passport.authenticate("jwt", { session: false }),
    userController.create
  );
  app.delete(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    userController.delete
  );
  app.put(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    userController.update
  );

  // LEAVE ROUTES
  app.get(
    "/leave",
    passport.authenticate("jwt", { session: false }),
    leavesController.list
  );
  app.post(
    "/leave",
    passport.authenticate("jwt", { session: false }),
    leavesController.create
  );
}
