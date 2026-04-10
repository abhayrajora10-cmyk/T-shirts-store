# T-Shirt E-Commerce Backend API

Complete, production-ready backend for T-shirt e-commerce platform built with Node.js, Express.js, and MongoDB.

## Features

✅ **User Authentication** - JWT-based signup/login with secure password hashing  
✅ **Admin Dashboard** - Complete admin panel with product, user, and order management  
✅ **Product Management** - Full CRUD operations with filtering and search  
✅ **Shopping Cart** - Dynamic cart management with real-time calculations  
✅ **Order System** - Order creation and status tracking  
✅ **Role-Based Access** - Admin, moderator, and user roles with permissions  
✅ **Security** - Helmet, CORS, rate limiting, input validation  
✅ **Database** - MongoDB with Mongoose ODM  
✅ **Error Handling** - Comprehensive error handling and validation  
✅ **Environment Config** - .env based configuration  

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Helmet, CORS, bcryptjs, rate-limit
- **Validation:** express-validator
- **Architecture:** MVC (Model-View-Controller)

---

## Folder Structure

```
backend/
├── config/              # Database configuration
│   └── database.js
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│   └── Admin.js
├── controllers/         # Business logic
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   └── adminController.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── adminRoutes.js
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT authentication
│   ├── errorHandler.js  # Error handling
│   └── validation.js    # Input validation
├── utils/               # Utility functions
├── seeders/             # Database seeders
│   └── seedData.js      # Initial data migration
├── .env.example         # Environment variables template
├── package.json
└── server.js            # Main entry point
```

---

## Installation & Setup

### 1. Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### 2. Clone & Install

```bash
cd backend
npm install
```

### 3. Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
MONGODB_URI=mongodb://localhost:27017/tshirts
PORT=5000
NODE_ENV=development

JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

ADMIN_JWT_SECRET=your_admin_jwt_secret_key_change_this_in_production
ADMIN_JWT_EXPIRE=7d

ADMIN_EMAIL=admin@tshirts.com
ADMIN_PASSWORD=Admin@123

FRONTEND_URL=http://localhost:5173

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Seed Database

Migrate existing t-shirt data to MongoDB:

```bash
npm run seed
```

This will:
- Create 36 t-shirt products across 6 categories
- Create default super admin account
- Set up initial database

### 5. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Authentication Endpoints

#### User Signup
```
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}

Response: 201
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### User Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response: 200
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "user": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": {...},
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

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

Response: 200
{
  "success": true,
  "user": {...}
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Product Endpoints

#### Get All Products
```
GET /api/products?category=Male&search=shirt&minPrice=20&maxPrice=30&sort=price-asc&featured=false

Query Parameters:
- category: Male|Female|Uni|Child|Teen|Old
- search: Search by name or description
- featured: true|false
- minPrice: Minimum price filter
- maxPrice: Maximum price filter
- sort: price-asc|price-desc|newest|rating

Response: 200
{
  "success": true,
  "count": 5,
  "products": [
    {
      "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
      "name": "Male T-Shirt 1",
      "price": 25,
      "discount": 10,
      "discountedPrice": 22.5,
      "category": "Male",
      "description": "...",
      "img": "...",
      "stock": 50,
      "featured": true,
      "rating": 4.5,
      "reviews": [...]
    }
  ]
}
```

#### Get Product by ID
```
GET /api/products/:id

Response: 200
{
  "success": true,
  "product": {...}
}
```

#### Get Products by Category
```
GET /api/products/category/Male

Response: 200
{
  "success": true,
  "count": 6,
  "products": [...]
}
```

#### Get Featured Products
```
GET /api/products/featured

Response: 200
{
  "success": true,
  "count": 10,
  "products": [...]
}
```

#### Add Product Review
```
POST /api/products/:id/review
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great quality product!"
}

Response: 201
{
  "success": true,
  "message": "Review added successfully",
  "product": {...}
}
```

---

### Cart Endpoints

#### Get Cart
```
GET /api/cart
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "cart": {
    "_id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "userId": "65f7a1c2b4d9e1f2g3h4i5j6",
    "items": [
      {
        "_id": "65f7a1c2b4d9e1f2g3h4i5j7",
        "productId": "...",
        "name": "Male T-Shirt 1",
        "price": 25,
        "discount": 10,
        "discountedPrice": 22.5,
        "quantity": 2,
        "size": "M",
        "color": "Black",
        "img": "..."
      }
    ],
    "totalPrice": 50,
    "totalDiscount": 5,
    "finalPrice": 45
  }
}
```

#### Add to Cart
```
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "65f7a1c2b4d9e1f2g3h4i5j6",
  "quantity": 2,
  "size": "M",
  "color": "Black"
}

Response: 201
{
  "success": true,
  "message": "Item added to cart",
  "cart": {...}
}
```

#### Update Cart Item
```
PUT /api/cart/update
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "65f7a1c2b4d9e1f2g3h4i5j7",
  "quantity": 3
}

Response: 200
{
  "success": true,
  "message": "Cart item updated",
  "cart": {...}
}
```

#### Remove from Cart
```
DELETE /api/cart/remove
Authorization: Bearer <token>
Content-Type: application/json

{
  "itemId": "65f7a1c2b4d9e1f2g3h4i5j7"
}

Response: 200
{
  "success": true,
  "message": "Item removed from cart",
  "cart": {...}
}
```

#### Clear Cart
```
DELETE /api/cart/clear
Authorization: Bearer <token>

