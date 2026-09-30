# Loomora Ecommerce UI - Implementation Plan

## Task 1: Initialize Vite + React Project and Install Dependencies
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Initialize Vite React JavaScript project in current directory
  - Install core dependencies: react-router-dom, axios, lucide-react
  - Install dev dependency: eslint, @vitejs/plugin-react
  - Configure vite.config.js, .eslintrc.cjs, index.html with correct title "Loomora"
  - Verify `npm run build` succeeds on base scaffolding
- **Acceptance Criteria Addressed**: AC-1, AC-11
- **Test Requirements**:
  - `rule` TR-1.1: `npm install && npm run build` returns exit code 0 for base scaffold; dist/ created; Evidence: terminal output
  - `rule` TR-1.2: package.json contains react, react-dom, react-router-dom, axios, lucide-react; vite configured; Evidence: package.json read
- **Notes**: This is the first task; everything else depends on it.

## Task 2: Create Folder Structure, Global CSS, and Entry Files
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create directories: src/components, src/pages, src/context, src/data, src/services
  - Write index.css with CSS variables: --color-bg (warm ivory), --color-text (charcoal), --color-accent (muted terracotta), --color-card (soft beige), --color-border, font family vars, body reset, responsive typography base, utility classes
  - Write main.jsx with BrowserRouter wrapping & StrictMode, mounting App
  - Write App.jsx skeleton with Router switch/Route for 11 routes
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-9, AC-10, AC-11
- **Test Requirements**:
  - `rule` TR-2.1: All required directories exist under src/; Evidence: LS output
  - `rule` TR-2.2: index.css exports CSS variables, body styles, no global horizontal overflow; Evidence: file review
  - `rule` TR-2.3: `npm run build` still succeeds after files added; Evidence: build output
  - `rubric` TR-2.4: Design system consistency of CSS variables; scale 1-5; 1=missing vars, 3=present basic, 5=complete warm palette; threshold >=4; Evidence: visual inspect Home preview

## Task 3: Create Mock Product Data (24+ Products)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Create src/data/products.js exporting default array of 24+ products
  - 5 categories: men, women, kids, beauty, home-living (minimum 4 per category)
  - All fields required: id, brand, title, category, gender, price, originalPrice, discount, rating, reviewCount, sizes, colors, description, image, images, isNew, isTrending
  - Use reliable Unsplash/Pexels-style URLs or trae text_to_image style URLs for images; include a secondary array of 2-4 images per product
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `rule` TR-3.1: `node -e "const p=require('./src/data/products.js').default; console.log(p.length, p.every(x=>x.id&&x.brand&&x.title&&x.category&&x.gender&&typeof x.price==='number'))"` prints length>=24 and true; Evidence: terminal output
  - `rule` TR-3.2: Categories represented include men, women, kids, beauty, home-living; Evidence: terminal output after filter
  - `rule` TR-3.3: Each product has isNew boolean and isTrending boolean, at least some true per flag to enable sections; Evidence: code review

## Task 4: Implement ShopContext.jsx (Global State)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**:
  - Create ShopContext, ShopProvider wrapper, useShop custom hook
  - State: cart (array of {productId, qty, size, color}), wishlist (array of productId), auth ({isLoggedIn, userName, email})
  - Actions: addToCart(product, size, color, qty), removeFromCart(productId, size, color), updateQuantity(productId, size, color, newQty), clearCart, toggleWishlist(productId), isInWishlist(productId), login(name,email), logout
  - Derived via useMemo: cartCount, wishlistCount, subtotal (sum price*qty), discount (including promo), deliveryFee (conditional on subtotal), total
  - Safe localStorage persistence: wrap reads in try/catch, JSON.parse guarded. On boot load initial state. On writes persist.
  - Toast notifications: include toast state + showToast action in context
- **Acceptance Criteria Addressed**: AC-4, AC-5, AC-11, AC-12
- **Test Requirements**:
  - `rule` TR-4.1: Exports ShopProvider and useShop; addToCart/remove/toggle expose; Evidence: code review
  - `rule` TR-4.2: useMemo for derived values; functional setState updates; Evidence: code review
  - `rule` TR-4.3: localStorage reads wrapped in try/catch; malformed JSON handled gracefully; Evidence: code review + simulate corrupt storage
  - `rule` TR-4.4: Build passes; Evidence: npm run build output

## Task 5: Build Product Service (Axios + Local Fallback)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3
- **Description**:
  - src/services/productService.js: export async getProducts() tries axios.get(FakeStore or similar).
  - Normalize API response to match Loomora product fields (best-effort, defaults for missing).
  - Any error/timeout/invalid length → return LOCAL products data import.
  - Export helper getProductById(id), getProductsByCategory(category), searchProducts(query), getNewArrivals(), getTrending().
