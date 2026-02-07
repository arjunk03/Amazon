# API Contracts — Amazon E-commerce UI

This document defines the API contracts expected by the frontend. Each section lists **method**, **path**, **path/query/body parameters**, and **request/response shapes** in detail. The UI will use these contracts (and in-code comments) to know what to pass and what format to expect; no mock data is used in the UI.

**Conventions:**
- `string`, `number`, `boolean` — primitive types
- `[]` — array; `{}` — object
- `?` — optional field
- Dates in ISO 8601 strings unless noted

---

## 1. Common types (shared across contracts)

These types are referenced in multiple endpoints.

```ts
// Product (list/card view)
ProductSummary = {
  id: string;
  title: string;
  price: number;           // current price
  listPrice?: number;       // original price for % off
  imageUrl: string;         // primary image
  imageUrls?: string[];     // optional for gallery
  rating?: number;          // 0–5
  reviewCount?: number;
  inStock: boolean;
  badge?: string;           // e.g. "Best Seller", "Today's Deal"
}

// Product (full detail page)
Product = ProductSummary & {
  description: string;
  images: string[];         // all images for gallery
  categoryId: string;
  categoryName?: string;
  stockQuantity?: number;  // "Only X left"
  deliveryEta?: string;     // e.g. "Feb 10–12"
  returnPolicy?: string;
  brand?: string;
}

// Cart line item
CartItem = {
  id: string;               // line item id
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  maxQuantity?: number;     // stock limit
}

// Address
Address = {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  stateOrRegion: string;
  postalCode: string;
  countryCode: string;      // e.g. "US"
  phone?: string;
  isDefault?: boolean;
}

// Payment method (masked)
PaymentMethod = {
  id: string;
  type: "card";
  last4: string;
  brand?: string;           // e.g. "Visa", "Mastercard"
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}

// User (after login)
User = {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
}

// Order summary (list view)
OrderSummary = {
  id: string;
  status: string;           // e.g. "Delivered", "Shipped", "Processing"
  placedAt: string;         // ISO date
  itemCount: number;
  total: number;
  imageUrl?: string;        // first item thumbnail
}

// Order (detail view)
Order = OrderSummary & {
  items: Array<{
    productId: string;
    title: string;
    imageUrl: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: Address;
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  total: number;
}
```

---

## 2. Home & landing

### 2.1 Get hero / banner content

**GET** `/api/home/hero`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None

**Response:** `200 OK`

```ts
{
  banners: Array<{
    id: string;
    imageUrl: string;
    linkUrl?: string;       // optional target (e.g. category or product)
    title?: string;
    altText?: string;
  }>;
}
```

---

### 2.2 Get category list (for shortcuts)

**GET** `/api/categories`

**Path parameters:** None  
**Query parameters:**

| Name     | Type   | Required | Description                    |
|----------|--------|----------|--------------------------------|
| `parent` | string | No       | Parent category id for nested |

**Request body:** None

**Response:** `200 OK`

```ts
{
  categories: Array<{
    id: string;
    name: string;
    imageUrl?: string;
    slug?: string;
    childCount?: number;
  }>;
}
```

---

### 2.3 Get today’s deals / top deals

**GET** `/api/deals`

**Path parameters:** None  
**Query parameters:**

| Name   | Type   | Required | Description        |
|--------|--------|----------|--------------------|
| `limit`| number | No       | Default e.g. 10    |

**Request body:** None

**Response:** `200 OK`

```ts
{
  deals: Array<ProductSummary & { discountPercent?: number; dealEndsAt?: string }>;
}
```

---

### 2.4 Get recommendations (e.g. “Based on your browsing”)

**GET** `/api/recommendations`

**Path parameters:** None  
**Query parameters:**

| Name   | Type   | Required | Description                          |
|--------|--------|----------|--------------------------------------|
| `type` | string | No       | e.g. `browsing`, `purchases`, `trending` |
| `limit`| number | No       | Default e.g. 12                      |

**Request body:** None  
**Headers:** If user logged in: `Authorization: Bearer <token>` (optional; affects personalization)

**Response:** `200 OK`

```ts
{
  title?: string;           // e.g. "Based on your browsing"
  products: ProductSummary[];
}
```

---

### 2.5 Get recently viewed products

**GET** `/api/recently-viewed`

**Path parameters:** None  
**Query parameters:**

| Name   | Type   | Required | Description |
|--------|--------|----------|-------------|
| `limit`| number | No       | Default e.g. 8 |

