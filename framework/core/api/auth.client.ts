import { APIRequestContext, expect, APIResponse } from "@playwright/test";
import { LoginApiRequest, LoginApiResponse } from "../models/auth";
import config from "../../../config/config";
import { Logger } from "../../utils/logger";

export class AuthClient {
  constructor(private readonly request: APIRequestContext) {}

  async loginRaw(data: LoginApiRequest): Promise<APIResponse> {
    Logger.step(`API login with ${data.username} credantials`);
    const response = await this.request.post(
      `${config.apiBaseUrl}/auth/login`,
      { data },
    );

    return response;
  }

  async login(data: LoginApiRequest): Promise<LoginApiResponse> {
    Logger.step(`API login with ${data.username} credantials`);
    const response = await this.request.post(
      `${config.apiBaseUrl}/auth/login`,
      { data },
    );

    await expect(response).toBeOK();
    const responseBody: LoginApiResponse = await response.json();
    return responseBody;
  }
}