Response: 200
{
  "success": true,
  "message": "Cart cleared",
  "cart": {...}
}
```

---

### Admin Endpoints

#### Admin Login
```
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@tshirts.com",
  "password": "Admin@123"
}

Response: 200
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "65f7a1c2b4d9e1f2g3h4i5j6",
    "email": "admin@tshirts.com",
    "name": "Super Admin",
    "role": "super-admin"
  }
}
```

#### Dashboard Stats
```
GET /api/admin/dashboard/stats
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "stats": {
    "totalUsers": 45,
    "totalProducts": 36,
    "totalOrders": 120,
    "totalRevenue": 3500
  },
  "recentOrders": [...]
}
```

---

### Product Management (Admin)

#### Get All Products
```
GET /api/admin/products
Authorization: Bearer <admin_token>
```

#### Create Product
```
POST /api/admin/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Premium T-Shirt",
  "price": 35,
  "discount": 10,
  "category": "Male",
  "description": "High-quality cotton t-shirt",
  "img": "https://example.com/image.jpg",
  "stock": 100,
  "sizes": ["XS", "S", "M", "L", "XL", "XXL"],
  "colors": ["Black", "White", "Red"]
}

Response: 201
{
  "success": true,
  "message": "Product created successfully",
  "product": {...}
}
```

#### Update Product
```
PUT /api/admin/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 40,
  "stock": 150
}

Response: 200
{
  "success": true,
  "message": "Product updated successfully",
  "product": {...}
}
```

#### Delete Product
```
DELETE /api/admin/products/:id
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### Toggle Product Active Status
```
PATCH /api/admin/products/:id/toggle
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "message": "Product activated",
  "product": {...}
}
```

---

### User Management (Admin)

#### Get All Users
```
GET /api/admin/users
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "count": 45,
  "users": [...]
}
```

#### Get User by ID
```
GET /api/admin/users/:id
Authorization: Bearer <admin_token>
```

#### Toggle User Active Status
```
PATCH /api/admin/users/:id/toggle
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "message": "User deactivated",
  "user": {...}
}
```

---

### Order Management (Admin)

#### Get All Orders
```
GET /api/admin/orders
Authorization: Bearer <admin_token>

Response: 200
{
  "success": true,
  "count": 120,
  "orders": [...]
}
```

#### Update Order Status
```
PUT /api/admin/orders/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "shipped",
  "paymentStatus": "completed"
}

Response: 200
{
  "success": true,
  "message": "Order updated successfully",
  "order": {...}
}
```

---

### Admin Management (Super Admin Only)

#### Create Admin
```
POST /api/admin/admins
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@admin.com",
  "password": "secure_password",
  "role": "admin",
  "permissions": {
    "manageProducts": true,
    "manageOrders": true,
    "manageUsers": false,
    "viewAnalytics": true,
    "manageAdmins": false
  }
}

Response: 201
{
  "success": true,
  "message": "Admin created successfully",
  "admin": {...}
}
```

#### Get All Admins
```
GET /api/admin/admins
Authorization: Bearer <admin_token>
```

#### Update Admin
```
PUT /api/admin/admins/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "moderator",
  "permissions": {
    "manageProducts": true,
    "manageOrders": true,
    "manageUsers": false,
    "viewAnalytics": false,
    "manageAdmins": false
  }
}

Response: 200
{
  "success": true,
  "message": "Admin updated successfully",
  "admin": {...}
}
```

---

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

**Token acquisition:**
1. User signup/login at `/api/auth/signup` or `/api/auth/login`
2. Admin login at `/api/admin/login`
3. Use returned token in all subsequent requests

**Default Admin Account:**
- Email: `admin@tshirts.com`
- Password: `Admin@123`
- Role: `super-admin`
- Permissions: All

---

## Error Handling

All errors return consistent response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "param": "email",
      "msg": "Invalid email format"
    }
  ]
}
```

**Common Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Best Practices Implemented

✅ **Security**
- Password hashing with bcryptjs
- JWT token-based authentication
- Environment variables for sensitive data
- Helmet for security headers
- CORS protection
- Rate limiting

✅ **Code Quality**
- MVC architecture for clean separation
- Reusable middleware
- Input validation and sanitization
- Comprehensive error handling
- Descriptive API responses

✅ **Database**
- Mongoose schema validation
- Proper indexing
- Atomic operations
- Data seeding script

✅ **Scalability**
- Modular route structure
- Controller-based logic
- Database seeders for data migration
- Environment-based configuration

---

## Connecting Frontend to Backend

Update your React frontend API calls:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Example: Login
const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Example: Get Products
const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};

// Example: Add to Cart (requires token)
const addToCart = async (token, productId, quantity, size, color) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity, size, color })
  });
  return response.json();
};
```

---

## Deployment

### MongoDB Atlas Setup
1. Create free account at mongodb.com/cloud/atlas
2. Create cluster and get connection string
3. Update `MONGODB_URI` in `.env`

### Deploy to Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku config:set JWT_SECRET=your_secret_key
```

### Deploy to AWS/Render
1. Push to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

---

## Support & Documentation

For issues or questions:
1. Check error messages
2. Review API documentation above
3. Verify MongoDB connection
4. Check JWT token validity

---

## License

MIT License - Feel free to use in your projects

---

**Built with ❤️ for T-Shirt E-Commerce**