**Request body:** None  
**Headers:** Optional session/token for user-specific list

**Response:** `200 OK`

```ts
{
  products: ProductSummary[];
}
```

---

## 3. Delivery location (header “Deliver to”)

### 3.1 Get default / selected delivery location

**GET** `/api/user/delivery-location`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** Optional `Authorization` for logged-in user

**Response:** `200 OK`

```ts
{
  location: {
    postalCode?: string;
    countryCode: string;
    label: string;         // e.g. "New York 10001, USA"
  };
}
```

---

## 4. Search & browse

### 4.1 Search products

**GET** `/api/search`

**Path parameters:** None  
**Query parameters:**

| Name        | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| `q`         | string | Yes      | Search query                         |
| `category`  | string | No       | Category id filter                   |
| `minPrice`  | number | No       | Min price filter                     |
| `maxPrice`  | number | No       | Max price filter                     |
| `rating`    | number | No       | Min rating (e.g. 4 = 4+ stars)       |
| `brand`     | string | No       | Brand id or name                     |
| `sort`      | string | No       | `relevance` \| `price_asc` \| `price_desc` \| `newest` \| `rating` |
| `page`      | number | No       | Page number, 1-based                 |
| `limit`     | number | No       | Items per page, default e.g. 24      |

**Request body:** None

**Response:** `200 OK`

```ts
{
  query: string;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  items: ProductSummary[];
}
```

---

### 4.2 Get search filter options (facets)

**GET** `/api/search/filters`

**Path parameters:** None  
**Query parameters:**

| Name       | Type   | Required | Description        |
|------------|--------|----------|--------------------|
| `q`        | string | No       | Same as search     |
| `category` | string | No       | Same as search     |

**Request body:** None

**Response:** `200 OK`

```ts
{
  categories: Array<{ id: string; name: string; count: number }>;
  priceRange: { min: number; max: number };
  ratings: Array<{ value: number; count: number }>;   // e.g. 4, 3
  brands: Array<{ id: string; name: string; count: number }>;
}
```

---

### 4.3 Search autocomplete (suggestions)

**GET** `/api/search/suggest`

**Path parameters:** None  
**Query parameters:**

| Name | Type   | Required | Description   |
|------|--------|----------|---------------|
| `q`  | string | Yes      | Partial query |
| `limit` | number | No    | Default e.g. 8 |

**Request body:** None

**Response:** `200 OK`

```ts
{
  suggestions: Array<{
    type: "query" | "product" | "category";
    text: string;
    productId?: string;
    categoryId?: string;
    imageUrl?: string;
  }>;
}
```

---

## 5. Product detail

### 5.1 Get product by ID

**GET** `/api/products/:id`

**Path parameters:**

| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| `id` | string | Yes      | Product id   |

**Query parameters:** None  
**Request body:** None

**Response:** `200 OK`

```ts
Product  // full product object (see Common types)
```

**Response:** `404 Not Found` — body: `{ code: string; message: string }`

---

### 5.2 Get product reviews

**GET** `/api/products/:id/reviews`

**Path parameters:**

| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| `id` | string | Yes      | Product id   |

**Query parameters:**

| Name   | Type   | Required | Description   |
|--------|--------|----------|---------------|
| `page` | number | No       | 1-based       |
| `limit`| number | No       | Default e.g. 10 |
| `sort` | string | No       | `recent` \| `helpful` \| `rating_desc` \| `rating_asc` |

**Request body:** None

**Response:** `200 OK`

```ts
{
  summary: {
    averageRating: number;
    totalReviews: number;
    distribution: Record<number, number>;  // 1–5 → count
  };
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    title?: string;
    body: string;
    createdAt: string;
    helpfulCount?: number;
    verifiedPurchase?: boolean;
  }>;
  page: number;
  limit: number;
  totalPages: number;
}
```

---

### 5.3 Submit product review (Write a review CTA)

**POST** `/api/products/:id/reviews`

**Path parameters:**

| Name | Type   | Required | Description |
|------|--------|----------|-------------|
| `id` | string | Yes      | Product id   |

**Query parameters:** None  
**Request body:**

```ts
{
  rating: number;       // 1–5
  title?: string;
  body: string;
}
```

**Headers:** `Authorization: Bearer <token>` required

**Response:** `201 Created`

```ts
{
  id: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
}
```

**Response:** `400 Bad Request` / `401 Unauthorized` — body: `{ code: string; message: string }`

