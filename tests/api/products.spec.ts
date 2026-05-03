import { test, expect } from "../../framework/fixtures/test.fixture";

test.describe("Products API", { tag: "@api" }, () => {
  test(
    "should return list of products when product id is not specified",
    { tag: ["@smoke", "@regression"] },
    async ({ productsClient, createApiSession }) => {
      const { token } = await createApiSession();
      const response = await productsClient.getProducts(token);

      expect(response.products.length).toBeGreaterThan(0);
    },
  );

  test(
    "should return a single product when called with valid id",
    { tag: ["@smoke", "@regression"] },
    async ({ createApiSession, productsClient }) => {
      const { token } = await createApiSession();
      const response = await productsClient.getProduct(1, token);

      expect(response.product.id).toBe(1);
      expect(response.product).toHaveProperty("name");
      expect(response.product).toHaveProperty("description");
      expect(response.product).toHaveProperty("price");
      expect(response.product).toHaveProperty("inStock");
    },
  );

  [
    {
      idType: "not a number",
      id: "text",
      expectedError: "Product id must be a number",
      expectedStatusCode: 400,
    },
    {
      idType: "non-existing",
      id: -1,
      expectedError: "Product not found",
      expectedStatusCode: 404,
    },
  ].forEach(({ idType, id, expectedError, expectedStatusCode }) => {
    test(
      `should return ${expectedError} when called with ${idType}`,
      { tag: "@regression" },
      async ({ createApiSession, productsClient }) => {
        const { token } = await createApiSession();
        const response = await productsClient.getProductRaw(id, token);

        expect(response.status()).toBe(expectedStatusCode);
        expect((await response.json()).error).toBe(expectedError);
      },
    );
  });

  test(
    "should return 401 when called without auth token",
    { tag: "@regression" },
    async ({ productsClient }) => {
      const response = await productsClient.getProductsRaw();

      expect(response.status()).toBe(401);

      const body = await response.json();

      expect(body.error).toBe("Authorization token is missing");
    },
  );

  test(
    "should return 401 when called with invalid auth token",
    { tag: "@regression" },
    async ({ productsClient }) => {
      const response = await productsClient.getProductsRaw("1234abcd");

      expect(response.status()).toBe(401);

      const body = await response.json();

      expect(body.error).toBe("Unauthorized");
    },
  );
});
