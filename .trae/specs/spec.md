# Loomora Ecommerce UI - Product Requirements Document

## Overview
- **Summary**: Build a complete, responsive, attractive ecommerce website "Loomora" - a premium minimalist fashion and lifestyle store. This is a college mini-project that showcases React skills, responsive design, and ecommerce UX patterns.
- **Purpose**: Demonstrate proficiency in React, React Router, Context API, responsive CSS, and component architecture for a beginner-level college project.
- **Target Users**: College project evaluators, demo viewers, and students learning React ecommerce patterns.

## Goals
- Deliver a fully functional, visually polished React ecommerce SPA that runs with `npm run dev` and builds successfully with `npm run build`.
- Implement all required pages, routes, components, and global state without broken flows.
- Follow a warm, premium minimalist design system with CSS variables.
- Use local mock product data as the reliable default; add an optional Axios API layer with local fallback.
- Pass ESLint checks and produce zero build errors.
- Include responsive behavior (desktop, tablet, mobile) without horizontal overflow.

## Non-Goals
- Real backend API integration (demo auth only, no real credentials).
- Real payment processing or storage of real card numbers.
- Production deployment configuration (only dev/build scripts required).
- Server-side rendering or Next.js patterns.
- TypeScript (JavaScript only per constraints).
- Adding Tailwind or heavy UI libraries unless pre-configured (not the case here).

## Background & Context
- The project directory is empty; we initialize a fresh Vite + React + JavaScript project.
- Requirements specify explicit folder structure, 24+ mock products, React Router, Axios, Lucide React icons, Context API, and a specific design palette (ivory/charcoal/terracotta/beige).
- Beginner-friendly: code must be clean, well-organized, and include short educational comments where React concepts are used.

## Functional Requirements

### Core Setup
- **FR-1**: Initialize Vite + React + JavaScript project with required dependencies (react-router-dom, axios, lucide-react). Add ESLint config.
- **FR-2**: Create exact folder structure: src/components/, src/pages/, src/context/, src/data/, src/services/ plus App.jsx, main.jsx, index.css.

### Data & Services
- **FR-3**: Create src/data/products.js with 24+ mock products across men, women, kids, beauty, home-living. Fields: id, brand, title, category, gender, price, originalPrice, discount, rating, reviewCount, sizes, colors, description, image, images, isNew, isTrending.
- **FR-4**: Create src/services/productService.js using Axios to attempt fetching from a public mock API (e.g. FakeStore). Normalize response and ALWAYS fall back to local products data on any network/format error. Never require internet.

### Global State
- **FR-5**: Implement ShopContext.jsx managing: cart (items with qty/size/color), wishlist, auth state. Expose: addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, isInWishlist, login, logout. Derive: cartCount, wishlistCount, subtotal, discount, deliveryFee, total (useMemo).
- **FR-6**: Persist cart, wishlist, demo auth flag to localStorage safely. Must not crash if localStorage unavailable or JSON invalid.

### Components
- **FR-7**: Navbar.jsx: logo, Home/Shop/New Arrivals/Collections/Sale nav links, search field, Profile/Wishlist/Bag icons with counts. Mobile hamburger. React Router links.
- **FR-8**: MobileMenu.jsx: slide-in mobile nav, close, links, icons.
- **FR-9**: HeroBanner.jsx: editorial heading "Wear your story.", subtitle, CTAs, image.
- **FR-10**: CategoryCard.jsx: Men/Women/Kids/Beauty/Home-Living cards, click navigates.
- **FR-11**: ProductCard.jsx: image, wishlist button, brand, title, rating, price, originalPrice, discount, Add to Bag. Card click → details; button clicks must NOT navigate. stopPropagation on buttons. Accessible labels.
- **FR-12**: ProductGrid.jsx: responsive grid of ProductCards (desktop multi-col, mobile 2-col).
- **FR-13**: FilterSidebar.jsx: filters for category, gender, brand, price range, discount, rating.
- **FR-14**: SortDropdown.jsx: Recommended, Newest, Price Low→High, High→Low, Rating, Discount.
- **FR-15**: SearchBar.jsx: search by title/brand/category.
- **FR-16**: Footer.jsx: nav columns, customer support, social icons, payment labels.
- **FR-17**: Loader.jsx: spinner/skeleton.
- **FR-18**: EmptyState.jsx: no products/cart/wishlist.
- **FR-19**: Toast.jsx: notifications for add/remove actions (no alert()).

