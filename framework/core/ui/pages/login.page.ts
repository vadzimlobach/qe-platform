import { Locator, Page } from "@playwright/test";
import { routes } from "../routes";
import { Logger } from "../../../utils/logger";

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByTestId("username");
    this.passwordInput = this.page.getByTestId("password");
    this.loginButton = this.page.getByTestId("login-button");
  }

  async open(): Promise<void> {
    Logger.step("Open login page");
    await this.page.goto(routes.login);
  }

  async login(username: string, password: string): Promise<void> {
    Logger.step(`Login with ${username} credentials`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
