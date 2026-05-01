import { test, expect } from "@playwright/test";
import config from "../../config/config";

test.describe("Login", () => {
  test("allows a standard user to ligin successfully", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("username").fill(config.credentials.username);
    await page.getByTestId("password").fill(config.credentials.password);
    await page.getByTestId("login-button").click();

    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByTestId("title")).toBeVisible();
    await expect(page.getByTestId("inventory-item").first()).toBeVisible();
  });
});