### Pages & Routing
- **FR-20**: Home.jsx: Hero, New Arrivals, Shop by Category, Trending Products, Promo banner, Newsletter, Footer.
- **FR-21**: Products.jsx (/products with ?category= & ?search= via useSearchParams): breadcrumb, heading, count, search, filters, sort, clear filters, grid, empty state.
- **FR-22**: ProductDetails.jsx (/product/:id via useParams): gallery, brand, title, rating/reviews, prices, discount, description, colors, sizes, qty selector, pincode UI, Add to Bag, Buy Now, Wishlist, related products. Validate size selection; handle invalid id → NotFound/empty state.
- **FR-23**: Cart.jsx (/cart): empty state, list (thumbnail, brand, title, size/color, price, qty +/- , remove, move to wishlist), price summary, promo code (demo: LOOM10), Place Order.
- **FR-24**: Wishlist.jsx (/wishlist): cards, remove, Move to Bag, empty state.
- **FR-25**: Login.jsx (/login): email/password fields, validation, show/hide password, Demo Login button. Mock state stored. Redirect Home on success.
- **FR-26**: Profile.jsx (/profile): demo user info, mock order history cards, Logout.
- **FR-27**: Checkout.jsx (/checkout): address fields with validation (city/state/pincode/phone), order summary, DEMO payment. Submit → OrderSuccess + clear cart.
- **FR-28**: OrderSuccess.jsx (/order-success): mock order number, total, Continue Shopping.
- **FR-29**: NotFound.jsx: 404 for unknown routes.
- **FR-30**: React Router config covering all routes in requirements. Conditional nav links based on auth.

### Design & UX
- **FR-31**: CSS variables in index.css for brand colors (ivory bg, charcoal text, terracotta accent, beige cards). Responsive media queries.
- **FR-32**: Accessible focus states, semantic HTML, meaningful alt text, keyboard controls.
- **FR-33**: Toast notifications for cart/wishlist/filter actions.
- **FR-34**: Loading skeletons/states in Products and ProductDetails.

### Build Quality
- **FR-35**: `npm run build` produces no errors. `npm run dev` starts correctly.
- **FR-36**: No missing imports, valid React keys, no console errors, no broken images.
- **FR-37**: ESLint passes (fix issues).

## Non-Functional Requirements
- **NFR-1**: Responsive design: 100% viewport fit, no horizontal scroll, mobile hamburger, 2-col product grid mobile.
- **NFR-2**: Performance: product data memoized where applicable via useMemo; localStorage reads non-blocking.
- **NFR-3**: Maintainability: separation of concerns (context, data, services, components, pages).
- **NFR-4**: Accessibility: semantic elements, focus rings, aria-labels on icon-only buttons.
- **NFR-5**: Reliability: never break when offline (local fallback always works).
- **NFR-6**: Educational: short inline comments explain React hooks/concepts where used.

## Constraints
- **Technical**: React.js + Vite + JavaScript only. Dependencies: react-router-dom, axios, lucide-react. No TS, no Tailwind unless pre-installed.
- **Business**: Original branding only. No Myntra branding/copy/layout. Original mock products.
- **Dependencies**: Must install from npm. Node available in environment.
- **Legal/Compliance**: No real credentials, no real payment data.

## Assumptions
- `npm` and Node.js (>= 16) are available in the build environment.
- FakeStoreAPI or similar public API may be unavailable; local data always works.
- User evaluates with standard modern browsers (Chrome, Firefox, Edge).
- Demo promo code LOOM10 applies 10% discount.

## Acceptance Criteria

### AC-1: Project Initialization & Build
- **Type**: `rule`
- **Given**: empty project root
- **When**: `npm install && npm run build` executed
- **Then**: build succeeds, dist/ output produced, no errors
- **Pass Condition**: Exit code 0 from `npm run build` and dist folder exists with assets
- **Evidence**: Command output captured in task completion evidence

### AC-2: All Routes Render
- **Type**: `rule`
- **Given**: dev server running
- **When**: navigate to /, /products, /products?category=women, /product/1, /cart, /wishlist, /login, /profile, /checkout, /order-success, /unknown-route
- **Then**: each route renders its corresponding page without crashes; /unknown-route shows NotFound
- **Pass Condition**: No white-screen errors; each page has expected heading/structure
- **Evidence**: Manual browser navigation check or DOM assertion