---

## 6. Cart

### 6.1 Get cart

**GET** `/api/cart`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** Optional `Authorization` or session id for persistent cart

**Response:** `200 OK`

```ts
{
  id: string;
  items: CartItem[];
  itemCount: number;      // total quantity
  subtotal: number;
}
```

---

### 6.2 Add item to cart

**POST** `/api/cart/items`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  productId: string;
  quantity: number;       // min 1
}
```

**Headers:** Optional auth/session

**Response:** `201 Created`

```ts
{
  cart: { id: string; items: CartItem[]; itemCount: number; subtotal: number };
  added: { productId: string; quantity: number; lineItemId: string };
}
```

**Response:** `400 Bad Request` — e.g. out of stock: `{ code: string; message: string }`

---

### 6.3 Update cart item quantity

**PATCH** `/api/cart/items/:itemId`

**Path parameters:**

| Name    | Type   | Required | Description   |
|---------|--------|----------|---------------|
| `itemId`| string | Yes      | Cart line id  |

**Query parameters:** None  
**Request body:**

```ts
{
  quantity: number;       // min 1; 0 may mean remove
}
```

**Response:** `200 OK`

```ts
{
  cart: { id: string; items: CartItem[]; itemCount: number; subtotal: number };
}
```

**Response:** `404 Not Found` — body: `{ code: string; message: string }`

---

### 6.4 Remove item from cart

**DELETE** `/api/cart/items/:itemId`

**Path parameters:**

| Name    | Type   | Required | Description   |
|---------|--------|----------|---------------|
| `itemId`| string | Yes      | Cart line id  |

**Query parameters:** None  
**Request body:** None

**Response:** `200 OK`

```ts
{
  cart: { id: string; items: CartItem[]; itemCount: number; subtotal: number };
}
```

---

### 6.5 Save for later (move to list)

Not a cart endpoint; see **Wishlist / lists** — e.g. POST add to list, then DELETE from cart if desired. Contract for “move to list” can be:

**POST** `/api/cart/items/:itemId/move-to-list`

**Path parameters:** `itemId` (string)  
**Request body:** `{ listId: string }`  
**Response:** `200 OK` — cart and list updated; body can return updated cart and list summary.

---

## 7. Checkout

### 7.1 Get user addresses

**GET** `/api/user/addresses`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization: Bearer <token>` required

**Response:** `200 OK`

```ts
{
  addresses: Address[];
}
```

---

### 7.2 Add address

**POST** `/api/user/addresses`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  stateOrRegion: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
  isDefault?: boolean;
}
```

**Headers:** `Authorization: Bearer <token>` required

**Response:** `201 Created`

```ts
{
  address: Address;
}
```

---

### 7.3 Update address

**PATCH** `/api/user/addresses/:addressId`

**Path parameters:** `addressId` (string)  
**Request body:** Same fields as Add address, all optional (partial update)  
**Headers:** `Authorization` required

**Response:** `200 OK` — `{ address: Address }`  
**Response:** `404 Not Found` — `{ code: string; message: string }`

---

### 7.4 Delete address

**DELETE** `/api/user/addresses/:addressId`

**Path parameters:** `addressId` (string)  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `204 No Content` or `200 OK` with `{ success: true }`

---

### 7.5 Get payment methods

**GET** `/api/user/payment-methods`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  paymentMethods: PaymentMethod[];
}
```

---

### 7.6 Add payment method

**POST** `/api/user/payment-methods`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  type: "card";
  number: string;         // full number (handled securely)
  expiryMonth: number;    // 1–12
  expiryYear: number;     // 4-digit
  cvv: string;
  billingAddressId?: string;
  isDefault?: boolean;
}
```

**Headers:** `Authorization` required

**Response:** `201 Created`

```ts
{
  paymentMethod: PaymentMethod;  // masked (last4, brand, etc.)
}
```

---

### 7.7 Delete payment method

**DELETE** `/api/user/payment-methods/:paymentMethodId`

**Path parameters:** `paymentMethodId` (string)  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `204 No Content` or `200 OK` with `{ success: true }`

---

### 7.8 Place order

**POST** `/api/orders`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  shippingAddressId: string;
  paymentMethodId: string;
  notes?: string;
}
```

**Headers:** `Authorization` required. Cart is read from session/user.

**Response:** `201 Created`

