import { useParams, Link } from 'react-router-dom';
import { mockOrders } from '../mock/data';

/**
 * GET /api/user/orders/:orderId
 */
export function AccountOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orderId ? mockOrders.find((o) => o.id === orderId) : undefined;

  if (!orderId) return <div className="p-4">Invalid order</div>;
  if (!order) {
    return (
      <div className="max-w-[800px] mx-auto p-6">
        <h1 className="text-2xl font-semibold">Order not found</h1>
        <p className="text-gray-500 mt-2">No order with ID &quot;{orderId}&quot;.</p>
        <Link to="/account/orders" className="text-amazon-orange hover:underline mt-2 inline-block">Back to orders</Link>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-6">
      <h1 className="text-2xl font-semibold">Order #{order.id}</h1>
      <p className="text-sm text-gray-500">{order.status} · Placed {new Date(order.placedAt).toLocaleDateString()}</p>
      <section className="mt-4 border rounded p-4">
        <h2 className="font-semibold mb-2">Items</h2>
        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4 py-2 border-b last:border-0">
            <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-contain bg-gray-100 rounded" />
            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm">Qty: {item.quantity} · ${item.price.toFixed(2)}</p>
            </div>
            <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      </section>
      <section className="mt-4 border rounded p-4">
        <h2 className="font-semibold mb-2">Shipping address</h2>
        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.line1}</p>
        {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
        <p>{order.shippingAddress.city}, {order.shippingAddress.stateOrRegion} {order.shippingAddress.postalCode}</p>
      </section>
      <div className="mt-4 text-right">
        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
        {order.shippingCost != null && <p>Shipping: ${order.shippingCost.toFixed(2)}</p>}
        {order.tax != null && <p>Tax: ${order.tax.toFixed(2)}</p>}
        <p className="font-semibold text-lg">Total: ${order.total.toFixed(2)}</p>
      </div>
      <Link to="/account/orders" className="mt-4 inline-block text-amazon-orange hover:underline">Back to orders</Link>
    </div>
  );
}
