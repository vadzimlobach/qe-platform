export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
};

export type ProductsApiResponse = {
  products: Product[];
};

export type ProductApiResponse = {
  product: Product;
};
