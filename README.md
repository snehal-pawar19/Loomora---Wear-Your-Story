# 🛍️ Loomora — The Shopping Website

<div align="center">

### ✨ Wear Your Story

A modern, responsive fashion e-commerce frontend built with React.js and Vite.

[🌐 Live Demo](#) • [📂 View Source](#) • [🐛 Report an Issue](../../issues)

</div>

---

## 📌 About The Project

**Loomora** is a modern fashion e-commerce website designed to provide a smooth, elegant, and user-friendly online shopping experience.

The project focuses on building a professional e-commerce interface using **React.js**, with reusable components, responsive layouts, product discovery, search, filtering, wishlist, shopping cart, and product details.

Loomora combines a clean editorial-style design with practical shopping functionality to create a realistic online fashion store experience.

---

## ✨ Features

### 🏠 Home Page
- Attractive hero section
- Featured collections
- New arrivals
- Fashion categories
- Promotional sections
- Responsive design

### 🛍️ Product Shopping
- Product listing
- Product cards
- Product images
- Brand and category information
- Pricing and discounts
- Product ratings
- Product details page

### 🔎 Search & Discovery
- Product search
- Search by product name
- Search by brand
- Search by category
- Case-insensitive search
- Empty search-result handling

### 🎯 Filtering & Sorting
- Category filtering
- Gender filtering
- Brand filtering
- Price filtering
- Product sorting
- Discount-based browsing

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View saved products

### 🛒 Shopping Cart
- Add products to cart
- Remove products
- Increase/decrease quantity
- Automatic price calculation
- Cart summary

### 👤 User Interface
- Login page
- Profile page
- Responsive navigation
- Mobile-friendly menu

### 💳 Checkout
- Order summary
- Customer information
- Payment selection UI
- Order confirmation flow

### 📱 Responsive Design
Designed to work across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📲 Tablet

---

## 🖥️ Pages

| Page | Description |
|---|---|
| 🏠 Home | Landing page with featured fashion content |
| 🛍️ Products | Browse the complete product collection |
| 🔍 Product Details | View detailed information about a product |
| ❤️ Wishlist | Manage saved products |
| 🛒 Cart | Manage selected products |
| 🔐 Login | User authentication interface |
| 👤 Profile | User profile interface |
| 💳 Checkout | Checkout and order summary |
| ✅ Order Success | Order confirmation |
| ❌ Not Found | 404 error page |

---

## 🛠️ Technologies Used

### Frontend

- **React.js** — UI development
- **JavaScript (ES6+)** — Application logic
- **HTML5** — Page structure
- **CSS3** — Styling and responsive design
- **Vite** — Development and build tool

### React Libraries

- **React Router DOM** — Client-side routing
- **Axios** — API requests
- **Context API** — Global state management
- **React Hooks** — Component state and lifecycle management
- **Lucide React** — Modern UI icons

### Development Tools

- **VS Code**
- **Git**
- **GitHub**
- **ESLint**

---

## 🏗️ Project Structure

```text
Loomora/
│
├── public/
│   └── images/
│       └── products/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── SortDropdown.jsx
│   │   ├── SearchBar.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderSuccess.jsx
│   │   └── NotFound.jsx
│   │
│   ├── context/
│   │   └── ShopContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
