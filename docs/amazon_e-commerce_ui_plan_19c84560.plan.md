---
name: Amazon E-commerce UI Plan
overview: Plan for building a frontend-only Amazon-style e-commerce UI (no backend), with a dedicated markdown file documenting all functionalities, modules, and completion checklist.
todos: []
isProject: false
---

# Amazon E-commerce UI Plan

## Deliverable: Specification document (MD file)

Create a single markdown file (e.g. `docs/AMAZON_UI_SPEC.md` or `AMAZON_UI_SPEC.md` at project root) that serves as the master spec. It will contain:

- **Functionalities** – every user-facing feature to implement
- **Modules** – logical UI/feature areas and their boundaries
- **Completion checklist** – items to mark done as you build (no backend work)

---

## 1. Modules to document and implement


| Module                  | Purpose                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------- |
| **Layout & shell**      | App shell, header, footer, responsive layout, global nav                               |
| **Home / landing**      | Hero, deals, categories, “Today’s Deals”, recommendations                              |
| **Navigation & search** | Top nav, mega menu/dropdowns, search bar, autocomplete, filters                        |
| **Product listing**     | Category/browse pages, grid/list, sort, pagination/infinite scroll                     |
| **Product detail**      | PDP layout, gallery, price, add to cart, buy now, reviews section                      |
| **Cart**                | Cart drawer/page, quantity, remove, subtotal, “Proceed to checkout”                    |
| **Checkout**            | Multi-step flow (address, payment, review), order summary; API contracts for each step |
| **User account**        | Sign-in / register UI, “Account & Lists” dropdown; login/register API contracts        |
| **Account pages**       | Orders, order detail, addresses, payment methods, profile; each with documented APIs   |
| **Wishlist / lists**    | Save for later, lists UI; GET/POST/DELETE list APIs documented                         |
| **Global UI**           | Toasts, modals, loading states, empty states, error states                             |


Each module in the MD file should list: **screens/components**, **key interactions**, and **API contract** (endpoint, params, request/response shape). No mock data is used in the UI; code uses comments to document expected data format and parameters.

---

## 2. Functionalities to list in the MD file

**Header & global**

- Logo linking to home
- Search bar with placeholder and “Search” action
- “Deliver to [location]” (data from API; comment expected format)
- “Account & Lists” dropdown (sign-in CTA, orders, lists, profile)
- “Returns & Orders” link
- Cart icon with count badge
- Top nav: Today’s Deals, Customer Service, Registry, Gift Cards, Sell (optional)
- Footer: links (About, Careers, etc.), country selector, legal/copyright

**Home**

- Hero carousel or static banner
- Category shortcuts (e.g. Electronics, Fashion, Home)
- “Today’s Deals” or “Top Deals” strip
- Product recommendation blocks (“Based on your browsing”, “Inspired by your shopping”)
- “Recently viewed” (API-driven; comment expected response shape)
- Footer content

**Search & browse**

- Search input → navigate to search results (API call; document query params and response in MD)
- Search results: product cards, “no results” state (comment expected list shape)
- Left sidebar or filters: category, price range, rating, brand (API for filter options; document contract)
- Sort: Relevance, Price low–high, Price high–low, Newest, etc.
- Grid/list toggle (optional)
- Pagination or “Load more”

**Product detail**

- Image gallery (main + thumbnails), zoom on hover (optional)
- Title, rating, number of reviews
- Price (current, list price, savings %)
- “In stock” / “Only X left” (API field; comment expected format)
- Quantity selector
- “Add to Cart”, “Buy Now”
- “Add to Wishlist” / “Add to List”
- Delivery/returns info (static text)
- Product description / “About this item”
- Reviews section: summary bar, list of reviews (API; document params and response), “Write a review” CTA (document expected POST contract)

**Cart**

- Cart page or slide-out drawer
- Line items: image, title, price, quantity, remove
- Subtotal
- “Proceed to checkout” button
- “Save for later” (move to wishlist UI)

**Checkout**

- Step 1: Shipping address (form or select from saved addresses; document GET addresses API and POST new address contract)
- Step 2: Payment method (document GET payment methods and POST new card contract)
- Step 3: Review order (items, address, payment summary from state/API)
- “Place order” → document POST place-order API (params, body, response with order ID); thank-you page shows response data, comment expected shape

**Auth UI**

- Sign-in modal/page: email, password; document POST login API (body params, response: token + user shape)
- Register: name, email, password; document POST register API (body, response)
- “Forgot password” link; document POST forgot-password contract (body, response)
- After “sign in” → show user name in header (from login response; comment expected user object shape)

**Account**

- “Your Orders”: document GET orders list API (query params, response shape); order detail document GET order by ID (path param, response)
- “Addresses”: document GET addresses, POST/PATCH/DELETE address (params and body for each)
- “Payment options”: document GET payment methods, POST/DELETE (contracts)
- “Profile”: document GET profile and PATCH profile (body, response)
- “Your Lists” / “Wishlist”: document GET lists, GET list items, POST add to list, DELETE remove (params for each)

**Wishlist / lists**

- “Add to list” from PDP: document API (e.g. POST list item with productId, listId; comment expected request/response)
- “Your lists” page: document GET lists and GET list items (path/query params, response shape)
- Remove from list, move to cart: document DELETE and “move to cart” API contracts (params, body)

