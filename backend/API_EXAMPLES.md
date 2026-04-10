# API Response Examples

Complete reference for all API requests and responses.

---

## Authentication Endpoints

### POST /api/auth/signup

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjdhMWMyYjRkOWUxZjJnM2g0aTVqNiIsImlhdCI6MTcxMTQwODAwMCwiZXhwIjoxNzEyMzAzOTk5fQ.signature",
  "user": {
    "id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### POST /api/auth/login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "secure_password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### GET /api/auth/me

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T15:45:00.000Z"
  }
}
```

---

### PUT /api/auth/profile

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "phone": "+91-9876543210",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-20T16:00:00.000Z"
  }
}
```

---

## Product Endpoints

### GET /api/products

**Query Parameters:**
```
?category=Male&search=shirt&minPrice=15&maxPrice=30&sort=price-asc&featured=false
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "products": [
    {
      "_id": "65f7a1c2b4d9e1f2g3h4i5j7",
      "name": "Male T-Shirt 1",
      "price": 25,
      "discount": 10,
      "discountedPrice": 22.5,
      "category": "Male",
      "description": "Comfortable Male t-shirt, size options S-XL.",
      "img": "https://i.pinimg.com/1200x/9e/1d/cc/9e1dccf3decc78c73a86f7e925951a65.jpg",
      "stock": 50,
      "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
      "colors": ["Black", "White", "Red", "Blue", "Green", "Yellow"],
      "material": "100% Cotton",
      "featured": true,
      "rating": 4.5,
      "reviews": [
        {
          "_id": "65f7a1c2b4d9e1f2g3h4i5j9",
          "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
          "username": "john_doe",
          "rating": 5,
          "comment": "Great quality!",
          "createdAt": "2024-01-20T10:30:00.000Z"
        }
      ],
      "isActive": true,
      "createdAt": "2024-01-10T08:00:00.000Z",
      "updatedAt": "2024-01-20T12:00:00.000Z"
    }
  ]
}
```

---

### GET /api/products/:id

**Response (200 OK):**
```json
{
  "success": true,
  "product": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j7",
    "name": "Male T-Shirt 1",
    "price": 25,
    "discount": 10,
    "discountedPrice": 22.5,
    "category": "Male",
    "description": "Comfortable Male t-shirt, size options S-XL.",
    "img": "https://i.pinimg.com/1200x/9e/1d/cc/9e1dccf3decc78c73a86f7e925951a65.jpg",
    "stock": 50,
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": ["Black", "White", "Red", "Blue", "Green", "Yellow"],
    "material": "100% Cotton",
    "featured": true,
    "rating": 4.5,
    "reviews": [
      {
        "_id": "65f7a1c2b4d9e1f2g3h4i5j9",
        "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
        "username": "john_doe",
        "rating": 5,
        "comment": "Great quality!",
        "createdAt": "2024-01-20T10:30:00.000Z"
      }
    ],
    "isActive": true,
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-20T12:00:00.000Z"
  }
}
```

---

### GET /api/products/category/Male

**Response (200 OK):**
```json
{
  "success": true,
  "count": 6,
  "products": [...]  // Array of 6 male t-shirts
}
```

---

### GET /api/products/featured

**Response (200 OK):**
```json
{
  "success": true,
  "count": 8,
  "products": [...]  // Array of featured products (max 10)
}
```

---

### POST /api/products/:id/review

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Review added successfully",
  "product": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j7",
    "name": "Male T-Shirt 1",
    "price": 25,
    "discount": 10,
    "discountedPrice": 22.5,
    "category": "Male",
    "description": "Comfortable Male t-shirt, size options S-XL.",
    "img": "https://i.pinimg.com/1200x/9e/1d/cc/9e1dccf3decc78c73a86f7e925951a65.jpg",
    "stock": 50,
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": ["Black", "White", "Red", "Blue", "Green", "Yellow"],
    "material": "100% Cotton",
    "featured": true,
    "rating": 4.7,
    "reviews": [
      {
        "_id": "65f7a1c2b4d9e1f2g3h4i5jA",
        "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
        "username": "john_doe",
        "rating": 5,
        "comment": "Excellent product! Highly recommended.",
        "createdAt": "2024-01-21T10:30:00.000Z"
      }
    ],
    "isActive": true,
    "createdAt": "2024-01-10T08:00:00.000Z",
    "updatedAt": "2024-01-21T10:30:00.000Z"
  }
}
```

---

## Cart Endpoints

### GET /api/cart

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "cart": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5jB",
    "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
    "items": [
      {
        "_id": "65f7a1c2b4d9e1f2g3h4i5jC",
        "productId": "65f7a1c2b4d9e1f2g3h4i5j7",
        "name": "Male T-Shirt 1",
        "price": 25,
        "discount": 10,
        "discountedPrice": 22.5,
        "quantity": 2,
        "size": "M",
        "color": "Black",
        "img": "https://i.pinimg.com/1200x/9e/1d/cc/9e1dccf3decc78c73a86f7e925951a65.jpg",
        "addedAt": "2024-01-21T10:30:00.000Z"
      },
      {
        "_id": "65f7a1c2b4d9e1f2g3h4i5jD",
        "productId": "65f7a1c2b4d9e1f2g3h4i5j8",
        "name": "Female T-Shirt 2",
        "price": 29,
        "discount": 5,
        "discountedPrice": 27.55,
        "quantity": 1,
        "size": "S",
        "color": "White",
        "img": "https://i.pinimg.com/1200x/b4/58/3e/b4583e2c009c9916b8152a749156a058.jpg",
        "addedAt": "2024-01-21T11:00:00.000Z"
      }
    ],
    "totalPrice": 83,
    "totalDiscount": 12.5,
    "finalPrice": 70.55,
    "createdAt": "2024-01-21T10:30:00.000Z",
    "updatedAt": "2024-01-21T11:00:00.000Z"
  }
}
```

