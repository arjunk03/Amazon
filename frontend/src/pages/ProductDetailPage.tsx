import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getProductById } from '../mock/data';

/**
 * Product from GET /api/products/:id
 * Reviews from GET /api/products/:id/reviews
 */
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = id ? getProductById(id) : undefined;

  const handleAddToCart = () => {
    if (!id) return;
    addItem(id, quantity);
    addToast('Added to cart');
  };

  const handleBuyNow = () => {
    if (!id) return;
    addItem(id, quantity);
    navigate('/cart');
  };

  if (!id) {
    return <div className="p-4">Invalid product ID</div>;
  }

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto p-8 text-center">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <p className="text-gray-500 mt-2">No product with ID &quot;{id}&quot;.</p>
      </div>
    );
  }

  const savings = product.listPrice && product.listPrice > product.price
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded overflow-hidden flex items-center justify-center">
          <img src={product.images[0] ?? product.imageUrl} alt={product.title} className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{product.title}</h1>
          {product.rating != null && (
            <p className="text-amber-600 text-sm mt-1">
              ★ {product.rating} {product.reviewCount != null && `(${product.reviewCount} reviews)`}
            </p>
          )}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-amazon-orange font-semibold text-lg">${product.price.toFixed(2)}</span>
            {product.listPrice != null && <span className="text-gray-500 line-through">${product.listPrice.toFixed(2)}</span>}
            {savings > 0 && <span className="text-green-600 text-sm">-{savings}%</span>}
          </div>
          <p className="mt-2 text-sm">{product.inStock ? (product.stockQuantity != null ? `Only ${product.stockQuantity} left` : 'In Stock') : 'Out of Stock'}</p>
          {product.deliveryEta && <p className="text-sm text-green-700 mt-1">Delivery: {product.deliveryEta}</p>}
          <div className="mt-4 flex gap-2">
            <label className="text-sm">Qty:</label>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="border rounded px-2 py-1">
              {Array.from({ length: Math.min(10, product.stockQuantity ?? 10) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={handleAddToCart} className="bg-amazon-orange text-amazon-dark px-4 py-2 rounded hover:bg-amber-500">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700">
              Buy Now
            </button>
          </div>
          <button type="button" className="mt-2 text-sm text-amazon-orange hover:underline">Add to Wishlist</button>
          <section className="mt-8 border-t pt-4">
            <h2 className="font-semibold">About this item</h2>
            <p className="text-sm mt-1">{product.description}</p>
          </section>
          <section className="mt-6">
            <h2 className="font-semibold">Customer reviews</h2>
            <p className="text-sm text-gray-500">{(product.reviewCount ?? 0)} reviews · Write a review</p>
          </section>
        </div>
      </div>
    </div>
  );
}
