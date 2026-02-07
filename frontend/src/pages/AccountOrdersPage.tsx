import { Link } from 'react-router-dom';
import { mockOrderSummaries } from '../mock/data';

/**
 * GET /api/user/orders?page=&limit=&status=
 */
export function AccountOrdersPage() {
  const orders = mockOrderSummaries;

  return (
    <div className="max-w-[900px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="border rounded p-4 flex items-center justify-between">
              <div>
                <Link to={`/account/orders/${o.id}`} className="font-medium hover:text-amazon-orange">Order #{o.id}</Link>
                <p className="text-sm text-gray-500">{o.status} · Placed {new Date(o.placedAt).toLocaleDateString()}</p>
                <p className="text-sm">{o.itemCount} item(s) · ${o.total.toFixed(2)}</p>
              </div>
              <Link to={`/account/orders/${o.id}`} className="text-amazon-orange hover:underline text-sm">View details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