- **Acceptance Criteria Addressed**: AC-3, AC-6, NFR-5
- **Test Requirements**:
  - `rule` TR-5.1: Offline scenario: disable network → getProducts() still returns local array length>=24; Evidence: simulate by throwing then returning local
  - `rule` TR-5.2: getProductById returns a product or null; getTrending/ getNewArrivals return arrays; Evidence: unit check
  - `rule` TR-5.3: Build passes; Evidence: build log

## Task 6: Create Reusable Components (Navbar, MobileMenu, Hero, Cards, Grid, Filters, Sort, Search, Footer, Loader, EmptyState, Toast)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 4
- **Description**:
  - Navbar: logo (styled text "LOOMORA"), links Home, Shop, New Arrivals, Collections, Sale. Search field. Icons: User, Heart (with count), ShoppingBag (with count). Sticky, responsive.
  - MobileMenu: slide-in drawer with links, close button, uses React Router.
  - HeroBanner: heading "Wear your story.", subtitle, CTA buttons Shop Now / New Arrivals, editorial fashion image.
  - CategoryCard: clickable card with name & image; navigates /products?category=<slug>.
  - ProductCard: receives product + actions props. Wishlist heart toggle, Add to Bag. Card click uses navigate, but heart/bag buttons use stopPropagation.
  - ProductGrid: responsive grid CSS; mobile 2-col.
  - FilterSidebar: category, gender, brand, price range, discount, rating filters. Reset button.
  - SortDropdown: 6 sort options, select element with aria-label.
  - SearchBar: input with search icon, debounced or onSubmit, update URL searchParams.
  - Footer: columns (Shop, Customer Care, Company), social icons, payment methods badges (text only - Visa, Mastercard, UPI, COD).
  - Loader: spinner with label.
  - EmptyState: illustration/icon + heading + sub + primary CTA.
  - Toast: position fixed, animated, auto-hide; 1 toast slot (or small queue).
- **Acceptance Criteria Addressed**: AC-2, AC-4, AC-6, AC-9, AC-10, AC-11, AC-12
- **Test Requirements**:
  - `rule` TR-6.1: Each component file exists under src/components with correct name; Evidence: LS
  - `rule` TR-6.2: ProductCard wishlist/add-to-bag button clicks do NOT trigger card navigation (stopPropagation); Evidence: manual click test + code review of onClick handlers
  - `rule` TR-6.3: Navbar shows dynamic cart/wishlist counts > 0 when items exist; Evidence: UI state check
  - `rule` TR-6.4: Build passes with 0 lint errors; Evidence: build output
  - `rubric` TR-6.5: Component reusability & prop cleanliness; scale 1-5; threshold >=4; Evidence: code review of props interface consistency

## Task 7: Build All Pages (Home, Products, ProductDetails, Cart, Wishlist, Login, Profile, Checkout, OrderSuccess, NotFound)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6, Task 5
- **Description**:
  - Home: HeroBanner, New Arrivals (map products where isNew), Shop by Category grid (5 CategoryCards), Trending Products (ProductGrid with isTrending), Promo banner (section with background & text), Newsletter (email input + regex validation + toast thank you).
  - Products (/products): breadcrumb (Home / Shop), category heading, result count, SearchBar, FilterSidebar (mobile toggle), SortDropdown, ClearFilters button, ProductGrid, EmptyState. Use useSearchParams for category & search query; sync URL with filters.
  - ProductDetails (/product/:id): useParams → get product by id. Image gallery (main + thumbnails), brand, title, rating (stars + reviewCount), prices + discount badge, description, colors swatches, size selector (required), qty selector, delivery pincode UI, Add to Bag (validate size; toast if missing), Buy Now (validate then navigate /checkout), Wishlist toggle, Related products (same category, exclude self). Invalid id → EmptyState with "Product not found".
  - Cart (/cart): if empty → EmptyState + Continue Shopping. Else: map cart items (thumbnail, brand, title, size/color, unit price, qty +/- stepper, Remove, Move to Wishlist). Right price summary: subtotal, discount (incl LOOM10 if valid), deliveryFee (e.g., free over $99 else $5), total. Promo code input + Apply button (LOOM10 → 10%). Place Order → /checkout.
  - Wishlist (/wishlist): ProductGrid or list of wishlist items. Each card: Move to Bag (with size selection toast/prompt), Remove. Empty state.
  - Login (/login): email (validated), password (min 6 chars + show/hide toggle), Remember me (UI only), Login button + Demo Login (autofill demo@loomora.com / demo1234 → login action redirect Home).
  - Profile (/profile): user info card (name, email), order history mock (3-5 cards with order id, date, status, items count, total), Logout button clears auth → Home.
  - Checkout (/checkout): address form (name, address line1, city, state, pincode [6 digits], phone [10 digits]). Form validation per field. Order summary sidebar (items, subtotal, discount, delivery, total). Demo payment section (clearly labeled Demo; no real card). Place Order button → validate → success toast → clearCart → navigate /order-success.
  - OrderSuccess (/order-success): mock order id (random alphanum), total, "Thank you" message, Continue Shopping → Home.
  - NotFound: 404 heading, illustration, Go Home.
