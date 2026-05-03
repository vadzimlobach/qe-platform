import { test, expect } from "../../framework/fixtures/test.fixture";
import config from "../../config/config";

test.describe("Products API", () => {
  test("should return list of products when product id is not specified", async ({
    productsClient,
    createApiSession,
  }) => {
    const { token } = await createApiSession();
    const response = await productsClient.getProducts(token);

    expect(response.products.length).toBeGreaterThan(0);
  });

  test("should return a single product when called with valid id", async ({
    createApiSession,
    productsClient,
  }) => {
    const { token } = await createApiSession();
    const response = await productsClient.getProduct(1, token);

    expect(response.product.id).toBe(1);
    expect(response.product).toHaveProperty("name");
    expect(response.product).toHaveProperty("description");
    expect(response.product).toHaveProperty("price");
    expect(response.product).toHaveProperty("inStock");
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
      id: -1,
      error: "Product not found",
      errorCode: 404,
    },
  ].forEach(({ idType, id, error, errorCode }) => {
    test(`should return ${error} when called with ${idType}`, async ({
      createApiSession,
      productsClient,
    }) => {
      const { token } = await createApiSession();
      const response = await productsClient.getProductRaw(id, token);

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
    productsClient,
  }) => {
    const response = await productsClient.getProductsRaw("1234abcd");

    expect(response.status()).toBe(401);

    const body = await response.json();

    expect(body.error).toBe("Unauthorized");
  });
});
