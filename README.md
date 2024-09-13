
# API Documentation

## Overview

This API provides endpoints for managing users, products, product categories, blog categories, blogs, brands, coupons, and orders.

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### User Routes (`/api/user`)

1. **POST `/register`**: Register a new user.
2. **POST `/login`**: Login user.
3. **GET `/`**: Get a list of all users (admin required).
4. **GET `/getOneUser`**: Get the profile of the logged-in user.
5. **POST `/refreshToken`**: Refresh the access token using a refresh token.
6. **GET `/logout`**: Logout the user by invalidating the tokens.
7. **DELETE `/`**: Delete a user.
8. **PUT `/current`**: Update the profile of the logged-in user.
9. **PUT `/address`**: Update the address of the logged-in user.
10. **PUT `/:uid`**: Update a user by admin.

### Blog Routes (`/api/blog`)

1. **POST `/`**: Create a new blog (admin only).
2. **GET `/`**: Get all blogs (admin only).
3. **PUT `/upImageBlog/:_id`**: Upload an image to a blog (admin only).
4. **PUT `/like/:bid`**: Like a blog.
5. **PUT `/dislike/:bid`**: Dislike a blog.
6. **PUT `/:_id`**: Update a blog (admin only).
7. **DELETE `/:_id`**: Delete a blog (admin only).
8. **GET `/:_id`**: Get a single blog (authenticated users).

### Blog Category Routes (`/api/blogCategory`)

1. **POST `/`**: Create a new blog category (admin only).
2. **GET `/`**: Get all blog categories (admin only).
3. **PUT `/:_id`**: Update a blog category (admin only).
4. **DELETE `/:_id`**: Delete a blog category (admin only).

### Brand Routes (`/api/brand`)

1. **POST `/`**: Create a new brand (admin only).
2. **GET `/`**: Get all brands (admin only).
3. **PUT `/:_id`**: Update a brand (admin only).
4. **DELETE `/:_id`**: Delete a brand (admin only).

### Coupon Routes (`/api/coupon`)

1. **POST `/`**: Create a new coupon (admin only).
2. **GET `/`**: Get all coupons (authenticated users).
3. **PUT `/:_id`**: Update a coupon (authenticated users).
4. **DELETE `/:_id`**: Delete a coupon (authenticated users).

### Order Routes (`/api/order`)

1. **POST `/`**: Create a new order (authenticated users).
2. **GET `/`**: Get all orders (admin only).
3. **GET `/:orderId`**: Get a single order by ID (authenticated users or admin).
4. **PUT `/:orderId/status`**: Update the order status (admin only).
5. **DELETE `/:orderId`**: Delete an order (admin only).

### Product Routes (`/api/product`)

1. **POST `/`**: Create a new product (admin only).
2. **GET `/`**: Get all products.
3. **GET `/:pid`**: Get a single product by ID.
4. **PUT `/ratings`**: Rate a product (authenticated users).
5. **PUT `/uploadImage/:pid`**: Upload an image to a product (admin only).
6. **DELETE `/:pid`**: Delete a product (admin only).
7. **PUT `/:pid`**: Update a product (admin only).

### Product Category Routes (`/api/productCategory`)

1. **POST `/`**: Create a new product category (admin only).
2. **GET `/`**: Get all product categories (admin only).
3. **PUT `/:_id`**: Update a product category (admin only).
4. **DELETE `/:_id`**: Delete a product category (admin only).

## Environment Variables

The application uses environment variables to manage configuration settings securely.

### List of Environment Variables

- **`PORT`**: The port number on which the server will run.
- **`MongoDb`**: The MongoDB connection string used to connect to the database.
- **`JWT_SECRET`**: Secret key used for signing JSON Web Tokens (JWT).
- **`LIMIT_PRODUCTS`**: The number of products to limit in queries.
- **`CLOUDINARY_NAME`**: Cloudinary cloud name used for image hosting.
- **`CLOUDINARY_KEY`**: API key for authenticating with Cloudinary services.
- **`CLOUDINARY_SECRET`**: API secret key used in conjunction with the Cloudinary key for secure API access.

### Setting Up Environment Variables

Create a `.env` file in the root directory and copy the following template:

```env
PORT=3001
MongoDb=mongodb://127.0.0.1/tmdt
JWT_SECRET=jwt
LIMIT_PRODUCTS=2
CLOUDINARY_NAME=dqpuuiacf
CLOUDINARY_KEY=857973155742119
CLOUDINARY_SECRET=fTTe_MCatJCM_-ki2NHTtKlnoao
```

## Installation and Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables as needed.
4. Start the server: `npm start` or `npm run dev`.

## Contributing

Feel free to submit issues or pull requests for improvements.

## License

This project is licensed under the MIT License.
