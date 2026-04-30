# Suggested SUT for API

File structure:

```
mock-api/
  auth
  products
  cart
  orders
```

Suggested endpoints:

```
POST /auth/login
GET /products
GET /products/:id
POST /cart/items
PATCH /cart/items/:id
DELETE /cart/items/:id
POST /orders
GET /orders/:id
```