---

### POST /api/cart/add

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "productId": "65f7a1c2b4d9e1f2g3h4i5j7",
  "quantity": 2,
  "size": "M",
  "color": "Black"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Item added to cart",
  "cart": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5jB",
    "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
    "items": [...],
    "totalPrice": 83,
    "totalDiscount": 12.5,
    "finalPrice": 70.55,
    "createdAt": "2024-01-21T10:30:00.000Z",
    "updatedAt": "2024-01-21T11:05:00.000Z"
  }
}
```

---

### PUT /api/cart/update

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "itemId": "65f7a1c2b4d9e1f2g3h4i5jC",
  "quantity": 3
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cart item updated",
  "cart": {...}
}
```

---

### DELETE /api/cart/remove

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "itemId": "65f7a1c2b4d9e1f2g3h4i5jC"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "cart": {...}
}
```

---

### DELETE /api/cart/clear

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Cart cleared",
  "cart": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5jB",
    "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
    "items": [],
    "totalPrice": 0,
    "totalDiscount": 0,
    "finalPrice": 0,
    "createdAt": "2024-01-21T10:30:00.000Z",
    "updatedAt": "2024-01-21T11:10:00.000Z"
  }
}
```

---

## Admin Endpoints

### POST /api/admin/login

**Request:**
```json
{
  "email": "admin@tshirts.com",
  "password": "Admin@123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "65f7a1c2b4d9e1f2g3h4i5jE",
    "email": "admin@tshirts.com",
    "name": "Super Admin",
    "role": "super-admin"
  }
}
```

---

### GET /api/admin/dashboard/stats

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 45,
    "totalProducts": 36,
    "totalOrders": 120,
    "totalRevenue": 3500
  },
  "recentOrders": [
    {
      "_id": "65f7a1c2b4d9e1f2g3h4i5jF",
      "userId": {
        "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
        "username": "john_doe",
        "email": "john@example.com"
      },
      "items": [
        {
          "productId": "65f7a1c2b4d9e1f2g3h4i5j7",
          "name": "Male T-Shirt 1",
          "price": 25,
          "quantity": 2,
          "size": "M",
          "color": "Black"
        }
      ],
      "totalPrice": 50,
      "totalDiscount": 5,
      "finalPrice": 45,
      "shippingAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "status": "pending",
      "paymentStatus": "pending",
      "paymentMethod": "cod",
      "createdAt": "2024-01-21T10:30:00.000Z"
    }
  ]
}
```

---

### POST /api/admin/products

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Premium Male T-Shirt",
  "price": 35,
  "discount": 15,
  "category": "Male",
  "description": "High-quality cotton blend t-shirt, comfortable fit",
  "img": "https://example.com/image.jpg",
  "stock": 100,
  "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
  "colors": ["Black", "White", "Red", "Blue", "Green"],
  "material": "100% Cotton"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5jG",
    "name": "Premium Male T-Shirt",
    "price": 35,
    "discount": 15,
    "discountedPrice": 29.75,
    "category": "Male",
    "description": "High-quality cotton blend t-shirt, comfortable fit",
    "img": "https://example.com/image.jpg",
    "stock": 100,
    "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
    "colors": ["Black", "White", "Red", "Blue", "Green"],
    "material": "100% Cotton",
    "featured": false,
    "rating": 0,
    "reviews": [],
    "isActive": true,
    "createdAt": "2024-01-21T12:00:00.000Z",
    "updatedAt": "2024-01-21T12:00:00.000Z"
  }
}
```

---

### GET /api/admin/users

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 45,
  "users": [
    {
      "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
      "username": "john_doe",
      "email": "john@example.com",
      "phone": "+91-9876543210",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001",
        "country": "USA"
      },
      "role": "user",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-20T15:45:00.000Z"
    }
  ]
}
```

---

### Error Response

**Bad Request (400):**
```json
{
  "success": false,
  "message": "Invalid email format",
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email format"
    }
  ]
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "message": "You do not have permission to perform this action"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

**All responses follow this consistent format with success flag, message, and data/errors.**
