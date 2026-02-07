/**
 * Mock data for UI. Replace with API calls per docs/API_CONTRACTS.md.
 */
import type {
  ProductSummary,
  Product,
  Address,
  PaymentMethod,
  User,
  OrderSummary,
  Order,
  HeroBanner,
  Category,
  ListSummary,
  ListItemWithProduct,
} from '../types/api';

const PLACEHOLDER_IMG = 'https://placehold.co/300x300/e5e7eb/6b7280?text=Product';

export const mockCategories: Category[] = [
  { id: 'elec', name: 'Electronics', slug: 'electronics' },
  { id: 'fashion', name: 'Fashion', slug: 'fashion' },
  { id: 'home', name: 'Home & Kitchen', slug: 'home' },
  { id: 'deals', name: "Today's Deals", slug: 'deals' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Wireless Bluetooth Headphones with Noise Cancellation',
    price: 79.99,
    listPrice: 129.99,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    rating: 4.5,
    reviewCount: 2847,
    inStock: true,
    stockQuantity: 15,
    badge: "Today's Deal",
    description: 'High-quality wireless headphones with active noise cancellation. 30-hour battery life, comfortable over-ear design. Perfect for commuting and travel.',
    categoryId: 'elec',
    categoryName: 'Electronics',
    deliveryEta: 'Feb 10–12',
    returnPolicy: '30-day return policy',
    brand: 'SoundMax',
  },
  {
    id: '2',
    title: 'Smart Watch with Fitness Tracker and Heart Rate Monitor',
    price: 149.99,
    listPrice: 199.99,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    rating: 4.3,
    reviewCount: 5621,
    inStock: true,
    badge: 'Best Seller',
    description: 'Track your fitness goals with this feature-packed smartwatch. Water resistant, GPS, sleep tracking, and 7-day battery life.',
    categoryId: 'elec',
    categoryName: 'Electronics',
    deliveryEta: 'Feb 9–11',
    returnPolicy: '30-day return policy',
    brand: 'TechFit',
  },
  {
    id: '3',
    title: 'Stainless Steel Kitchen Knife Set - 8 Piece',
    price: 59.99,
    listPrice: 89.99,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    rating: 4.7,
    reviewCount: 1203,
    inStock: true,
    stockQuantity: 8,
    description: 'Professional-grade knife set for home chefs. Ergonomic handles, razor-sharp blades. Dishwasher safe.',
    categoryId: 'home',
    categoryName: 'Home & Kitchen',
    deliveryEta: 'Feb 11–13',
    returnPolicy: '30-day return policy',
    brand: 'ChefPro',
  },
  {
    id: '4',
    title: 'Organic Cotton Throw Blanket - Soft & Cozy',
    price: 34.99,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    rating: 4.4,
    reviewCount: 892,
    inStock: true,
    description: 'Luxuriously soft organic cotton blanket. Machine washable, available in multiple colors. Perfect for couch or bed.',
    categoryId: 'home',
    categoryName: 'Home & Kitchen',
    deliveryEta: 'Feb 12–14',
    returnPolicy: '30-day return policy',
  },
  {
    id: '5',
    title: 'Running Shoes - Lightweight Cushioned',
    price: 89.99,
    listPrice: 120,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG],
    rating: 4.6,
    reviewCount: 3421,
    inStock: true,
    badge: "Today's Deal",
    description: 'Designed for comfort and speed. Breathable mesh upper, responsive midsole. Ideal for daily runs.',
    categoryId: 'fashion',
    categoryName: 'Fashion',
    deliveryEta: 'Feb 10–12',
    returnPolicy: '30-day return policy',
    brand: 'RunFast',
  },
  {
    id: '6',
    title: 'Portable Power Bank 20000mAh - Fast Charging',
    price: 39.99,
    imageUrl: PLACEHOLDER_IMG,
    images: [PLACEHOLDER_IMG],
    rating: 4.2,
    reviewCount: 4567,
    inStock: true,
    description: 'Charge your devices on the go. Dual USB ports, LED indicator. TSA approved for travel.',
    categoryId: 'elec',
    categoryName: 'Electronics',
    deliveryEta: 'Feb 9–10',
    returnPolicy: '30-day return policy',
  },
];

export const mockProductSummaries: ProductSummary[] = mockProducts.map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  listPrice: p.listPrice,
  imageUrl: p.imageUrl,
  rating: p.rating,
  reviewCount: p.reviewCount,
  inStock: p.inStock,
  badge: p.badge,
}));

