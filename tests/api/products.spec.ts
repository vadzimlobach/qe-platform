import { test, expect } from "@playwright/test";
import config from "../../config/config";

test.describe("Products API", () => {
  test("should return list of products when product id is not specified", async ({
    request,
  }) => {
    const response = await request.get(`${config.apiBaseUrl}/products`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeGreaterThan(0);
  });

  test("should return a single product when called with valid id", async ({
    request,
  }) => {
    const response = await request.get(`${config.apiBaseUrl}/products/1`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.product.id).toBe(1);
    expect(body.product).toHaveProperty("name");
    expect(body.product).toHaveProperty("description");
    expect(body.product).toHaveProperty("price");
    expect(body.product).toHaveProperty("inStock");
  });

  [
    {
      idType: "not a number",
      id: "text",
      error: "Product id must be a number",
      errorCode: 400,
    },
    {
      idType: "non-existing",
      id: 99999,
      error: "Product not found",
      errorCode: 404,
    },
  ].forEach(({ idType, id, error, errorCode }) => {
    test(`should return ${error} when called with ${idType}`, async ({
      request,
    }) => {
      const response = await request.get(`${config.apiBaseUrl}/products/${id}`);

      expect(response.status()).toBe(errorCode);
      expect((await response.json()).error).toBe(error);
    });
  });

  test("should return 401 when called without auth token", async ({
    request,
  }) => {
    const response = await request.get(`${config.apiBaseUrl}/products`);

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toBe("Authorization token is missing");
  });

  test("should return 401 when called with invalid auth token", async ({
    request,
  }) => {
    const response = await request.get(`${config.apiBaseUrl}/products`, {
      headers: { Authorization: "Bearer 1234" },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toBe("Unauthorized");
  });
});
