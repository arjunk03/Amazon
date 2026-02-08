import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { productsApi } from '../services/api/products.api';
import type { Product } from '../types/product';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('relevance');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getAll(),
          productsApi.getCategories()
        ]);
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load search data', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (category) {
      list = list.filter(p => p.category === category);
    }

    if (sort === 'price_asc') return list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') return list.sort((a, b) => b.price - a.price);

    return list;
  }, [allProducts, q, category, sort]);

  return (
    <div className="max-w-[1600px] mx-auto flex gap-6 p-6">
      <aside className="hidden md:block w-64 shrink-0 transition-opacity">
        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Department</h3>
        <div className="space-y-2">
          <Link
            to="/search"
            className={`block text-sm ${!category ? 'font-bold text-amazon-orange' : 'text-gray-700 hover:text-amazon-orange'}`}
          >
            All Departments
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to={`/search?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={`block text-sm ${category === c ? 'font-bold text-amazon-orange' : 'text-gray-700 hover:text-amazon-orange'}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-xl">
            {isLoading ? (
              <span className="text-gray-400">Searching...</span>
            ) : (
              <>
                <span className="font-bold">{filteredProducts.length}</span> results for{' '}
                <span className="text-amazon-orange font-bold">"{q || category || 'All products'}"</span>
              </>
            )}
          </h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-md px-4 py-2 text-sm bg-gray-50 focus:border-amazon-orange outline-none"
          >
            <option value="relevance">Featured</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-500">Try checking your spelling or use more general terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
