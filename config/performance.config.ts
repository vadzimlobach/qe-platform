import type { Options } from "k6/options";

export const API_BASE_URL = __ENV.API_BASE_URL || "http://localhost:3000";
export const THINK_TIME = Number(__ENV.THINK_TIME) || 1;

export const PERFORMANCE_USERNAME =
  __ENV.PERFORMANCE_USERNAME || "standard_user";

export const PERFORMANCE_PASSWORD =
  __ENV.PERFORMANCE_PASSWORD || "secret_sauce";

export const performanceOptions: Options = {
  vus: Number(__ENV.VUS) || 1,
  duration: __ENV.DURATION || "10s",
  thresholds: {
    http_req_duration: ["p(95)<500"],
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};
