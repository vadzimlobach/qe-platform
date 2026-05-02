import { expect, Page, Locator } from "@playwright/test";
import { Logger } from "../../../utils/logger";
import { routes } from "../routes";

export class InventoryPage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;

  constructor(private readonly page: Page) {
    this.title = this.page.getByTestId("title");
    this.inventoryItems = this.page.getByTestId("inventory-item");
  }

  async open(): Promise<void> {
    Logger.step("Open inventory page");
    await this.page.goto(routes.inventory);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(routes.inventory);
    await expect(this.title).toBeVisible();
    await expect(this.inventoryItems.first()).toBeVisible();
  }
}
