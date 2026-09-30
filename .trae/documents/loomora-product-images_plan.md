# Loomora — Realistic Product Images & Data Cleanup Implementation Plan

## Repository Research

**Current product data state (`src/data/products.js`, 1027 lines):**
- 52 products, IDs **1–52** (all unique). Categories: men(6), women(6), kids(6), beauty(6), home-living(6), kurtas(2), sarees(2), dresses(2), shirts(2), t-shirts(2), jeans(2), trousers(2), footwear(2), bags(2), jewellery(2), accessories(2).
- Products 1–30 have `title` only; 31–52 have both `title` and `name`. The `forEach` at lines 1023–1025 normalizes missing `name ← title`.
- Every product's `image` / `images` currently go through `PIC(seed)` in [imageUtils.js](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/utils/imageUtils.js#L1-L222), which returns offline SVG data URIs with category-specific placeholder **shapes**. The user explicitly wants these replaced with realistic fashion **photographs**.
- **Price anomaly:** Products 37–52 use low USD-style prices (e.g. id=37 Oxford Shirt `$69`, id=45 Sneakers `$129`) while 1–36 use consistent INR-style prices (e.g. id=1 Linen Shirt `₹499`, id=7 Silk Dress `₹2219`). This inconsistency must be normalized (see Step 4).

**Current image system (`src/utils/imageUtils.js`, 222 lines):**
- `PIC(seed)` → `buildImg()` → SVG data URIs with 18 category palettes and seeded decorations. These render correctly but are **abstract shapes**, not product photos.
- Fallback chain: `handleImgError` → `/fallback-product.jpg` → `/product-fallback.svg` (both files exist in `public/`).
- Components (`ProductCard`, `ProductDetails`, `Cart`, `Wishlist`) all read `product.image` / `product.images[0]` directly, so replacing the values in `products.js` automatically propagates everywhere — **great, no component edits needed** for the swap.

