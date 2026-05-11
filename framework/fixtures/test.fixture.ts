import AxeBuilder from "@axe-core/playwright";
import config from "../../config/config";
import { AuthClient } from "../core/api/auth.client";
import { ProductsClient } from "../core/api/products.client";
import { UsersClient } from "../core/api/users.client";
import { ApiSession, ApiSessionOptions } from "../core/models/apiSession";
import { Role } from "../core/models/users";
import { InventoryPage } from "../core/ui/pages/inventory.page";
import { LoginPage } from "../core/ui/pages/login.page";
import { test as base } from "@playwright/test";
import { UserFactory, UserType } from "../utils/users.factory";

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  authClient: AuthClient;
  usersClient: UsersClient;
  productsClient: ProductsClient;
  uiUserFactory: UserFactory;
  apiUserFactory: UserFactory;
  axeBuilder: AxeBuilder;
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

  uiUserFactory: async ({}, use) => {
    await use(new UserFactory(UserType.Ui));
  },

  apiUserFactory: async ({ usersClient }, use, testInfo) => {
    const factory = new UserFactory(UserType.Api, usersClient, testInfo);
    await use(factory);
    await factory.dispose();
  },

  //Accessibility
  axeBuilder: async ({ page }, use) => {
    const axeBuilder = new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .include("#root");
    await use(axeBuilder);
  },

  //Session
  createApiSession: async ({ authClient, apiUserFactory }, use) => {
    await use(async (options) => {
      const { username, password } = await apiUserFactory.createUser(
        options?.role ?? "standard",
      );
      const { user, token } = await authClient.login({
        username,
        password,
      });

      return { user, token };
    });
  },
});

export { expect } from "@playwright/test";
