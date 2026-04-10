# 🏃 Quick Start - Run Frontend & Backend Together

## ⚡ Setup (First Time Only)

### Step 1: Install Frontend Dependencies
```bash
cd Tshirts  # Go to root folder
npm install
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Configure Backend Environment
```bash
cd backend
# Check if .env exists, if not:
cp .env.example .env
```

Update `.env` with MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/tshirts
PORT=5000
JWT_SECRET=your_secret_key_here
ADMIN_JWT_SECRET=your_admin_secret_here
```

---

## 🚀 Run (Every Time)

Open **TWO Terminal windows** (or split terminal):

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5000
MongoDB Connected: localhost
```

---

### Terminal 2: Frontend
```bash
cd .  # (should be in Tshirts root)
npm run dev
```

Expected output:
```
VITE v8.0.0 ready in XXX ms
Local: http://localhost:5173/
```

---

## ✅ Test the Connection

### 1. Open Browser
```
http://localhost:5173
```

### 2. Check Home Page
- Should show **36 T-shirts** from MongoDB
- Not from data.js anymore!
- Click categories → products load from API

### 3. Try Adding to Cart
- Click any product → View Product
- Select size/color/quantity
- Click "Add to Cart"
- It redirects to login (expected)

### 4. Test Authentication
- Sign up with: `testuser` / `test@example.com` / `password123`
- Get JWT token
- Go back and add to cart → Works!

### 5. Admin Panel
- Go to http://localhost:5173/admin-login
- Use: `admin@tshirts.com` / `Admin@123`
- See dashboard stats from API

---

## 📊 Default Accounts

**User Account (for testing):**
- Email: Any email you register
- Password: Any password >= 6 chars
- Creates on first signup

**Admin Account:**
- Email: `admin@tshirts.com`
- Password: `Admin@123`
- Already in database (created during seeding)

---

## 📝 What's Running Where

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend API | 5000 | http://localhost:5000 |
| MongoDB | 27017 | localhost |

---

## 🔍 Network Flow Example

### When you view products:
```
React Component
    ↓
productService.getFeaturedProducts()
    ↓
Axios HTTP Request
    ↓ GET http://localhost:5000/api/products/featured
    ↓
Express Route Handler
    ↓
MongoDB Query
    ↓
Returns 36 products
    ↓
React renders ProductCard components
```

---

## ⚠️ Common Issues

### Issue: "Cannot GET /api/products"
**Cause:** Backend not running
**Fix:** Make sure Terminal 1 is running backend (npm run dev)

---

### Issue: "Failed to connect to localhost:5000"
**Cause:** Port 5000 already in use
**Fix:** 
```bash
# Find process on port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Kill it or change PORT in .env
```

---

### Issue: "Loading products..." forever
**Cause:** Backend not responding or database error
**Fix:** Check backend console for errors

---

### Issue: Products show but "Add to Cart" doesn't work
**Cause:** Not logged in
**Fix:** Sign up first, then try again

---

## 📦 Project Structure

```
Tshirts/
├── frontend (React)
│   ├── src/
│   │   ├── pages/         → Home, Category, Product (use API)
│   │   ├── components/    → ProductCard (shows MongoDB data)
│   │   ├── services/      → API wrappers (NEW!)
│   │   │   ├── apiClient.js
│   │   │   ├── productService.js
│   │   │   ├── authService.js
│   │   │   ├── cartService.js
│   │   │   └── adminService.js
│   │   └── assets/
│   │       └── data/data.js  (NO LONGER USED! 🎉)
│   └── package.json (includes axios)
│
└── backend (Node.js + Express + MongoDB)
    ├── server.js          → Express app
    ├── config/            → Database config
    ├── models/            → 5 Mongoose schemas
    ├── controllers/       → 4 business logic files
    ├── routes/            → 4 API route files  
    ├── middleware/        → Auth, validation, errors
    ├── utils/             → Helpers
    ├── package.json
    └── .env              → Configuration
```

---

## 🎯 What Data Flows Through API

### Products
- **Source:** MongoDB (36 seeded T-shirts)
- **Endpoints:** `/api/products`, `/api/products/:id`, `/api/products/category/:cat`

### Users
- **Source:** MongoDB (users collection)
- **Endpoints:** `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`

### Cart
- **Source:** MongoDB (per-user cart)
- **Endpoints:** `/api/cart` (get/add/update/remove)

### Orders
- **Source:** MongoDB (orders collection)
- **Endpoints:** `/api/admin/orders` (admin only)

### Admin Functions
- **Source:** MongoDB (admin accounts)
- **Endpoints:** `/api/admin/*` (all management)

---

## 🔒 Authentication Details

**Frontend (localStorage):**
```javascript
localStorage.setItem('authToken', 'eyJhbGc...');
localStorage.setItem('adminToken', 'eyJhbGc...');
```

**Backend (Verification):**
```javascript
Authorization: Bearer eyJhbGc...
↓
Middleware verifies JWT
↓
Allows access to protected routes
```

---

## 📲 Example: "Add to Cart" Flow

1. **Frontend:** User clicks "Add to Cart"
   ```javascript
   await cartService.addToCart(productId, quantity, size, color)
   ```

2. **Axios Interceptor:** Adds token
   ```javascript
   Authorization: Bearer <user_token>
   ```

3. **Backend:** Receives POST /api/cart/add
   ```javascript
   - Validates JWT token
   - Finds user from token
   - Adds item to user's cart
   - Saves to MongoDB
   - Returns updated cart
   ```

4. **Frontend:** Receives updated cart
   ```javascript
   setCart(result.cart)
   // UI updates with new item
   ```

---

## ✨ You're All Set!

- ✅ Frontend & Backend connected
- ✅ 36 products in database
- ✅ User authentication working
- ✅ Shopping cart ready
- ✅ Admin dashboard ready
- ✅ API documented

**Run both and start building!** 🚀

Questions? Check:
- `/backend/README.md` - Full API docs
- `/backend/QUICK_START.md` - Backend setup
- `/backend/API_EXAMPLES.md` - Example requests
- `INTEGRATION_GUIDE.md` - Overall connection guide