**Bug-fix state (already verified, re-validated at final test step):**
- [ProductCard.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/components/ProductCard.jsx#L12-L14) → `navigate('/products/${product.id}')`; title link correct.
- [App.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/App.jsx#L40) → single route `/products/:id`.
- [ProductDetails.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/pages/ProductDetails.jsx#L45-L148) → hooks order: router/context → 5×useState → useMemo → useEffect → **only after that** the two early returns (loading loader + !product EmptyState). Lines 137–148 show "Product not found" EmptyState with back-to-shop link.
- [main.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/main.jsx#L9) → BrowserRouter used exactly once.
- [Navbar.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/components/Navbar.jsx#L47-L56) → `handleSearchSubmit` navigates `/products?q=…`; SearchBar uses `<form>` for Enter + submit click.
- Conclusion: **no structural bug fixes are needed** — all 5 bug items from the prior request are already resolved. We only need to make sure the image swap doesn't regress them.

## Files and Modules

| File | Expected change |
|------|-----------------|
| `public/images/products/` (new folder) | **+48 files.** Place 48 stable Unsplash fashion/product JPEGs (`curatedID-widthxheight.jpg`) across 17 categories + `fallback-product.jpg` (safe fallback copy) |
| `src/data/products.js` | **Rewrite lines 1–1027.** Remove `import { PIC }`; remove `img()`/`imgs()` helpers; for each of 52 products, replace `image: img(seed)` / `images: imgs(seed)` with local paths like `/images/products/kurta-01.jpg` and a 3-variant `images` array; normalize prices of IDs 37–52 to INR range matching the rest of the catalog; add/update `name` for rows 1–36 so every product has `name` = `title` upfront (no reliance on runtime forEach only). |
| `src/utils/imageUtils.js` | **Surgical update.** Keep `safeImgSrc` / `handleImgError` intact (they don't care where URLs come from). Add a guard: any incoming image URL that still matches the old SVG data-URI / coresg host is auto-swapped to the new local fallback `/images/products/fallback-product.jpg` (belt-and-suspenders). Update `FALLBACK_JPG` to point at `/images/products/fallback-product.jpg`. |
| *(no edits needed — verify only)* | `ProductCard.jsx`, `Navbar.jsx`, `Products.jsx`, `ProductDetails.jsx`, `ShopContext.jsx`, `App.jsx`, `main.jsx`, `index.css` — read-only inspection used during planning; they already support the correct behaviors. |

## Implementation Steps

### Step 1 — Create the local image folder & seed 48 category-matched photo files
- Create folder `public/images/products/`.
- Using the text-to-image tool URL endpoint (which returns stable local JPEGs), generate 48 files — **minimum 3 photos per category across the 17 categories** to ensure each of the 52 products gets a category-matching unique image (a few categories share 1 extra, always matched):
  - Men (6): oversized-linen-shirt, cashmere-sweater, wide-leg-trousers, wool-overcoat, chino-shorts, heavyweight-hoodie
  - Women (6): silk-slip-dress, wool-blazer, handloom-maxi-dress, pleated-trousers, knit-cardigan, linen-wrap-shirt
  - Kids (6): organic-graphic-tee, fleece-hooded-jacket, straw-summer-hat, knit-overalls-set, rainbow-stripe-leggings, canvas-velcro-sneakers
  - Beauty (6): hyaluronic-serum, lip-balm-trio, rose-clay-mask, vitc-brightening-toner, silk-sleep-mask-set, mineral-sunscreen-spf50
  - Home-Living (6): ceramic-vase, linen-throw-blanket, soy-scented-candle-set, rattan-pendant-lamp, oak-cutting-board-set, stoneware-dinnerware-set
  - Kurtas (2): handblock-cotton-kurta, embroidered-festive-kurta
  - Sarees (2): handwoven-silk-saree, printed-chiffon-saree
  - Dresses (2): pleated-midi-dress, linen-shirt-dress
  - Shirts (2): oxford-cotton-shirt, relaxed-linen-shirt
  - T-Shirts (2): organic-cotton-tee, vintage-graphic-tee
  - Jeans (2): straight-leg-denim-jeans, relaxed-tapered-jeans
  - Trousers (2): wide-leg-tailored-trousers, pleated-cotton-trousers
  - Footwear (2): leather-court-sneakers, suede-ankle-boots
  - Bags (2): structured-leather-tote, canvas-crossbody-bag
  - Jewellery (2): gold-vermeil-hoop-earrings, layered-beaded-necklace
  - Accessories (2): acetate-square-sunglasses, woven-straw-fedora
  - Fallback (1): fallback-product.jpg — neutral ecommerce apparel-on-hanger photo

### Step 2 — Rewrite `src/data/products.js` to use local images + normalized data
- **Top of file:** Remove lines 1–8 (`import PIC`, `img()`, `imgs()` helpers) — we no longer generate images. Replace with a single helper `imgSet(file, alt)` that returns `{ image: '/images/products/{file}.jpg', images: ['/images/products/{file}-1.jpg'…'-3.jpg'] }` so each product has a stable 3-image gallery (consistent with how ProductDetails renders thumbnails).
- For each of the 52 products, swap the category-matched filename from Step 1 into its `image` / `images`. **Exact mapping (filename → product):**
  - id=1 lm-m-linen-shirt → oversized-linen-shirt
  - id=2 ew-m-cashmere-sweater → cashmere-sweater
  - id=3 nh-m-wide-trousers → wide-leg-trousers
  - id=4 mv-m-wool-overcoat → wool-overcoat
  - id=5 tt-m-chino-shorts → chino-shorts
  - id=6 os-m-hoodie → heavyweight-hoodie
  - id=7 ac-w-silk-dress → silk-slip-dress
  - id=8 md-w-wool-blazer → wool-blazer
  - id=9 wv-w-maxi-dress → handloom-maxi-dress
  - id=10 so-w-pleated-trousers → pleated-trousers
  - id=11 lm-w-cardigan → knit-cardigan
  - id=12 ew-w-wrap-shirt → linen-wrap-shirt
  - id=13 nh-k-graphic-tee → organic-graphic-tee
  - id=14 mv-k-hooded-jacket → fleece-hooded-jacket
  - id=15 tt-k-straw-hat → straw-summer-hat
  - id=16 os-knit-overalls → knit-overalls-set
  - id=17 ac-k-rainbow-leggings → rainbow-stripe-leggings
  - id=18 md-k-canvas-sneakers → canvas-velcro-sneakers
  - id=19 wv-b-hyaluronic-serum → hyaluronic-serum
  - id=20 so-b-lip-balm-trio → lip-balm-trio
  - id=21 lm-b-clay-mask → rose-clay-mask
  - id=22 ew-b-vitc-toner → vitc-brightening-toner
  - id=23 nh-b-sleep-mask → silk-sleep-mask-set
  - id=24 mv-b-sunscreen → mineral-sunscreen-spf50
  - id=25 tt-h-ceramic-vase → ceramic-vase
  - id=26 os-h-throw-blanket → linen-throw-blanket
  - id=27 ac-h-candle-set → soy-scented-candle-set
  - id=28 md-h-rattan-lamp → rattan-pendant-lamp
  - id=29 wv-h-cutting-board → oak-cutting-board-set
  - id=30 so-h-dinnerware → stoneware-dinnerware-set
  - id=31 kalamkari-kurta → handblock-cotton-kurta
  - id=32 miraya-kurta → embroidered-festive-kurta
  - id=33 sutra-saree → handwoven-silk-saree
  - id=34 aavya-saree → printed-chiffon-saree
  - id=35 arcadia-pleated-dress → pleated-midi-dress
  - id=36 woven-linen-dress → linen-shirt-dress
  - id=37 eastweave-oxford-shirt → oxford-cotton-shirt
  - id=38 lumiere-relaxed-shirt → relaxed-linen-shirt
  - id=39 oat-organic-tshirt → organic-cotton-tee
  - id=40 north-graphic-tshirt → vintage-graphic-tee
  - id=41 moderne-straight-jeans → straight-leg-denim-jeans
  - id=42 terra-tapered-jeans → relaxed-tapered-jeans
  - id=43 sage-wide-trousers → wide-leg-tailored-trousers
  - id=44 maven-pleated-trousers → pleated-cotton-trousers
  - id=45 arcadia-court-sneakers → leather-court-sneakers
  - id=46 woven-suede-boots → suede-ankle-boots
  - id=47 lumiere-leather-tote → structured-leather-tote
  - id=48 eastweave-crossbody-bag → canvas-crossbody-bag
  - id=49 sutra-hoop-earrings → gold-vermeil-hoop-earrings
  - id=50 miraya-beaded-necklace → layered-beaded-necklace
  - id=51 north-square-sunglasses → acetate-square-sunglasses
  - id=52 terra-woven-fedora → woven-straw-fedora
- **Price normalization (IDs 37–52):** Scale each low USD price × 10 to land in INR-like range of IDs 1–36, and recompute `originalPrice` / `discount` to keep same discount % rounded:
  - id=37 $69 → **₹899** (original ₹1199, discount 25%)
  - id=38 $84 → **₹949** (original ₹1299, discount 27%)
  - id=39 $32 → **₹399** (original ₹549, discount 27%)
  - id=40 $39 → **₹499** (original ₹649, discount 23%)
  - id=41 $99 → **₹1199** (original ₹1549, discount 23%)
  - id=42 $109 → **₹1299** (original ₹1649, discount 21%)
  - id=43 $119 → **₹1399** (original ₹1749, discount 20%)
  - id=44 $104 → **₹1249** (original ₹1549, discount 19%)
  - id=45 $129 → **₹1499** (original ₹1849, discount 19%)
  - id=46 $179 → **₹2099** (original ₹2599, discount 19%)
  - id=47 $189 → **₹2299** (original ₹2899, discount 21%)
  - id=48 $64 → **₹749** (original ₹949, discount 21%)
  - id=49 $72 → **₹849** (original ₹1049, discount 19%)
  - id=50 $58 → **₹699** (original ₹899, discount 22%)
  - id=51 $68 → **₹799** (original ₹999, discount 20%)
  - id=52 $46 → **₹549** (original ₹699, discount 21%)
- Add explicit `name: product.title` field to products 1–36 so they behave identically to 37–52 without relying on the runtime forEach. Keep the forEach guard at lines 1023–1025 as extra safety.

### Step 3 — Update `src/utils/imageUtils.js` (minimal surgical edit, 4 lines)
- Change `FALLBACK_JPG` from `/fallback-product.jpg` → `/images/products/fallback-product.jpg`.
- In `safeImgSrc()`, add an early-return clause: if `String(src).startsWith('data:image/svg')` OR `String(src).includes('coresg-normal.trae.ai')` OR `String(src).includes('loomora-generating')` → return `/images/products/fallback-product.jpg`. This catches any leak-through from old cached URLs.
- Keep `handleImgError()` cascade intact (still tries stage 1 then stage 2).
- Delete the `PIC()`, `buildImg()`, `buildProductSvg()`, `svgToDataUri()` family — they are no longer referenced anywhere (products.js no longer imports them).

### Step 4 — Re-verify bug-fix guardrails (no code changes, sanity-only)
Quick source-level check before building:
- [ProductDetails.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/pages/ProductDetails.jsx#L45-L148) — still: all hooks at top (useParams→useState→useMemo→useEffect), then `if(loading)`, then `if(!product)`. ✅
- [ProductCard.jsx](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/components/ProductCard.jsx#L12-L14) — still `navigate('/products/${product.id}')`. ✅
- [App.jsx:40](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/App.jsx#L40) — still `<Route path="products/:id">`. ✅
- [Navbar.jsx:47-56](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/components/Navbar.jsx#L47-L56) — still `handleSearchSubmit` navigates `/products?q=`. ✅
- [main.jsx:9](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/main.jsx#L9) — still single BrowserRouter. ✅

### Step 5 — `npm install` → `npm run build`
- `npm install` (ensure package-lock consistent, no new deps — we aren't adding any).
- `npm run build` — must finish with exit code 0, no ESLint-level errors bubbling.

### Step 6 — Live server & 8 end-to-end tests
- `npm run dev` then run all scenarios via integrated browser:
  1. **Home** — scroll, confirm hero + new arrivals + trending + categories + promo banners render real photos (no shapes, no "generating" text).
  2. **Products** page (`/products`) — 52 product cards all have category-matched photos.
  3. **Search** — navbar type "saree" + Enter → returns only id=33,34 with saree photos.
  4. **ProductDetails** — click saree card → `/products/33` → PDP gallery (3 thumbs + main) loads; breadcrumbs + sections all render.
  5. **Cart** — Add to Bag → navigate `/cart` → image thumbnail matches product photo.
  6. **Wishlist** — Heart click on PDP → toast → `/wishlist` → image thumbnail matches.
  7. **Checkout** — `/checkout` page renders with cart items and images.
  8. **Invalid URL** — `/products/99999` → "Product not found" heading + back-to-shop link (NOT blank).
  9. **Console** — browser_console_messages: 0 hook warnings, 0 undefined errors, 0 image errors (imageUtils cleanup handles any edge case).

## Dependencies and Considerations
- **No new npm dependencies.** Image swap is pure static files + data rewire. Install step is idempotent.
- **Filename convention:** We intentionally use descriptive kebab-case filenames (not UUIDs) so the data `image: '/images/products/silk-slip-dress.jpg'` is self-documenting and category-match is verifiable by reading `products.js`.
- **Cart/Wishlist rely on `ShopContext.productsMap` (see [ShopContext.jsx:130-146](file:///C:/Users/sai/Documents/trae_projects/Loomora-The%20Shopping%20Website/src/context/ShopContext.jsx#L130-L146)), which reads directly from `products.js` — after the data rewrite, `product.image` in cart/wishlist will automatically reflect the new local JPEG. ✅
- **Existing `/fallback-product.jpg` (root-level):** keep in `public/` as a belt-and-suspenders; `handleImgError` still falls back to it as stage-2 if the new nested fallback also fails.
- **Unsplash / Pexels vs local:** the prompt says "prefer local images so they continue working after refresh". We will use **100% local JPEGs in `public/images/products/`** (no hotlinks) to eliminate all network/CORS/offline risks — exactly matching the preference.
- **Price normalization rationale:** User said "verify every product has … correct price". The existing tier for the same category has a range; scaling ×10 lands ID 37–52 prices inside that existing range rather than creating an inconsistent "$46–$189" tier in an otherwise ₹249–₹2999 catalog. Discount percentages are preserved per product (rounded), so sale/sorting filters won't change behavior.

## Validation
- **File-level:** After Step 1, `Get-ChildItem public/images/products/*.jpg | Measure-Object` → count ≥ 48. After Step 2, manual grep: `imageUtils` exports must no longer contain the string `PIC(`; `products.js` imports must no longer contain `from '../utils/imageUtils'`.
- **Build-level:** `npm run build` exit code 0, Vite output shows 1500+ modules OK, dist/ written.
- **Browser-level:** 8 scenario checklist (Step 6 above) — all PASS; browser_console_messages empty except React DevTools info + harmless Router future flags + expected caught fakestoreapi abort (non-blocking per prior session).
- **Image match sanity:** Spot-check 5 representative rows: id=7 (dress) silk-slip-dress.jpg; id=19 (beauty) hyaluronic-serum.jpg; id=33 (saree) handwoven-silk-saree.jpg; id=45 (footwear) leather-court-sneakers.jpg; id=49 (jewellery) gold-vermeil-hoop-earrings.jpg. All filenames semantically equal to `category/title`.

## Risks
| Risk | Handling / Fallback |
|------|---------------------|
| Text-to-image tool is rate-limited / returns loading message when generating 48 photos. | Use Unsplash stable source-id hotlinks (`https://images.unsplash.com/photo-X?w=800&auto=format`) as drop-in replacements for any local file that fails during generation. These are permanent Unsplash IDs — no "temporary preview text". If we hit this, we still satisfy "real/stable URLs from reliable sources" requirement. |
| One or more of the 48 generated photo files still shows a placeholder / abstract shape. | `safeImgSrc` in Step 3 re-routes *any* SVG or coresg-looking src → `/images/products/fallback-product.jpg` (a real photo). Plus `onError={handleImgError}` cascades, so visually the user always sees a real JPEG. |
| A product image filename referenced in `products.js` doesn't exist on disk → 404. | `handleImgError` fires, swaps src → `/images/products/fallback-product.jpg` → `/product-fallback.svg`. User never sees a broken icon. Post-test, we'll also do a quick scripted `Test-Path` pass over every `image` and `images[i]` value in the rewritten array before build. |
| User accidentally expects "product data" to mean *new* products beyond 52. | Plan is explicit: keep the **52 existing rows** (exceeds the "at least 40 realistic products" floor by 12). No deletions; only enrich images/prices. The request says "improve only the product images and product data" — not expand. |
