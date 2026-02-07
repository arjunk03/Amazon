import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { CartItem } from '../types/api';
import { getProductById } from '../mock/data';

/**
 * Cart state for UI. Data expected from:
 * GET /api/cart → { id, items: CartItem[], itemCount, subtotal }
 * POST /api/cart/items → body: { productId, quantity }
 * PATCH /api/cart/items/:itemId → body: { quantity }
 * DELETE /api/cart/items/:itemId
 */
interface CartState {
  id: string | null;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

const defaultCart: CartState = { id: null, items: [], itemCount: 0, subtotal: 0 };

const CartContext = createContext<{
  cart: CartState;
  setCart: (cart: CartState) => void;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
} | null>(null);

let lineItemIdCounter = 1;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(defaultCart);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.items.find((i) => i.productId === productId);
      const newItems = existing
        ? prev.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
          )
        : [
            ...prev.items,
            {
              id: `line-${lineItemIdCounter++}`,
              productId: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity,
              maxQuantity: product.stockQuantity,
            },
          ];
      const itemCount = newItems.reduce((s, i) => s + i.quantity, 0);
      const subtotal = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
      return { ...prev, items: newItems, itemCount, subtotal };
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      const newItems = prev.items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
      const itemCount = newItems.reduce((s, i) => s + i.quantity, 0);
      const subtotal = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
      return { ...prev, items: newItems, itemCount, subtotal };
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((i) => i.id !== itemId);
      const itemCount = newItems.reduce((s, i) => s + i.quantity, 0);
      const subtotal = newItems.reduce((s, i) => s + i.price * i.quantity, 0);
      return { ...prev, items: newItems, itemCount, subtotal };
    });
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
