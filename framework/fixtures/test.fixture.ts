import config from "../../config/config";
import { AuthClient } from "../core/api/auth.client";
import { ProductsClient } from "../core/api/products.client";
import { UsersClient } from "../core/api/users.client";
import { ApiSession, ApiSessionOptions } from "../core/models/apiSession";
import { Role } from "../core/models/users";
import { InventoryPage } from "../core/ui/pages/inventory.page";
import { LoginPage } from "../core/ui/pages/login.page";
import { test as base } from "@playwright/test";

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authClient: AuthClient;
  usersClient: UsersClient;
  productsClient: ProductsClient;
  createApiSession: (options?: ApiSessionOptions) => Promise<ApiSession>;
};

export const test = base.extend<AppFixtures>({
  //UI POMs
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  //API clients
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },
  usersClient: async ({ request }, use) => {
    await use(new UsersClient(request));
  },
  productsClient: async ({ request }, use) => {
    await use(new ProductsClient(request));
  },

  //Session
  createApiSession: async ({ authClient, usersClient }, use, testInfo) => {
    await use(async (options) => {
      const username = `api-user-${testInfo.parallelIndex}-${Date.now()}`;
      const { user } = await usersClient.createUser({
        username,
        password: config.credentials.password,
        role: options?.role ?? "standard",
      });
      const { token } = await authClient.login({
        username: user.username,
        password: config.credentials.password,
      });

      return { user, token };
    });
  },
});

export { expect } from "@playwright/test";
