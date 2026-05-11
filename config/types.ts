export type Env = "dev" | "staging";

export interface AppConfig {
  env: Env;
  uiBaseUrl: string;
  apiBaseUrl: string;
  credentials: {
    username: string;
    locked_out_user: string;
    problem_user: string;
    performance_glitch_user: string;
    password: string;
  };
}