- **Acceptance Criteria Addressed**: AC-2, AC-4, AC-5, AC-6, AC-7, AC-8
- **Test Requirements**:
  - `rule` TR-7.1: Each page file exists under src/pages; App routes match path/name list; Evidence: LS + App.jsx review
  - `rule` TR-7.2: Size validation on ProductDetails: without size → toast shown, cart unchanged; with size → added; Evidence: manual interaction
  - `rule` TR-7.3: LOOM10 promo reduces cart subtotal by 10% in Cart summary; Evidence: arithmetic check
  - `rule` TR-7.4: Demo login sets auth state to true; Profile shows user info; Logout clears; Evidence: UI flow
  - `rule` TR-7.5: Checkout form validates pincode (6 digits) & phone (10 digits); invalid shows error; Evidence: form interaction
  - `rule` TR-7.6: After successful demo order submission, cart cleared and OrderSuccess page shows; Evidence: flow check
  - `rule` TR-7.7: Products page filter/sort/search all produce correct subsets; URL params persist after refresh; Evidence: refresh after filtering shows same results
  - `rule` TR-7.8: Invalid /product/:id → graceful EmptyState; no crash; Evidence: navigate /product/999999

## Task 8: Configure React Router App.jsx with All Routes & Layout
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 7
- **Description**:
  - In App.jsx, render Navbar + Toast + <Routes> + Footer.
  - Routes: / → Home; /products → Products; /product/:id → ProductDetails; /cart → Cart; /wishlist → Wishlist; /login → Login; /profile → Profile; /checkout → Checkout; /order-success → OrderSuccess; * → NotFound.
  - Link Home logo and nav links correctly.
- **Acceptance Criteria Addressed**: AC-2, AC-8
- **Test Requirements**:
  - `rule` TR-8.1: Navigate each route by URL bar entry renders expected component; Evidence: DevTools navigation
  - `rule` TR-8.2: Link clicks (navbar/cards) navigate without full reload (SPA); Evidence: observe no browser refresh flash
  - `rule` TR-8.3: Catch-all * renders NotFound; Evidence: visit /nonexistent

## Task 9: Build, Lint Fix, and Smoke Test
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 8
- **Description**:
  - Run `npm run build`; resolve every error (missing imports, invalid keys, unused vars, lint issues).
  - Run `npm run dev` briefly to verify starts.
  - Walkthrough flows manually in browser using integrated browser if possible: Home → Shop → category filter → product details → add with size → cart update qty → apply LOOM10 → checkout with demo → success → clear. Also wishlist & login flow.
  - Verify responsive breakpoints, no horizontal scroll.
  - Fix any broken product images by ensuring fallback or reliable URL pattern.
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10, AC-12
- **Test Requirements**:
  - `rule` TR-9.1: `npm run build` exits 0 with no errors; Evidence: terminal output
  - `rule` TR-9.2: ESLint passes (no lint errors printed); Evidence: lint or build output
  - `rule` TR-9.3: End-to-end smoke flow (Home→Product→Add→Cart→Checkout→Success) completes with no console errors; Evidence: interaction log + DevTools Console state
  - `rubric` TR-9.4: Mobile responsiveness; scale 1-5; anchors 1/3/5; threshold >=4; Evidence: snapshot at 375px width

## Task 10: Independent Review Cycle
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 9
- **Description**:
  - Create review.md with checkpoints covering all ACs (rule & rubric).
  - Delegate or perform independent read-only review pass per Spec Mode.
  - If pass → finish. If fail → create Issue I-* items as pending tasks in this file and loop Implement.
- **Acceptance Criteria Addressed**: All ACs
- **Test Requirements**:
  - `rule` TR-10.1: review.md created with checkpoints covering every AC ID; Evidence: file review
  - `rule` TR-10.2: Review result is pass; Evidence: review.md Review R1 result = pass
