import { test, expect } from "@playwright/test";

test.describe("Products API", () => {
  test("should return list of products when product id is not specified", async ({
    request,
  }) => {
    const response = await request.get("http://localhost:3000/products");

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.products.length).toBeGreaterThan(0);
  });

  test("should return a single product when called with valid id", async ({
    request,
  }) => {
    const response = await request.get("http://localhost:3000/products/1");

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
      const response = await request.get(
        `http://localhost:3000/products/${id}`,
      );

      expect(response.status()).toBe(errorCode);
      expect((await response.json()).error).toBe(error);
    });
  });
});
