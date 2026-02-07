import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

/**
 * Cart data expected from GET /api/cart
 * Response: { id, items: CartItem[], itemCount, subtotal }
 * Update: PATCH /api/cart/items/:itemId { quantity }
 * Remove: DELETE /api/cart/items/:itemId
 * Move to list: POST /api/cart/items/:itemId/move-to-list { listId }
 */
export function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();

  if (cart.items.length === 0 && cart.itemCount === 0) {
    return (
      <div className="max-w-[900px] mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold">Your Amazon Cart is empty</h1>
        <p className="text-gray-500 mt-2">Add items from the home page or search.</p>
        <Link to="/" className="inline-block mt-4 text-amazon-orange hover:underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200">
              <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-contain bg-gray-100 rounded" />
              <div className="flex-1">
                <Link to={`/product/${item.productId}`} className="font-medium hover:text-amazon-orange">{item.title}</Link>
                <p className="text-amazon-orange font-semibold mt-1">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={item.quantity}
                    onChange={(e) => {
                      const q = Number(e.target.value);
                      if (q === 0) return;
                      // PATCH /api/cart/items/:itemId { quantity: q }
                      updateQuantity(item.id, q);
                    }}
                  >
                    {Array.from({ length: item.maxQuantity ?? 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="text-gray-500 text-sm">Qty</span>
                  <button
                    type="button"
                    className="text-sm text-amazon-orange hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Delete
                  </button>
                  <span className="text-sm text-gray-500">Save for later — POST move-to-list</span>
                </div>
              </div>
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="md:w-80 shrink-0 bg-gray-50 rounded p-4 h-fit">
          <p className="text-sm text-gray-600">
            Subtotal ({cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''}): <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
          </p>
          <Link
            to="/checkout"
            className="block w-full mt-4 bg-amazon-orange text-amazon-dark text-center py-2 rounded font-semibold hover:bg-amber-500"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