```ts
{
  orderId: string;
  status: string;         // e.g. "Placed", "Confirmed"
  placedAt: string;       // ISO date
  total: number;
  estimatedDelivery?: string;
}
```

**Response:** `400 Bad Request` — e.g. cart empty, address invalid: `{ code: string; message: string }`

---

## 8. Auth

### 8.1 Login

**POST** `/api/auth/login`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  email: string;
  password: string;
}
```

**Response:** `200 OK`

```ts
{
  token: string;          // JWT or session token
  expiresAt?: string;     // ISO date
  user: User;
}
```

**Response:** `401 Unauthorized` — `{ code: string; message: string }`

---

### 8.2 Register

**POST** `/api/auth/register`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  name: string;
  email: string;
  password: string;
}
```

**Response:** `201 Created`

```ts
{
  token: string;
  expiresAt?: string;
  user: User;
}
```

**Response:** `400 Bad Request` — e.g. email exists: `{ code: string; message: string }`

---

### 8.3 Forgot password

**POST** `/api/auth/forgot-password`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  email: string;
}
```

**Response:** `200 OK`

```ts
{
  message: string;        // e.g. "If an account exists, we sent a reset link."
}
```

(Backend may always return same message for security.)

---

### 8.4 Logout (optional; client may just drop token)

**POST** `/api/auth/logout`

**Path parameters:** None  
**Request body:** None  
**Headers:** `Authorization` optional

**Response:** `200 OK` — `{ success: true }`

---

## 9. Account — orders

### 9.1 Get orders list

**GET** `/api/user/orders`

**Path parameters:** None  
**Query parameters:**

| Name   | Type   | Required | Description   |
|--------|--------|----------|---------------|
| `page` | number | No       | 1-based       |
| `limit`| number | No       | Default e.g. 10 |
| `status` | string | No     | Filter by status |

**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  orders: OrderSummary[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

---

### 9.2 Get order by ID

**GET** `/api/user/orders/:orderId`

**Path parameters:** `orderId` (string)  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
Order   // full order (see Common types)
```

**Response:** `404 Not Found` — `{ code: string; message: string }`

---

## 10. Account — profile

### 10.1 Get profile

**GET** `/api/user/profile`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
User  // id, email, name, imageUrl?
```

---

### 10.2 Update profile

**PATCH** `/api/user/profile`

**Path parameters:** None  
**Query parameters:** None  
**Request body:**

```ts
{
  name?: string;
  imageUrl?: string;
}
```

**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  user: User;
}
```

---

## 11. Wishlist / lists

### 11.1 Get user lists

**GET** `/api/user/lists`

