import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { ProductApiResponse, ProductsApiResponse } from "../models/product";
import config from "../../../config/config";
import { Logger } from "../../utils/logger";

export class ProductsClient {
  constructor(private readonly request: APIRequestContext) {}

  async getProducts(token: string): Promise<ProductsApiResponse> {
    Logger.step(`Get all products`);
    const response = await this.request.get(`${config.apiBaseUrl}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await expect(response).toBeOK();

    const respBody = await response.json();
    return respBody;
  }

  async getProductsRaw(token?: string): Promise<APIResponse> {
    Logger.step(`Get all products`);

    return this.request.get(`${config.apiBaseUrl}/products`, {
      headers: this.buildAuthHeaders(token),
    });
  }

  async getProduct(id: number, token: string): Promise<ProductApiResponse> {
    Logger.step(`Get product by id ${id}`);
    const response = await this.request.get(
      `${config.apiBaseUrl}/products/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    await expect(response).toBeOK();

    const respBody = await response.json();
    return respBody;
  }

  async getProductRaw(
    id: string | number,
    token?: string,
  ): Promise<APIResponse> {
    Logger.step(`Get product by id ${id}`);
    const response = await this.request.get(
      `${config.apiBaseUrl}/products/${id}`,
      {
        headers: this.buildAuthHeaders(token),
      },
    );
    return response;
  }

  private buildAuthHeaders(token?: string): Record<string, string> | undefined {
    if (!token) return undefined;

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}
