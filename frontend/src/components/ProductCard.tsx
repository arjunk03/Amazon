import { Link } from 'react-router-dom';
import type { ProductSummary } from '../types/api';

interface ProductCardProps {
  /** Expected shape from API: ProductSummary */
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  const savings = product.listPrice && product.listPrice > product.price
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="block border border-gray-200 rounded p-4 bg-white hover:shadow-md transition-shadow"
    >
      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23ddd" width="100" height="100"/><text x="50%" y="50%" fill="%23999" text-anchor="middle" dy=".3em">No image</text></svg>'; }}
        />
      </div>
      <h3 className="mt-2 text-sm font-medium line-clamp-2">{product.title}</h3>
      {product.rating != null && (
        <p className="text-amber-600 text-sm mt-1">
          ★ {product.rating} {product.reviewCount != null && `(${product.reviewCount})`}
        </p>
      )}
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-amazon-orange font-semibold">${product.price.toFixed(2)}</span>
        {product.listPrice != null && product.listPrice > product.price && (
          <span className="text-gray-500 text-sm line-through">${product.listPrice.toFixed(2)}</span>
        )}
        {savings > 0 && <span className="text-green-600 text-sm">-{savings}%</span>}
      </div>
      {product.badge && (
        <span className="inline-block mt-1 text-xs bg-red-600 text-white px-1 rounded">{product.badge}</span>
      )}
    </Link>
  );
}
