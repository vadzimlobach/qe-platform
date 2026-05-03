import { test, expect } from "../../framework/fixtures/test.fixture";
import config from "../../config/config";

test.describe("Login", { tag: "@ui" }, () => {
  test(
    "allows a standard user to ligin successfully",
    { tag: ["@smoke", "@regression"] },
    async ({ loginPage, inventoryPage }) => {
      await loginPage.open();

      await loginPage.expectLoaded();

      await loginPage.login(
        config.credentials.username,
        config.credentials.password,
      );

      await inventoryPage.expectLoaded();
    },
  );
});
