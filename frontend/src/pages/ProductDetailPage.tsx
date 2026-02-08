import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { productsApi } from '../services/api/products.api';
import type { Product } from '../types/product';

/**
 * Product detail page using live API.
 */
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await productsApi.getById(parseInt(id));
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

  if (isLoading) {
    return <div className="max-w-[1200px] mx-auto p-12 text-center text-gray-500">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="max-w-[1200px] mx-auto p-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <p className="text-gray-500 mt-4">We couldn't find the product you're looking for.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 text-amazon-orange hover:underline font-medium"
        >
          Return to Home
        </button>
      </div>
    );
  }

  // Support listPrice if present in any
  const p = product as any;
  const listPrice = p.listPrice || 0;
  const savings = listPrice > product.price
    ? Math.round(((listPrice - product.price) / listPrice) * 100)
    : 0;

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-8 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-medium text-gray-900 leading-tight">{product.title}</h1>
            <p className="text-sm text-amazon-orange font-medium mt-1">Brand: {p.brand || 'Generic'}</p>
          </div>

          <div className="border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-sm align-top mt-1">₹</span>
                <span className="text-3xl font-medium">{product.price.toLocaleString()}</span>
              </div>
              {listPrice > product.price && (
                <div className="text-sm text-gray-500 flex flex-col">
                  <span>M.R.P: <span className="line-through">₹{listPrice.toLocaleString()}</span></span>
                  <span className="text-red-700">Save ₹{(listPrice - product.price).toLocaleString()} ({savings}%)</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">Inclusive of all taxes</p>
          </div>

          <div className="space-y-4">
            <div className="text-sm">
              <span className={`font-bold ${p.inStock !== false ? 'text-green-700' : 'text-red-700'}`}>
                {p.inStock !== false ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-bold">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-3 py-1 bg-gray-50 outline-none focus:border-amazon-orange shadow-sm"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full h-[40px] bg-amber-400 hover:bg-amber-500 rounded-full font-medium transition-colors shadow-sm"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full h-[40px] bg-amazon-orange hover:bg-amber-600 rounded-full font-medium transition-colors shadow-sm"
              >
                Buy Now
              </button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-lg font-bold mb-3">About this item</h2>
            <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
