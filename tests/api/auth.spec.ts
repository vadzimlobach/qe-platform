import { test, expect } from "../../framework/fixtures/test.fixture";
import config from "../../config/config";
import { CreateUserApiResponse } from "../../framework/core/models/users";

test.describe("Auth API", { tag: "@api" }, () => {
  test(
    "should login successfully with valid credentials",
    { tag: ["@smoke", "@regression"] },
    async ({ authClient }) => {
      const response = await authClient.loginRaw({
        username: config.credentials.username,
        password: config.credentials.password,
      });

      expect(response.status()).toBe(200);

      const body = await response.json();

      expect(body).toHaveProperty("token");
      expect(body.user.username).toBe(config.credentials.username);
      expect(body.user.role).toBe("standard");
    },
  );

  test(
    "should login with generated api user",
    { tag: ["@smoke", "@regression"] },
    async ({ createApiSession }) => {
      const { token } = await createApiSession();

      expect(token).toBeTruthy();
    },
  );

  [
    {
      credentialsType: "empty",
      username: "",
      password: "",
      expectedStatusCode: 400,
      expectedError: "Username and password are required",
    },
    {
      credentialsType: "invalid password",
      username: "standard_user",
      password: "wrong_password",
      expectedStatusCode: 401,
      expectedError: "Invalid username or password",
    },
    {
      credentialsType: "invalid username",
      username: "wrong_user",
      password: "secret_sauce",
      expectedStatusCode: 401,
      expectedError: "Invalid username or password",
    },
    {
      credentialsType: "locked out",
      username: "locked_out_user",
      password: "secret_sauce",
      expectedStatusCode: 403,
      expectedError: "User is locked out",
    },
  ].forEach(
    ({
      credentialsType,
      username,
      password,
      expectedStatusCode,
      expectedError,
    }) => {
      test(
        `should return an "${expectedError}" when logging in with ${credentialsType} credentials`,
        { tag: "@regression" },
        async ({ authClient }) => {
          const response = await authClient.loginRaw({ username, password });

          expect(response.status()).toBe(expectedStatusCode);

          const body = await response.json();

          expect(body.error).toBe(expectedError);
        },
      );
    },
  );
});
