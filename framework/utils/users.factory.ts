import { TestInfo } from "@playwright/test";
import config from "../../config/config";
import { UsersClient } from "../core/api/users.client";
import { Role } from "../core/models/users";

export type TestUser = {
  username: string;
  password: string;
};

export enum UserType {
  Ui,
  Api,
}

export class UserFactory {
  private readonly userData: UserData;
  constructor(
    type: UserType,
    apiUsersClient?: UsersClient,
    testInfo?: TestInfo,
  ) {
    switch (type) {
      case UserType.Ui:
        this.userData = new UiUserData();
        break;
      case UserType.Api:
        this.userData = new ApiUserData(apiUsersClient, testInfo);
        break;
    }
  }
  public createUser(role: Role): Promise<TestUser> | TestUser {
    return this.userData.getUser(role);
  }
}

export interface UserData {
  getUser(role: Role): Promise<TestUser> | TestUser;
  dispose?(): Promise<void>;
}

export class UiUserData implements UserData {
  getUser(role: Role): TestUser {
    const password = config.credentials.password;
    let username: string;
    switch (role) {
      case "standard":
        username = config.credentials.username;
        break;
      case "locked":
        username = config.credentials.locked_out_user;
        break;
      default:
        throw new Error(`${role} user does not exists`);
    }
    return { username, password };
  }
}

export class ApiUserData implements UserData {
  constructor(
    private readonly client?: UsersClient,
    private readonly testInfo?: TestInfo,
  ) {}
  async getUser(role: Role): Promise<TestUser> {
    const user: TestUser = {
      username: `api-user-${this.testInfo?.parallelIndex}-${Date.now()}`,
      password: config.credentials.password,
    };

    await this.client?.createUser({
      username: user.username,
      password: user.password,
      role,
    });
    return user;
  }
}
