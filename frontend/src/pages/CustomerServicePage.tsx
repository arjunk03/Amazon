import { Link } from 'react-router-dom';

export function CustomerServicePage() {
  return (
    <div className="max-w-[1000px] mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-6">Customer Service</h1>
      <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
        <h2 className="text-xl font-medium mb-4">Welcome to Amazon Customer Service</h2>
        <p className="mb-4 text-gray-700">
          What would you like help with today? You can manage your orders, returns, and account settings here.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="border p-4 rounded hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold mb-2">Your Orders</h3>
            <p className="text-sm text-gray-600">Track packages, edit or cancel orders.</p>
          </div>
          <div className="border p-4 rounded hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold mb-2">Returns & Refunds</h3>
            <p className="text-sm text-gray-600">Return or exchange items.</p>
          </div>
          <div className="border p-4 rounded hover:bg-gray-50 cursor-pointer">
            <h3 className="font-semibold mb-2">Digital Services and Device Support</h3>
            <p className="text-sm text-gray-600">Troubleshoot device issues.</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
           <p className="text-gray-600 mb-4">Need more help?</p>
           <Link to="/" className="text-amazon-orange hover:underline font-medium">Browse Help Topics</Link>
        </div>
      </div>
    </div>
  );
}
