import { useSearchParams, Link } from 'react-router-dom';

/**
 * Shown after POST /api/orders succeeds.
 * Response: { orderId, status, placedAt, total, estimatedDelivery? }
 */
export function CheckoutConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="max-w-[600px] mx-auto p-8 text-center">
      <h1 className="text-2xl font-semibold text-green-700">Thank you for your order</h1>
      <p className="mt-2 text-gray-600">
        Order ID: <strong>{orderId ?? '—'}</strong>
      </p>
      <p className="text-sm text-gray-500 mt-2">Order placed successfully.</p>
      <Link to="/account/orders" className="inline-block mt-6 text-amazon-orange hover:underline">View your orders</Link>
      <Link to="/" className="inline-block mt-4 ml-4 text-amazon-orange hover:underline">Continue shopping</Link>
    </div>
  );
}
