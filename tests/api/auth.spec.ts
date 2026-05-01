import { test, expect } from "@playwright/test";

test.describe("Auth API", () => {
  test("should login successfully with valid credentials", async ({
    request,
  }) => {
    const response = await request.post("http://localhost:3000/auth/login", {
      data: {
        username: "standard_user",
        password: "secret_sauce",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty("token");
    expect(body.user.username).toBe("standard_user");
    expect(body.user.role).toBe("standard");
  });

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
      test(`should return an "${expectedError}" when logging in with ${credentialsType} credentials`, async ({
        request,
      }) => {
        const response = await request.post("http:localhost:3000/auth/login", {
          data: {
            username,
            password,
          },
        });

        expect(response.status()).toBe(expectedStatusCode);

        const body = await response.json();

        expect(body.error).toBe(expectedError);
      });
    },
  );
});