### AC-3: Product Data Sufficiency
- **Type**: `rule`
- **Given**: src/data/products.js loaded
- **When**: count products and check field coverage
- **Then**: at least 24 products, 5 categories represented (men, women, kids, beauty, home-living), all required fields present
- **Pass Condition**: array length >= 24 and every object has id, brand, title, category, gender, price, originalPrice, discount, rating, reviewCount, sizes, colors, description, image, images, isNew, isTrending
- **Evidence**: Static code analysis / Node require check

### AC-4: Cart & Wishlist Flows Work
- **Type**: `rule`
- **Given**: app loaded with at least one product
- **When**: click Add to Bag → navigate to cart → update qty → remove → toggle wishlist → go to wishlist
- **Then**: navbar counts update dynamically; localStorage persists after refresh; prices recalculate correctly
- **Pass Condition**: After add, cartCount > 0; after remove, cartCount correct; wishlist same
- **Evidence**: UI state + localStorage inspection

### AC-5: Size Validation on Product Details
- **Type**: `rule`
- **Given**: ProductDetails page loaded for a product with sizes
- **When**: click Add to Bag without selecting size
- **Then**: toast/message shown prompting size selection; item not added to cart
- **Pass Condition**: cart remains unchanged; toast message displayed
- **Evidence**: Manual interaction check

### AC-6: Filters, Search, Sort Work
- **Type**: `rule`
- **Given**: Products page loaded with all items
- **When**: type in search, apply price filter, select category, sort by price asc
- **Then**: product grid updates; URL searchParams update for category/search; Clear Filters resets state
- **Pass Condition**: grid shows filtered/sorted subset matching criteria
- **Evidence**: Manual interaction + URL inspection

### AC-7: Checkout & Order Success
- **Type**: `rule`
- **Given**: items in cart; go to checkout
- **When**: fill address form with valid data → submit demo payment
- **Then**: navigates to /order-success with mock order number; cart cleared
- **Pass Condition**: order success UI shows; cartCount becomes 0; cart page now shows empty state
- **Evidence**: Interaction flow capture

### AC-8: Demo Login & Auth-Aware Nav
- **Type**: `rule`
- **Given**: Login page
- **When**: click Demo Login → Navbar updated; go to Profile → Logout
- **Then**: after login, Navbar shows Profile/Logout instead of Login; Profile page renders; after logout, state reverts
- **Pass Condition**: Auth state toggles correctly; protected pages show conditional UI
- **Evidence**: UI state transitions

### AC-9: Responsive Layout Quality
- **Type**: `rubric`
- **Dimension**: Visual & layout responsiveness
- **Scale**: 1-5
- **Anchors**: 1 = broken layout, horizontal scroll, overlapping; 3 = works on desktop only, mobile usable but awkward; 5 = desktop/tablet/mobile all look polished, no overflow, hamburger works, grid columns adapt
- **Pass Threshold**: >= 4
- **Evidence**: Visual inspection at 320px, 768px, 1440px widths

### AC-10: Design System Fidelity
- **Type**: `rubric`
- **Dimension**: Aesthetic quality and brand consistency
- **Scale**: 1-5
- **Anchors**: 1 = no color system, inconsistent; 3 = basic palette, mostly consistent; 5 = warm ivory/charcoal/terracotta palette strictly via CSS variables, editorial typography, spacing, hover/focus states consistent
- **Pass Threshold**: >= 4
- **Evidence**: Visual review of Home + Products + Cart

### AC-11: Code Quality & React Concepts
- **Type**: `rubric`
- **Dimension**: Code organization and React idiom correctness
- **Scale**: 1-5
- **Anchors**: 1 = everything in one file, broken hooks, no context; 3 = folder structure present, hooks mostly correct, partial context usage; 5 = exact folder structure, correct hook usage, Context for all global state, educational comments present, separation of concerns
- **Pass Threshold**: >= 4
- **Evidence**: Code review of src/ structure and key files

### AC-12: No Console Errors / Broken Assets
- **Type**: `rule`
- **Given**: app running, navigate all flows
- **When**: open DevTools Console & Network
- **Then**: no red errors; no 404s for product images; no invalid keys or missing imports warnings
- **Pass Condition**: Console error count = 0 (ignoring HMR info logs)
- **Evidence**: DevTools screenshot or assertion

## Open Questions
- [ ] None at this time; requirements are comprehensive.
