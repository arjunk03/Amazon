import { useSearchParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { searchProducts, mockCategories } from '../mock/data';

/**
 * Search: GET /api/search?q=&category=&sort=&page=&limit=
 * Filters: GET /api/search/filters?q=&category=
 */
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const category = searchParams.get('category') ?? '';
  const [sort, setSort] = useState('relevance');

  const products = useMemo(() => {
    const list = searchProducts(q, category || undefined);
    if (sort === 'price_asc') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [q, category, sort]);

  return (
    <div className="max-w-[1600px] mx-auto flex gap-4 p-4">
      <aside className="hidden md:block w-56 shrink-0">
        <h3 className="font-semibold mb-2">Filters</h3>
        <div className="space-y-2 mt-2">
          <p className="text-sm font-medium">Category</p>
          <div className="flex flex-col gap-1">
            {mockCategories.map((c) => (
              <Link
                key={c.id}
                to={{ pathname: '/search', search: `?category=${c.id}${q ? `&q=${encodeURIComponent(q)}` : ''}` }}
                className={`text-sm ${category === c.id ? 'font-semibold text-amazon-orange' : 'text-gray-600 hover:text-amazon-orange'}`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">
            {q ? `Results for "${q}"` : category ? `Category: ${mockCategories.find((c) => c.id === category)?.name ?? category}` : 'All products'}
          </h1>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Avg. Rating</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No products match your search. Try a different query or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500">
            {products.length} result(s)
          </div>
        )}
      </div>
    </div>
  );
}
