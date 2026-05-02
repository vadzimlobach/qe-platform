import { InventoryPage } from "../core/ui/pages/inventory.page";
import { LoginPage } from "../core/ui/pages/login.page";
import { test as base } from "@playwright/test";

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect } from "@playwright/test";
