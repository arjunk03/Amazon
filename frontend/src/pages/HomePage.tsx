import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { productsApi } from '../services/api/products.api';
import type { Product } from '../types/product';

/**
 * Home data fetched from live API.
 */
export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getAll(),
          productsApi.getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load home page data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const deals = products.filter((p) => (p as any).listPrice != null && (p as any).listPrice > p.price).slice(0, 6);
  const recommendations = products.slice(0, 8);
  const recentlyViewed = products.slice(2, 6);

  if (isLoading) {
    return <div className="max-w-[1600px] mx-auto p-12 text-center text-gray-500">Loading your store...</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <section className="relative h-64 md:h-80 overflow-hidden bg-amazon-dark-light">
        <Link to="/" className="block w-full h-full">
          <img
            src="https://placehold.co/1600x400/232f3e/ff9900?text=Welcome+to+Amazon+Clone"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </Link>
      </section>

      {categories.length > 0 && (
        <section className="p-4">
          <h2 className="text-lg font-semibold mb-2">Shop by category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((c) => (
              <Link
                key={c}
                to={`/search?category=${encodeURIComponent(c)}`}
                className="w-32 h-32 bg-white border rounded flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <span className="font-medium text-center px-2">{c}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {deals.length > 0 && (
        <section className="p-4 bg-white mt-4">
          <h2 className="text-lg font-semibold mb-2">Today&apos;s Deals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
            {deals.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
          <Link to="/search" className="text-amazon-orange hover:underline mt-2 inline-block">
            See all deals
          </Link>
        </section>
      )}

      {recommendations.length > 0 && (
        <section className="p-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Recommendations for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="p-4 mt-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Recently viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        </section>
      )}

      {products.length === 0 && !isLoading && (
        <div className="p-12 text-center text-gray-500 bg-white mt-4">
          <p>No products available. Start adding some!</p>
        </div>
      )}
    </div>
  );
}
