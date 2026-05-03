import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import {
  CreateUserApiRequest,
  CreateUserApiResponse,
  GetUsersApiResponse,
  Role,
} from "../models/users";
import config from "../../../config/config";
import { Logger } from "../../utils/logger";

export class UsersClient {
  constructor(private readonly request: APIRequestContext) {}

  async createUser({
    username,
    password,
    role = "standard",
  }: CreateUserApiRequest): Promise<CreateUserApiResponse> {
    Logger.step(`Create Api test user ${username}`);
    const response = await this.request.post(
      `${config.apiBaseUrl}/test/createUser`,
      {
        data: {
          username: username,
          password: password,
          role: role,
        },
      },
    );

    await expect(response).toBeOK();
    const userResponse: CreateUserApiResponse = await response.json();
    return userResponse;
  }

  async createUserRaw({
    username,
    password,
    role = "standard",
  }: CreateUserApiRequest): Promise<APIResponse> {
    Logger.step(`Create Api test user ${username}`);
    return await this.request.post(`${config.apiBaseUrl}/test/createUser`, {
      data: {
        username: username,
        password: password,
        role: role,
      },
    });
  }

  async getUsers(): Promise<GetUsersApiResponse> {
    Logger.step("Get list of api users");
    const response = await this.request.get(`${config.apiBaseUrl}/test/users`);
    const respBody: GetUsersApiResponse = await response.json();
    return respBody;
  }
}
