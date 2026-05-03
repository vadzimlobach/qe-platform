import { expect, Page, Locator } from "@playwright/test";
import { Logger } from "../../../utils/logger";
import { routes } from "../routes";

export class InventoryPage {
  private readonly title: Locator;
  private readonly items: Locator;

  constructor(private readonly page: Page) {
    this.title = this.page.getByTestId("title");
    this.items = this.page.getByTestId("inventory-item");
  }

  async open(): Promise<void> {
    Logger.step("Open inventory page");
    await this.page.goto(routes.inventory);
  }

  async expectLoaded(): Promise<void> {
    Logger.step("Expect Inventory Page to be loaded");
    await expect(this.page).toHaveURL(new RegExp(`${routes.inventory}`));
    await expect(this.title).toBeVisible();
    await expect(this.items.first()).toBeVisible();
  }
}
