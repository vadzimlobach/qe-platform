export type Env = "dev" | "staging";

export interface AppConfig {
  env: Env;
  uiBaseUrl: string;
  apiBaseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
}
