import mongoose, {
  connect,
  connection,
  createConnection,
  disconnect,
} from "mongoose";
import logger from "./logger";
import config from "config";

export default async function initializeDBConnection() {
  try {
    mongoose.set("strictQuery", false);
    await connect(config.get("DB_URI"), { maxPoolSize: 10 });

    logger.info("Connected to database");
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    disconnect();
    process.exit(1);
  }
}
