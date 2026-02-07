import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { mockLists, mockListItems } from '../mock/data';

/**
 * GET /api/user/lists/:listId/items
 */
export function ListDetailPage() {
  const { listId } = useParams<{ listId: string }>();
  const list = listId ? mockLists.find((l) => l.id === listId) : undefined;
  const items = listId ? (mockListItems[listId] ?? []) : [];

  if (!listId) return <div className="p-4">Invalid list</div>;
  if (!list) {
    return (
      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="text-2xl font-semibold">List not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">{list.name}</h1>
      {items.length === 0 ? (
        <p className="text-gray-500">No items in this list.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <ProductCard product={item.product} />
              <div className="mt-2 flex gap-2 text-sm">
                <button type="button" className="text-amazon-orange hover:underline">Move to cart</button>
                <button type="button" className="text-red-600 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
