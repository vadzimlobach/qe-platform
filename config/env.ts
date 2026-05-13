import dotenv from "dotenv";

if (!process.env.CI) {
  dotenv.config();
}

export const env = process.env;