**Global behaviors**

- Responsive layout (mobile menu, stacked layout on small screens)
- Loading skeletons or spinners for list/detail
- Toasts for “Added to cart”, “Removed”, “Saved to list”
- Modals: sign-in, image zoom, confirm remove
- Empty states: empty cart, no search results, no orders
- 404 or “Page not found” for unknown routes

---

## 3. Structure of the MD file

Suggested sections for `AMAZON_UI_SPEC.md`:

1. **Overview** – Frontend-only, no mock data; UI uses comments for expected data format and documents API contracts for when backend exists.
2. **Tech stack (recommendation)** – e.g. React/Vue + React Router/Vue Router, CSS or Tailwind, state for cart/user/wishlist.
3. **Modules** – Table or list of modules with short description and link to section.
4. **Module details** – For each module: components/screens, user actions, and **expected data format** (what the UI expects, to be filled by API later).
5. **API contracts** – Kept in a **separate file**: [docs/API_CONTRACTS.md](docs/API_CONTRACTS.md). That file contains detailed contracts (method, path, path/query/body parameters, request/response shapes) for every call. The main spec (AMAZON_UI_SPEC.md) can reference it and list which contract applies to which screen.
6. **Functionality checklist** – Bullet list or table of every feature with [ ] / [x].
7. **Routes** – List of routes (e.g. `/`, `/search`, `/product/:id`, `/cart`, `/checkout`, `/account/orders`, etc.).

**In the UI code:** Do not use mock data. Where data is needed, add a comment describing:

- **Expected data format** – e.g. shape of a product object, list of orders, cart structure.
- **API contract** – when this data will come from an API: method, path, path/query/body parameters, and response shape (e.g. `GET /products/:id → { id, title, price, images[], ... }`).

Example: `// Expected from GET /products/:id. Shape: { id: string, title: string, price: number, images: string[], rating?: number, reviewCount?: number }`

---

## 4. API contracts to document in the MD file (parameters and format)

For **each** UI screen and **each** API call, the MD file must list:

- **Call name** (e.g. “Get product by ID”, “Search products”, “Add to cart”).
- **HTTP method** (GET, POST, PATCH, DELETE).
- **Path** (e.g. `GET /products/:id`, `POST /cart/items`).
- **Path parameters** (e.g. `id: string`).
- **Query parameters** (e.g. `q`, `category`, `sort`, `page`, `limit`).
- **Request body** (for POST/PATCH): shape and field types (e.g. `{ email, password }` for login).
- **Response shape**: expected JSON structure (e.g. product object, list of orders, `{ orderId, status }`).

Example entries to include:

- **Home:** Get hero/deals (GET, path, query if any, response: list of banners/deals); Get recommendations (GET, query e.g. `limit`, response: list of products); Get “recently viewed” (GET, response: list of products).
- **Search:** Search products (GET, query: `q`, `category`, `minPrice`, `maxPrice`, `sort`, `page`, response: `{ items: Product[], total, page }`); Get search filters (GET, query: `q` or `category`, response: filter options).
- **Product detail:** Get product (GET `/products/:id`, response: product object with all PDP fields); Get reviews (GET, path/query, response: list of reviews + summary).
- **Cart:** Get cart (GET, response: cart with line items); Add item (POST, body: `productId`, `quantity`); Update quantity (PATCH, body/params); Remove item (DELETE, path param).
- **Checkout:** Get addresses (GET); Add address (POST, body); Get payment methods (GET); Add payment (POST, body); Place order (POST, body: `addressId`, `paymentMethodId`, etc., response: `{ orderId, status }`).
- **Auth:** Login (POST, body: `email`, `password`, response: `{ token, user }`); Register (POST, body); Forgot password (POST, body).
- **Account:** Get orders (GET, query: `page`); Get order by ID (GET `/orders/:id`); Get/Add/Update/Delete addresses (GET, POST, PATCH, DELETE with params/body); Get/Add/Delete payment methods; Get/Update profile.
- **Wishlist/Lists:** Get lists (GET); Get list items (GET, path/query); Add to list (POST, body); Remove from list (DELETE); Move to cart (POST, body/params).

A dedicated **API contracts** document exists at **docs/API_CONTRACTS.md** with detailed contracts (parameters and response format) for every call; the main UI spec should reference it.

---

## 5. Implementation order (for the spec)

The MD file can suggest an order, e.g.:

1. Layout & shell (header, footer, routing)
2. Home + product listing + product detail (core browsing)
3. Cart + checkout (purchase flow)
4. Search & filters
5. Auth UI + account pages
6. Wishlist / lists
7. Polish: loading, toasts, empty states, responsive

---

## 6. Out of scope (to state in the MD file)

- Backend API, database, real auth, real payments
- Real search index
- Real inventory or pricing
- Email, notifications, or any server-side logic

---

## Summary

- **Do:** Create one markdown file with functionalities, modules, checklist, routes, **expected data format** per UI, and **API contracts** (method, path, path/query/body params, request/response shape) for every UI and every call. In the UI code, **do not use mock data**; use comments that describe the expected data format and the API contract (parameters and response) so the backend can be built to match.
- **Do not:** Implement backend or use mock data in the UI.
- **Result:** A UI-only spec and implementation that clearly defines “what parameters you will pass” and what each API should return, so you can master backend API design by implementing to these contracts.