**Path parameters:** None  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  lists: Array<{
    id: string;
    name: string;
    itemCount: number;
    isDefault?: boolean;   // e.g. "Wishlist"
  }>;
}
```

---

### 11.2 Get list items

**GET** `/api/user/lists/:listId/items`

**Path parameters:** `listId` (string)  
**Query parameters:**

| Name   | Type   | Required | Description   |
|--------|--------|----------|---------------|
| `page` | number | No       | 1-based       |
| `limit`| number | No       | Default e.g. 20 |

**Request body:** None  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  listId: string;
  listName: string;
  items: Array<{
    id: string;            // list item id
    productId: string;
    addedAt: string;
    product: ProductSummary;
  }>;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

**Response:** `404 Not Found` — `{ code: string; message: string }`

---

### 11.3 Create list (optional)

**POST** `/api/user/lists`

**Path parameters:** None  
**Request body:** `{ name: string }`  
**Headers:** `Authorization` required

**Response:** `201 Created` — `{ list: { id: string; name: string; itemCount: number } }`

---

### 11.4 Add product to list

**POST** `/api/user/lists/:listId/items`

**Path parameters:** `listId` (string)  
**Query parameters:** None  
**Request body:**

```ts
{
  productId: string;
  quantity?: number;       // default 1
}
```

**Headers:** `Authorization` required

**Response:** `201 Created`

```ts
{
  listItemId: string;
  productId: string;
  listId: string;
  addedAt: string;
}
```

**Response:** `400 Bad Request` / `404 Not Found` — `{ code: string; message: string }`

---

### 11.5 Remove item from list

**DELETE** `/api/user/lists/:listId/items/:itemId`

**Path parameters:** `listId` (string), `itemId` (string — list item id)  
**Query parameters:** None  
**Request body:** None  
**Headers:** `Authorization` required

**Response:** `204 No Content` or `200 OK` — `{ success: true }`

---

### 11.6 Move list item to cart

**POST** `/api/user/lists/:listId/items/:itemId/move-to-cart`

**Path parameters:** `listId` (string), `itemId` (string)  
**Query parameters:** None  
**Request body:** `{ quantity?: number }`  
**Headers:** `Authorization` required

**Response:** `200 OK`

```ts
{
  cart: { id: string; items: CartItem[]; itemCount: number; subtotal: number };
  removedFromList: true;
}
```

---

## 12. Error response shape (all endpoints)

For `4xx` and `5xx` responses, use a consistent shape:

```ts
{
  code: string;            // e.g. "UNAUTHORIZED", "NOT_FOUND", "VALIDATION_ERROR"
  message: string;         // Human-readable message
  details?: Record<string, string[]>;  // Optional validation errors per field
}
```

---

## 13. Summary table (quick reference)

| Area        | Method | Path (example) | Main params/body |
|-------------|--------|----------------|------------------|
| Home hero   | GET    | `/api/home/hero` | — |
| Categories  | GET    | `/api/categories` | query: `parent?` |
| Deals       | GET    | `/api/deals`     | query: `limit?` |
| Recommendations | GET | `/api/recommendations` | query: `type?`, `limit?` |
| Recently viewed | GET | `/api/recently-viewed` | query: `limit?` |
| Delivery location | GET | `/api/user/delivery-location` | — |
| Search      | GET    | `/api/search`    | query: `q`, `category?`, `sort?`, `page?`, `limit?`, filters |
| Search filters | GET | `/api/search/filters` | query: `q?`, `category?` |
| Search suggest | GET | `/api/search/suggest` | query: `q`, `limit?` |
| Product     | GET    | `/api/products/:id` | path: `id` |
| Reviews     | GET    | `/api/products/:id/reviews` | path: `id`, query: `page?`, `limit?`, `sort?` |
| Submit review | POST | `/api/products/:id/reviews` | path: `id`, body: `rating`, `title?`, `body` |
| Get cart    | GET    | `/api/cart`       | — |
| Add to cart | POST   | `/api/cart/items` | body: `productId`, `quantity` |
| Update item | PATCH  | `/api/cart/items/:itemId` | path: `itemId`, body: `quantity` |
| Remove item | DELETE | `/api/cart/items/:itemId` | path: `itemId` |
| Move to list| POST   | `/api/cart/items/:itemId/move-to-list` | path: `itemId`, body: `listId` |
| Get addresses | GET  | `/api/user/addresses` | — |
| Add address | POST   | `/api/user/addresses` | body: address fields |
| Update address | PATCH | `/api/user/addresses/:addressId` | path: `addressId`, body: partial |
| Delete address | DELETE | `/api/user/addresses/:addressId` | path: `addressId` |
| Get payment methods | GET | `/api/user/payment-methods` | — |
| Add payment | POST   | `/api/user/payment-methods` | body: card fields |
| Delete payment | DELETE | `/api/user/payment-methods/:id` | path: id |
| Place order | POST   | `/api/orders`     | body: `shippingAddressId`, `paymentMethodId`, `notes?` |
| Login       | POST   | `/api/auth/login` | body: `email`, `password` |
| Register    | POST   | `/api/auth/register` | body: `name`, `email`, `password` |
| Forgot password | POST | `/api/auth/forgot-password` | body: `email` |
| Logout      | POST   | `/api/auth/logout` | — |
| Orders list | GET    | `/api/user/orders` | query: `page?`, `limit?`, `status?` |
| Order detail| GET    | `/api/user/orders/:orderId` | path: `orderId` |
| Get profile | GET    | `/api/user/profile` | — |
| Update profile | PATCH | `/api/user/profile` | body: `name?`, `imageUrl?` |
| Get lists   | GET    | `/api/user/lists`  | — |
| Create list | POST   | `/api/user/lists`  | body: `name` |
| List items  | GET    | `/api/user/lists/:listId/items` | path: `listId`, query: `page?`, `limit?` |
| Add to list | POST   | `/api/user/lists/:listId/items` | path: `listId`, body: `productId`, `quantity?` |
| Remove from list | DELETE | `/api/user/lists/:listId/items/:itemId` | path: `listId`, `itemId` |
| Move to cart (from list) | POST | `/api/user/lists/:listId/items/:itemId/move-to-cart` | path: `listId`, `itemId`, body: `quantity?` |

This file is the single source of truth for parameters and response formats the UI expects from the backend.
