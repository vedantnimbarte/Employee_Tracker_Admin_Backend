if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

export default {
  DB_URI: process.env.DB_CONNECTION_URI,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  SECRET: process.env.SECRET,
};
