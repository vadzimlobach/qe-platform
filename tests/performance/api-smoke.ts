import { check, fail, sleep } from "k6";
import { PerformanceApiClient } from "../../framework/core/performance/PerformanceApiClient.ts";
import {
  API_BASE_URL,
  THINK_TIME,
  performanceOptions,
} from "../../config/performance.config.ts";

type LoginResponseBody = {
  token: string;
};

const USERNAME = __ENV.PERFORMANCE_USERNAME || "standard_user";
const PASSWORD = __ENV.PERFORMANCE_PASSWORD || "secret_sauce";

export const options = performanceOptions;

export default function (): void {
  const api = new PerformanceApiClient(API_BASE_URL);

  const loginResponse = api.login(USERNAME, PASSWORD);

  check(loginResponse, {
    "login status is 200": (response) => response.status === 200,
  });

  const loginBody = loginResponse.json() as LoginResponseBody;
  const token = loginBody.token;

  if (!token) {
    fail("Login did not return token");
  }

  const productsResponse = api.getProducts(token);

  check(productsResponse, {
    "products status is 200": (response) => response.status === 200,
    "products response is under 500ms": (response) =>
      response.timings.duration < 500,
  });

  sleep(THINK_TIME);
}
