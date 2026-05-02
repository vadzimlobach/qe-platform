import { Router } from "express";
import { products } from "../data/products";
import { requireAuth } from "../auth/auth.middleware";

export const productsRouter = Router();

productsRouter.get("/", requireAuth, (_req, res) => {
  return res.status(200).json({
    products,
  });
});

productsRouter.get("/:id", requireAuth, (req, res) => {
  const productId = Number(req.params.id);

  if (Number.isNaN(productId)) {
    return res.status(400).json({
      error: "Product id must be a number",
    });
  }

  const product = products.find(
    (currentProduct) => currentProduct.id === productId,
  );

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  return res.status(200).json({
    product,
  });
});
