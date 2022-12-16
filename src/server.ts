import express from "express";
import logger from "./common/logger";
import config from "config";
import router from "./router";
import initializeDBConnection from "./common/database";

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = config.get("PORT") as number;
const host = config.get("HOST") as string;

function initializeApi() {
  router(app);
  logger.info(`Server listening at http://${host}:${port}`);
}

app.listen(port, host, () => {
  initializeDBConnection();
  initializeApi();
});
