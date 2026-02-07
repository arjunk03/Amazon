import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import {
  mockCategories,
  mockHeroBanners,
  mockProductSummaries,
} from '../mock/data';

/**
 * Home data expected from:
 * GET /api/home/hero → { banners[] }
 * GET /api/categories → { categories[] }
 * GET /api/deals → { deals[] }
 * GET /api/recommendations → { title?, products[] }
 * GET /api/recently-viewed → { products[] }
 */
export function HomePage() {
  const deals = mockProductSummaries.filter((p) => p.badge === "Today's Deal" || (p.listPrice != null && p.listPrice > p.price)).slice(0, 6);
  const recommendations = mockProductSummaries.slice(0, 8);
  const recentlyViewed = mockProductSummaries.slice(2, 6);

  return (
    <div className="max-w-[1600px] mx-auto">
      <section className="relative h-64 md:h-80 overflow-hidden bg-amazon-dark-light">
        <Link
          to={mockHeroBanners[0]?.linkUrl?.startsWith('/') ? (mockHeroBanners[0].linkUrl ?? '/') : '/'}
          className="block w-full h-full"
        >
          <img
            src={mockHeroBanners[0]?.imageUrl ?? ''}
            alt={mockHeroBanners[0]?.altText ?? mockHeroBanners[0]?.title ?? 'Hero'}
            className="w-full h-full object-cover"
          />
        </Link>
      </section>

      <section className="p-4">
        <h2 className="text-lg font-semibold mb-2">Shop by category</h2>
        <div className="flex flex-wrap gap-4">
          {mockCategories.map((c) => (
            <Link
              key={c.id}
              to={`/search?category=${c.id}`}
              className="w-32 h-32 bg-white border rounded flex flex-col items-center justify-center hover:shadow-md"
            >
              <span className="font-medium text-center px-2">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="p-4 bg-white mt-4">
        <h2 className="text-lg font-semibold mb-2">Today&apos;s Deals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-2">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link to="/search?category=deals" className="text-amazon-orange hover:underline mt-2 inline-block">
          See all deals
        </Link>
      </section>

      <section className="p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">Based on your browsing</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {recommendations.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="p-4 mt-4 bg-white">
        <h2 className="text-lg font-semibold mb-2">Recently viewed</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {recentlyViewed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
