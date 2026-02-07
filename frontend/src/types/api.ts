/**
 * Types aligned with docs/API_CONTRACTS.md.
 * Expected request/response shapes from backend — no mock data; UI comments reference these.
 */

export interface ProductSummary {
  id: string;
  title: string;
  price: number;
  listPrice?: number;
  imageUrl: string;
  imageUrls?: string[];
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  badge?: string;
}

export interface Product extends ProductSummary {
  description: string;
  images: string[];
  categoryId: string;
  categoryName?: string;
  stockQuantity?: number;
  deliveryEta?: string;
  returnPolicy?: string;
  brand?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  maxQuantity?: number;
}

export interface Address {
  id: string;
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

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
}

export interface OrderSummary {
  id: string;
  status: string;
  placedAt: string;
  itemCount: number;
  total: number;
  imageUrl?: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order extends OrderSummary {
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  total: number;
}

export interface HeroBanner {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  title?: string;
  altText?: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  slug?: string;
  childCount?: number;
}

export interface ListSummary {
  id: string;
  name: string;
  itemCount: number;
  isDefault?: boolean;
}

export interface ListItemWithProduct {
  id: string;
  productId: string;
  addedAt: string;
  product: ProductSummary;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}
