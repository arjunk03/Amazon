import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { productsApi } from '../services/api/products.api';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types/product';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

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
        console.error('Home Page Error:', err);
        setError('Failed to load home page data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products for various sections
  const specialOffers = products.filter((p) => (p as any).listPrice != null && (p as any).listPrice > p.price).slice(0, 6);
  const newArrivals = [...products].sort((a, b) => b.id - a.id).slice(0, 8);

  // Group products by category for specialized sections
  const productsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat).slice(0, 6);
    return acc;
  }, {} as Record<string, Product[]>);

  // Get one image for each category for the category grid
  const categoryImages = categories.reduce((acc, cat) => {
    const firstProduct = products.find(p => p.category === cat);
    acc[cat] = firstProduct?.imageUrl || 'https://via.placeholder.com/300?text=' + encodeURIComponent(cat);
    return acc;
  }, {} as Record<string, string>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading your marketplace...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 pb-12">
      {/* Hero Banner Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none h-full z-10" />
        <div className="h-[300px] md:h-[400px] overflow-hidden">
          <img
            src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg"
            alt="Amazon Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://placehold.co/1600x450/232f3e/ffffff?text=Great+Deals+Every+Day";
            }}
          />
        </div>
      </section>

      <div className="max-w-[1500px] mx-auto px-4 -mt-32 md:-mt-48 relative z-20 space-y-6">
        {/* Welcome & Guest Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-sm shadow-sm flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-3">Hi, {user ? user.username : 'Guest'}</h2>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {user ? "Welcome back to your personalized home page. Check out your recent favorites." : "Sign in to get personalized recommendations and track your orders."}
            </p>
            {!user && (
              <Link to="/login" className="bg-amazon-yellow text-amazon-dark py-2 rounded shadow-sm text-center text-sm font-medium hover:bg-yellow-400">
                Sign in securely
              </Link>
            )}
          </div>

          {/* Simple Category Cards (Top 3 with images) */}
          {categories.slice(0, 3).map(cat => (
            <Link key={cat} to={`/search?category=${encodeURIComponent(cat)}`} className="bg-white p-5 rounded-sm shadow-sm group">
              <h2 className="text-xl font-bold mb-3">{cat}</h2>
              <div className="aspect-square bg-gray-50 rounded mb-4 overflow-hidden">
                <img
                  src={categoryImages[cat]}
                  alt={cat}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-blue-600 text-sm font-medium hover:underline hover:text-orange-700">Shop now</span>
            </Link>
          ))}
        </div>

        {/* Categories Grid (More Categories) */}
        {categories.length > 3 && (
          <div className="bg-white p-6 rounded-sm shadow-sm">
            <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(3, 9).map(cat => (
                <Link key={cat} to={`/search?category=${encodeURIComponent(cat)}`} className="text-center group">
                  <div className="aspect-square bg-gray-50 rounded-lg mb-2 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={categoryImages[cat]}
                      alt={cat}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-blue-600">{cat}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Special Offers Section */}
        {specialOffers.length > 0 && (
          <section className="bg-white p-6 rounded-sm shadow-sm overflow-hidden">
            <h2 className="text-xl font-bold mb-4">Today&apos;s Featured Deals</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {specialOffers.map((p) => (
                <div key={p.id} className="min-w-[200px] w-[200px]">
                  <ProductCard product={p as any} />
                </div>
              ))}
            </div>
            <Link to="/search" className="text-blue-600 text-sm hover:underline mt-4 inline-block">See all deals</Link>
          </section>
        )}

        {/* Dynamic Category Sections */}
        {Object.entries(productsByCategory).map(([cat, catProducts]) => (
          catProducts.length > 0 && (
            <section key={cat} className="bg-white p-6 rounded-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Trending in {cat}</h2>
                <Link to={`/search?category=${encodeURIComponent(cat)}`} className="text-blue-600 text-sm hover:underline">See more</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {catProducts.map((p) => (
                  <ProductCard key={p.id} product={p as any} />
                ))}
              </div>
            </section>
          )
        ))}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="bg-white p-6 rounded-sm shadow-sm overflow-hidden">
            <h2 className="text-xl font-bold mb-4">New Arrivals</h2>
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {newArrivals.map((p) => (
                <div key={p.id} className="min-w-[180px] w-[180px]">
                  <ProductCard product={p as any} />
                </div>
              ))}
            </div>
          </section>
        )}

        {products.length === 0 && !isLoading && (
          <div className="p-16 text-center text-gray-500 bg-white rounded-sm shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg font-medium text-gray-900">No products found</p>
            <p className="text-gray-500">We couldn&apos;t find any products in the store yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
