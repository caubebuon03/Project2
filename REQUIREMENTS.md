# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- getAllProducts: `'/products' [GET]`
- getProductByID: `'/product/:id' [GET]`
- Create [token required]: `'/product' [POST] (token)`

#### Users

- Index [token required]: `'/users' [GET] (token)`
- Show [token required]: `'/user/:id' [GET] (token)`
- Create N[token required]: `'/user' [POST]`

#### Orders

- Current order by user [token required]: `'/order/current/:userId' [GET] (token)`
- Completed Orders by user [token required]: `'/order/complete/:userId' [GET] (token)`
- Active Orders by user [token required]: `'/order/active/:userId' [GET] (token)`
- Order by user [token required]: `'/order/:userId' [GET] (token)`
- Add order [token required]: `'/order/create' [POST] (token)`
- [ADDED] Delete [token required]: `'orders/:id [DELETE] (token)`
- [ADDED] Add product to order [token required]: `'orders/add-product/:id (POST) (token)`

## Data Shapes

#### Product

- id
- name
- price
- category

```
TABLE products
(
    name VARCHAR(200),
    price NUMERIC,
    category VARCHAR(50),
    id SERIAL PRIMARY KEY
)
```

#### User

- id
- firstName
- lastName
- password

```
TABLE users
(
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    password VARCHAR(200),
    id SERIAL PRIMARY KEY
)
```

#### Orders

- id
- userId
- status of order (active or complete or current)

```
TABLE orders
(
    userId INTEGER,
    status VARCHAR(20),
    id SERIAL PRIMARY KEY

    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
)
```

#### OrderProduct 

- id
- id of order
- id of each product in the order
- quantity of each product in the order


```
CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id   INTEGER NOT NULL REFERENCES ORDERS (id),
  product_id INTEGER NOT NULL REFERENCES PRODUCTS (product_id),
  quantity   INTEGER NOT NULL
);
```
