import { Link } from 'react-router-dom';
import type { ProductSummary } from '../types/api';

interface ProductCardProps {
  /** Expected shape from API: ProductSummary */
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  // Support both unified and legacy field names for compatibility
  const p = product as any;
  const imageUrl = p.imageUrl || p.image || '';
  const title = p.title || p.name || '';

  const savings = p.listPrice && p.listPrice > p.price
    ? Math.round(((p.listPrice - p.price) / p.listPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${p.id}`}
      className="group block bg-white border border-gray-200 rounded p-4 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square mb-3 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/400x400/f0f0f0/999999?text=Image+Not+Found';
          }}
        />
      </div>
      <h3 className="text-sm font-medium line-clamp-2 h-10 group-hover:text-amazon-orange">
        {title}
      </h3>
      {p.rating != null && (
        <p className="text-amber-600 text-sm mt-1">
          ★ {p.rating} {p.reviewCount != null && `(${p.reviewCount})`}
        </p>
      )}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-amazon-orange font-semibold">₹{product.price.toFixed(2)}</span>
        {product.listPrice != null && product.listPrice > product.price && (
          <span className="text-gray-500 text-sm line-through">₹{product.listPrice.toFixed(2)}</span>
        )}
        {savings > 0 && <span className="text-green-600 text-sm">-{savings}%</span>}
      </div>
      {product.badge && (
        <span className="inline-block mt-1 text-xs bg-red-600 text-white px-1 rounded">{product.badge}</span>
      )}
    </Link>
  );
}
