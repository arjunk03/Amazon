import { mockAddresses } from '../mock/data';

/**
 * GET /api/user/addresses, POST/PATCH/DELETE
 */
export function AccountAddressesPage() {
  const addresses = mockAddresses;

  return (
    <div className="max-w-[700px] mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Your addresses</h1>
      {addresses.length === 0 ? (
        <p className="text-gray-500">No saved addresses.</p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((a) => (
            <li key={a.id} className="border rounded p-4">
              <p className="font-medium">{a.fullName}</p>
              <p>{a.line1}</p>
              {a.line2 && <p>{a.line2}</p>}
              <p>{a.city}, {a.stateOrRegion} {a.postalCode}</p>
              {a.phone && <p>{a.phone}</p>}
              {a.isDefault && <span className="text-xs text-amazon-orange">Default</span>}
              <div className="mt-2 flex gap-2 text-sm">
                <button type="button" className="text-amazon-orange hover:underline">Edit</button>
                <button type="button" className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button type="button" className="mt-4 text-amazon-orange hover:underline">Add new address</button>
    </div>
  );
}
