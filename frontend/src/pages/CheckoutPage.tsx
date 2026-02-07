import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockAddresses, mockPaymentMethods } from '../mock/data';

/**
 * Checkout: GET /api/user/addresses, GET /api/user/payment-methods, POST /api/orders
 */
export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const addresses = mockAddresses;
  const paymentMethods = mockPaymentMethods;

  useEffect(() => {
    if (addresses.length > 0 && !addressId) setAddressId(addresses[0].id);
  }, [addresses.length, addressId]);
  useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethodId) setPaymentMethodId(paymentMethods[0].id);
  }, [paymentMethods.length, paymentMethodId]);

  const handlePlaceOrder = () => {
    const orderId = `ord-${Date.now()}`;
    navigate(`/checkout/confirmation?orderId=${orderId}`);
  };

  return (
    <div className="max-w-[800px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="flex gap-4 mb-6">
        <button type="button" onClick={() => setStep(1)} className={step >= 1 ? 'font-semibold text-amazon-orange' : 'text-gray-500'}>
          1. Address
        </button>
        <button type="button" onClick={() => setStep(2)} className={step >= 2 ? 'font-semibold text-amazon-orange' : 'text-gray-500'}>
          2. Payment
        </button>
        <button type="button" onClick={() => setStep(3)} className={step >= 3 ? 'font-semibold text-amazon-orange' : 'text-gray-500'}>
          3. Review
        </button>
      </div>

      {step === 1 && (
        <section className="border rounded p-4">
          <h2 className="font-semibold mb-2">Shipping address</h2>
          {addresses.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved addresses. Add via POST /api/user/addresses (fullName, line1, city, stateOrRegion, postalCode, countryCode, ...).</p>
          ) : (
            <ul className="space-y-2">
              {addresses.map((a) => (
                <li key={a.id} className="flex items-center gap-2">
                  <input type="radio" name="address" checked={addressId === a.id} onChange={() => setAddressId(a.id)} />
                  <span>{a.fullName}, {a.line1}, {a.line2 ? ` ${a.line2},` : ''} {a.city}, {a.stateOrRegion} {a.postalCode}</span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="mt-2 text-amazon-orange hover:underline text-sm">Add new address</button>
          <button type="button" onClick={() => setStep(2)} className="block mt-4 bg-amazon-dark text-white px-4 py-2 rounded">
            Continue to payment
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="border rounded p-4">
          <h2 className="font-semibold mb-2">Payment method</h2>
          {paymentMethods.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved cards. Add via POST /api/user/payment-methods (type, number, expiryMonth, expiryYear, cvv).</p>
          ) : (
            <ul className="space-y-2">
              {paymentMethods.map((pm) => (
                <li key={pm.id} className="flex items-center gap-2">
                  <input type="radio" name="payment" checked={paymentMethodId === pm.id} onChange={() => setPaymentMethodId(pm.id)} />
                  <span>{pm.brand ?? 'Card'} ****{pm.last4}</span>
                </li>
              ))}
            </ul>
          )}
          <button type="button" className="mt-2 text-amazon-orange hover:underline text-sm">Add new card</button>
          <button type="button" onClick={() => setStep(3)} className="block mt-4 bg-amazon-dark text-white px-4 py-2 rounded">
            Review order
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="border rounded p-4">
          <h2 className="font-semibold mb-2">Review order</h2>
          <p className="text-sm text-gray-600">Subtotal ({cart.itemCount} items): ${cart.subtotal.toFixed(2)}</p>
          <p className="text-sm mt-1">Shipping to: {addresses.find((a) => a.id === addressId)?.city}, {addresses.find((a) => a.id === addressId)?.stateOrRegion}</p>
          <p className="text-sm mt-1">Payment: {paymentMethods.find((p) => p.id === paymentMethodId)?.brand} ****{paymentMethods.find((p) => p.id === paymentMethodId)?.last4}</p>
          <button type="button" onClick={handlePlaceOrder} className="mt-4 bg-amazon-orange text-amazon-dark px-6 py-2 rounded font-semibold">
            Place order
          </button>
        </section>
      )}
    </div>
  );
}
