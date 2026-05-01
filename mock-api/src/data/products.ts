export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Sauce Labs Backpack',
    description: 'Carry-all backpack for testing adventures.',
    price: 29.99,
    inStock: true,
  },
  {
    id: 2,
    name: 'Sauce Labs Bike Light',
    description: 'Compact bike light for night testing.',
    price: 9.99,
    inStock: true,
  },
  {
    id: 3,
    name: 'Sauce Labs Bolt T-Shirt',
    description: 'Comfortable test automation t-shirt.',
    price: 15.99,
    inStock: false,
  },
];