export const mockHeroBanners: HeroBanner[] = [
  { id: '1', imageUrl: 'https://placehold.co/1200x400/232f3e/ff9900?text=Deals+of+the+Day', title: 'Deals of the Day', linkUrl: '/search?category=deals' },
  { id: '2', imageUrl: 'https://placehold.co/1200x400/232f3e/ffffff?text=Free+Shipping+on+Orders+over+$25', title: 'Free Shipping', linkUrl: '/' },
];

export const mockAddresses: Address[] = [
  {
    id: 'addr1',
    fullName: 'John Doe',
    line1: '123 Main Street',
    line2: 'Apt 4B',
    city: 'New York',
    stateOrRegion: 'NY',
    postalCode: '10001',
    countryCode: 'US',
    phone: '555-123-4567',
    isDefault: true,
  },
  {
    id: 'addr2',
    fullName: 'John Doe',
    line1: '456 Oak Avenue',
    city: 'Brooklyn',
    stateOrRegion: 'NY',
    postalCode: '11201',
    countryCode: 'US',
    isDefault: false,
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: 'pm1', type: 'card', last4: '4242', brand: 'Visa', expiryMonth: 12, expiryYear: 2026, isDefault: true },
  { id: 'pm2', type: 'card', last4: '5555', brand: 'Mastercard', expiryMonth: 6, expiryYear: 2027, isDefault: false },
];

export const mockUser: User = {
  id: 'user1',
  email: 'john@example.com',
  name: 'John',
};

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    status: 'Delivered',
    placedAt: '2025-01-15T10:30:00Z',
    itemCount: 2,
    imageUrl: PLACEHOLDER_IMG,
    items: [
      { productId: '1', title: mockProducts[0].title, imageUrl: mockProducts[0].imageUrl, quantity: 1, price: mockProducts[0].price },
      { productId: '2', title: mockProducts[1].title, imageUrl: mockProducts[1].imageUrl, quantity: 1, price: mockProducts[1].price },
    ],
    shippingAddress: mockAddresses[0],
    subtotal: 229.98,
    shippingCost: 0,
    tax: 20.12,
    total: 250.1,
  },
  {
    id: 'ord-002',
    status: 'Shipped',
    placedAt: '2025-02-01T14:00:00Z',
    itemCount: 1,
    imageUrl: PLACEHOLDER_IMG,
    items: [
      { productId: '3', title: mockProducts[2].title, imageUrl: mockProducts[2].imageUrl, quantity: 1, price: mockProducts[2].price },
    ],
    shippingAddress: mockAddresses[0],
    subtotal: 59.99,
    shippingCost: 5.99,
    tax: 5.4,
    total: 71.38,
  },
];

export const mockOrderSummaries: OrderSummary[] = mockOrders.map((o) => ({
  id: o.id,
  status: o.status,
  placedAt: o.placedAt,
  itemCount: o.itemCount,
  total: o.total,
  imageUrl: o.imageUrl,
}));

export const mockLists: ListSummary[] = [
  { id: 'list1', name: 'Wishlist', itemCount: 2, isDefault: true },
  { id: 'list2', name: 'Gift Ideas', itemCount: 1, isDefault: false },
];

export const mockListItems: Record<string, ListItemWithProduct[]> = {
  list1: [
    { id: 'li1', productId: '1', addedAt: '2025-02-01T12:00:00Z', product: mockProductSummaries[0] },
    { id: 'li2', productId: '5', addedAt: '2025-02-02T09:00:00Z', product: mockProductSummaries[4] },
  ],
  list2: [
    { id: 'li3', productId: '2', addedAt: '2025-02-03T10:00:00Z', product: mockProductSummaries[1] },
  ],
};

export const mockDeliveryLocation = { label: 'New York 10001, USA', postalCode: '10001', countryCode: 'US' };

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getProductSummaryById(id: string): ProductSummary | undefined {
  return mockProductSummaries.find((p) => p.id === id);
}

export function searchProducts(query: string, category?: string): ProductSummary[] {
  let list = [...mockProductSummaries];
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q));
  }
  if (category && category !== 'deals') {
    const catProductIds = mockProducts.filter((p) => p.categoryId === category).map((p) => p.id);
    list = list.filter((p) => catProductIds.includes(p.id));
  }
  if (category === 'deals') {
    list = list.filter((p) => p.badge === "Today's Deal" || (p.listPrice != null && p.listPrice > p.price));
  }
  return list;
}
