import { env } from "./env";
import { AppConfig, Env } from "./types";

const currentEnv = (env.ENV || "dev") as Env;

const config: AppConfig = {
  env: currentEnv,
  uiBaseUrl: env.UI_BASE_URL!,
  apiBaseUrl: env.API_BASE_URL!,
  credentials: {
    username: env.STANDARD_USER!,
    locked_out_user: env.LOCKED_OUT_USER!,
    problem_user: env.PROBLEM_USER!,
    performance_glitch_user: env.PERFORMANCE_GLITCH_USER!,
    password: env.PASSWORD!,
  },
};
export default config;
