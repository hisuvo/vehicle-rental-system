import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  connection_str: process.env.CONNECTION_STR,
  private_key: process.env.PRIVATE_KEY,
};

export default config;
