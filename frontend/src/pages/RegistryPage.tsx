import { Link } from 'react-router-dom';

export function RegistryPage() {
    return (
        <div className="max-w-[1000px] mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold mb-4">Registry & Gifting</h1>
                <p className="text-lg text-gray-700">Whether you're celebrating a wedding, a baby, or any other occasion, you can make it special with Amazon Registry.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4">Create a Registry</h2>
                    <p className="text-gray-600 mb-6 font-light">Start your registry or gift list.</p>
                    <button className="bg-amazon-orange text-amazon-dark px-6 py-2 rounded font-medium hover:bg-amber-500 w-full mb-4">Create a Wedding Registry</button>
                    <button className="bg-amazon-orange text-amazon-dark px-6 py-2 rounded font-medium hover:bg-amber-500 w-full">Create a Baby Registry</button>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4">Find a Registry</h2>
                    <p className="text-gray-600 mb-6 font-light">Search for a registry or gift list.</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Registrant name" className="flex-1 px-4 py-2 border rounded" />
                        <button className="bg-amazon-orange text-amazon-dark px-6 py-2 rounded font-medium hover:bg-amber-500">Search</button>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center pt-8 border-t">
                <Link to="/" className="text-amazon-orange hover:underline">Back to Shopping</Link>
            </div>
        </div>
    );
}
