# 🧪 Testing Guide - T-Shirt E-Commerce App

## 🚀 Quick Start

### Running Both Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev  # Runs on http://localhost:3001

# Terminal 2 - Frontend
npm run dev  # Runs on http://localhost:5173
```

## 👤 Test Accounts

### User Account
You can either:
1. **Create a new account** via signup page
2. **Use pre-created test user:**
   - Email: `user@example.com`
   - Password: `password123`

### Admin Account
- Email: `admin@tshirts.com`
- Password: `Admin@123`

## 📋 Testing Checklist

### 1️⃣ Home Page
- [ ] Open http://localhost:5173
- [ ] See beautiful hero section
- [ ] See featured T-shirts loading
- [ ] Click "Shop Now" button
- [ ] Click "See Featured" button (scrolls to products)
- [ ] See loading spinner while fetching products

### 2️⃣ Product Browsing
- [ ] Navigate to category page
- [ ] See all 36 T-shirts loading from database
- [ ] See product cards with:
  - [ ] Product image
  - [ ] Product name
  - [ ] Original price (strikethrough)
  - [ ] Discount percentage badge
  - [ ] Discounted price
  - [ ] Rating visible

### 3️⃣ Authentication

#### Signup
- [ ] Click "Sign Up" link
- [ ] Fill form with:
  - [ ] Username (min 3 chars)
  - [ ] Email (valid format)
  - [ ] Password (min 6 chars)
  - [ ] Confirm password (must match)
- [ ] Test password visibility toggle (👁️ icon)
- [ ] See validation error if password doesn't match
- [ ] See error with helpful message if fields invalid
- [ ] Click signup → see success message → redirect to home

#### Login
- [ ] Click "Login" on navbar
- [ ] Try empty fields → see error
- [ ] Try invalid email → see error
- [ ] Try short password → see error
- [ ] Login with `user@example.com` / `password123`
- [ ] See success message
- [ ] Redirected to home page
- [ ] See "Logout" in navbar (logged in)

### 4️⃣ Shopping Cart

#### Adding Items
- [ ] Go to product page
- [ ] See product details:
  - [ ] Full image
  - [ ] Product name
  - [ ] Price and discount
  - [ ] Description
  - [ ] Rating/reviews
- [ ] Select size from dropdown
- [ ] Select color from dropdown
- [ ] Enter quantity (1-10)
- [ ] Click "Add to Cart"
- [ ] See success message

#### Cart Page
- [ ] Click cart icon (number shows item count)
- [ ] See all items with:
  - [ ] Product image
  - [ ] Size and color selections
  - [ ] Original and discounted price
  - [ ] Quantity controls (+/-)
  - [ ] Remove button (✕)
- [ ] Increase quantity → total updates
- [ ] Decrease quantity → total updates
- [ ] Remove item → item disappears
- [ ] See order summary:
  - [ ] Subtotal
  - [ ] Total Savings
  - [ ] Final Total Price
- [ ] See "Proceed to Checkout" button
- [ ] See "Continue Shopping" button
- [ ] See shipping info

#### Empty Cart
- [ ] Remove all items
- [ ] See empty cart message
- [ ] See friendly empty state with icon 📭
- [ ] Click "Continue Shopping"

### 5️⃣ Responsive Design

#### Tablet (768px width)
- [ ] Open developer tools (F12)
- [ ] Set viewport to tablet size
- [ ] Check all pages display well
- [ ] Check navigation stays accessible
- [ ] Check forms are usable

#### Mobile (480px width)
- [ ] Set viewport to mobile size
- [ ] Check all pages display well
- [ ] Check touch targets are large enough
- [ ] Check images scale properly
- [ ] Check forms are usable

### 6️⃣ Error Handling

#### Network Errors
- [ ] Disconnect internet
- [ ] Try to add product to cart
- [ ] See error message: "Failed to add item"
- [ ] Error message is helpful, not technical

#### Login Errors
- [ ] Try wrong email
- [ ] See error: "Login failed! Please try again"
- [ ] Try wrong password
- [ ] See error message with helpful text

#### Cart Errors
- [ ] Try removing last item
- [ ] Should remove smoothly without error
- [ ] Try updating quantity rapidly
- [ ] Should handle smoothly

### 7️⃣ Performance

#### Animations
- [ ] Buttons have hover effects
- [ ] Page transitions are smooth
- [ ] Loading spinners animate
- [ ] Form input focus is visible

#### Speed
- [ ] Products load within 2-3 seconds
- [ ] Cart operations feel instant
- [ ] No layout shifts while loading

## 🎨 Visual Checks

### Colors
- [ ] Purple gradient buttons (#667eea)
- [ ] Light backgrounds are not too white
- [ ] Text is readable on all backgrounds
- [ ] Error messages are red (#c92a2a)
- [ ] Success messages are green (#2d6a2d)

### Typography
- [ ] Headings are large and bold
- [ ] Body text is readable
- [ ] Font sizes are consistent
- [ ] Line heights provide breathing room

### Spacing
- [ ] No content is cramped
- [ ] Buttons have enough padding
- [ ] Forms have clear structure
- [ ] Cards have consistent margins

## 🐛 Bug Report Template

If you find a bug:

```
**Page:** [Home / Cart / Product / etc]
**Browser:** [Chrome / Firefox / Safari / etc]
**Steps to reproduce:**
1. First step
2. Second step
3. Third step

**Expected behavior:** What should happen

**Actual behavior:** What actually happens

**Screenshot:** [Attach screenshot if possible]
```

## ✅ You're All Set!

After confirming all items on this checklist pass, your app is ready for:
- ✅ User testing
- ✅ Deployment
- ✅ Production use

**Happy testing! 🚀**
